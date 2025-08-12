export const LeftContent = ({ welcomeText, description }) => {
  return (
    <div className="relative md:w-3/4 md:h-4/5 my-auto p-8 md:p-16 flex items-center overflow-hidden md:bg-[linear-gradient(135deg,#050A24_0%,#101e5c_50%,#0a1545_100%)] dark:md:bg-none dark:bg-gray-900 md:shadow-[0px_0px_8px_rgba(2,6,23,0.45)] ">
      {/* content on top of the inner card */}
      <div className="relative z-10 text-white">
        <div className="mb-6 text-xs font-semibold tracking-widest">
          JOB BOARD.
        </div>
        <h1 className="mb-3 text-xl font-extrabold md:text-2xl">
          {welcomeText}
        </h1>
        <p className="text-base md:text-md text-white/80">{description}</p>
      </div>
    </div>
  );
};
