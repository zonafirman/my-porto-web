'use client';
import { useState, type FC, type ReactNode } from "react";
import { IoSparkles } from "react-icons/io5";
import localFont from 'next/font/local';

interface Job {
  logo: ReactNode;
  title: string;
  company: string;
  date: string;
}

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
});

const jobs: Job[] = [
  {
    logo: (
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-blue-600 font-bold text-xl">
        O
      </div>
    ),
    title: "Software Engineer",
    company: "@OneShield Software",
    date: "Aug 2022 — Present",
  },
  {
    logo: (
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black border border-gray-700 font-bold text-white">
        DC
      </div>
    ),
    title: "Founder",
    company: "@Design and Code",
    date: "Jan 2021 — Present",
  },
  {
    logo: (
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-black border border-gray-700 text-white">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12 0L3 5v14l9 5 9-5V5L12 0zM7 17.25V8.5l5 2.75v8.75l-5-2.75zM12 10.5L17 7.75v8.75l-5 2.75V10.5z"></path>
        </svg>
      </div>
    ),
    title: "Design Engineer",
    company: "@BlackboxAI",
    date: "Feb 2025 — Mar 2025",
  },
  {
    logo: (
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 font-bold text-white text-xl">
        S
      </div>
    ),
    title: "UI/UX Designer",
    company: "@SocialO",
    date: "Aug 2022 — Sep 2023",
  },
];

const JobItem: FC<Job> = ({ logo, title, company, date }) => (
  <div className="flex justify-between items-center w-full">
    <div className="flex items-center gap-4">
      {logo}
      <div>
        <h3 className="text-lg font-semibold text-black dark:text-white">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400">{company}</p>
      </div>
    </div>
    <span className="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">{date}</span>
  </div>
);

const ExperienceSection = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedJobs = showAll ? jobs : jobs.slice(0, 3);
  const hasMoreJobs = jobs.length > 3;

  return (
    <section className="text-black dark:text-white py-20 md:py-24 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <IoSparkles className="text-blue-500 w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Work History
            </span>
          </div>
          <h2 className={`text-5xl md:text-6xl font-bold mt-4 text-black dark:text-white ${clashDisplay.className}`}>Experience</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mt-6">
            I have worked with some of the most innovative industry leaders to
            help build their top-notch products.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="flex flex-col space-y-10">
            {displayedJobs.map((job, index) => (
              <JobItem
                key={index}
                logo={job.logo}
                title={job.title}
                company={job.company}
                date={job.date}
              />
            ))}
          </div>

          {hasMoreJobs && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="font-semibold text-blue-600 dark:text-blue-400 relative group"
              >
                <span>{showAll ? "Show Less" : "Show More"}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300"></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;