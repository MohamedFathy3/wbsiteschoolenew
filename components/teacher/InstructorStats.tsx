// components/teacher/InstructorStats.tsx
interface InstructorStatsProps {
  courses_count: number;
  students_count: number;
  total_rate: number;
  total_income?: number;
  commission?: string;
  getText: (key: string) => string;
}

const InstructorStats = ({ 
  courses_count, 
  students_count, 
  total_rate,
  total_income = 0,
  commission = "0%",
  getText 
}: InstructorStatsProps) => {
  return (
    <div className="stats-card">
      <h5 className="stats-title">
        📊 {getText('stats')}
      </h5>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{courses_count}</div>
          <div className="stat-label">{getText('totalCourses')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{students_count}</div>
          <div className="stat-label">{getText('totalStudents')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">⭐ {total_rate.toFixed(1)}</div>
          <div className="stat-label">{getText('averageRating')}</div>
        </div>
        {total_income > 0 && (
          <div className="stat-item">
            <div className="stat-value">${total_income}</div>
            <div className="stat-label">{getText('totalIncome')}</div>
          </div>
        )}
        {commission && commission !== "0%" && (
          <div className="stat-item">
            <div className="stat-value">{commission}</div>
            <div className="stat-label">{getText('commission')}</div>
          </div>
        )}
      </div>

      <style jsx>{`
        .stats-card {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 20px;
          border-radius: 12px;
          margin: 20px 0;
          border: 1px solid #e2e8f0;
        }
        
        .stats-title {
          margin-bottom: 15px;
          color: #3b82f6;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 15px;
        }
        
        .stat-item {
          text-align: center;
          padding: 15px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: transform 0.2s;
        }
        
        .stat-item:hover {
          transform: translateY(-2px);
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .stat-item:nth-child(1) .stat-value {
          color: #3b82f6;
        }
        
        .stat-item:nth-child(2) .stat-value {
          color: #10b981;
        }
        
        .stat-item:nth-child(3) .stat-value {
          color: #f59e0b;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }
        
        .stat-item:nth-child(4) .stat-value {
          color: #8b5cf6;
        }
        
        .stat-item:nth-child(5) .stat-value {
          color: #ef4444;
        }
        
        .stat-label {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default InstructorStats;