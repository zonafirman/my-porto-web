import Footer from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav"; 
import HeroSectionAbout from "@/components/HeroSectionAbout";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import ExperienceSection from "@/components/ExperienceSection";
import WorkStepSection from "@/components/WorkStepSection";
import AwwardSection from "@/components/AwwardSection";
// import CommunitySections from "@/components/CommunitySections";

const logos: LogoItem[] = [
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', alt: 'Next.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind CSS' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', alt: 'Figma' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', alt: 'VS Code' },
  { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', alt: 'Git' },
];

export default function Home() {
  return (
    <main>
      <HeroSectionAbout />
      <div className="py-6 md:py-8 border-y border-gray-200 dark:border-white/10">
        <LogoLoop logos={logos} speed={40} gap={24} logoHeight={20} />
      </div>
      <ExperienceSection />
      <WorkStepSection />
      <AwwardSection />
      {/* <CommunitySections /> */}
      <Footer />
      <MobileNav />
    </main>
  );
}
