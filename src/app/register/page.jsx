// app/register/page.jsx
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-zinc-100">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-zinc-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Join us to save your favorite orders and manage reservations.
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="block w-full px-4 py-3 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                className="block w-full px-4 py-3 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="block w-full px-4 py-3 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Log in here
          </Link>
        </p>
      </div>
    </main>
  );
}
