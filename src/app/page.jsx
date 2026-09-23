// app/page.jsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-zinc-900">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/hero-image.jpg"
            alt="Restaurant interior ambiance"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-md">
            Savor the Experience
          </h1>
          <p className="text-lg md:text-2xl text-zinc-200 mb-10 max-w-2xl drop-shadow">
            Locally sourced ingredients, crafted with passion. Join us for an
            unforgettable culinary journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/reservations"
              className="px-8 py-4 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700 transition-colors"
            >
              Book a Table
            </Link>
            <Link
              href="/menu"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-zinc-900 transition-colors"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-zinc-900 mb-4">
            Signature Dishes
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Item 1 */}
          <div className="group cursor-pointer">
            <div className="relative h-72 w-full mb-4 overflow-hidden rounded-lg bg-zinc-200">
              {/* Un-comment and add an image to your public folder to see it here */}
              {/* <Image src="/dish-1.jpg" alt="Truffle Risotto" fill className="object-cover group-hover:scale-105 transition-transform duration-300" /> */}
            </div>
            <h3 className="text-xl font-bold text-zinc-800 mb-2">
              Truffle Risotto
            </h3>
            <p className="text-zinc-600">
              Wild mushrooms, arborio rice, aged parmesan, and white truffle
              oil.
            </p>
          </div>

          {/* Featured Item 2 */}
          <div className="group cursor-pointer">
            <div className="relative h-72 w-full mb-4 overflow-hidden rounded-lg bg-zinc-200"></div>
            <h3 className="text-xl font-bold text-zinc-800 mb-2">
              Pan-Seared Scallops
            </h3>
            <p className="text-zinc-600">
              Cauliflower purée, crispy pancetta, and microgreens.
            </p>
          </div>

          {/* Featured Item 3 */}
          <div className="group cursor-pointer">
            <div className="relative h-72 w-full mb-4 overflow-hidden rounded-lg bg-zinc-200"></div>
            <h3 className="text-xl font-bold text-zinc-800 mb-2">
              Wagyu Ribeye
            </h3>
            <p className="text-zinc-600">
              Charred asparagus, roasted garlic mash, and red wine reduction.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
