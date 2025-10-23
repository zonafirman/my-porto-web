'use client'
import React from 'react';
// Impor ikon dari lucide-react
import {
  Sparkles,
  Linkedin,
  Github,
  Dribbble,
  Mail,
  Twitter
} from 'lucide-react';

// Komponen Halaman Utama
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 md:p-16 lg:p-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Kontainer Grid Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* === KOLOM KIRI: Judul & Formulir === */}
          <div className="lg:col-span-2">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-green-600" />
              <span className="text-xs font-semibold text-green-600 tracking-wider uppercase">
                Connect with me
              </span>
            </div>

            {/* Judul */}
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-8">
              Let's start a project
              <br />
              together
            </h2>

            {/* Formulir */}
            <form action="#" method="POST" className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  className="block w-full rounded-lg border border-gray-200 p-3 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-200 p-3 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  className="block w-full rounded-lg border border-gray-200 p-3 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              {/* Tombol Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="
                    py-3 px-8 bg-white text-black font-semibold 
                    border border-gray-300 rounded-full shadow-sm
                    transition-all hover:bg-gray-100 hover:border-gray-400
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                  "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* === KOLOM KANAN: Kartu Profil === */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              
              {/* Badge Available */}
              <div className="inline-flex items-center gap-2 py-1 px-3 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                Available for work
              </div>

              {/* Foto Profil */}
              <img
                src="https://placehold.co/100x100" // Ganti dengan URL gambar Anda
                alt="Profile"
                className="rounded-full w-24 h-24 mb-6 object-cover"
              />

              {/* Deskripsi */}
              <p className="text-gray-600 leading-relaxed mb-6">
                My inbox is always open. Whether you have a project or just want to say Hi, I
                would love to hear from you. Feel free to contact me and I'll get back to you.
              </p>

              {/* Ikon Sosial Media */}
              <div className="flex items-center gap-5 text-gray-500">
                <a href="#" className="hover:text-black">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-black">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-black">
                  <Dribbble className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-black">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-black">
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