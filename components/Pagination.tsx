// components/Pagination.tsx
'use client';

import { useLang } from '@/context/LanguageContext';

// Interface للميتادات العامة
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  label?: string; // Label للعناصر (مثل: "وظائف", "دروس")
  showInfo?: boolean; // عرض معلومات الصفحة
  size?: 'sm' | 'md' | 'lg'; // حجم الباجينيشن
}

export const Pagination = ({ 
  meta, 
  onPageChange, 
  label = 'items',
  showInfo = true,
  size = 'md'
}: PaginationProps) => {
  const { lang } = useLang();
  
  if (!meta || meta.last_page <= 1) return null;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= meta.last_page && page !== meta.current_page) {
      onPageChange(page);
    }
  };

  // ترجمة النصوص
  const getTranslatedText = () => {
    const translations = {
      ar: {
        page: 'صفحة',
        of: 'من',
        total: 'إجمالي',
        items: 'عنصر',
        previous: 'السابق',
        next: 'التالي',
        showing: 'عرض',
        to: 'إلى'
      },
      en: {
        page: 'Page',
        of: 'of',
        total: 'total',
        items: 'items',
        previous: 'Previous',
        next: 'Next',
        showing: 'Showing',
        to: 'to'
      }
    };
    
    return translations[lang as 'ar' | 'en'];
  };

  const t = getTranslatedText();

  // Generate page numbers with ellipsis - محسن للعربية
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const total = meta.last_page;
    const current = meta.current_page;
    
    if (total <= 7) {
      // Show all pages if total is small
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Show with ellipsis
      if (current <= 4) {
        // First pages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      } else if (current >= total - 3) {
        // Last pages
        pages.push(1);
        pages.push('...');
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Middle pages
        pages.push(1);
        pages.push('...');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(total);
      }
    }
    
    return pages;
  };

  // أحجام الباجينيشن
  const sizeClasses = {
    sm: {
      container: 'text-sm',
      button: 'px-2 py-1 text-sm',
      info: 'text-xs'
    },
    md: {
      container: 'text-base',
      button: 'px-3 py-1.5 text-sm',
      info: 'text-sm'
    },
    lg: {
      container: 'text-lg',
      button: 'px-4 py-2 text-base',
      info: 'text-base'
    }
  };

  const sizeClass = sizeClasses[size];

  return (
    <div className="ed-pagination" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* معلومات الصفحة */}
      {showInfo && (
        <div className={`pagination-info mb-3 text-center ${sizeClass.info}`} style={{ color: '#6c757d' }}>
          <span>
            {t.showing} <strong>{meta.from || 0}</strong> {t.to} <strong>{meta.to || 0}</strong> {t.of} <strong>{meta.total || 0}</strong> {label}
          </span>
        </div>
      )}

      {/* عناصر الباجينيشن */}
      <ul className={`ed-pagination__list flex justify-center items-center gap-1 ${sizeClass.container}`}>
        {/* زر السابق */}
        <li className={`page-item ${meta.current_page === 1 ? 'disabled' : ''}`}>
          <button 
            className={`page-link flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${sizeClass.button}`}
            onClick={() => handlePageChange(meta.current_page - 1)}
            disabled={meta.current_page === 1}
            aria-label={t.previous}
            style={{
              minWidth: '2.5rem',
              height: '2.5rem'
            }}
          >
            {lang === 'ar' ? (
              <i className="fi fi-rr-arrow-small-right" />
            ) : (
              <i className="fi fi-rr-arrow-small-left" />
            )}
          </button>
        </li>

        {/* أرقام الصفحات */}
        {generatePageNumbers().map((page, index) => (
          <li 
            key={index} 
            className={`page-item ${page === meta.current_page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
          >
            {typeof page === 'number' ? (
              <button 
                className={`page-link flex items-center justify-center rounded-md border transition-all duration-200 ${sizeClass.button} ${
                  page === meta.current_page 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'border-gray-300 bg-white hover:bg-gray-50'
                }`}
                onClick={() => handlePageChange(page)}
                style={{
                  minWidth: '2.5rem',
                  height: '2.5rem'
                }}
              >
                {page}
              </button>
            ) : (
              <span 
                className={`page-link flex items-center justify-center rounded-md border border-gray-300 bg-white ${sizeClass.button}`}
                style={{
                  minWidth: '2.5rem',
                  height: '2.5rem'
                }}
              >
                {page}
              </span>
            )}
          </li>
        ))}

        {/* زر التالي */}
        <li className={`page-item ${meta.current_page === meta.last_page ? 'disabled' : ''}`}>
          <button 
            className={`page-link flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${sizeClass.button}`}
            onClick={() => handlePageChange(meta.current_page + 1)}
            disabled={meta.current_page === meta.last_page}
            aria-label={t.next}
            style={{
              minWidth: '2.5rem',
              height: '2.5rem'
            }}
          >
            {lang === 'ar' ? (
              <i className="fi fi-rr-arrow-small-left" />
            ) : (
              <i className="fi fi-rr-arrow-small-right" />
            )}
          </button>
        </li>
      </ul>

      {/* معلومات إضافية */}
      {showInfo && (
        <div className={`pagination-details mt-2 text-center ${sizeClass.info}`} style={{ color: '#6c757d' }}>
          <span>
            {t.page} <strong>{meta.current_page}</strong> {t.of} <strong>{meta.last_page}</strong>
          </span>
        </div>
      )}

      {/* ستايل إضافي */}
      <style jsx>{`
        .ed-pagination__list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .page-link {
          font-family: inherit;
          cursor: pointer;
          outline: none;
          transition: all 0.2s ease;
        }
        
        .page-link:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .page-link.active {
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
        }
        
        .page-link.disabled {
          cursor: default;
          background-color: #f8f9fa;
          color: #adb5bd;
        }
        
        @media (max-width: 640px) {
          .ed-pagination__list {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .page-link {
            min-width: 2rem !important;
            height: 2rem !important;
            font-size: 0.875rem;
            padding: 0.25rem 0.5rem !important;
          }
        }
        
        /* تحسين للأرقام الطويلة */
        .page-link {
          font-weight: 500;
        }
        
        /* تأثير عند الضغط */
        .page-link:active:not(:disabled) {
          transform: translateY(0);
        }
        
        /* تحسين الشكل للعربية */
        [dir="rtl"] .page-link {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>
    </div>
  );
};