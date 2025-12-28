'use client';

import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
import { useLang } from "@/context/LanguageContext";

const LoadingState = () => {
  const { lang } = useLang();
  
  return (
    <EdunaLayout>
      <PageBanner pageTitleEn={lang === 'ar' ? 'تفاصيل الدورة' : 'Course Details'} />
      <section className="section-gap">
        <div className="container text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">
              {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </span>
          </div>
          <p className="mt-3">
            {lang === 'ar' ? 'جاري تحميل تفاصيل الدورة...' : 'Loading course details...'}
          </p>
        </div>
      </section>
    </EdunaLayout>
  );
};

export default LoadingState;