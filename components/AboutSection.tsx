'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import localFont from 'next/font/local';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
  variable: '--font-clash-display',
});

gsap.registerPlugin(SplitText, ScrambleTextPlugin, ScrollTrigger);

// Hook untuk mendeteksi perangkat mobile
const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = React.useState(false);
  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth <= breakpoint);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, [breakpoint]);
  return isMobile;
};

const AboutSection = () => {
  const isMobile = useIsMobile();
  const aboutText =
    'With over five years of dedicated experience, I specialize in crafting high-performance, visually stunning web applications. My expertise lies in transforming complex challenges into elegant, user-centric digital solutions, driving innovation and delivering exceptional results.';

  const rootRef = useRef<HTMLDivElement | null>(null);
  const splitRef = useRef<SplitText | null>(null);
  const isDarkModeRef = useRef(false);

  const handleMove = useCallback((e: PointerEvent) => {
    if (!splitRef.current || isMobile) return; // Nonaktifkan di mobile

    const radius = 100;
    const duration = 1.2;
    const speed = 0.5;
    const scrambleChars = '.:';

    splitRef.current.chars.forEach(el => {
      const c = el as HTMLElement;
      const { left, top, width, height } = c.getBoundingClientRect();
      const dx = e.clientX - (left + width / 2);
      const dy = e.clientY - (top + height / 2);
      const dist = Math.hypot(dx, dy);

      if (dist < radius && !gsap.isTweening(c)) {
        const originalContent = c.dataset.content || '';

        gsap.to(c, {
          duration: duration,
          scrambleText: {
            text: originalContent,
            chars: scrambleChars,
            speed: speed,
            revealDelay: duration / 2,
            newClass: "text-purple-600"
          },
          onComplete: () => {
            gsap.set(c, { scrambleText: { text: originalContent, chars: " " }, className: "-=text-purple-600" });
          },
          ease: 'power3.out'
        });
      }
    });
  }, [isMobile]);

  useEffect(() => {
    const checkDarkMode = () => {
      isDarkModeRef.current = document.documentElement.classList.contains('dark');
    };

    checkDarkMode(); // Initial check

    const ctx = gsap.context(() => {
      if (!rootRef.current) return;

      const p = rootRef.current.querySelector('p');
      if (!p) return;

      const split = SplitText.create(p, {
        type: 'chars',
        charsClass: 'inline-block'
      });
      splitRef.current = split;

      const updateColors = () => {
        checkDarkMode();
        const initialColor = isDarkModeRef.current ? '#000000' : '#9ca3af';
        const targetColor = isDarkModeRef.current ? '#FFFFFF' : '#000000';

        split.chars.forEach((char) => {
          const charEl = char as HTMLElement;
          gsap.set(char, {
            attr: { 'data-content': char.innerHTML },
            color: initialColor,
            width: charEl.getBoundingClientRect().width,
          });
        });

        gsap.to(split.chars, {
          color: targetColor,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
            once: true,
          },
        });
      };

      updateColors();

      const el = rootRef.current;
      if (!isMobile) {
        el.addEventListener('pointermove', handleMove);
      }

      // Observe theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            updateColors();
          }
        });
      });
      observer.observe(document.documentElement, { attributes: true });

      return () => {
        if (!isMobile) {
          el.removeEventListener('pointermove', handleMove);
        }
        observer.disconnect();
        splitRef.current?.revert();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }, rootRef);

    return () => ctx.revert();
  }, [handleMove, isMobile]);

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto flex flex-col items-center justify-center px-6 lg:px-8">
        <div className="mb-2 flex items-center gap-x-3 rounded-lg bg-transparent px-4 py-2 font-medium">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <h2 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-lg uppercase tracking-wider text-transparent">
            About Me
          </h2>
        </div>
        <div
          ref={rootRef}
          className={`!m-0 mt-4 max-w-4xl text-center text-[clamp(14px,4vw,32px)] text-black dark:text-white ${clashDisplay.className}`}
        >
          <p>{aboutText}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;