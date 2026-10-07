// app/menu/[id]/page.jsx
import AddToCartButton from "\u0018\u0018@/components/AddToCartButton";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import clientPromise from "../../../../lib/mongodb";

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;

  const client = await clientPromise;
  const db = client.db("savor-rest");

  let rawItem = null;

  try {
    rawItem = await db
      .collection("menuitems")
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error("Invalid item ID");
  }

  if (!rawItem) {
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
          className="px-8 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          Back to Menu
        </Link>
      </main>
    );
  }

  const item = { ...rawItem, _id: rawItem._id.toString() };

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
              src={item.image}
              alt={item.name}
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
              {item.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-4">
            {item.name}
          </h1>

          <div className="text-3xl font-bold text-zinc-900 mb-8">
            ${item.price.toFixed(2)}
          </div>

          <div className="w-16 h-1 bg-zinc-200 mb-8"></div>

          <p className="text-lg text-zinc-600 leading-relaxed mb-10">
            {item.description}
          </p>

          {item.dietary?.length > 0 && (
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
