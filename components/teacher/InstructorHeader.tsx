// components/teacher/InstructorHeader.tsx
import Image from "next/image";
import { TeacherDetails } from "@/types/teacher";

interface InstructorHeaderProps {
  teacher: TeacherDetails;
  getText: (key: string) => string;
  lang: 'en' | 'ar';
  getDefaultImage: () => string;
}

const InstructorHeader = ({ 
  teacher, 
  getText, 
  lang,
  getDefaultImage 
}: InstructorHeaderProps) => {
  return (
    <div className="ed-team__details-top">
      {/* الصورة والعلم */}
      <div className="ed-team__details-image">
        <div className="ed-team__details-main-img" style={{ position: 'relative' }}>
          <Image
            width={488}
            height={450}
            sizes="100vw"
            style={{ 
              width: "100%", 
              height: "450px", 
              objectFit: "cover",
              borderRadius: "8px"
            }}
            src={teacher.image || getDefaultImage()}
            alt={teacher.name}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getDefaultImage();
            }}
          />
          
          {/* علم الدولة */}
          {teacher.country?.image && (
            <div className="country-flag">
              <div className="country-flag-icon">
                <Image
                  fill
                  src={teacher.country.image}
                  alt={teacher.country.name}
                  style={{ 
                    borderRadius: '2px',
                    objectFit: 'cover'
                  }}
                  sizes="24px"
                />
              </div>
              <span className="country-name">
                {getText('from')}: {teacher.country.name}
              </span>
            </div>
          )}
        </div>
        
        {/* التقييمات والطلاب */}
        <div className="ed-team__details-meta">
          <div className="ed-course__lesson">
            <div className="ed-course__rattings">
              <ul>
                <li>
                  <i className="icofont-star" style={{ color: '#FFD700' }} />
                  <span style={{ marginLeft: '5px' }}>
                    {teacher.total_rate.toFixed(1)}/5
                  </span>
                </li>
                <li>
                  <span>({getText('reviews')})</span>
                </li>
              </ul>
            </div>
            <div className="ed-course__part">
              <i className="fi-rr-book" />
              <p>{teacher.students_count} {getText('students')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* المعلومات الأساسية */}
      <div className="ed-team__details-info">
        <span className="teacher-type-badge">
          {teacher.teacher_type || getText('teacherType')}
        </span>
        
        <h3 className="teacher-name">
          {teacher.name}
        </h3>
      </div>

      <style jsx>{`
        .country-flag {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(255, 255, 255, 0.95);
          padding: 8px 12px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          z-index: 10;
        }
        
        .country-flag-icon {
          width: 24px;
          height: 18px;
          position: relative;
          flex-shrink: 0;
        }
        
        .country-name {
          font-size: 14px;
          font-weight: 600;
          color: #1f2937;
        }
        
        .teacher-type-badge {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 6px 15px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 15px;
          letter-spacing: 0.5px;
        }
        
        .teacher-name {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default InstructorHeader;