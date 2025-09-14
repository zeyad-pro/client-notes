export default function LoadingSkeleton() {
  return (
    <div className="h-60 rounded-2xl bg-gray-300 relative overflow-hidden animate-pulse">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 w-3/4 bg-gray-400 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-400 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-400 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
