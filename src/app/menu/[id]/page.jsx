// app/menu/[id]/page.jsx
import AddToCartButton from "@/components/AddToCartButton";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";

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

async function getItem(id) {
  if (!id) return null;

  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME || "savor-rest";
    const db = client.db(dbName);

    let doc = null;
    if (ObjectId.isValid(id)) {
      doc = await db.collection("menuitems").findOne({ _id: new ObjectId(id) });
    }
    if (!doc) {
      doc = await db.collection("menuitems").findOne({
        $or: [{ _id: id }, { id: id }, { id: Number(id) || -1 }],
      });
    }

    if (doc) {
      return {
        ...doc,
        _id: doc._id ? doc._id.toString() : String(doc.id),
      };
    }
  } catch (err) {
    console.error("Database lookup error for item:", id, err);
  }

  // Fallback to static items
  const foundFallback = fallbackDishes.find(
    (d) => d._id === id || String(d.id) === id
  );

  return foundFallback || null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    return {
      title: "Dish Not Found",
    };
  }

  return {
    title: item.name,
    description: item.description,
  };
}

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-serif text-zinc-900 mb-4">
          Dish Not Found
        </h1>
        <p className="text-zinc-600 mb-8">
          We couldn&apos;t find the item you&apos;re looking for.
        </p>
        <Link
          href="/menu"
          className="px-8 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
        >
          Back to Menu
        </Link>
      </main>
    );
  }

  const imageSrc =
    item.image && item.image.trim() !== ""
      ? item.image
      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

  return (
    <main className="min-h-screen py-16 px-4 md:px-8 max-w-6xl mx-auto">
      <Link
        href="/menu"
        className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-amber-600 mb-10 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        Back to Menu
      </Link>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-zinc-100 shadow-sm">
            <Image
              src={imageSrc}
              alt={item.name || "Dish image"}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-2">
            <span className="text-amber-600 font-medium tracking-wider uppercase text-sm">
              {item.category || "Specialty"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-4">
            {item.name}
          </h1>

          <div className="text-3xl font-bold text-zinc-900 mb-8">
            ${Number(item.price || 0).toFixed(2)}
          </div>

          <div className="w-16 h-1 bg-zinc-200 mb-8"></div>

          <p className="text-lg text-zinc-600 leading-relaxed mb-10">
            {item.description}
          </p>

          {item.dietary && item.dietary.length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-3">
                Dietary Information
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.dietary.map((diet) => (
                  <span
                    key={diet}
                    className="px-4 py-2 bg-zinc-100 text-zinc-700 font-medium rounded-md text-sm"
                  >
                    {diet}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto pt-8 border-t border-zinc-100">
            <AddToCartButton item={item} />
          </div>
        </div>
      </div>
    </main>
  );
}
