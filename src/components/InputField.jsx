import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { ErrorMessage } from './ErrorMessage';

export const InputField = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  label,
  error,
  name,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="mt-3">
      <label
        htmlFor={name}
        className="block mb-1 text-xs font-medium text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute w-3 h-3 text-gray-300 transform -translate-y-1/2 dark:text-gray-700 left-3 top-1/2" />
        )}
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          className="w-full py-2 pl-8 pr-4 text-xs text-gray-700 transition-all duration-200 border border-gray-300 rounded-md outline-none dark:border-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-600"
          placeholder={placeholder}
          name={name}
          onBlur={onBlur}
          id={name}
          data-testid={name}
        />
        {inputType === 'password' ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-300 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 dark:text-gray-700 " />
            ) : (
              <Eye className="w-4 h-4 dark:text-gray-700" />
            )}
          </button>
        ) : null}
      </div>
      {error ? <ErrorMessage errorMessage={error} /> : null}
    </div>
  );
};
