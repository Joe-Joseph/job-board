export const AboutTheRole = ({ job }) => {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-300">
        About this role
      </h2>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-400">
        {job?.about}
      </p>
    </section>
  );
};
