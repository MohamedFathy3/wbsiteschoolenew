'use client';

import Image from "next/image";
import Counter from "./Counter";
import { useLang } from "@/context/LanguageContext";

export const WhyChooseArea1 = () => {
  const { lang } = useLang();
  const isArabic = lang === 'ar';

 const whyChooseEn = [
  {
    id: 1,
    name: "Easy File Sharing",
    icon: "/assets/images/why-choose/why-choose-1/icon-1.svg",
    bg: "bg-1",
    description:
      "Easily share lesson plans, worksheets, and educational materials with other teachers through a secure and well-organized platform.",
  },
  {
    id: 2,
    name: "Collaborative Learning Community",
    icon: "/assets/images/why-choose/why-choose-1/icon-2.svg",
    bg: "bg-2",
    description:
      "Connect with teachers and exchange ideas and teaching experiences to benefit from others’ knowledge and enhance the quality of education.",
  },
];


  const whyChooseAr = [
    {
      id: 1,
      name: "مشاركة الملفات بسهولة",
      icon: "/assets/images/why-choose/why-choose-1/icon-1.svg",
      bg: "bg-1",
      description:
        "شارك خطط الدروس وملفات العمل والمواد التعليمية بسهولة مع المعلمين الآخرين عبر منصة آمنة ومنظمة.",
    },
    {
      id: 2,
      name: "مجتمع تعليمي تعاوني",
      icon: "/assets/images/why-choose/why-choose-1/icon-2.svg",
      bg: "bg-2",
      description:
        "تواصل مع المعلمين وتبادل الأفكار والخبرات التعليمية للاستفادة من تجارب الآخرين وتحسين جودة التعليم.",
    },
  ];

  const whyChoose = isArabic ? whyChooseAr : whyChooseEn;

  return (
    <section
      className="ed-why-choose section-gap background-image position-relative section-bg-2"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <Image
        width={49}
        height={80}
        className="ed-w-choose__pattern-1"
        src="/assets/images/why-choose/why-choose-1/pattern-1.svg"
        alt="pattern"
      />

      <div className="container ed-container">
        <div className="row align-items-center">

          {/* ===== النص ===== */}
          <div className="col-lg-6 col-12">
            <div
              className="ed-w-choose__content"
              style={{ textAlign: isArabic ? 'right' : 'left' }}
            >
              <div className="ed-section-head">
                <span className="ed-section-head__sm-title">
                  {isArabic ? 'لماذا تختارنا' : 'WHY CHOOSE US'}
                </span>

                {/* 👇 split-text للإنجليزي فقط */}
                <h3
                  className={`ed-section-head__title ${
                    isArabic ? '' : 'ed-split-text'
                  }`}
                >
                  {isArabic
                    ? 'نرتقي بتجربتك التعليمية'
                    : 'Transform Your Teaching Experience'}
                  <br />
                  {isArabic
                    ? 'من خلال منصتنا المتكاملة'
                    : 'With Our Smart Learning Platform'}
                </h3>

                <p className="ed-section-head__text">
                  {isArabic
                    ? 'نوفر لك بيئة تعليمية متكاملة لمشاركة الملفات، تبادل الخبرات، والتعاون مع المعلمين بكل سهولة واحترافية.'
                    : 'We provide an integrated educational environment for sharing resources, exchanging experiences, and collaborating professionally with other educators.'}
                </p>
              </div>

              <div className="ed-w-choose__info">
                {whyChoose.map((item) => (
                  <div className="ed-w-choose__info-single" key={item.id}>
                    <div className="ed-w-choose__info-head">
                      <div className={`ed-w-choose__info-icon ${item.bg}`}>
                        <Image
                          width={25}
                          height={25}
                          src={item.icon}
                          alt={item.name}
                        />
                      </div>
                      <h5>{item.name}</h5>
                    </div>
                    <div className="ed-w-choose__info-bottom">
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== الصورة ===== */}
          <div className="col-lg-6 col-12">
            <div className="ed-w-choose__images position-relative">
              <div className="ed-w-choose__main-img">
                <img
                  src="https://eduna-ts.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fwhy-choose%2Fwhy-choose-1%2Fwhy-choose-img.png&w=1920&q=75"
                  alt="why choose"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              <div className="counter-card updown-ani">
                <div className="counter-card__icon">
                  <i className="fi fi-rr-graduation-cap" />
                </div>
                <div className="counter-card__info">
                  <h4>
                    <span className="counter">
                      <Counter end={69} />
                    </span>
                    K+
                  </h4>
                  <p>{isArabic ? 'معلمون راضون' : 'Satisfied Educators'}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
