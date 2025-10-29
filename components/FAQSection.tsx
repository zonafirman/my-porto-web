// Tambahkan "use client" di atas karena kita menggunakan state (useState)
"use client"; 

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import localFont from 'next/font/local';
// Impor ikon dari lucide-react
import { Sparkles, ChevronDown, Search } from 'lucide-react';

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
});

interface FaqData {
  id: number;
  question: string;
  answer: string;
}

// Data untuk FAQ
const faqData: FaqData[] = [
  {
    id: 1,
    question: '01. What is your current role?',
    answer: 'I am currently a freelance web developer and designer, focusing on creating high-performance websites for startups and small businesses.'
  },
  {
    id: 2,
    question: '02. How much does it cost for a high performing website?',
    answer: 'The cost varies depending on the project scope, features, and complexity. Please reach out through the contact form with your project details for a custom quote.'
  },
  {
    id: 3,
    question: '03. How long will the work take from start to finish?',
    answer: 'A typical project takes around 4-8 weeks from the initial consultation to the final launch. This timeline can change based on the project size and the speed of feedback.'
  },
  {
    id: 4,
    question: '04. Are you available to join as full time?',
    answer: 'I am primarily focused on freelance projects at the moment, but I am always open to discussing exciting full-time opportunities that align with my skills and long-term goals.'
  },
];

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

// Komponen untuk satu item FAQ (Accordion)
const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white dark:bg-[#161515] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Tombol Pertanyaan (Trigger) */}
      <motion.header
        initial={false}
        onClick={onClick}
        className="flex justify-between items-center w-full p-6 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100 pr-4">{question}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.header>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

// Komponen Halaman Utama
export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(faqData[0]?.id ?? null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqData = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className=" py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Kontainer Grid Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* === KOLOM KIRI: Judul === */}
          <div className="lg:sticky lg:top-24"> {/* Membuat judul "sticky" hanya di layar besar */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent tracking-wider uppercase">
                FAQS
              </span>
            </div>
            <h2 className={`${clashDisplay.className} text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white leading-tight`}>
              Have
              <br />
              Questions?
            </h2>

            {/* Kolom Pencarian */}
            <div className="relative mt-8">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161515] text-black dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          {/* === KOLOM KANAN: Daftar Accordion === */}
          <div className="space-y-4">
            {filteredFaqData.length > 0 ? (
              filteredFaqData.map((item) => (
                <FaqItem 
                  key={item.id} 
                  question={item.question} 
                  answer={item.answer} 
                  isOpen={openId === item.id}
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                />
              ))
            ) : (
              <div className="text-center py-10 px-6 bg-white dark:bg-[#161515] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No questions found</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Try a different search term or check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}