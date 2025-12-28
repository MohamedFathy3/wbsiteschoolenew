// components/PageBanner.tsx (تأكد من المسار الصحيح لملفات السياق والترجمات)

"use client";

import Link from "next/link";
import Image from "next/image"; 
import { useLang } from "@/context/LanguageContext"; // ✅ تأكد من المسار الصحيح
import { translations } from "@/locales/translations"; // ✅ تأكد من المسار الصحيح

interface PageBannerProps {
  pageTitleEn?: string; 
  pageTitleAr?: string; 
  pageNameKey?: keyof typeof translations.en;
  bgImageUrl?: string; 
}

const PageBanner = ({
  pageTitleEn,
  pageTitleAr,
  pageNameKey,
  bgImageUrl,
}: PageBannerProps) => {
  const { lang, t } = useLang();

  let title = "";
  if (lang === "ar") {
    title = pageTitleAr || (pageNameKey ? t[pageNameKey] : "");
  } else {
    title = pageTitleEn || (pageNameKey ? t[pageNameKey] : "");
  }

  const homeTranslation = t.home;

  return (
    // العنصر الأب يجب أن يكون موقعه نسبي (position: relative) لكي تعمل خاصية fill
    <div className="section-bg hero-bg" style={{ position: 'relative', overflow: 'hidden', minHeight: '300px',background:"#faf9f6" }}> 
      
      {bgImageUrl && (
        <img
          src={bgImageUrl}
          alt="Banner Background"
          style={{ objectFit: 'cover' }} // استخدام style بدلاً من objectFit="cover"
          className="background-image" 
        />
      )}
      
      {/* {bgImageUrl && (
        // طبقة تظليل
        <div 
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }} 
        />
      )} */}

      {/* Start Bredcrumbs Area - المحتوى الفعلي فوق الصورة */}
      <section className="ed-breadcrumbs" style={{ position: 'relative', zIndex: 10 }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="ed-breadcrumbs__content">
                <h3 className="ed-breadcrumbs__title">
                  {title || "Default Page Title"} 
                </h3>
                <ul className="ed-breadcrumbs__menu">
                  <li className="active">
                    <Link href="/">{homeTranslation}</Link>
                  </li>
                  <li>/</li>
                  <li>{title || "Default Page"}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Bredcrumbs Area */}
    </div>
  );
};

export default PageBanner;
