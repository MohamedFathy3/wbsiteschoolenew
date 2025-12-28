'use client';
import Image from "next/image";
import Link from "next/link";

interface CurriculumCardProps {
  curriculum: {
    id: number;
    name: string;
    active: boolean;
    image: string;
  };
  lang: 'en' | 'ar';
}

const CurriculumCard = ({ curriculum, lang }: CurriculumCardProps) => {
  const getDefaultImage = () => {
    return "/assets/images/curriculum/default-curriculum.jpg";
  };

  return (
    <div className="ed-curriculum__card" style={{
      background: "white",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      transition: "all 0.3s ease",
      height: "100%",
      border: "1px solid #eaeaea"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-10px)";
      e.currentTarget.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.15)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.08)";
    }}>
      {/* Curriculum Image */}
      <div className="ed-curriculum__img" style={{
        position: "relative",
        height: "250px",
        overflow: "hidden"
      }}>
        <Image
          src={curriculum.image || getDefaultImage()}
          alt={curriculum.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
        
        {/* Active Badge */}
        {curriculum.active && (
          <div style={{
            position: "absolute",
            top: "15px",
            left: lang === 'ar' ? 'auto' : '15px',
            right: lang === 'ar' ? '15px' : 'auto',
            background: "#10b981",
            color: "white",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "5px"
          }}>
            <span style={{ fontSize: "10px" }}>●</span>
            {lang === 'ar' ? 'نشط' : 'Active'}
          </div>
        )}
      </div>

      {/* Curriculum Content */}
      <div className="ed-curriculum__content" style={{
        padding: "25px",
        textAlign: lang === 'ar' ? 'right' : 'left'
      }}>
        <h3 className="ed-curriculum__name" style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#1f2937",
          marginBottom: "10px",
          lineHeight: "1.3"
        }}>
          {curriculum.name}
        </h3>
        
        {/* View Stages Button */}
        <Link 
          href={`curriculums/${curriculum.id}/stages`}
          className="ed-curriculum__btn"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            color: "white",
            padding: "12px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px",
            transition: "all 0.3s",
            border: "none",
            cursor: "pointer",
            marginTop: "15px",
            width: "100%",
            textAlign: "center"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {lang === 'ar' ? 'عرض المراحل' : 'View Stages'}
          <i className="fi fi-rr-arrow-small-right" style={{
            marginRight: lang === 'ar' ? "8px" : "0",
            marginLeft: lang === 'ar' ? "0" : "8px",
            transform: lang === 'ar' ? "scaleX(-1)" : "none"
          }} />
        </Link>
      </div>
    </div>
  );
};

export default CurriculumCard;