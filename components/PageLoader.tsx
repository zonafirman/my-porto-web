'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const PageLoader = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Tidak perlu melakukan apa-apa saat komponen pertama kali dimuat
    // Cukup atur state awal
    return () => {
      // Cleanup jika diperlukan
    };
  }, []);

  useEffect(() => {
    // Setiap kali pathname berubah, kita anggap pemuatan selesai
    // dan mulai proses untuk menyembunyikan bar
    if (loading) {
      // Tunggu sebentar agar bar terlihat penuh sebelum menghilang
      setTimeout(() => {
        setLoading(false);
      }, 300); // durasi ini bisa disesuaikan
    }
  }, [pathname]);

  // Menggunakan event listener untuk mendeteksi klik pada link Next.js
  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');

      // Hanya aktifkan untuk navigasi internal Next.js
      if (anchor && anchor.href && anchor.target !== '_blank' && new URL(anchor.href).origin === window.location.origin) {
        if (new URL(anchor.href).pathname !== pathname) {
          setVisible(true);
          setLoading(true);
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [pathname]);

  return (
    <div className={`fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 z-[9999] transition-all duration-500 ease-out ${loading ? 'w-full' : 'w-0'} ${visible && !loading ? 'opacity-0' : 'opacity-100'}`} />
  );
};

export default PageLoader;

