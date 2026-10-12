// app/menu/page.jsx
import ItemCard from "@/components/ItemCard";
import clientPromise from "@/lib/mongodb";

export const metadata = {
  title: "Menu",
  description: "Explore our curated culinary menu of fine dining appetizers, mains, and desserts.",
};

const fallbackDishes = [
  {
    _id: "starter-1",
    name: "Bruschetta al Pomodoro",
    description: "Grilled artisan bread topped with heirloom tomatoes, fresh basil, garlic, and extra virgin olive oil.",
    price: 12.5,
    category: "Starters",
    dietary: ["Vegetarian", "Vegan"],
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "starter-2",
    name: "Crispy Calamari",
    description: "Lightly dusted and fried calamari rings served with a zesty lemon garlic aioli.",
    price: 16.0,
    category: "Starters",
    dietary: [],
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "main-1",
    name: "Truffle Risotto",
    description: "Wild mushrooms, creamy arborio rice, aged parmesan, and a drizzle of white truffle oil.",
    price: 28.0,
    category: "Mains",
    dietary: ["Vegetarian", "Gluten-Free"],
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "main-2",
    name: "Pan-Seared Scallops",
    description: "Fresh sea scallops served over a silky cauliflower purée with crispy pancetta and microgreens.",
    price: 34.0,
    category: "Mains",
    dietary: ["Gluten-Free"],
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "main-3",
    name: "Wagyu Ribeye",
    description: "12oz premium Wagyu beef, charred asparagus, roasted garlic mash, and a rich red wine reduction.",
    price: 65.0,
    category: "Mains",
    dietary: ["Gluten-Free"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "main-4",
    name: "Herb-Crusted Salmon",
    description: "Oven-baked Atlantic salmon with a quinoa salad and lemon-dill sauce.",
    price: 32.0,
    category: "Mains",
    dietary: [],
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "dessert-1",
    name: "Classic Tiramisu",
    description: "Espresso-soaked ladyfingers layered with rich mascarpone cream and dusted with cocoa powder.",
    price: 11.0,
    category: "Desserts",
    dietary: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "dessert-2",
    name: "Chocolate Lava Cake",
    description: "Warm, molten chocolate center served with a scoop of Madagascar vanilla bean ice cream.",
    price: 13.0,
    category: "Desserts",
    dietary: ["Vegetarian"],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
  },
  {
    _id: "drink-1",
    name: "Artisan Basil Lemonade",
    description: "Freshly squeezed lemons muddled with sweet basil and a touch of agave.",
    price: 6.5,
    category: "Drinks",
    dietary: ["Vegan", "Gluten-Free"],
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
  },
];

export default async function MenuPage() {
  let menuItems = [];

  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME || "savor-rest";
    const db = client.db(dbName);
    const rawMenuItems = await db.collection("menuitems").find({}).toArray();

    if (rawMenuItems && rawMenuItems.length > 0) {
      menuItems = rawMenuItems.map((item) => ({
        ...item,
        _id: item._id ? item._id.toString() : String(item.id || ""),
      }));
    } else {
      menuItems = fallbackDishes;
    }
  } catch (error) {
    console.error("Database fetch failed in MenuPage, using fallback dishes:", error);
    menuItems = fallbackDishes;
  }

  const groupedMenu = menuItems.reduce((acc, item) => {
    const category = item.category || "Featured";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 xl:px-12 max-w-screen-2xl mx-auto bg-zinc-50">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-zinc-900 mb-4">
          Order Online
        </h1>
        <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
        <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
          Select your favorite dishes and we will prepare them fresh for pickup
          or delivery.
        </p>
      </div>

      <div className="space-y-20">
        {Object.entries(groupedMenu).map(([category, items]) => (
          <section key={category} className="w-full">
            <h2 className="text-3xl font-serif text-zinc-800 mb-8 pb-3 border-b-2 border-zinc-200 uppercase tracking-wide">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {items.map((item) => (
                <ItemCard key={item._id || item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
