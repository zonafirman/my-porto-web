'use client';
import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { Linkedin, Github, Instagram, Dribbble } from 'lucide-react';
import ScrollFloat from '@/components/animations/ScrollFloat';

const socialLinks = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/zonafirman' },
  { name: 'Dribbble', icon: Dribbble, href: 'https://dribbble.com/zonafirman' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/zonafirman' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/zonafirman' }
];

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <footer ref={ref} className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Container Utama untuk CTA */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-6xl mx-auto bg-white dark:bg-[#161515] rounded-3xl p-10 sm:p-20 text-center shadow-[0px_8px_40px_rgba(0,0,0,0.05)] dark:border dark:border-white/10 dark:shadow-none"
      >
        {/* "Pill" Status */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="relative flex h-2.5 w-2.5 ">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Available for work</span>
        </motion.div>

        {/* Judul Utama */}
        <ScrollFloat textClassName="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 dark:text-white tracking-tighter leading-tight max-w-2xl mx-auto">
          Let's create your next big idea.
        </ScrollFloat>

        {/* Tombol Kontak */}
        <motion.div variants={itemVariants}>
          <a href="mailto:example@email.com" className="group relative mt-10 inline-block px-8 py-2 border border-black dark:border-white rounded-full text-black dark:text-white font-medium hover:text-white dark:hover:text-black transition-colors duration-500 overflow-hidden">
            <span className="absolute inset-0 bg-black dark:bg-white top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0"></span>
            <span className="relative z-10 block transition-transform duration-300 group-hover:-translate-y-full py-1">
              Contact Me
            </span>
            <span className="absolute inset-0 z-10 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
              Let's Talk
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Baris Footer Bawah */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-6xl mx-auto mt-16 flex flex-col sm:flex-row justify-between items-center gap-6"
      >
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          &copy; 2025 Zona Firman. All rights reserved.
        </p>
        <motion.div variants={itemVariants} className="flex items-center gap-5">
          {socialLinks.map(link => (
            <a key={link.name} href={link.href} aria-label={link.name} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors">
              <link.icon size={22} />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;