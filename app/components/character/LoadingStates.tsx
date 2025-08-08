const STYLES = {
  centerContent: "min-h-screen bg-[#F2F2F7] flex items-center justify-center",
} as const;

export const LoadingState = () => (
  <div className={STYLES.centerContent}>
    <div className="text-xl">Loading...</div>
  </div>
);

export const ErrorState = () => (
  <div className={STYLES.centerContent}>
    <div className="text-xl text-red-500">Error loading counselors</div>
  </div>
); 