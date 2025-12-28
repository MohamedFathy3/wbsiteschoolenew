'use client';
import { useLang } from "@/context/LanguageContext";
import Image from "next/image";
import { useMemo } from "react";

const ContactCards = () => {
  const { lang } = useLang();

  // بيانات الاتصال باللغتين
  const contactData = useMemo(() => [
    {
      id: 1,
      icon: "icon-white-phone.svg",
      title: {
        en: "Phone",
        ar: "الهاتف"
      },
      type: "tel",
      info: {
        en: ["+64 939-39-0239", "+54 939-739-02399"],
        ar: ["+64 939-39-0239", "+54 939-739-02399"]
      },
      extraLink: "",
    },
    {
      id: 2,
      icon: "icon-white-message.svg",
      title: {
        en: "Email",
        ar: "البريد الإلكتروني"
      },
      type: "email",
      info: {
        en: ["helloeduna@gmail.com", "eduna@gmail.com"],
        ar: ["helloeduna@gmail.com", "eduna@gmail.com"]
      },
      extraLink: "",
    },
    {
      id: 3,
      icon: "icon-white-map.svg",
      title: {
        en: "Address",
        ar: "العنوان"
      },
      type: "address",
      info: {
        en: ["1234 East 27th Street, New York, NY 101010"],
        ar: ["1234 شارع 27 الشرق، نيويورك، نيويورك 101010"]
      },
      extraLink: "#",
    },
  ], []);

  const getText = (obj: { en: string; ar: string } | string) => {
    if (typeof obj === 'string') return obj;
    return obj[lang as 'en' | 'ar'];
  };

  const getInfo = (info: { en: string[]; ar: string[] } | string[]) => {
    if (Array.isArray(info)) return info;
    return info[lang as 'en' | 'ar'];
  };

  return (
    <div className="ed-contact__card section-gap" style={{
      direction: lang === 'ar' ? 'rtl' : 'ltr'
    }}>
      <div className="container ed-container">
        <div className="row">
          {/* العنوان */}
          <div className="col-12 mb-5">
            <div className="text-center">
              <h2 className="ed-section-head__title" style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                {lang === 'ar' 
                  ? 'طرق التواصل معنا' 
                  : 'Ways to Contact Us'}
              </h2>
              <p className="ed-section-head__text" style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {lang === 'ar'
                  ? 'اختر طريقة الاتصال المناسبة لك وتواصل معنا في أي وقت'
                  : 'Choose your preferred contact method and reach out to us anytime'}
              </p>
            </div>
          </div>

          {/* Single Contact Cards */}
          {contactData.map((item) => (
            <div className="col-lg-4 col-md-6 col-12 mb-4" key={item.id}>
              <div className="ed-contact__card-item" style={{
                background: 'white',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%',
                transition: 'all 0.3s ease',
                textAlign: lang === 'ar' ? 'right' : 'left',
                border: '1px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div className="ed-contact__card-icon mb-4" style={{
                  width: '70px',
                  height: '70px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Image
                    width={30}
                    height={30}
                    src={`/assets/images/icons/${item.icon}`}
                    alt={getText(item.title)}
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>
                
                <h3 className="mb-3" style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {getText(item.title)}
                </h3>
                
                <div className="ed-contact__card-info" style={{
                  textAlign: 'center'
                }}>
                  {getInfo(item.info).map((info, index) => (
                    <div key={index} className="mb-2">
                      <a
                        href={
                          item.type === "tel"
                            ? `tel:${info}`
                            : item.type === "email"
                            ? `mailto:${info}`
                            : item.extraLink
                        }
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontSize: '1rem',
                          display: 'block',
                          transition: 'color 0.3s ease',
                          lineHeight: '1.5'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#3b82f6'}
                      >
                        {info}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactCards;