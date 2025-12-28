'use client';
import { useLang } from "@/context/LanguageContext";

const ContactFormInfo = () => {
  const { lang } = useLang();

  // معلومات نموذج الاتصال
  const contactFormInfo = {
    name: {
      en: "Father Ahmed",
      ar: "الأب أحمد"
    },
    phone: "01012345678",
    message: {
      en: "father@example.com",
      ar: "father@example.com"
    }
  };

  const getText = (obj: { en: string; ar: string } | string) => {
    if (typeof obj === 'string') return obj;
    return obj[lang as 'en' | 'ar'];
  };

  return (
    <div className="ed-contact__form-info section-gap" style={{
      direction: lang === 'ar' ? 'rtl' : 'ltr'
    }}>
      <div className="container ed-container">
        <div className="row">
          <div className="col-12">
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              border: '1px solid #e0e7ff'
            }}>
              <h3 className="mb-4" style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                {lang === 'ar' 
                  ? 'معلومات نموذج الاتصال' 
                  : 'Contact Form Information'}
              </h3>
              
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 col-12 mb-4">
                  <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '8px'
                    }}>
                      {lang === 'ar' ? 'الاسم' : 'Name'}
                    </div>
                    <div style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {getText(contactFormInfo.name)}
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 col-12 mb-4">
                  <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '8px'
                    }}>
                      {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    </div>
                    <div style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {contactFormInfo.phone}
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 col-md-6 col-12 mb-4">
                  <div style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '8px'
                    }}>
                      {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </div>
                    <div style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {getText(contactFormInfo.message)}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="mt-4" style={{
                fontSize: '1rem',
                color: '#6b7280',
                maxWidth: '800px',
                margin: '20px auto 0',
                lineHeight: '1.6'
              }}>
                {lang === 'ar'
                  ? 'يمكنك استخدام هذه المعلومات كمرجع عند ملء نموذج الاتصال. سنقوم بالرد عليك في أقرب وقت ممكن.'
                  : 'You can use this information as a reference when filling out the contact form. We will respond to you as soon as possible.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormInfo;