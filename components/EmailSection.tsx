'use client'
import React from 'react';
// Impor ikon dari lucide-react
import localFont from 'next/font/local';
import {
  Sparkles,
  Linkedin,
  Github,
  Dribbble,
  Mail,
  Twitter
} from 'lucide-react';

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
});

// Komponen Halaman Utama
export default function ContactPage() {
  return (
    <main className="py-16 sm:py-24 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Kontainer Grid Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* === KOLOM KIRI: Judul & Formulir === */}
          <div>
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <span className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent tracking-wider uppercase">
                Connect with me
              </span>
            </div>

            {/* Judul */}
            <h2 className={`${clashDisplay.className} text-3xl md:text-4xl font-bold text-black dark:text-white leading-tight mb-6`}>
              Let's start a project
              <br />
              together
            </h2>

            {/* Formulir */}
            <form action="#" method="POST" className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-purple-500 dark:focus:ring-purple-500 transition-colors"
                />
              </div>

              {/* Tombol Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="group relative px-6 py-2 border border-black dark:border-white rounded-full text-black dark:text-white font-semibold hover:text-white dark:hover:text-black transition-colors duration-500 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-black dark:bg-white top-full group-hover:top-0 transition-all duration-500 ease-in-out z-0"></span>
                  <span className="relative z-10">
                    Send Message
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* === KOLOM KANAN: Kartu Profil === */}
          <div>
            <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              
              {/* Badge Available */}
              <div className="inline-flex items-center gap-2 py-1 px-3 bg-blue-100 dark:bg-purple-900/30 text-blue-800 dark:text-purple-300 rounded-full text-xs font-medium mb-4">
                <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                Available for work
              </div>

              {/* Foto Profil */}
              <img
                src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80"
                alt="Profile"
                className="rounded-full w-20 h-20 mb-4 object-cover"
              />

              {/* Deskripsi */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5">
                My inbox is always open. Whether you have a project or just want to say Hi, I
                would love to hear from you. Feel free to contact me and I'll get back to you.
              </p>

              {/* Ikon Sosial Media */}
              <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  <Dribbble className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-black dark:hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}