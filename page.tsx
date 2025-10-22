import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import ScrollFloat from '@/components/animations/ScrollFloat';
import AboutSection from '@/components/AboutSection';
import AccordionSection from '@/components/AccordionSection';
import TestimonialSection from '@/components/TestimonialSection';

const AboutPage = () => {
  return (
    <main className="bg-white dark:bg-black">
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center items-center gap-2">
              <Sparkles className="text-blue-500 h-6 w-6" />
              <p className="font-semibold tracking-wider bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                ABOUT ME
              </p>
            </div>
            <ScrollFloat
              containerClassName="mt-4"
              textClassName="text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-black dark:text-white"
            >
              A little more about me
            </ScrollFloat>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Here’s my story, my skills, and what people I've worked with have to say.
            </p>
          </div>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="aspect-[16/9] relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                    src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=2070&auto=format&fit=crop"
                    alt="Zona Firman working"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <AccordionSection />
      <TestimonialSection />

    </main>
  );
};

export default AboutPage;
