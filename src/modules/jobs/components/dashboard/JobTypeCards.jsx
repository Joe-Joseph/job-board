import { Home, Building, Shuffle } from 'lucide-react';
import { JobTypeCard } from './JobTypeCard';

export const JobTypeCards = ({ counts }) => {
  const jobTypes = [
    {
      title: 'Remote',
      icon: Home,
      description: 'Work from anywhere',
    },
    {
      title: 'Hybrid',
      icon: Shuffle,
      description: 'Mix of remote and office',
    },
    {
      title: 'Onsite',
      icon: Building,
      description: 'Office-based work',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-between py-5">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
        <JobTypeCard
          title={jobTypes[1].title}
          count={counts.hybrid}
          description={jobTypes[1].description}
          backgroundColor={'bg-sky-800 dark:bg-gray-900'}
          titleColor={'text-white'}
          descriptionColor={'text-gray-200'}
          countColor={'text-white'}
        />
        <JobTypeCard
          title={jobTypes[2].title}
          count={counts.onsite}
          description={jobTypes[2].description}
          backgroundColor={
            'bg-gradient-to-br from-sky-500 to-orange-400 dark:bg-gray-900 dark:from-transparent dark:to-transparent '
          }
          titleColor={'text-white'}
          descriptionColor={'text-gray-200'}
          countColor={'text-white'}
        />
        <JobTypeCard
          title={jobTypes[0].title}
          count={counts.remote}
          description={jobTypes[0].description}
          backgroundColor={'bg-sky-500 dark:bg-gray-900'}
          titleColor={'text-white'}
          descriptionColor={'text-gray-200'}
          countColor={'text-white'}
        />
      </div>
    </div>
  );
};
