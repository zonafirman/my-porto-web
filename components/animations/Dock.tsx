'use client';

import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions
} from 'framer-motion';
import React, { Children, cloneElement, isValidElement, useEffect, useMemo, useRef, useState } from 'react';

// Hook sederhana untuk deteksi media query, berguna untuk membedakan mobile/desktop
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [query]);
  return matches;
};

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  isMobile?: boolean;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  isMobile?: boolean;
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  isMobile
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);
  const opacity = useSpring(useTransform(size, [baseItemSize, magnification], [0.5, 1]), spring);

  // Untuk menampilkan label saat item membesar di mobile
  const isHovered = useMotionValue(0);
  useEffect(() => {
    const unsubscribe = size.on('change', newSize => {
      if (isMobile) {
        isHovered.set(newSize > baseItemSize + 10 ? 1 : 0);
      }
    });
    return () => unsubscribe();
  }, [size, isMobile, baseItemSize, isHovered]);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      // Hanya gunakan onHover untuk non-mobile
      onHoverStart={() => !isMobile && isHovered.set(1)}
      onHoverEnd={() => !isMobile && isHovered.set(0)}
      onFocus={() => !isMobile && isHovered.set(1)}
      onBlur={() => !isMobile && isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex cursor-pointer items-center justify-center ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-label={typeof children === 'string' ? children : 'Dock item'}
    >
      {Children.map(children, child =>
        isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -12 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} absolute -top-6 left-1/2 w-fit whitespace-pre rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-0.5 text-xs text-gray-700 dark:text-gray-300 shadow-sm`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center text-gray-700 dark:text-gray-300 ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <motion.div style={{ height: panelHeight, scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        onTouchStart={e => {
          isHovered.set(1);
          mouseX.set(e.touches[0].pageX);
        }}
        onTouchMove={e => {
          mouseX.set(e.touches[0].pageX);
        }}
        onTouchEnd={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${className} absolute bottom-0 inset-x-0 flex w-full items-end justify-center gap-4 pb-2 px-4`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            isMobile={isMobile}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
