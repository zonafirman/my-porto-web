'use client';

import Image from 'next/image';
import localFont from 'next/font/local';
import CircularText from '@/components/animations/CircularText';
import { motion } from 'framer-motion';

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
  variable: '--font-clash-display',
});

const ResumeArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 group-hover:rotate-45"
  >
    <path
      d="M1.16669 12.8333L12.8334 1.16666M12.8334 1.16666H1.16669M12.8334 1.16666V12.8333"
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HeroSectionAbout() {
  return (
    <section className="relative flex min-h-screen justify-center px-4 pb-10 md:px-8 md:pb-14">
      
      <div className="container mx-auto max-w-6xl">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start min-h-[80vh]">

          {/* Kolom Gambar */}
          <div className="relative w-full max-w-xs mx-auto h-[80vh] self-start">
            <Image
              src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80" 
              alt="Potret A creative developer & digital designer"
              fill
              priority
              className="rounded-b-full object-cover"
            />
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 md:left-auto md:-right-12 md:bottom-[-0.5rem] md:translate-x-0">
              <CircularText 
                text="Let's•Talk•-•Let's•Talk•-" 
                spinDuration={10} onHover="pause" 
                className="w-[120px] h-[120px] text-black dark:text-white" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 items-start text-left md:col-span-2 pt-20">
            
            <h1 className={`${clashDisplay.className} text-5xl md:text-6xl lg:text-7xl font-bold leading-tight`}>
              A <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">creative developer</span> & digital designer
            </h1>
            
            <p className="text-sm text-gray-800 dark:text-white max-w-lg">
              I collaborate with brands globally to design impactful, mission-focused websites that drive results and achieve business goals.
            </p>
            
            <motion.a
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative px-6 py-2 border border-black dark:border-white rounded-full text-black dark:text-white font-medium hover:text-white dark:hover:text-black transition-colors duration-500 overflow-hidden inline-flex items-center justify-center text-sm"
            >
              {/* Latar belakang yang mengisi */}
              <span className="absolute inset-0 bg-black dark:bg-white top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0"></span>
              <span className="relative z-10 flex items-center gap-2.5 transition-transform duration-300 group-hover:-translate-y-[150%] py-1">My Resume <ResumeArrowIcon /></span>
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2.5 transition-transform duration-300 translate-y-[150%] group-hover:translate-y-0">Download CV <ResumeArrowIcon /></span>
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}