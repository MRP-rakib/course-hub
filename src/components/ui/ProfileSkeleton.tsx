const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse flex items-center gap-2 rounded-lg border border-white/8 bg-white/4 px-2 py-1.5">
      
      <div className="h-7 w-5 rounded-full bg-white/10" />

      <div className="h-3 w-10 rounded bg-white/10" />

      <div className="h-3 w-3 rounded bg-white/10" />
    </div>
  );
};

export default ProfileSkeleton;