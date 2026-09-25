// app/menu/loading.jsx

export default function LoadingMenu() {
  return (
    <main className="min-h-screen py-16 px-4 md:px-8 xl:px-12 max-w-screen-2xl mx-auto bg-zinc-50">
      <div className="text-center mb-16 animate-pulse">
        <div className="h-12 md:h-16 bg-zinc-200 rounded-md w-64 md:w-96 mx-auto mb-4"></div>
        <div className="w-24 h-1 bg-zinc-200 mx-auto mb-6"></div>
        <div className="h-6 bg-zinc-200 rounded-md w-full max-w-2xl mx-auto"></div>
      </div>

      <div className="space-y-20">
        {[1, 2].map((categoryIndex) => (
          <section key={categoryIndex} className="w-full">
            <div className="h-8 w-40 bg-zinc-200 rounded-md mb-8 animate-pulse"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3].map((itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-100 animate-pulse"
                >
                  <div className="w-full h-56 sm:h-64 bg-zinc-200"></div>

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-6 bg-zinc-200 rounded w-1/2"></div>
                      <div className="h-6 bg-zinc-200 rounded w-16"></div>
                    </div>

                    <div className="space-y-2 mb-8">
                      <div className="h-4 bg-zinc-200 rounded w-full"></div>
                      <div className="h-4 bg-zinc-200 rounded w-5/6"></div>
                    </div>

                    <div className="w-full h-12 mt-auto bg-zinc-200 rounded-lg"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
