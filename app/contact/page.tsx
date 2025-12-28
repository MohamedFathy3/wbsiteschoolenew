'use client';
import { Contact2 } from "@/components/Contact";
import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
import { useLang } from "@/context/LanguageContext";

const ContactUsPage = () => {
  const { lang } = useLang();

  return (
    <EdunaLayout>
               <PageBanner pageTitleEn="Contact With Us"
                pageTitleAr="اتصل بنا"
                
                />

      
      <Contact2 />
      
      {/* Call to Action */}
    </EdunaLayout>
  );
};

export default ContactUsPage;