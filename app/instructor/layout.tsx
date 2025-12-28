import type { Metadata } from "next";
import "@plugin_css/animate.min.css";
import "@plugin_css/bootstrap.min.css";
import "@plugin_css/icofont.css";
import "@plugin_css/maginific-popup.min.css";
import "@plugin_css/nice-select.min.css";
import "@plugin_css/swiper-bundle.min.css";
import "@plugin_css/uicons.css";
import "@css/style.css"
import "@/app/globals.css";
import Preloader from "@/components/Preloader";
import { Poppins } from "next/font/google";
import { CurriculumProvider } from '@/context/CurriculumContext';
import { LanguageProvider } from "@/context/LanguageContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--ed-font-family",
});

export const metadata: Metadata = {
  title: "Teacher Market - منصة سوق المعلمين",
  description: "Teacher Market: منصة لتعليم وتبادل الدورات التعليمية عبر الإنترنت",
  icons: {
    icon: "/favicon.svg"  // لازم تحط Favicon في public folder
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <LanguageProvider>  
             <CurriculumProvider><Preloader />
        {children}</CurriculumProvider>
        
     </LanguageProvider>
   
  );
}
