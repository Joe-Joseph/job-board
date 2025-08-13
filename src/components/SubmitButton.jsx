import { Loader } from 'lucide-react';

export const SubmitButton = ({
  icon: Icon,
  isLoading,
  type,
  text,
  handleClick,
  id,
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      className="flex justify-center items-center w-full bg-gradient-to-r from-sky-500 to-orange-400 text-white text-sm font-semibold cursor-pointer p-2 rounded-md transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8"
      onClick={() => {
        type !== 'submit' && handleClick();
      }}
      id={id}
      data-testid={id}
    >
      {isLoading ? (
        <Loader className="animate-spin" />
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
