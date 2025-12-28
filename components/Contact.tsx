  'use client';
  import Image from "next/image";
  import { useLang } from "@/context/LanguageContext";
  import { useState } from "react";
  import api from "@/lib/api";
  import { toast } from "sonner";

  export const Contact2 = () => {
    const { lang } = useLang();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      message: '',
      agreeToTerms: false
    });
    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      
      // مسح الأخطاء عند الكتابة
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
      
      if (type === 'checkbox') {
        const checkbox = e.target as HTMLInputElement;
        setFormData(prev => ({
          ...prev,
          [name]: checkbox.checked
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    };

    const validateForm = () => {
      const newErrors: {[key: string]: string} = {};
      let hasError = false;
      
      if (!formData.name.trim()) {
        newErrors.name = lang === 'ar' ? 'الاسم مطلوب' : 'Name is required';
        hasError = true;
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = lang === 'ar' ? 'رقم الهاتف مطلوب' : 'Phone is required';
        hasError = true;
      } else if (!/^\d{10,15}$/.test(formData.phone)) {
        newErrors.phone = lang === 'ar' ? 'رقم الهاتف غير صالح' : 'Phone is invalid';
        hasError = true;
      }
      
      if (!formData.message.trim()) {
        newErrors.message = lang === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
        hasError = true;
      }
      
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = lang === 'ar' 
          ? 'يجب الموافقة على سياسة الخصوصية' 
          : 'You must agree to the Privacy Policy';
        hasError = true;
      }
      
      setErrors(newErrors);
      
      // إظهار toast للخطأ الأول فقط
      if (hasError) {
        const firstErrorKey = Object.keys(newErrors)[0];
        toast.error(newErrors[firstErrorKey], {
          duration: 4000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left'
        });
      }
      
      return !hasError;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      // تحقق من صحة النموذج
      if (!validateForm()) {
        return;
      }

      try {
        setLoading(true);

        // إرسال البيانات
        const response = await api.post('/contact-us', {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim()
        });

        // نجاح الإرسال - إظهار toast
        const successMessage = lang === 'ar' 
          ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.' 
          : 'Your message has been sent successfully! We will contact you soon.';
        
        toast.success(successMessage, {
          duration: 5000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left'
        });

        // إعادة تعيين النموذج
        setFormData({
          name: '',
          phone: '',
          message: '',
          agreeToTerms: false
        });

      } catch (error: any) {
        console.error('Error sending message:', error);
        
        // معالجة الأخطاء المختلفة
        let errorMessage = lang === 'ar' 
          ? 'فشل إرسال الرسالة. حاول مرة أخرى.' 
          : 'Failed to send message. Please try again.';
        
        if (error.response?.status === 429) {
          errorMessage = lang === 'ar' 
            ? 'لقد قمت بإرسال الكثير من الطلبات. يرجى الانتظار قليلاً.' 
            : 'Too many requests. Please wait a moment.';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        toast.error(errorMessage, {
          duration: 5000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left'
        });
        
      } finally {
        setLoading(false);
      }
    };

    // نصوص الترجمة
    const translations = {
      title: {
        en: "Have questions? Contact with us today",
        ar: "لديك أسئلة؟ تواصل معنا اليوم"
      },
      subtitle: {
        en: "CONTACT US",
        ar: "اتصل بنا"
      },
      namePlaceholder: {
        en: "Full name",
        ar: "الاسم الكامل"
      },
      phonePlaceholder: {
        en: "Enter your phone",
        ar: "أدخل رقم هاتفك"
      },
      messagePlaceholder: {
        en: "How can we help you? Feel free to get in touch!",
        ar: "كيف يمكننا مساعدتك؟ لا تتردد في التواصل معنا!"
      },
      privacyText: {
        en: "I agree to the Privacy Policy",
        ar: "أوافق على سياسة الخصوصية"
      },
      buttonText: {
        en: "Send Message",
        ar: "إرسال الرسالة"
      },
      loadingText: {
        en: "Sending...",
        ar: "جاري الإرسال..."
      }
    };

    return (
      <section 
        className="ed-contact ed-contact--style2 section-gap pt-0 position-relative" 
        style={{ direction: lang === 'ar' ? 'rtl' : 'ltr', marginTop: '30px' }}
      >
        <div className="container ed-container">
          <div className="row">
            <div className="col-12">
              <div className="ed-contact__inner">
                {/* Contact Image */}
                <div className="ed-contact__img">
                  <img
                    width={620}
                    height={620}
                    sizes="100vw"
                    style={{ width: "620px", height: "620px" }}
                    src="https://eduna-ts.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fcontact%2Fcontact-img.png&w=1920&q=75"
                    alt="contact-img"
                  />
                </div>
                
                {/* Contact Form */}
                <div className="ed-contact__form">
                  <div className="ed-contact__form-head">
                    <span className="ed-contact__form-sm-title" style={{marginTop:"20px"}}>
                      {translations.subtitle[lang as 'en' | 'ar']}
                    </span>
                <h3
  className={`ed-contact__form-big-title ${
    lang === 'ar' ? '' : 'ed-split-text'
  } right`}
>
  {translations.title[lang as 'en' | 'ar']}
</h3>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="ed-contact__form-main">
                    {/* حقل الاسم */}
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={translations.namePlaceholder[lang as 'en' | 'ar']}
                        required
                        style={{
                          borderColor: errors.name ? '#ef4444' : '#d1d5db',
                          marginBottom: errors.name ? '5px' : '0'
                        }}
                      />
                      {errors.name && (
                        <div style={{
                          color: '#ef4444',
                          fontSize: '0.875rem',
                          marginTop: '4px'
                        }}>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    
                    {/* حقل الهاتف */}
                    <div className="form-group">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={translations.phonePlaceholder[lang as 'en' | 'ar']}
                        required
                        style={{
                          borderColor: errors.phone ? '#ef4444' : '#d1d5db',
                          marginBottom: errors.phone ? '5px' : '0'
                        }}
                      />
                      {errors.phone && (
                        <div style={{
                          color: '#ef4444',
                          fontSize: '0.875rem',
                          marginTop: '4px'
                        }}>
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    
                    {/* حقل الرسالة */}
                    <div className="form-group">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={translations.messagePlaceholder[lang as 'en' | 'ar']}
                        required
                        rows={6}
                        style={{
                          borderColor: errors.message ? '#ef4444' : '#d1d5db',
                          marginBottom: errors.message ? '5px' : '0'
                        }}
                      />
                      {errors.message && (
                        <div style={{
                          color: '#ef4444',
                          fontSize: '0.875rem',
                          marginTop: '4px'
                        }}>
                          {errors.message}
                        </div>
                      )}
                    </div>
                    
                    {/* الموافقة على الشروط */}
                    <div className="form-check">
                      <label className="form-check-label" htmlFor="agreeToTerms">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="agreeToTerms"
                          id="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          style={{
                            marginRight: lang === 'ar' ? '0' : '8px',
                            marginLeft: lang === 'ar' ? '8px' : '0'
                          }}
                        />
                        {translations.privacyText[lang as 'en' | 'ar']}
                      </label>
                      {errors.agreeToTerms && (
                        <div style={{
                          color: '#ef4444',
                          fontSize: '0.875rem',
                          marginTop: '4px'
                        }}>
                          {errors.agreeToTerms}
                        </div>
                      )}
                    </div>
                    
                    {/* زر الإرسال */}
                    <div className="ed-contact__form-btn">
                      <button 
                        type="submit" 
                        className="ed-btn"
                        disabled={loading}
                        style={{
                          opacity: loading ? 0.7 : 1,
                          cursor: loading ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        {loading ? (
                          <>
                            <span style={{
                              display: 'inline-block',
                              width: '16px',
                              height: '16px',
                              border: '2px solid white',
                              borderTop: '2px solid transparent',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite'
                            }}></span>
                            {translations.loadingText[lang as 'en' | 'ar']}
                          </>
                        ) : (
                          <>
                            {translations.buttonText[lang as 'en' | 'ar']}
                            <i className="fi fi-rr-arrow-small-right" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS للـ Spinner */}
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </section>
    );
  };