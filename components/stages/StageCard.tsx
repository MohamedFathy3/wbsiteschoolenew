'use client';
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { Stage } from "@/types/stage";

interface StageCardProps {
  stage: Stage;
}

const StageCard = ({ stage }: StageCardProps) => {
  const { lang } = useLang();

  const translations = {
    stage: {
      en: "Stage",
      ar: "مرحلة"
    },
    curriculum: {
      en: "Curriculum",
      ar: "المنهج"
    },
    country: {
      en: "Country",
      ar: "البلد"
    },
    position: {
      en: "Position",
      ar: "الترتيب"
    },
    viewSubjects: {
      en: "View Subjects",
      ar: "عرض المواد"
    }
  };

  const getText = (key: keyof typeof translations) => {
    return translations[key][lang as 'en' | 'ar'];
  };

  const getDefaultImage = () => {
    return "/assets/images/stage/default-stage.jpg";
  };

  return (
    <div className="ed-stage__card" style={{
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      height: "100%",
      transition: "all 0.3s ease",
      border: "1px solid #e5e7eb",
      textAlign: lang === 'ar' ? 'right' : 'left',
      position: "relative"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    }}>
      
      {/* Stage Badge */}
      <div style={{
        position: "absolute",
        top: "10px",
        left: lang === 'ar' ? 'auto' : '10px',
        right: lang === 'ar' ? '10px' : 'auto',
        background: "#3b82f6",
        color: "white",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        zIndex: 1
      }}>
        {getText('stage')} #{stage.postion}
      </div>

      {/* Stage Image */}
      <div style={{
        height: "180px",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "15px",
        position: "relative"
      }}>
        {stage.image ? (
          <Image
            src={stage.image}
            alt={stage.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#9ca3af"
          }}>
            <span style={{ fontSize: "48px" }}>📚</span>
          </div>
        )}
      </div>

      {/* Stage Name */}
      <h4 style={{
        fontSize: "18px",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "10px"
      }}>
        {stage.name}
      </h4>

      {/* Stage Info */}
      <div style={{ marginBottom: "20px" }}>
        {/* Curriculum Info */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "8px"
        }}>
          <div style={{
            width: "24px",
            height: "24px",
            borderRadius: "4px",
            overflow: "hidden",
            flexShrink: 0
          }}>
            {stage.curriculum.image && (
              <Image
                src={stage.curriculum.image}
                alt={stage.curriculum.name}
                width={24}
                height={24}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div>
            <div style={{
              fontSize: "12px",
              color: "#6b7280"
            }}>
              {getText('curriculum')}
            </div>
            <div style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151"
            }}>
              {stage.curriculum.name}
            </div>
          </div>
        </div>

        {/* Country Info */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <div style={{
            width: "24px",
            height: "18px",
            borderRadius: "2px",
            overflow: "hidden",
            flexShrink: 0
          }}>
            {stage.country.image && (
              <Image
                src={stage.country.image}
                alt={stage.country.name}
                width={24}
                height={18}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div>
            <div style={{
              fontSize: "12px",
              color: "#6b7280"
            }}>
              {getText('country')}
            </div>
            <div style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151"
            }}>
              {stage.country.name}
            </div>
          </div>
        </div>
      </div>

      {/* View Subjects Button */}
      <Link 
        href={`/stages/${stage.id}/subjects`}
        style={{
          display: "block",
          background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
          color: "white",
          textAlign: "center",
          padding: "10px 15px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px",
          transition: "all 0.3s",
          marginTop: "auto"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {getText('viewSubjects')}
      </Link>
    </div>
  );
};

export default StageCard;