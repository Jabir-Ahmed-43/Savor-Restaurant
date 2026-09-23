// app/menu/page.jsx

import ItemCard from "\u0018\u0018@/components/ItemCard";

const menuItems = [
  {
    id: 1,
    name: "Bruschetta al Pomodoro",
    description:
      "Grilled artisan bread topped with heirloom tomatoes, fresh basil, garlic, and extra virgin olive oil.",
    price: 12.5,
    category: "Starters",
    dietary: ["Vegetarian", "Vegan"],
    image:
      "https://images.unsplash.com/photo-1626056087728-05c3d180911a?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Crispy Calamari",
    description:
      "Lightly dusted and fried calamari rings served with a zesty lemon garlic aioli.",
    price: 16.0,
    category: "Starters",
    dietary: [],
    image:
      "https://images.unsplash.com/photo-1579670039509-e21e75007e4c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Truffle Risotto",
    description:
      "Wild mushrooms, creamy arborio rice, aged parmesan, and a drizzle of white truffle oil.",
    price: 28.0,
    category: "Mains",
    dietary: ["Vegetarian", "Gluten-Free"],
    image:
      "https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Pan-Seared Scallops",
    description:
      "Fresh sea scallops served over a silky cauliflower purée with crispy pancetta and microgreens.",
    price: 34.0,
    category: "Mains",
    dietary: ["Gluten-Free"],
    image:
      "https://images.unsplash.com/photo-1610294394708-7053ca773103?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "Wagyu Ribeye",
    description:
      "12oz premium Wagyu beef, charred asparagus, roasted garlic mash, and a rich red wine reduction.",
    price: 65.0,
    category: "Mains",
    dietary: ["Gluten-Free"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Herb-Crusted Salmon",
    description:
      "Oven-baked Atlantic salmon with a quinoa salad and lemon-dill sauce.",
    price: 32.0,
    category: "Mains",
    dietary: [],
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Classic Tiramisu",
    description:
      "Espresso-soaked ladyfingers layered with rich mascarpone cream and dusted with cocoa powder.",
    price: 11.0,
    category: "Desserts",
    dietary: ["Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Chocolate Lava Cake",
    description:
      "Warm, molten chocolate center served with a scoop of Madagascar vanilla bean ice cream.",
    price: 13.0,
    category: "Desserts",
    dietary: ["Vegetarian"],
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Artisan Basil Lemonade",
    description:
      "Freshly squeezed lemons muddled with sweet basil and a touch of agave.",
    price: 6.5,
    category: "Drinks",
    dietary: ["Vegan", "Gluten-Free"],
    image:
      "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80",
  },
];

export default function MenuPage() {
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
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
                <ItemCard key={item.id} item={item}></ItemCard>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
