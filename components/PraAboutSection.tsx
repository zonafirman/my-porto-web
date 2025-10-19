import localFont from 'next/font/local';
import { Sparkles } from 'lucide-react';
import LogoLoop from '@/components/animations/LogoLoop';

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
  variable: '--font-clash-display',
});

const texts = [
  'Community',
  'Website',
  'Design',
  'Graphic',
  'Frontend Development',
  'UI/UX',
];

const loopItems = texts.flatMap((text, index) => [
  { node: <span className="whitespace-nowrap">{text}</span> },
  ...(index < texts.length - 1 ? [{ node: <Sparkles className="h-10 w-10" /> }] : [])
]);

const LogoSection = () => {
  return (
    <section className="pt-0 pb-8 sm:pb-12 lg:pb-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`border-y border-gray-200 dark:border-white/10 py-8 text-6xl text-gray-400 ${clashDisplay.className} overflow-y-hidden`}>
          <LogoLoop
            logos={loopItems}
            speed={50}
            direction="left"
            logoHeight={60}
            gap={80}
          />
        </div>
      </div>
    </section>
  );
};

export default LogoSection;