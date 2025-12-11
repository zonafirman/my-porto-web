'use client';

import React, { useEffect, useRef } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import localFont from 'next/font/local';
import { motion, useAnimation, useInView } from 'framer-motion';

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
});

interface Award {
  title: string;
  date: string;
  issuer: string;
  link: string;
}

// Data untuk daftar penghargaan
const awardsData: Award[] = [
  {
    title: 'Star Performer of the Year',
    date: 'MAY 2021',
    issuer: 'OneShield',
    link: '#',
  },
  {
    title: 'Best Beginner Hack',
    date: 'APR 2021',
    issuer: 'Hackathon XYZ',
    link: '#',
  },
  {
    title: 'Sketch Webpage Contest Winner',
    date: 'NOV 2020',
    issuer: 'Design Community',
    link: '#',
  },
  {
    title: 'Best Space App Winner',
    date: 'SEP 2021',
    issuer: 'NASA Space Apps Challenge',
    link: '#',
  },
];

const AwardItem: React.FC<{ award: Award; variants: any }> = ({ award, variants }) => {
  return (
    <motion.a
      href={award.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={variants}
      className="group flex justify-between items-center py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/20 -mx-6 px-6"
    >
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors">{award.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{award.issuer}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase hidden sm:block">
          {award.date}
        </span>
        <ArrowUpRight className="h-5 w-5 text-gray-400 dark:text-gray-500 transition-transform transform-gpu group-hover:rotate-45 group-hover:text-gray-800 dark:group-hover:text-gray-200" />
      </div>
    </motion.a>
  );
};

// Komponen Halaman Utama
export default function AwwardSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Kolom Kiri: Judul */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent tracking-widest uppercase">
                  Awards
                </span>
              </div>

              <h2 className={`text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight ${clashDisplay.className}`}>
                Awards &<br />
                Recognition
              </h2>
            </motion.div>
          </div>

          {/* Kolom Kanan: Daftar Penghargaan */}
          <div className="md:col-span-2">
            {/* Kontainer untuk daftar */}
            <motion.div
              className="flex flex-col"
              variants={containerVariants}
              initial="hidden"
              animate={controls}
            >
              {awardsData.map((award, index) => (
                <AwardItem
                  key={index}
                  award={award}
                  variants={itemVariants}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}