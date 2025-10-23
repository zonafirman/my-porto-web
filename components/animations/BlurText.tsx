'use client';

import { motion, Transition, Easing, useInView } from 'framer-motion';
import { useRef, useMemo, FC, ElementType, ReactNode, Children } from 'react';

type BlurTextOwnProps<T extends ElementType = 'p'> = {
  as?: T;
  children?: ReactNode;
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

type BlurTextProps<T extends ElementType = 'p'> = BlurTextOwnProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof BlurTextOwnProps<T>>;

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = <T extends ElementType = 'p'>({
  as: Component = 'p',
  children,
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = 'easeOut',
  onAnimationComplete,
  stepDuration = 0.35,
  ...rest
}: BlurTextProps<T>) => {
  const textToAnimate = useMemo(() => {
    if (children) {
      return Children.toArray(children).reduce((acc: string, child) => {
        if (typeof child === 'string') {
          return acc + child;
        }
        if (typeof child === 'object' && child !== null && 'props' in child && child.props.children) {
          return acc + (child.props.children || '');
        }
        return acc;
      }, '');
    }
    return text;
  }, [children, text]);

  const elements = animateBy === 'words' ? textToAnimate.split(' ') : textToAnimate.split('');
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  const spanTransition: Transition = {
    duration: totalDuration,
    times,
    ease: easing
  };

  const renderContent = () => {
    if (children) {
      // Jika ada children, kita render apa adanya. Animasinya akan ditangani oleh parent.
      return children;
    }

    // Fallback ke perilaku lama jika hanya prop `text` yang diberikan
    return elements.map((segment, index) => (
      <motion.span
        key={index}
        initial={fromSnapshot}
        animate={isInView ? buildKeyframes(fromSnapshot, toSnapshots) : fromSnapshot}
        transition={{ ...spanTransition, delay: (index * delay) / 1000 }}
        onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
        className="inline-block"
      >
        {segment === ' ' ? '\u00A0' : segment}
        {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
      </motion.span>
    ));
  };

  return (
    <Component ref={ref} className={`blur-text ${className}`} {...rest}>
      <motion.span initial={fromSnapshot} animate={isInView ? buildKeyframes(fromSnapshot, toSnapshots) : fromSnapshot} transition={spanTransition} onAnimationComplete={onAnimationComplete} className="inline-block">
        {renderContent()}
      </motion.span>
    </Component>
  );
};

export default BlurText;