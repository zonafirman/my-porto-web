import HeroSection from "@/components/HeroSection";
import PraAboutSection from "@/components/PraAboutSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import AccordionSection from "@/components/AccordionSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <PraAboutSection />
      <AboutSection />
      <WorkSection />
      <AccordionSection />
      <TestimonialSection />
      <Footer />
    </main>
  );
}
