'use client';

import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
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
}

// Data untuk daftar penghargaan
const awardsData: Award[] = [
  {
    title: 'Star Performer of the Year',
    date: 'MAY 2021',
  },
  {
    title: 'Best Beginner Hack',
    date: 'APR 2021',
  },
  {
    title: 'Sketch Webpage Contest Winner',
    date: 'NOV 2020',
  },
  {
    title: 'Best Space App Winner',
    date: 'SEP 2021',
  },
];

// Komponen untuk satu item penghargaan
const AwardItem: React.FC<{ title: string; date: string; variants: any }> = ({ title, date, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="flex justify-between items-center py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
        {date}
      </span>
    </motion.div>
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
                  title={award.title}
                  date={award.date}
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