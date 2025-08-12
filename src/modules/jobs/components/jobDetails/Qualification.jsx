import { ListItem } from '../ListItem';

export const Qualification = ({ job }) => {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-300">
        Qualification
      </h2>
      <ul className="space-y-3 text-gray-700 dark:text-gray-400">
        {job?.qualifications?.map((qualification) => (
          <ListItem key={qualification} text={qualification} />
        ))}
      </ul>
    </section>
  );
};
