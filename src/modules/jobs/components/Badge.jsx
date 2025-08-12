export const Badge = ({ text }) => {
  return (
    <span className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-sm dark:text-white dark:bg-gray-600">
      {text}
    </span>
  );
};
