'use client';

import { CallToAction1 } from "@/components/CallToAction";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { useLang } from "@/context/LanguageContext";

const Footer = ({ footer }: { footer: number }) => {
  switch (footer) {
    case 1:
      return <Footer1 />;
    case 2:
      return <Footer2 />;
    default:
      return <Footer1 />;
  }
};
export default Footer;

const Footer1 = () => {
  return (
    <footer className="ed-footer position-relative">
      <FooterContent />
    </footer>
  );
};

const Footer2 = () => {
  return (
    <footer className="ed-footer-2 position-relative">
      <FooterContent />
    </footer>
  );
};

const FooterContent = () => {
  const { lang } = useLang();

  const translations = {
    links: { en: "Quick Links", ar: "روابط سريعة" },
    contact: { en: "Contact Us", ar: "اتصل بنا" },
    subscribe: { en: "Stay Updated", ar: "ابقَ على اطلاع" },
    support247: { en: "Customer Support", ar: "الدعم الفني" },
    sendMessage: { en: "Email", ar: "البريد الإلكتروني" },
    ourLocation: { en: "Location", ar: "الموقع" },
    subscribeNow: { en: "Subscribe", ar: "اشترك الآن" },
    enterEmail: { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
    newsletterText: { 
      en: "Get the latest updates and offers", 
      ar: "احصل على آخر التحديثات والعروض" 
    },
    aboutUs: { en: "About Us", ar: "عن المنصة" },
    ourCourses: { en: "All lessons", ar: "جميع الدروس" },
    pricingPlan: { en: "Pricing", ar: "الأسعار" },
    contactUs: { en: "Contact", ar: "اتصل بنا" },
    ourNews: { en: "Blog", ar: "المدونة" },
    faqs: { en: "Help Center", ar: "مركز المساعدة" },
    description: { 
      en: "Your premier destination for educational content exchange between educators across the Arab world.", 
      ar: "وجهتك الأولى لتبادل المحتوى التعليمي بين المعلمين في جميع أنحاء العالم العربي." 
    },
    copyright: { 
      en: `© ${new Date().getFullYear()} Teachers Market. All rights reserved.`, 
      ar: `© ${new Date().getFullYear()} سوق المعلمين. جميع الحقوق محفوظة.` 
    },
    developedBy: { en: "Powered by", ar: "بدعم من" },
    platformTitle: { en: "Teachers Market", ar: "سوق المعلمين" },
    platformSubtitle: { en: "Education Exchange Platform", ar: "منصة تبادل التعليم" }
  } as const;

  const getText = <K extends keyof typeof translations>(key: K): string => {
    return translations[key][lang as 'en' | 'ar'];
  };

  const contact = [
    {
      icon: "/assets/images/icons/icon-phone.svg",
      title: getText('support247'),
      phone: "01548567890",
      link: "tel:+201234567890",
    },
    {
      icon: "/assets/images/icons/icon-envelope.svg",
      title: getText('sendMessage'),
      email: "teachersmarket08@gmail.com",
      link: "mailto:teachersmarket08@gmail.com",
    },
    {
      icon: "/assets/images/icons/icon-location.svg",
      title: getText('ourLocation'),
      address: lang === 'ar' ? "الشرق الأوسط، الإمارات" : "Middle East, UAE",
      link: "#",
    },
  ];

  const footerLinks = [
    { text: getText('aboutUs'), link: "/about-1" },
    { text: getText('ourCourses'), link: "/courses" },
    { text: getText('contactUs'), link: "/contact" },
    { text: getText('ourNews'), link: "/resources" },
  ];

  const socialLinks = [
    { name: "facebook", url: "https://facebook.com" },
    { name: "twitter", url: "https://twitter.com" },
    { name: "instagram", url: "https://instagram.com" },
    { name: "linkedin", url: "https://linkedin.com" },
    { name: "youtube", url: "https://youtube.com" },
  ];

  return (
    <Fragment>
      {/* Main Footer */}
      <div className="footer-main" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container">
          <div className="footer-grid">
            {/* Logo & Description */}
            <div className="footer-col logo-col">
              <div className="footer-logo">
                <Link href="/" className="logo-link">
                  <div className="logo-text">
                    <h3 className="logo-title">{getText('platformTitle')}</h3>
                    <p className="logo-subtitle">{getText('platformSubtitle')}</p>
                  </div>
                </Link>
              </div>
              <p className="footer-description">
                {getText('description')}
              </p>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={social.name}
                  >
                    <i className={`fi fi-brands-${social.name}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col links-col">
              <h4 className="footer-title">{getText('links')}</h4>
              <ul className="footer-links">
                {footerLinks.map((item, index) => (
                  <li key={index}>
                    <Link href={item.link} className="footer-link">
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-col contact-col">
              <h4 className="footer-title">{getText('contact')}</h4>
              <div className="contact-info">
                {contact.map((item, index) => (
                  <div className="contact-item" key={index}>
                    <div className="contact-icon">
                      <i className={`fi fi-rr-${item.icon.includes('phone') ? 'phone-call' : 
                        item.icon.includes('envelope') ? 'envelope' : 'location-alt'}`}></i>
                    </div>
                    <div className="contact-details" >
                      <span className="contact-label">{item.title}</span>
                      <a href={item.link} className="contact-value" style={{fontSize:"13px"}}>
                        {item.phone || item.email || item.address}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-col newsletter-col">
              <h4 className="footer-title">{getText('subscribe')}</h4>
              <p className="newsletter-text">
                {getText('newsletterText')}
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder={getText('enterEmail')}
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">
                    {getText('subscribeNow')}
                    <i className="fi fi-rr-arrow-right"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright-content">
            <p className="copyright-text">
              {getText('copyright')}
            </p>
            <p className="developed-by">
              {getText('developedBy')}{' '}
              <a 
                href="https://starplus.agency" 
                target="_blank" 
                rel="noopener noreferrer"
                className="agency-link"
              >
                StarPlus Agency
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .footer-main {
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
          padding: 80px 0 60px;
          border-top: 1px solid #e5e7eb;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 30px;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .footer-col {
          min-width: 0;
        }

        .logo-col {
          grid-column: span 1;
        }

        .footer-logo {
          margin-bottom: 24px;
        }

        .logo-link {
          text-decoration: none;
          display: inline-block;
        }

        .logo-title {
          font-size: 28px;
          font-weight: 800;
          color: #1e40af;
          margin: 0 0 4px 0;
          line-height: 1.2;
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-subtitle {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .footer-description {
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 28px;
          font-size: 15px;
        }

        .social-links {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 10px;
          color: #6b7280;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 18px;
        }

        .social-icon:hover {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);
        }

        .footer-title {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 24px 0;
          position: relative;
          padding-bottom: 12px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: ${lang === 'ar' ? 'auto' : '0'};
          right: ${lang === 'ar' ? '0' : 'auto'};
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 2px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-link {
          color: #4b5563;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-link:hover {
          color: #3b82f6;
          transform: translateX(${lang === 'ar' ? '-4px' : '4px'});
        }

        .footer-link::before {
          content: '›';
          font-size: 18px;
          color: #3b82f6;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .footer-link:hover::before {
          opacity: 1;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
          border-radius: 10px;
          color: #3b82f6;
          font-size: 18px;
          flex-shrink: 0;
        }

        .contact-details {
          flex: 1;
        }

        .contact-label {
          display: block;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 4px;
          font-weight: 500;
        }

        .contact-value {
          display: block;
          color: #1f2937;
          text-decoration: none;
          font-weight: 600;
          font-size: 15px;
          transition: color 0.3s ease;
        }

        .contact-value:hover {
          color: #3b82f6;
        }

        .newsletter-text {
          color: #4b5563;
          line-height: 1.6;
          margin-bottom: 24px;
          font-size: 15px;
        }

        .newsletter-form {
          width: 100%;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .newsletter-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 15px;
          color: #1f2937;
          background: white;
          transition: all 0.3s ease;
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .newsletter-input::placeholder {
          color: #9ca3af;
        }

        .newsletter-btn {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }

        .newsletter-btn:active {
          transform: translateY(0);
        }

        .footer-bottom {
          background: #1f2937;
          padding: 24px 0;
        }

        .copyright-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 768px) {
          .copyright-content {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }

        .copyright-text {
          color: #d1d5db;
          font-size: 14px;
          margin: 0;
        }

        .developed-by {
          color: #9ca3af;
          font-size: 14px;
          margin: 0;
        }

        .agency-link {
          color: #60a5fa;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .agency-link:hover {
          color: #93c5fd;
        }
      `}</style>
    </Fragment>
  );
};