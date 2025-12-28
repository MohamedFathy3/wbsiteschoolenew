'use client';

interface CurriculumEmptyStateProps {
  lang: 'en' | 'ar';
  onRetry: () => void;
}

const CurriculumEmptyState = ({ lang, onRetry }: CurriculumEmptyStateProps) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="text-center py-50">
          <div className="ed-empty-state">
            <div className="ed-empty-state__icon" style={{
              fontSize: "64px",
              marginBottom: "20px",
              color: "#9ca3af"
            }}>
              📚
            </div>
            <h4 className="ed-empty-state__title" style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#6b7280",
              marginBottom: "10px"
            }}>
              {lang === 'ar' ? 'لا توجد مناهج' : 'No Curriculums Found'}
            </h4>
            <p className="ed-empty-state__text" style={{
              fontSize: "16px",
              color: "#9ca3af",
              maxWidth: "500px",
              margin: "0 auto 20px"
            }}>
              {lang === 'ar' 
                ? 'لم يتم العثور على أي مناهج دراسية متاحة حاليًا.'
                : 'No educational curriculums are currently available.'
              }
            </p>
            <button
              onClick={onRetry}
              className="ed-btn ed-btn--primary"
              style={{
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <i className="fi fi-rr-refresh" />
              {lang === 'ar' ? 'إعادة تحميل' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumEmptyState;