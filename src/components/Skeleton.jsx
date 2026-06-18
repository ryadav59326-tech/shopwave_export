// Loading skeleton components for better UX

export const ProductCardSkeleton = () => (
  <div className="bg-white dark:bg-stone-900 rounded-2xl overflow-hidden border border-stone-100 dark:border-stone-800">
    <div className="aspect-[4/5] skeleton" />
    <div className="p-4 space-y-2">
      <div className="h-3 w-20 skeleton rounded-full" />
      <div className="h-5 w-4/5 skeleton rounded-lg" />
      <div className="h-3 w-24 skeleton rounded-full" />
      <div className="h-6 w-20 skeleton rounded-lg mt-2" />
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div className="space-y-4">
        <div className="aspect-square skeleton rounded-2xl" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="aspect-square skeleton rounded-xl" />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 w-24 skeleton rounded-full" />
        <div className="h-10 w-3/4 skeleton rounded-xl" />
        <div className="h-6 w-32 skeleton rounded-xl" />
        <div className="h-24 skeleton rounded-xl" />
        <div className="h-12 skeleton rounded-xl" />
      </div>
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="h-screen skeleton" />
);
