export const CategorySkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-white/8 bg-white/2 p-4"
        >
          <div className="h-10 w-10 rounded-xl bg-white/10" />
          <div className="mt-4 h-4 w-24 rounded bg-white/10" />
          <div className="mt-4 h-3 w-20 rounded bg-white/10" />
        </div>
      ))}
   </>
  );
};