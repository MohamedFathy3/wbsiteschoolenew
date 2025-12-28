'use client';
import { useLang } from "@/context/LanguageContext";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  showRetryButton?: boolean;
}

const ErrorState = ({ 
  message, 
  onRetry, 
  showRetryButton = true 
}: ErrorStateProps) => {
  const { lang } = useLang();

  const translations = {
    error: {
      en: "An error occurred",
      ar: "حدث خطأ ما"
    },
    retry: {
      en: "Try Again",
      ar: "حاول مرة أخرى"
    },
    contactSupport: {
      en: "Please contact support if the problem persists",
      ar: "يرجى الاتصال بالدعم إذا استمرت المشكلة"
    }
  };

  const getText = (key: keyof typeof translations) => {
    return translations[key][lang as 'en' | 'ar'];
  };

  return (
    <div style={{
      background: '#fee2e2',
      border: '1px solid #fecaca',
      borderRadius: '8px',
      padding: '25px',
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{
        fontSize: '48px',
        marginBottom: '15px'
      }}>
        ❌
      </div>
      
      <h4 style={{
        color: '#991b1b',
        marginBottom: '10px',
        fontSize: '18px'
      }}>
        {message || getText('error')}
      </h4>
      
      <p style={{
        color: '#7f1d1d',
        fontSize: '14px',
        marginBottom: '20px',
        lineHeight: '1.5'
      }}>
        {getText('contactSupport')}
      </p>

      {showRetryButton && onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#b91c1c';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#dc2626';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <i className="fi fi-rr-refresh" />
          {getText('retry')}
        </button>
      )}
    </div>
  );
};

export default ErrorState;