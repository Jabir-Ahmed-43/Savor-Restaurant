// app/menu/page.jsx
import ItemCard from "\u0018\u0018@/components/ItemCard";
import clientPromise from "../../../lib/mongodb";

export default async function MenuPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const client = await clientPromise;

  const db = client.db("savor-rest");
  const rawMenuItems = await db.collection("menuitems").find({}).toArray();

  const menuItems = rawMenuItems.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));

  // console.log("Fetched Menu Items:", menuItems);

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
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
