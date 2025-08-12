export const FilterCheckBox = ({ filterOption, checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="cursor-pointer
      appearance-none 
      w-4 h-4
      border border-gray-400 dark:border-gray-800
      rounded-xs 
      flex items-center justify-center 
      checked:bg-sky-600 
      checked:border-sky-600 
      checked:before:content-['✔'] 
      checked:before:text-white 
      checked:before:text-xs 
    "
      />
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        {filterOption}
      </span>
    </label>
  );
};
