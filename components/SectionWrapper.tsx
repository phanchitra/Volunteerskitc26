import React from 'react';

export type SectionVariant = 'blue' | 'purple' | 'pink' | 'orange' | 'teal';

interface SectionWrapperProps {
  number: number;
  title: string;
  variant: SectionVariant;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ number, title, variant, children }) => {
  const styles = {
    blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
    purple: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300",
    pink: "bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300",
    orange: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300",
    teal: "bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-300",
  };

  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100 dark:border-gray-700">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${styles[variant]}`}>
          {number}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>
      {children}
    </section>
  );
};

export default SectionWrapper;