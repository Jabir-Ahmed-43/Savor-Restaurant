// app/page.jsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const signatureDishes = [
    {
      title: "Truffle Risotto",
      description: "Wild mushrooms, arborio rice, aged parmesan, and white truffle oil.",
      image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80",
      price: "$28.00",
    },
    {
      title: "Pan-Seared Scallops",
      description: "Cauliflower purée, crispy pancetta, and microgreens.",
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80",
      price: "$34.00",
    },
    {
      title: "Wagyu Ribeye",
      description: "Charred asparagus, roasted garlic mash, and red wine reduction.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      price: "$65.00",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-center justify-center bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/hero-image.jpg"
            alt="Restaurant interior ambiance"
            fill
            className="object-cover scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/40 to-zinc-950/60" />

        <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-4xl mx-auto">
          <span className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-4">
            Fine Dining & Culinary Art
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-md leading-tight">
            Savor the Experience
          </h1>
          <p className="text-lg md:text-2xl text-zinc-200 mb-10 max-w-2xl drop-shadow font-light">
            Locally sourced ingredients, crafted with passion. Join us for an
            unforgettable culinary journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/reservations"
              className="px-8 py-4 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700 transition-all shadow-lg hover:shadow-amber-600/30 text-base"
            >
              Book a Table
            </Link>
            <Link
              href="/menu"
              className="px-8 py-4 bg-transparent border-2 border-white/80 text-white font-semibold rounded-md hover:bg-white hover:text-zinc-900 transition-all text-base"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-xs mb-2 block">
            Chef&apos;s Recommendations
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-zinc-900 mb-4">
            Signature Dishes
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureDishes.map((dish) => (
            <Link
              key={dish.title}
              href="/menu"
              className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-72 w-full overflow-hidden bg-zinc-100">
                <Image
                  src={dish.image}
                  alt={dish.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">
                    {dish.title}
                  </h3>
                  <span className="text-amber-600 font-bold">{dish.price}</span>
                </div>
                <p className="text-zinc-600 text-sm leading-relaxed mb-4 flex-1">
                  {dish.description}
                </p>
                <span className="text-sm font-medium text-amber-600 group-hover:underline inline-flex items-center gap-1">
                  Order from Menu &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ambiance Quote / Call to Action */}
      <section className="bg-zinc-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-serif mb-6 text-zinc-100 italic">
            &ldquo;Food is our common ground, a universal experience.&rdquo;
          </h3>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Experience an elegant atmosphere tailored for intimate dinners, celebrations, and culinary memories.
          </p>
          <Link
            href="/reservations"
            className="inline-block px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-md transition-colors"
          >
            Reserve Your Experience
          </Link>
        </div>
      </section>
    </main>
  );
}
