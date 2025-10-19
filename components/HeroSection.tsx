'use client';

import { useRef } from 'react';
import localFont from 'next/font/local';
import { motion, useInView } from 'framer-motion';
import SocialLinks from '@/components/animations/SosialLink';
import WavingHand from '@/components/animations/WavingHand';
import BlurText from './animations/BlurText';

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
  variable: '--font-clash-display', // Meskipun tidak digunakan di sini, ini untuk konsistensi jika diperlukan di tempat lain
});

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants = {
    animate: { transition: { staggerChildren: 0.3 } },
  };

  return (
    <section className=" min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-24">
        
        {/* Baris Atas: Sapaan */}
        <div className="flex items-center gap-2 text-lg text-black dark:text-white mb-4">
          <WavingHand />
          <span>Hey! It's me Zona,</span>
        </div>

        {/* Judul Utama */}
        <BlurText
          as="h1"
          className={`${clashDisplay.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black dark:text-white tracking-tighter leading-none`}
          animateBy="words"
        >
            Creating{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              memorable digital experiences
            </span>{' '}
            that delight and deliver.
        </BlurText>

        {/* Baris Bawah: Deskripsi */}
        <div className="mt-10 md:mt-20">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.hr
              variants={{
                initial: { scaleX: 0, originX: 0 },
                animate: { scaleX: 1, transition: { duration: 0.8, ease: 'easeOut' } },
              }}
              className="w-full md:max-w-xl border-gray-400"
            />
            <motion.p
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="w-full md:max-w-xl text-sm text-black dark:text-white leading-relaxed text-left"
            >
              I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.
            </motion.p>
          </motion.div>
          {/* Tombol Aksi & Social Links */}
          <div className="mt-8 flex flex-col-reverse items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="hidden md:flex">
              <SocialLinks />
            </div>
            <motion.button
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
              }}
              initial="initial"
              animate={isInView ? 'animate' : 'initial'}
              className="group relative px-6 py-2 border border-black dark:border-white rounded-full text-black dark:text-white font-medium hover:text-white dark:hover:text-black transition-colors duration-500 overflow-hidden"
            >
              {/* Latar belakang yang mengisi */}
              <span className="absolute inset-0 bg-black dark:bg-white top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0"></span>
              <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-full py-1">Know me better</span>
              <span className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">About me</span>
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;