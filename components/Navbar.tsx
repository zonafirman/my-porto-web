'use client'
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { usePathname } from 'next/navigation';
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLoader from './PageLoader';

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  isDarkMode?: boolean;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
  initialActiveIndex = 0,
  isDarkMode = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setActiveIndex(initialActiveIndex);
  }, [initialActiveIndex]);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };
  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        // Mengubah warna partikel menjadi gradasi hijau yang lebih halus
        particle.style.setProperty('--color', `radial-gradient(circle at center, hsla(${260 + noise(40)}, 90%, 65%, ${p.color * 1.2}), hsla(${260 + noise(40)}, 90%, 65%, 0) 70%)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {}
        }, t);
      }, 30);
    }
  };
  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const triggerAnimation = (index: number, element: HTMLElement) => {
    if (activeIndex === index || isAnimating) return;
  
    // Sembunyikan teks pada item yang diklik
    const anchor = element.querySelector('a');
    // Sembunyikan semua teks menu lainnya juga
    navRef.current?.querySelectorAll('li a').forEach(a => ((a as HTMLElement).style.opacity = '0'));
    if (anchor) {
      anchor.style.opacity = '0';
    }

    setIsAnimating(true);
    updateEffectPosition(element);
  
    if (filterRef.current) {
      // Clear old particles more safely
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => p.remove());
    }
  
    if (textRef.current) {
      textRef.current.style.opacity = '0'; // Sembunyikan teks efek
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
  
    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  
    const maxAnimationTime = animationTime * 2 + timeVariance;
    setTimeout(() => {
      setActiveIndex(index);
      if (textRef.current) {
        textRef.current.style.opacity = '1'; // Tampilkan kembali teks efek
      }
      // Kembalikan visibilitas semua teks menu setelah animasi selesai
      if (navRef.current) {
        navRef.current.querySelectorAll('li').forEach((li, i) => {
          const a = li.querySelector('a') as HTMLElement;
          if (a) {
            a.style.opacity = i === index ? '0' : '1';
          }
        });
      }
      setIsAnimating(false);
    }, maxAnimationTime / 2); // Mempercepat animasi perpindahan
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const liEl = e.currentTarget.parentElement as HTMLLIElement;
    triggerAnimation(index, liEl);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement as HTMLLIElement;
      if (liEl) {
        triggerAnimation(index, liEl);
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
      // Sembunyikan teks item aktif dan tampilkan yang lain
      navRef.current.querySelectorAll('li').forEach((li, i) => {
        const a = li.querySelector('a') as HTMLElement;
        if (a) {
          a.style.opacity = i === activeIndex ? '0' : '1';
        }
      });
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);
  
  return (
    <>
      {/* This effect is quite difficult to recreate faithfully using Tailwind, so a style tag is a necessary workaround */}
      <style>
        {`
          :root {
            --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .effect.text { 
            color: black; /* Warna teks default */
            color: var(--nav-text-color, black);
            transition: color 0.15s ease; 
          } 
          .effect.text.active {
            color: #6B46C1; /* Warna teks ungu saat aktif */
            color: var(--nav-active-text-color, #6B46C1);
          }
          .effect.filter {
            /* Efek gooey dinonaktifkan untuk memperjelas partikel */
          }
          .effect.filter::before {
            content: "";
            position: absolute;
            inset: -75px;
            z-index: -2;
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            /* background: white; Latar belakang pill dihilangkan */
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle,
          .point {
            display: block;
            opacity: 0;
            width: 20px;
            height: 20px;
            border-radius: 50%; /* Mengubah partikel menjadi lingkaran */
            transform-origin: center;
          }
          .particle {
            --time: 5s;
            position: absolute;
            top: calc(50% - 10px);
            left: calc(50% - 10px);
            animation: particle calc(var(--time)) ease 1 -350ms;
          }
          .point {
            background: var(--color);
            opacity: 1;
            box-shadow: none; /* Menghilangkan shadow agar lebih soft */
            animation: point calc(var(--time)) ease 1 -350ms;
          }
          @keyframes particle {
            0% {
              transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
              opacity: 1;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            70% {
              transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
              opacity: 1;
            }
            100% {
              transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
              opacity: 1;
            }
          }
          @keyframes point {
            0% {
              transform: scale(0);
              opacity: 0;
              animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
            }
            25% {
              transform: scale(calc(var(--scale) * 0.25));
            }
            38% {
              opacity: 1;
            }
            65% {
              transform: scale(var(--scale));
              opacity: 1;
              animation-timing-function: ease;
            }
            85% {
              transform: scale(var(--scale));
              opacity: 1;
            }
            100% {
              transform: scale(0);
              opacity: 0;
            }
          }
          li.active {
            color: #6B46C1; /* Warna teks ungu saat aktif */
            color: var(--nav-active-text-color, #6B46C1);
            text-shadow: none;
            position: relative;
          }
          li.active::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0.75em;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background-color: #6B46C1; /* Warna dot ungu saat aktif */
            background-color: var(--nav-active-text-color, #6B46C1);
            border-radius: 50%;
            opacity: 1;
            transition: opacity 0.3s ease;
          }
          li.active::after {
            opacity: 1;
            transform: scale(1);
          }
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 8px;
            /* background: white; Latar belakang pill dihilangkan */
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          li a {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.3s 0.1s ease, transform 0.3s 0.1s ease, padding 0.3s ease;
          }
          li.active a {
            /* Opacity diatur oleh JS, tapi kita pastikan transisinya cepat saat disembunyikan */
            transition: opacity 0.1s ease, transform 0.3s 0.1s ease, padding 0.3s ease;
            padding-left: 1.75em; /* Padding untuk dot di kiri */
            padding-right: 1.75em; /* Menambahkan padding di kanan */
          }
          li:not(.active) a {
             transition-delay: 0.15s; /* Mempercepat kemunculan teks non-aktif */
          }
        `}
      </style>
      <div className="relative" ref={containerRef}>
        <nav className="flex relative" style={{ transform: 'translate3d(0,0,0.01px)' }}>
          <ul
            ref={navRef}
            role="menubar"
            className="flex gap-4 list-none p-0 px-4 m-0 relative z-[3]"
            style={{
              color: isDarkMode ? 'white' : 'black',
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 100
            }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                role="none"
                className={`rounded-full relative cursor-pointer transition-[color] duration-150 ease ${
                  activeIndex === index ? 'active' : ''
                }`}
              >
                <Link
                  role="menuitem"
                  aria-current={activeIndex === index ? 'page' : undefined}
                  tabIndex={0}
                  href={item.href}
                  onClick={e => handleClick(e, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  className="outline-none py-[0.6em] px-[1em] inline-block text-sm no-underline"
                  style={{ color: 'inherit' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} aria-hidden="true" />
        <span
          className="effect text text-sm"
          ref={textRef}
          aria-hidden="true"
          style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 100 }}
        />
      </div>
    </>
  );
};

const MobileHeaderElements = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-4 left-4 z-50 md:hidden">
      <Link href="/" className="block p-2 rounded-full bg-white/65 dark:bg-black/65 backdrop-blur-xl border border-gray-200/80 dark:border-white/10">
        <Image src={isDarkMode ? "/logo-dark.png" : "/logo-light.svg"} alt="Logo ZM" width={24} height={24} />
      </Link>
    </div>
  );
};

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDarkMode(initialIsDark); // Set initial theme
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navItems: GooeyNavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contacts' },
  ];

  const initialActiveIndex = useMemo(() => {
    const activeIndex = navItems.findIndex(item => item.href === pathname);
    return activeIndex === -1 ? 0 : activeIndex;
  }, [pathname]);

  return (
    <>
      <PageLoader />
      <MobileHeaderElements />
      <header
        className={`fixed md:sticky top-4 right-4 md:top-0 md:right-auto z-50 flex w-auto md:w-full justify-end md:justify-center transition-all duration-500 ease-in-out ${isScrolled ? "md:top-2" : "md:top-0"
          }`}
      >
        <div
          className={`relative flex h-14 items-center justify-between rounded-full border border-transparent bg-transparent transition-all duration-500 ease-in-out md:w-full md:px-6 ${
            isScrolled
              ? "md:max-w-4xl md:border-white/80 dark:md:border-white/10 md:bg-white/65 dark:md:bg-black/65 md:backdrop-blur-xl"
              : "md:max-w-full border-transparent bg-transparent"
          }`}
        >
          {/* Logo di Kiri (Desktop) */}
          <div
            className={`hidden md:flex items-center transition-all duration-500 ease-in-out `}
          >
            <Link
              href="/"
              className={`mr-6 flex items-center space-x-2`}
            >
              <Image src={isDarkMode ? "/logo-dark.png" : "/logo-light.svg"} alt="Logo ZM" width={40} height={40} />
            </Link>
          </div>

          {/* Menu Navigasi di Tengah */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <GooeyNav items={navItems} isDarkMode={isDarkMode} initialActiveIndex={initialActiveIndex} />
          </div>

          {/* Toggle Dark/Light Mode di Kanan */}
          <div className="flex items-center justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full bg-white/65 dark:bg-black/65 backdrop-blur-xl border border-gray-200/80 dark:border-white/10 md:bg-transparent md:dark:bg-transparent md:border-none"
            >
              <Sun className={`h-[1.2rem] w-[1.2rem] text-black dark:text-white transition-all duration-500 ease-in-out ${isDarkMode ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
              <Moon className={`absolute h-[1.2rem] w-[1.2rem] text-black dark:text-white transition-all duration-500 ease-in-out ${isDarkMode ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}