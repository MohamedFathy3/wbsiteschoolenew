'use client';
import { useLang } from "@/context/LanguageContext";

interface PaginationProps {
  current_page: number;
  last_page: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ current_page, last_page, onPageChange }: PaginationProps) => {
  const { lang } = useLang();

  // توليد أرقام الصفحات
  const pageNumbers = [];
  for (let i = 1; i <= last_page; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="ed-pagination">
      <ul className="ed-pagination__list">
        {/* Previous Button */}
        {current_page > 1 && (
          <li>
            <button 
              onClick={() => onPageChange(current_page - 1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#3b82f6'
              }}
            >
              <i className={`fi fi-rr-arrow-small-${lang === 'ar' ? 'right' : 'left'}`} />
            </button>
          </li>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <li key={page} className={page === current_page ? 'active' : ''}>
            <button
              onClick={() => onPageChange(page)}
              style={{
                background: page === current_page ? '#3b82f6' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: page === current_page ? 'white' : '#6b7280',
                padding: '8px 12px',
                borderRadius: '4px'
              }}
            >
              {page.toString().padStart(2, '0')}
            </button>
          </li>
        ))}

        {/* Next Button */}
        {current_page < last_page && (
          <li>
            <button
              onClick={() => onPageChange(current_page + 1)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#3b82f6'
              }}
            >
              <i className={`fi fi-rr-arrow-small-${lang === 'ar' ? 'left' : 'right'}`} />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;