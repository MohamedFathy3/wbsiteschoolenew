'use client';

interface CurriculumStatsProps {
  curriculums: Array<{
    active: boolean;
  }>;
  lang: 'en' | 'ar';
  total: number;
}

const CurriculumStats = ({ curriculums, lang, total }: CurriculumStatsProps) => {
  const activeCurriculums = curriculums.filter(c => c.active).length;
  const availableCurriculums = curriculums.length;

  return (
    <div className="row mt-50">
      <div className="col-12">
        <div className="section-title text-center mb-30">
          <h3 className="title" style={{ fontSize: "24px" }}>
            {lang === 'ar' ? 'إحصائيات المناهج' : 'Curriculums Statistics'}
          </h3>
          <p className="text">
            {lang === 'ar' 
              ? 'نظرة عامة على جميع المناهج المتاحة' 
              : 'Overview of all available curriculums'}
          </p>
        </div>
        
        <div className="ed-curriculum__stats" style={{
          background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
          padding: "30px",
          borderRadius: "15px",
          border: "1px solid #e0e7ff"
        }}>
          <div className="row">
            {/* Total Curriculums */}
            <div className="col-md-3 col-sm-6 col-12 mb-3">
              <div className="text-center">
                <div className="ed-stat__number" style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#3b82f6",
                  marginBottom: "5px"
                }}>
                  {availableCurriculums}
                </div>
                <div className="ed-stat__label" style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  fontWeight: "500"
                }}>
                  {lang === 'ar' ? 'إجمالي المناهج' : 'Total Curriculums'}
                </div>
              </div>
            </div>
            
            {/* Active Curriculums */}
            <div className="col-md-3 col-sm-6 col-12 mb-3">
              <div className="text-center">
                <div className="ed-stat__number" style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#10b981",
                  marginBottom: "5px"
                }}>
                  {activeCurriculums}
                </div>
                <div className="ed-stat__label" style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  fontWeight: "500"
                }}>
                  {lang === 'ar' ? 'مناهج نشطة' : 'Active Curriculums'}
                </div>
              </div>
            </div>
            
            {/* Available Curriculums */}
            <div className="col-md-3 col-sm-6 col-12 mb-3">
              <div className="text-center">
                <div className="ed-stat__number" style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#8b5cf6",
                  marginBottom: "5px"
                }}>
                  {availableCurriculums}
                </div>
                <div className="ed-stat__label" style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  fontWeight: "500"
                }}>
                  {lang === 'ar' ? 'مناهج متاحة' : 'Available Curriculums'}
                </div>
              </div>
            </div>
            
            {/* Total Records */}
            <div className="col-md-3 col-sm-6 col-12 mb-3">
              <div className="text-center">
                <div className="ed-stat__number" style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: "#f59e0b",
                  marginBottom: "5px"
                }}>
                  {total}
                </div>
                <div className="ed-stat__label" style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  fontWeight: "500"
                }}>
                  {lang === 'ar' ? 'إجمالي السجلات' : 'Total Records'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumStats;