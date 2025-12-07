'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Code2, ChevronDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

interface Item {
  id: number;
  title: string
  icon: React.ReactElement
  content: string
  imageUrl: string
  link: string
}

const items: Item[] = [
  {
    id: 1,
    title: 'Navstack',
    icon: <Code2 className="w-5 h-5" />,
    content:
      'A full-stack web application for managing and sharing navigation links. Built with modern technologies to provide a seamless user experience.',
    imageUrl: '/project1.png',
    link: 'https://navstacks.vercel.app',
  },
];

const SLIDE_DURATION = 8000; // 8 detik untuk setiap slide

export default function ExpertiseAccordion() {
  const [active, setActive] = useState<number | null>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk mereset dan memulai timer auto-slide
  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setActive((prevIndex) => {
        if (prevIndex === null) return 0;
        return (prevIndex + 1) % items.length;
      });
    }, SLIDE_DURATION);
  };

  // Efek untuk mengelola timer setiap kali 'active' berubah
  useEffect(() => {
    if (active !== null) {
      resetTimer();
    }
    // Cleanup timer saat komponen unmount
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [active]);

  const toggle = (index: number) => {
    // Jika item yang sama diklik, jangan tutup (null), tapi biarkan terbuka.
    // Jika ingin bisa ditutup, ganti dengan: setActive(active === index ? null : index)
    setActive(index);
    resetTimer(); // Reset timer setiap kali pengguna berinteraksi
  }

  const title = 'Featured Project'
  const titleChars = title.split('')

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const charVariants: Variants = {
    hidden: { opacity: 0, y: '120%', scaleY: 2.3, scaleX: 0.7, transformOrigin: '50% 0%' },
    visible: { opacity: 1, y: '0%', scaleY: 1, scaleX: 1, transition: { type: 'spring', damping: 12, stiffness: 100 } },
  }

  return (
    <>
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Kolom Gambar dengan Efek Ken Burns */}
            <div className="relative w-full h-80 md:h-[550px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop"
                alt="Expertise Areas"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-500 ease-in-out ${
                  active === null ? 'opacity-100 animate-kenburns' : 'opacity-0'
                }`}
                priority={active === null}
              />
              {items.map((item, index) => (
                <Image
                  key={index}
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  className={`object-cover transition-opacity duration-500 ease-in-out ${
                    active === index ? 'opacity-100 animate-kenburns' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            <div>
              <p className="text-purple-600 dark:text-purple-400 font-medium uppercase tracking-widest mb-2">
                Project
              </p>
              <motion.h2
                className="mb-8 text-4xl font-bold text-gray-900 dark:text-white overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                {titleChars.map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={charVariants}
                  >{char === ' ' ? '\u00A0' : char}</motion.span>
                ))}
              </motion.h2>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                      active === index
                        ? 'bg-white dark:bg-[#161515] border-gray-200 dark:border-gray-700 shadow-lg'
                        : 'bg-gray-50 dark:bg-black/20 border-transparent dark:border-transparent hover:bg-gray-100 dark:hover:bg-black/30'
                    }`}
                  >
                    <button
                      onClick={() => toggle(index)}
                      className="flex items-center justify-between w-full p-5 text-left"
                      aria-expanded={active === index}
                      aria-controls={`accordion-content-${index}`}
                    >
                      <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                        <span className={`transition-colors ${active === index ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'}`}>
                          {item.icon}
                        </span>
                        <span className="font-semibold text-lg">
                          {item.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ease-out ${
                          active === index ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </button>

                    <div
                      id={`accordion-content-${index}`}
                      className={`grid transition-all duration-500 ease-out ${
                        active === index
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden px-5 pb-5">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.content}
                        </p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          View Project
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                        {/* Bilah Progres */}
                        <div className="relative h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                          {active === index && (
                            <div
                              key={active} // Ganti key untuk mereset animasi
                              className="absolute top-0 left-0 h-full bg-purple-500 animate-progress-bar"
                              style={{ animationDuration: `${SLIDE_DURATION}ms` }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Menambahkan CSS untuk animasi baru */}
      <style jsx global>{`
        @keyframes kenburns {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(1.1) translate(-2%, 2%);
          }
        }
        .animate-kenburns {
          animation: kenburns ${SLIDE_DURATION * 1.5}ms ease-in-out infinite alternate;
        }
        @keyframes progress-bar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress-bar {
          animation: progress-bar linear;
        }
      `}</style>
    </>
  )
}
