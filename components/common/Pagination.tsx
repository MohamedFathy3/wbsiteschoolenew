'use client';
import { useLang } from "@/context/LanguageContext";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const { lang } = useLang();

  // Generate page numbers to show
  const pageNumbers = [];
  const maxPagesToShow = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="ed-pagination">
      <ul className="ed-pagination__list" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        flexWrap: "wrap",
        padding: 0,
        margin: 0,
        listStyle: "none"
      }}>
        {/* Previous Button */}
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              style={{
                background: "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "8px 12px",
                cursor: "pointer",
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f3f4f6";
              }}
            >
              <i className={`fi fi-rr-arrow-small-${lang === 'ar' ? 'right' : 'left'}`} />
              {lang === 'ar' ? 'السابق' : 'Previous'}
            </button>
          </li>
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              style={{
                background: page === currentPage ? "#3b82f6" : "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "8px 12px",
                cursor: "pointer",
                color: page === currentPage ? "white" : "#374151",
                minWidth: "40px",
                fontWeight: page === currentPage ? "bold" : "normal",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                if (page !== currentPage) {
                  e.currentTarget.style.background = "#e5e7eb";
                }
              }}
              onMouseLeave={(e) => {
                if (page !== currentPage) {
                  e.currentTarget.style.background = "#f3f4f6";
                }
              }}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next Button */}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              style={{
                background: "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "8px 12px",
                cursor: "pointer",
                color: "#374151",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e5e7eb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f3f4f6";
              }}
            >
              {lang === 'ar' ? 'التالي' : 'Next'}
              <i className={`fi fi-rr-arrow-small-${lang === 'ar' ? 'left' : 'right'}`} />
            </button>
          </li>
        )}
      </ul>

      {/* Page Info */}
      <div style={{
        textAlign: "center",
        marginTop: "10px",
        fontSize: "14px",
        color: "#6b7280"
      }}>
        {lang === 'ar' 
          ? `الصفحة ${currentPage} من ${totalPages}`
          : `Page ${currentPage} of ${totalPages}`
        }
      </div>
    </div>
  );
};

export default Pagination;