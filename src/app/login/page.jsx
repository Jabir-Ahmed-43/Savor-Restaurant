// app/login/page.jsx
import Link from "next/link";
export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-zinc-100">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-zinc-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Sign in to your account to continue.
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
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
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-zinc-700">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
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
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600">
          Don`&apos;`t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </main>
  );
}
