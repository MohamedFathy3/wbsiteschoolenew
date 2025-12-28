'use client';
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

export const Features1 = () => {
  const { lang } = useLang();
  
  // البيانات باللغتين العربية والإنجليزية
const featuresEn = [
  {
    id: 1,
    name: "Best Lessons",
    bg: "bg-1",
    icon: "/assets/images/features/features-1/1.svg",
    description: "Access the best educational lessons with high-quality content.",
  },
  {
    id: 2,
    name: "Top Teachers",
    bg: "bg-2",
    icon: "/assets/images/features/features-1/2.svg",
    description: "Learn with the best teachers and professional experts in various fields.",
  },
  {
    id: 3,
    name: "Top Rated",
    bg: "bg-3",
    icon: "/assets/images/features/features-1/3.svg",
    description: "Browse the highest-rated lessons chosen by learners.",
  },
];


  const featuresAr = [
    {
      id: 1,
      name: " أفضل الدروس",
      bg: "bg-1",
      icon: "/assets/images/features/features-1/1.svg",
      description: "أحصل علي أفضل الدروس",
    },
    {
      id: 2,
      name: "أفضل المدرسين",
      bg: "bg-2",
      icon: "/assets/images/features/features-1/2.svg",
      description: "تعلم مع أفضل المعلمين والخبراء المحترفين ",
    },
    {
      id: 3,
      name: "  الأعلي  تقيمًا",
      bg: "bg-3",
      icon: "/assets/images/features/features-1/3.svg",
      description: "تصفح الدروس الأعلي تقيمًا",
    },
  ];

  const features = lang === 'ar' ? featuresAr : featuresEn;

  return (
    <section className="ed-features position-relative">
      <div className="ed-category__shapes">
        <Image
          width={49}
          height={80}
          sizes="49px"
          style={{ width: "49px", height: "80px" }}
          className="ed-category__shape-1 updown-ani"
          src="/assets/images/features/features-1/shape-1.svg"
          alt="shape-1"
        />
        <Image
          width={45}
          height={37}
          sizes="45px"
          style={{ width: "45px", height: "37px" }}
          className="ed-category__shape-2 rotate-ani"
          src="/assets/images/features/features-1/shape-2.svg"
          alt="shape-2"
        />
      </div>
      <div className="container ed-container">
        <div className="row">
          {/* Single Features Card */}
          {features.map((feature) => (
            <div className="col-lg-4 col-md-6 col-12" key={feature.id}>
              <div
                className="ed-features__card wow fadeInUp"
                data-wow-duration="1s"
                style={{ 
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  direction: lang === 'ar' ? 'rtl' : 'ltr'
                }}
              >
                <div className={`ed-features__icon icon-bg ${feature.bg}`}>
                  <Image
                    width={30}
                    height={30}
                    sizes="30px"
                    style={{ width: "30px", height: "30px" }}
                    src={feature.icon}
                    alt={feature.name}
                  />
                </div>
                <div className="ed-features__info">
                  <h4>{feature.name}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};