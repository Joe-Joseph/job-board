export const JobTypeCard = ({
  title,
  count,
  description,
  backgroundColor,
  titleColor,
  countColor,
  descriptionColor,
}) => {
  return (
    <div
      className={`p-3 transition-all duration-300 ${backgroundColor} border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer rounded-xl hover:shadow-md hover:-translate-y-1 group`}
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="">
          <h3
            className={`text-lg font-semibold ${titleColor} transition-colors duration-300`}
          >
            {title}
          </h3>

          <p className={`text-3xl mt-1 font-bold ${countColor}`}>
            {count.toLocaleString()}
          </p>

          <p className={`text-sm ${descriptionColor}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};
