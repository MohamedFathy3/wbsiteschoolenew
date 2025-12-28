'use client';

interface CurriculumPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  lang: 'en' | 'ar';
}

const CurriculumPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  lang 
}: CurriculumPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="row mt-40">
      <div className="col-12">
        <div className="ed-pagination">
          <ul className="ed-pagination__list">
            {/* Previous Button */}
            {currentPage > 1 && (
              <li>
                <button 
                  onClick={() => onPageChange(currentPage - 1)}
                  className="ed-pagination__item"
                  style={{
                    background: "none",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    color: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <i className={`fi fi-rr-arrow-small-${lang === 'ar' ? 'right' : 'left'}`} />
                  {lang === 'ar' ? 'السابق' : 'Previous'}
                </button>
              </li>
            )}

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={page === currentPage ? 'active' : ''}>
                <button
                  onClick={() => onPageChange(page)}
                  style={{
                    background: page === currentPage ? "#3b82f6" : "transparent",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    color: page === currentPage ? "white" : "#6b7280",
                    minWidth: "40px"
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
                  className="ed-pagination__item"
                  style={{
                    background: "none",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    color: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  {lang === 'ar' ? 'التالي' : 'Next'}
                  <i className={`fi fi-rr-arrow-small-${lang === 'ar' ? 'left' : 'right'}`} />
                </button>
              </li>
            )}
          </ul>
          
          {/* Page Info */}
          <div className="ed-pagination__info" style={{
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
      </div>
    </div>
  );
};

export default CurriculumPagination;