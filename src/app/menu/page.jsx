// app/menu/page.jsx
import ItemCard from "@/components/ItemCard";
import clientPromise from "@/lib/mongodb";

// 1. Cache this page at the server level for 1 hour (3600 seconds)
export const revalidate = 3600;

export const metadata = {
  title: "Menu",
  description:
    "Explore our curated culinary menu of fine dining appetizers, mains, and desserts.",
};

export default async function MenuPage() {
  let menuItems = [];

  // 2. Fetch exclusively from the database
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME || "savor-rest";
    const db = client.db(dbName);
    const rawMenuItems = await db.collection("menuitems").find({}).toArray();

    if (rawMenuItems && rawMenuItems.length > 0) {
      menuItems = rawMenuItems.map((item) => ({
        ...item,
        _id: item._id.toString(),
      }));
    }
  } catch (error) {
    console.error("Database fetch failed in MenuPage:", error);
    // No fallback dishes are loaded upon failure
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

      {/* 3. Render an empty state if the database has no items */}
      {Object.keys(groupedMenu).length === 0 ? (
        <div className="text-center py-20 text-zinc-500 text-lg">
          Our menu is currently being updated. Please check back later!
        </div>
      ) : (
        <div className="space-y-20">
          {Object.entries(groupedMenu).map(([category, items]) => (
            <section key={category} className="w-full">
              <h2 className="text-3xl font-serif text-zinc-800 mb-8 pb-3 border-b-2 border-zinc-200 uppercase tracking-wide">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {items.map((item) => (
                  <ItemCard key={item._id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
