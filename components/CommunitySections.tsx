'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import localFont from 'next/font/local';
// Impor ikon dari lucide-react
import { Sparkles, MessageSquare, Briefcase, BookOpen, Heart, LucideProps } from 'lucide-react';

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
});

interface FeatureCardProps {
  icon: React.ReactElement<LucideProps>;
  title: string;
  description:string;
}

const features = [
  { icon: <MessageSquare />, title: "Mentoring", description: "Get connected with a mentor that will help you pave your career path." },
  { icon: <Briefcase />, title: "Opportunities", description: "Get Internships and Job opportunities and gain experience while you learn." },
  { icon: <BookOpen />, title: "Free Resources", description: "Get Free resources related to Designing and Development from the community." },
  { icon: <Heart />, title: "Help & Reviews", description: "Get your portfolio and projects reviewed by industry experts and mentors." },
];

interface AnimatedCounterProps {
  to: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, suffix = '', className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const controls = animate(0, to, {
        duration: 2,
        ease: 'easeOut',
        onUpdate(value) {
          node.textContent = Math.round(value).toString();
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to]);

  return <span ref={ref} className={className}>0</span>;
};

/**
 * Komponen untuk kartu fitur di sebelah kiri.
 * Menerima icon, title, dan description sebagai props.
 */
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm">
      {/* Lingkaran Ikon */}
      <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
        {React.cloneElement(icon, { className: "h-6 w-6 text-blue-600 dark:text-purple-400" })}
      </div>
      {/* Teks */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

/**
 * Komponen untuk menampilkan bagian komunitas.
 */
export default function CommunitySections() {
  return (
    <main className="min-h-screen text-gray-900 dark:text-white p-8 md:p-16 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Kontainer Grid Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* === KOLOM KIRI: GRID KARTU FITUR === */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          {/* === KOLOM KANAN: DESKRIPSI KOMUNITAS === */}
          <div>
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent tracking-wider uppercase">
                Community Work
              </span>
            </div>

            {/* Judul */}
            <h2 className={`${clashDisplay.className} text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight mb-6`}>
              Building a Tech Community
            </h2>

            {/* Paragraf */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              I found Design & Code which is a global community with a mission to connect
              designers and developers to create a happy community eager to learn, innovate
              and grow together. We welcome all designers and developers: beginners,
              intermediates, and experts willing to learn together. We encourage sharing
              resources and learning experiences, organizing events, and providing feedback
              for our members to grow as they learn.
            </p>

            {/* Statistik */}
            <div className="flex items-center gap-8 md:gap-12 mb-10">
              <div>
                <div className={`${clashDisplay.className} text-4xl md:text-5xl font-bold text-black dark:text-white`}>
                  <AnimatedCounter to={5} />k+
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Community Members</p>
              </div>
              <div>
                <div className={`${clashDisplay.className} text-4xl md:text-5xl font-bold text-black dark:text-white`}>
                  <AnimatedCounter to={25} />+
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Events conducted</p>
              </div>
              <div>
                <div className={`${clashDisplay.className} text-4xl md:text-5xl font-bold text-black dark:text-white`}>
                  <AnimatedCounter to={4} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Years</p>
              </div>
            </div>

            {/* Tombol */}
            <div className="self-start">
              <button className="
                py-3 px-8 bg-white dark:bg-gray-800 text-black dark:text-white font-semibold 
                border border-gray-300 dark:border-gray-700 rounded-full shadow-sm
                transition-all hover:bg-gray-100 dark:hover:bg-gray-700
              ">
                Join Community
              </button>
            </div>
            
          </div>

        </div>
      </div>
    </main>
  );
}