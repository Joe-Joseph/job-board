export const PaginationButton = ({
  icon: Icon,
  handleClick,
  disabled,
  text,
}) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="flex items-center justify-center gap-2 py-1 text-sm text-gray-600 transition-colors border border-gray-200 rounded-md cursor-pointer dark:border-gray-500 dark:text-gray-200 w-30 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
    >
      {text === 'Previous' ? (
        <>
          {Icon ? (
            <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          ) : null}
          {text}
        </>
      ) : (
        <>
          {text}
          {Icon ? (
            <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          ) : null}
        </>
      )}
    </button>
  );
};
