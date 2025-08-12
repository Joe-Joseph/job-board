export const SubmitButton = ({
  icon: Icon,
  isLoading,
  type,
  text,
  handleClick,
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="flex justify-center items-center w-full bg-gradient-to-r from-sky-500 to-orange-400 text-white text-sm font-semibold cursor-pointer p-2 rounded-md transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8"
      onClick={() => {
        type !== 'submit' && handleClick();
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          Signing in...
        </div>
      ) : (
        <>
          <span>{text}</span>
          {Icon ? (
            <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          ) : null}
        </>
      )}
    </button>
  );
};
