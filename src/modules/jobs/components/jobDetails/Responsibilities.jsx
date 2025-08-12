import { ListItem } from '../ListItem';

export const Responsibilities = ({ job }) => {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-300">
        Responsibility
      </h2>
      <ul className="space-y-3 text-gray-700 dark:text-gray-400">
        {job?.responsibilities?.map((responsibility) => (
          <ListItem key={responsibility} text={responsibility} />
        ))}
      </ul>
    </section>
  );
};
