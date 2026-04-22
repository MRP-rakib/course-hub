export const LoadingDots = () => (
  <span className="inline-flex gap-1">
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:150ms]" />
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse [animation-delay:300ms]" />
  </span>
);