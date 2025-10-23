'use client';
import { ArrowUpRight } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function SocialLinks() {
  const links = [
    // { name: "LINKEDIN", href: "https://linkedin.com" },
    // { name: "GITHUB", href: "https://github.com" },
    { name: "INSTAGRAM", href: "https://instagram.com/yyon4a" },
    { name: "GMAIL", href: "mailto:jonafirmanmaulana01@gmail.com" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // `once: false` agar animasi berulang
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden"); // Reset animasi saat keluar dari viewport
    }
  }, [isInView, mainControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Jeda antar-animasi anak
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={mainControls}
      className="group flex flex-wrap items-center justify-start gap-x-6 gap-y-4 md:space-x-8"
    >
      {links.map((link, index) => (
        <motion.a
          key={index}
          variants={itemVariants}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/item flex items-center space-x-1 text-sm font-medium text-black dark:text-white transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
        >
          <span>{link.name}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/item:rotate-90" />
        </motion.a>
      ))}
    </motion.div>
  );
}
