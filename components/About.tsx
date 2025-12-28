'use client';

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import Counter from "./Counter";

export const About1 = () => {
  const { lang } = useLang();

  const features = [
    { en: 'Expert Trainers', ar: 'ملعمون خبراء' },
    { en: 'Online Remote Learning', ar: '    كل ما يحتاجه المعلم ' },
    { en: 'Easy to Follow Curriculum', ar: '  دروس احترافيه ' },
  ];

  return (
    <section 
      className="ed-about section-gap position-relative"
      dir={lang === 'ar' ? 'rtl' : 'ltr'} // إضافة dir هنا
    >
      <div className="container ed-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            {/* About Images */}
            <div className="ed-about__images">
              <div className="ed-about__main-img">
                <img
                  width={482}
                  height={486}
                  sizes="100vw"
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    maxWidth: "482px",
                    borderRadius: "12px"
                  }}
                       src="/about-img.webp"  
                  alt="about-img"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://eduna-ts.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fabout%2Fabout-1%2Fabout-img.png&w=1920&q=75";
                  }}
                />
              </div>
              <div className="counter-card updown-ani">
                <div className="counter-card__icon">
                  <i className="fi fi-rr-graduation-cap" />
                </div>
                <div className="counter-card__info">
                  <h4>
                    <span className="counter">
                      <Counter end={9394} />
                    </span>
                    +
                  </h4>
                  <p>{lang === 'ar' ? 'متعلمون مسجلون' : 'Enrolled Learners'}</p>
                </div>
              </div>
              <div className="ed-about__shapes">
                <Image
                  width={79}
                  height={49}
                  className="ed-about__shape-1"
                  src="/assets/images/about/about-1/shape-1.svg"
                  alt="shape-1"
                />
                <Image
                  width={135}
                  height={134}
                  className="ed-about__shape-2"
                  src="/assets/images/about/about-1/shape-2.svg"
                  alt="shape-2"
                />
                <Image
                  width={83}
                  height={74}
                  className="ed-about__shape-3 rotate-ani"
                  src="/assets/images/about/about-1/shape-3.svg"
                  alt="shape-3"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-12 order-class">
            {/* About Content */}
            <div className="ed-about__content">
              <div className="ed-section-head" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <span 
                  className="ed-section-head__sm-title"
                  style={{ 
                    display: 'block',
                    marginBottom: '10px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#3b82f6'
                  }}
                > 
                  {lang === 'ar' ? 'مرحبًا بك في سوق المعلمين' : 'WELCOME TO TEACHERS MARKET'}
                </span>
                
                <h3 
                  className="ed-section-head__title"
                  style={{
                    fontSize: '2.2rem',
                    fontWeight: '700',
                    lineHeight: '1.3',
                    marginBottom: '20px',
                    color: '#1f2937',
                    textAlign: lang === 'ar' ? 'right' : 'left'
                  }}
                >
                  {lang === 'ar' 
                    ? 'منصة لبيع وشراء المحتوى التعليمي بين المعلمين'
                    : 'A Platform for Buying & Selling Educational Content Among Teachers'}
                </h3>
                
                <p 
                  className="ed-section-head__text"
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: '#4b5563',
                    marginBottom: '30px',
                    textAlign: lang === 'ar' ? 'right' : 'left'
                  }}
                >
                  {lang === 'ar' 
                    ? 'منصة متكاملة تمكن المعلمين من تبادل المحتوى التعليمي والملفات التعليمية بكل سهولة وأمان. نوفر بيئة مثالية للتعاون وتبادل الخبرات بين المعلمين   .' 
: 'A complete platform that allows teachers to share educational content and resources easily and securely, creating a collaborative space for teachers.'
                    }
                </p>
              </div>
              
              <div className="ed-about__feature">
                <ul 
                  className="ed-about__features-list"
                  style={{
                    listStyle: 'none',
                    padding: '0',
                    margin: '0'
                  }}
                >
                  {features.map((feature, index) => (
                    <li 
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '15px',
                        fontSize: '16px',
                        color: '#374151',
                        padding: lang === 'ar' ? '0 0 0 15px' : '0 15px 0 0',
                        textAlign: lang === 'ar' ? 'right' : 'left'
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>
                        <Image
                          width={20}
                          height={20}
                          src="/assets/images/icons/icon-check-blue.svg"
                          alt="check-icon"
                          style={{
                            filter: lang === 'ar' ? 'none' : 'none'
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: '500' }}>
                        {lang === 'ar' ? feature.ar : feature.en}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Add Call to Action Button */}
              <div className="mt-4" style={{ marginTop: '30px' }}>
                <Link 
                  href={lang === 'ar' ? '/courses' : '/courses'}
                  className="btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {lang === 'ar' ? 'استكشف الدروس' : 'Explore lessons'}
                  <i className={`fi fi-rr-arrow-small-right ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Image
        width={133}
        height={154}
        className="ed-about__shape-4"
        src="/assets/images/abstracts/abstract-element-regular.svg"
        alt="shape-4"
        style={{
          position: 'absolute',
          bottom: '50px',
          [lang === 'ar' ? 'left' : 'right']: '50px',
          opacity: '0.1',
          zIndex: '-1'
        }}
      />

      {/* Add CSS for Arabic Support */}
      <style jsx>{`
        .ed-about__content {
          direction: ${lang === 'ar' ? 'rtl' : 'ltr'};
        }
        
        .ed-section-head__title {
          font-family: ${lang === 'ar' ? 
            '"Noto Sans Arabic", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif' : 
            'inherit'};
          letter-spacing: ${lang === 'ar' ? 'normal' : '-0.025em'};
        }
        
        .ed-section-head__text {
          font-family: ${lang === 'ar' ? 
            '"Noto Sans Arabic", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif' : 
            'inherit'};
          text-align: justify;
          text-justify: inter-word;
        }
        
        .ed-about__features-list li {
          font-family: ${lang === 'ar' ? 
            '"Noto Sans Arabic", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif' : 
            'inherit'};
        }
        
        /* Fix for Arabic text breaking */
        .ed-section-head__title,
        .ed-section-head__text,
        .ed-about__features-list li {
          word-break: keep-all;
          overflow-wrap: break-word;
          hyphens: ${lang === 'ar' ? 'auto' : 'none'};
          text-align: ${lang === 'ar' ? 'right' : 'left'};
        }
        
        .rotate-180 {
          transform: rotate(180deg);
        }
        
        @media (max-width: 768px) {
          .ed-section-head__title {
            font-size: 1.8rem;
          }
          
          .ed-section-head__text {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};