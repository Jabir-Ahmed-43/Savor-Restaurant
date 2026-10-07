// app/menu/[id]/loading.jsx

export default function LoadingItemDetails() {
  return (
    <main className="min-h-screen py-16 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Breadcrumb Skeleton */}
      <div className="w-24 h-4 bg-zinc-200 rounded mb-10 animate-pulse"></div>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Large Image Skeleton */}
        <div className="w-full md:w-1/2">
          <div className="w-full aspect-square rounded-2xl bg-zinc-200 animate-pulse shadow-sm"></div>
        </div>

        {/* Item Details Skeleton */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {/* Category */}
          <div className="w-20 h-4 bg-zinc-200 rounded mb-4 animate-pulse"></div>

          {/* Title */}
          <div className="w-3/4 h-10 md:h-12 bg-zinc-200 rounded mb-4 animate-pulse"></div>

          {/* Price */}
          <div className="w-24 h-8 bg-zinc-200 rounded mb-8 animate-pulse"></div>

          {/* Divider */}
          <div className="w-16 h-1 bg-zinc-200 mb-8"></div>

          {/* Description Block */}
          <div className="space-y-3 mb-10">
            <div className="w-full h-5 bg-zinc-200 rounded animate-pulse"></div>
            <div className="w-11/12 h-5 bg-zinc-200 rounded animate-pulse"></div>
            <div className="w-4/5 h-5 bg-zinc-200 rounded animate-pulse"></div>
            <div className="w-2/3 h-5 bg-zinc-200 rounded animate-pulse"></div>
          </div>

          {/* Dietary Tags */}
          <div className="mb-10">
            <div className="w-40 h-4 bg-zinc-200 rounded mb-4 animate-pulse"></div>
            <div className="flex flex-wrap gap-2">
              <div className="w-20 h-8 bg-zinc-200 rounded-md animate-pulse"></div>
              <div className="w-24 h-8 bg-zinc-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Add to Order Button */}
          <div className="mt-auto pt-8 border-t border-zinc-100">
            <div className="w-full sm:w-48 h-14 bg-zinc-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
