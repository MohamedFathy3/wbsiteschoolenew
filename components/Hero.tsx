'use client';

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export const Hero1 = () => {
  const { lang } = useLang();
  const isAr = lang === 'ar';

  return (
    <div
      className="section-bg hero-bg background-image"
      style={{
        backgroundImage: 'url("/assets/images/hero/home-1/hero-bg.png")',
      }}
    >
      <section className="ed-hero">
        <div className="container ed-container-expand">
          <div className={`row align-items-center ${isAr ? 'flex-row-reverse' : ''}`}>
    
            {/* المحتوى */}
            <div className="col-lg-6 col-12">
              <div
                className="ed-hero__content"
                style={{
                  textAlign: isAr ? 'right' : 'left',
                  direction: isAr ? 'rtl' : 'ltr',
                }}
              >
                <h1>
                  {isAr ? (
                    <>
 كل الملفات والدروس بين يديك

                    </>
                  ) : (
                    <>
                      All your <span style={{color:"#3b82f6"}}>lessons</span> and learning resources
                    </>
                  )}
                </h1>

                <p>
                  {isAr
                    ? 'كل ما تحتاجه من دروس وملفات تعليمية في مكان واحد.'
                    : 'Everything you need: lessons, and learning resources in one place.'}
                </p>

                <Link href="/courses" className="ed-btn">
                  {isAr ? 'استعرض الدروس' : 'Browse lesson'}
                  <i
                    className={`fi fi-rr-arrow-small-right ${
                      isAr ? 'rotate-180' : ''
                    }`}
                  />
                </Link>
              </div>
            </div>

            {/* الصورة */}
       <div className="col-lg-6 col-12">
        <Image
          src="/man3.png"
          alt={isAr ? 'طلاب يتعلمون' : 'Students learning'}
          width={500}
          height={800}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

          </div>
        </div>
      </section>
    </div>
  );
};
