import { FolderOpen } from 'lucide-react';

export const NotFoundError = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 mt-10 text-center bg-white rounded-lg shadow-md dark:bg-gray-800">
      <FolderOpen className="w-10 h-10 mb-4 text-gray-400 transition-transform duration-300 group-hover:translate-x-1" />
      <h2 className="mb-2 font-semibold text-gray-800 text-md dark:text-gray-200">
        {title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};
