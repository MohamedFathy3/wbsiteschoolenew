"use client";
import { sliderProps } from "@/utilities/sliderProps";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Counter from "./Counter";
import { useLang } from "@/context/LanguageContext";

export const Testimonial1 = () => {
  const { lang } = useLang();

  const testimonialsData = [
    {
      id: 1,
      name: {
        en: "Ahmed Hassan",
        ar: "أحمد حسن"
      },
      role: {
        en: "Science Teacher",
        ar: "مدرس علوم"
      },
      image: "/assets/images/testimonial/testimonial-1/author-1.png",
      text: {
        en: "Teachers Market has revolutionized how I share educational content. The platform is intuitive and the community of educators is incredibly supportive.",
        ar: "سوق المعلمين أحدث ثورة في كيفية مشاركة المحتوى التعليمي. المنصة سهلة الاستخدام ومجتمع المعلمين داعم بشكل لا يصدق."
      }
    },
    {
      id: 2,
      name: {
        en: "Fatima Ali",
        ar: "فاطمة علي"
      },
      role: {
        en: "Math Teacher",
        ar: "مدرسة رياضيات"
      },
      image: "/assets/images/testimonial/testimonial-1/author-2.png",
      text: {
        en: "I've found amazing teaching resources on Teachers Market that saved me hours of preparation time. Highly recommended for all educators!",
        ar: "لقد وجدت موارد تدريس رائعة على سوق المعلمين وفرت لي ساعات من وقت التحضير. موصى به بشدة لجميع المعلمين!"
      }
    },
    {
      id: 3,
      name: {
        en: "Omar Khalid",
        ar: "عمر خالد"
      },
      role: {
        en: "English Teacher",
        ar: "مدرس لغة إنجليزية"
      },
      image: "/assets/images/testimonial/testimonial-1/author-3.png",
      text: {
        en: "The quality of educational content on Teachers Market is outstanding. It's become my go-to platform for teaching materials.",
        ar: "جودة المحتوى التعليمي على سوق المعلمين استثنائية. أصبحت المنصة المفضلة لدي للحصول على المواد التعليمية."
      }
    }
  ];

  const getText = (obj: { en: string; ar: string }) => {
    return obj[lang as 'en' | 'ar'];
  };

  return (
    <section 
      className="ed-testimonial section-bg-color-1 section-gap"
      style={{ 
        direction: lang === 'ar' ? 'rtl' : 'ltr',
        fontFamily: lang === 'ar' ? '"Noto Sans Arabic", sans-serif' : 'inherit'
      }}
    >
      <div className="container ed-container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12 order-2 order-lg-1">
            {/* Testimonial Content */}
            <div className="ed-testimonial__content">
              <div className="ed-section-head" style={{
                textAlign: lang === 'ar' ? 'right' : 'left'
              }}>
                <span className="ed-section-head__sm-title" style={{
                  display: 'block',
                  color: '#667eea',
                  fontSize: '14px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '10px'
                }}>
                  {lang === 'ar' ? 'آراء المعلمين' : 'TEACHER TESTIMONIALS'}
                </span>
                {/* إصلاح مشكلة ed-split-text */}
                <h3 className="ed-section-head__title" style={{
                  fontSize: '2.2rem',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  lineHeight: '1.3',
                  marginBottom: '40px',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  fontFamily: lang === 'ar' ? '"Noto Sans Arabic", sans-serif' : 'inherit',
                  wordBreak: 'keep-all',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: lang === 'ar' ? 'auto' : 'none',
                  letterSpacing: lang === 'ar' ? 'normal' : '-0.025em'
                }}>
                  {lang === 'ar' 
                    ? 'ماذا يقول المعلمون عن منصتنا التعليمية' 
                    : 'What Teachers Say About Our Educational Platform'}
                </h3>
              </div>
              
              {/* Testimonials Slider */}
              <div className="testimonials-slider">
                <Swiper 
                  {...sliderProps.testimonial} 
                  dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  style={{
                    direction: lang === 'ar' ? 'rtl' : 'ltr'
                  }}
                >
                  {testimonialsData.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <div 
                        className="testimonial-card"
                        style={{
                          background: 'white',
                          borderRadius: '20px',
                          padding: '30px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                          height: '100%',
                          textAlign: lang === 'ar' ? 'right' : 'left'
                        }}
                      >
                        {/* Ratings */}
                        <div className="ratings mb-3">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i}
                              className="icofont-star" 
                              style={{ 
                                color: '#fbbf24',
                                fontSize: '18px',
                                margin: lang === 'ar' ? '0 0 0 4px' : '0 4px 0 0'
                              }}
                            />
                          ))}
                        </div>
                        
                        {/* Testimonial Text */}
                        <p 
                          className="testimonial-text mb-4"
                          style={{
                            fontSize: '17px',
                            lineHeight: '1.7',
                            color: '#4b5563',
                            fontStyle: 'italic',
                            marginBottom: '25px',
                            fontFamily: lang === 'ar' ? '"Noto Sans Arabic", sans-serif' : 'inherit',
                            wordBreak: 'keep-all',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word'
                          }}
                        >
                          {getText(testimonial.text)}
                        </p>
                        
                        {/* Author Info */}
                        <div className="author-info" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '15px'
                        }}>
                          <div className="author-img" style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            flexShrink: '0'
                          }}>
                            <Image
                              src={testimonial.image}
                              alt={getText(testimonial.name)}
                              width={60}
                              height={60}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://ui-avatars.com/api/?name=" + 
                                  encodeURIComponent(getText(testimonial.name)) + 
                                  "&background=667eea&color=fff";
                              }}
                            />
                          </div>
                          <div className="author-details" style={{
                            flex: '1',
                            textAlign: lang === 'ar' ? 'right' : 'left'
                          }}>
                            <h5 style={{
                              fontSize: '18px',
                              fontWeight: '600',
                              color: '#1a1a1a',
                              margin: '0 0 4px 0'
                            }}>
                              {getText(testimonial.name)}
                            </h5>
                            <p style={{
                              fontSize: '14px',
                              color: '#6b7280',
                              margin: '0'
                            }}>
                              {getText(testimonial.role)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 col-12 order-1 order-lg-2 mb-4 mb-lg-0">
            {/* Testimonial Images */}
            <div className="ed-testimonial__images position-relative">
              <div className="testimonial-main-img" style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <img
                                           src='/testimonial-img.webp'

                  alt={lang === 'ar' ? 'صورة آراء المعلمين' : 'Teacher testimonial image'}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>
              
              {/* Counter Card */}
              <div className="counter-card" style={{
                position: 'absolute',
                bottom: '30px',
                left: lang === 'ar' ? 'auto' : '30px',
                right: lang === 'ar' ? '30px' : 'auto',
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                maxWidth: '250px'
              }}>
                <div className="counter-icon" style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px'
                }}>
                  <i className="fi fi-rr-graduation-cap" />
                </div>
                <div className="counter-info" style={{
                  textAlign: lang === 'ar' ? 'right' : 'left'
                }}>
                  <h4 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#1a1a1a',
                    margin: '0 0 4px 0',
                    lineHeight: '1'
                  }}>
                    <Counter end={3500} />+
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0',
                    fontWeight: '500'
                  }}>
                    {lang === 'ar' ? 'معلم مشارك' : 'Teachers Joined'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .testimonial-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.12) !important;
        }
        
        /* Swiper Navigation */
        :global(.swiper-button-prev),
        :global(.swiper-button-next) {
          color: #667eea;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        :global(.swiper-button-prev:after),
        :global(.swiper-button-next:after) {
          font-size: 16px;
        }
        
        /* Fix Arabic text rendering */
        [dir="rtl"] {
          text-align: right;
          font-feature-settings: "calt" 0;
        }
        
        [dir="rtl"] .testimonial-text {
          text-align: right;
          font-size: 18px;
          line-height: 1.8;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
          .ed-section-head__title {
            font-size: 1.8rem !important;
          }
          
          .testimonial-text {
            font-size: 16px !important;
          }
          
          .counter-card {
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            margin: 20px auto 0;
          }
        }
      `}</style>
    </section>
  );
};