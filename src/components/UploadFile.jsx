import { Upload } from 'lucide-react';
import { ErrorMessage } from './ErrorMessage';

export const UploadFile = ({
  handleDrop,
  handleDragOver,
  handleFileChange,
  labelText,
  name,
  file,
  error,
  onBlur,
  formik,
}) => {
  return (
    <div>
      <label className="block mb-1 text-xs font-medium text-gray-600 dark:text-gray-400">
        {labelText}
      </label>
      <div className="flex justify-center px-6 pt-5 pb-6 mt-2 transition-colors border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg hover:border-gray-400 min-h-[140px]">
        <div
          className="space-y-1 text-center"
          onDrop={(e) => handleDrop(e, name)}
          onDragOver={handleDragOver}
        >
          <Upload className="w-8 h-8 mx-auto text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={name}
              className="relative font-medium bg-white rounded-md cursor-pointer dark:bg-gray-900 text-sky-600 hover:text-sky-500 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <span>Upload a file</span>
              <input
                id={name}
                name={name}
                type="file"
                className="sr-only"
                accept=".pdf,.zip,.rar"
                onChange={(e) => {
                  if (e.target.files.length === 0) {
                    formik.setFieldValue(name, null);
                  } else {
                    handleFileChange(e, name);
                  }
                }}
                onBlur={onBlur}
                data-testid={name}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PDF, up to 5MB</p>
          {error ? (
            <ErrorMessage errorMessage={error} />
          ) : file?.name ? (
            <p className="text-sm font-medium text-green-600">{file?.name}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
