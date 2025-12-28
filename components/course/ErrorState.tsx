'use client';

import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
import { useLang } from "@/context/LanguageContext";

interface ErrorStateProps {
  error?: string | null;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const { lang } = useLang();
  
  return (
    <EdunaLayout>
      <PageBanner pageTitleEn={lang === 'ar' ? 'تفاصيل الدورة' : 'Course Details'} pageTitleAr='تفاصيل الكورس' />
      <section className="section-gap">
        <div className="container">
          <div className="alert alert-danger text-center">
            {error || (lang === 'ar' ? 'الدورة غير موجودة' : 'Course not found')}
          </div>
        </div>
      </section>
    </EdunaLayout>
  );
};

export default ErrorState;