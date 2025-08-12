import { ChevronDown, ChevronRight } from 'lucide-react';
import { FilterCheckBox } from './FilterCheckBox';

export const FilterType = ({
  toggleSection,
  filterType,
  isOpen,
  filters,
  selected,
  onFilterChange,
  category,
}) => {
  return (
    <div className="px-4 pb-3 border-b border-b-gray-200 dark:border-b-gray-800">
      <button
        className="flex items-center justify-between w-full mt-2 font-medium cursor-pointer"
        onClick={toggleSection}
      >
        <span className="font-semibold text-gray-800 dark:text-gray-300 text-md">
          {filterType}
        </span>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-gray-600 transition-transform duration-300 group-hover:translate-x-1" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-600 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 space-y-2">
          {filters?.map((filter) => {
            return (
              <FilterCheckBox
                filterOption={filter}
                key={filter}
                checked={selected.includes(filter)}
                onChange={(checked) =>
                  onFilterChange(category, filter, checked)
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
