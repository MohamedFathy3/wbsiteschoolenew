'use client';
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export const CallToAction1 = () => {
  const { lang } = useLang();

  return (
    <section className="ed-call-action position-relative">
      <div className="container ed-container">
        <div className="ed-call-action__inner position-relative">
          <div className="ed-call-action__shapes">
            <Image
              width={155}
              height={155}
              sizes="100vw"
              style={{ width: "155px", height: "155px" }}
              className="ed-call-action__shape-1 rotate-ani"
              src="/assets/images/call-action/call-action-1/shape-1.svg"
              alt="shape-1"
            />
            <Image
              width={44}
              height={37}
              sizes="100vw"
              style={{ width: "44px", height: "37px" }}
              className="ed-call-action__shape-2"
              src="/assets/images/call-action/call-action-1/shape-2.svg"
              alt="shape-2"
            />
            <Image
              width={108}
              height={67}
              sizes="100vw"
              style={{ width: "108px", height: "67px" }}
              className="ed-call-action__shape-3 updown-ani"
              src="/assets/images/call-action/call-action-1/shape-3.svg"
              alt="shape-3"
            />
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="ed-call-action__img">
                <img
                
                  sizes="100vw"
                  style={{ width: "332px", height: "448px" }}
                  src="https://eduna-ts.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcall-action%2Fcall-action-1%2Fcall-action-img.png&w=1920&q=75"
                  alt="call-action-img"
                />
              </div>
            </div>
            <div className="col-lg-6 col-12 order-class">
              <div className="ed-call-action__content">
                <div className="ed-section-head">
                  <span className="ed-section-head__sm-title">
                    {lang === 'ar' ? 'ابدأ الآن' : 'GET STARTED NOW'}
                  </span>
                  <h3 className="ed-section-head__title">
                    {lang === 'ar' 
                      ? 'كورساتك الإلكترونية بأسعار معقولة' 
                      : 'Affordable Your Online Courses'}
                    <br />
                    {lang === 'ar' 
                      ? 'وفرص تعليمية رائعة' 
                      : '& Learning Opportunities'}
                  </h3>
                  <p className="ed-section-head__text">
                    {lang === 'ar' 
                      ? 'انطلق في رحلة التعلم مع كورساتنا المميزة المصممة خصيصًا لتلبية احتياجاتك التعليمية وتطوير مهاراتك بأفضل الأسعار.'
                      : 'Start your learning journey with our premium courses designed specifically to meet your educational needs and develop your skills at the best prices.'}
                  </p>
                </div>
                <div className="ed-call-action__content-btn">
                  <Link href="/course-1" className="ed-btn">
                    {lang === 'ar' ? 'ابدأ التعلم اليوم' : 'Start Learning Today'}
                    <i className="fi fi-rr-arrow-small-right" style={{
                      transform: lang === 'ar' ? 'scaleX(-1)' : 'none',
                      marginRight: lang === 'ar' ? '8px' : '0',
                      marginLeft: lang === 'ar' ? '0' : '8px'
                    }} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};