'use client';
import { useLang } from "@/context/LanguageContext";

interface EmptyStateProps {
  message?: string;
  icon?: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState = ({ 
  message, 
  icon = "📭", 
  actionText, 
  onAction 
}: EmptyStateProps) => {
  const { lang } = useLang();

  const translations = {
    noData: {
      en: "No data found",
      ar: "لا توجد بيانات"
    },
    goBack: {
      en: "Go Back",
      ar: "العودة"
    },
    explore: {
      en: "Explore More",
      ar: "استكشاف المزيد"
    }
  };

  const getText = (key: keyof typeof translations) => {
    return translations[key][lang as 'en' | 'ar'];
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '50px 20px',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <div style={{
        fontSize: '64px',
        marginBottom: '20px',
        opacity: '0.7'
      }}>
        {icon}
      </div>
      
      <h4 style={{
        color: '#6b7280',
        marginBottom: '10px',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        {message || getText('noData')}
      </h4>
      
      <p style={{
        color: '#9ca3af',
        fontSize: '14px',
        marginBottom: '30px',
        lineHeight: '1.6'
      }}>
        {lang === 'ar' 
          ? 'لم يتم العثور على أي بيانات. حاول تحديث الصفحة أو البحث عن شيء آخر.'
          : 'No data was found. Try refreshing the page or searching for something else.'
        }
      </p>

      {onAction && (
        <button
          onClick={onAction}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 28px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2563eb';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#3b82f6';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <i className="fi fi-rr-search" />
          {actionText || getText('explore')}
        </button>
      )}
    </div>
  );
};

export default EmptyState;