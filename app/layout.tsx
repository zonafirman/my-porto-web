import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import localFont from 'next/font/local';
import { Bebas_Neue, Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import GradualBlur from "@/components/animations/GradualBlur";
import { MobileNav } from "@/components/MobileNav";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const clashDisplay = localFont({
  src: '../public/fonts/ClashDisplay-Medium.woff2',
  display: 'swap',
  weight: '500',
  variable: '--font-clash-display',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zona Firman M.",
  description: "I am a Web Developer",
  icons: {
    icon: "/logo-dark.png",
    shortcut: "/logo-dark.png"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${bebasNeue.variable} antialiased`}
      >
        <Navbar />
        {children}
        <MobileNav />
        <Analytics />
        <SpeedInsights />
        <div className="hidden md:block">
          <GradualBlur preset="page-footer" />
        </div>
      </body>
    </html>
  );
}
