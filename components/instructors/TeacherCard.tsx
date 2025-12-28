'use client';
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

interface Teacher {
  id: number;
  name: string;
  image: string | null;
  teacher_type: string;
  courses_count: number;
  students_count: number;
  average_rating: number;
  country: {
    name: string;
    image: string;
  };
}

interface TeacherCardProps {
  teacher: Teacher;
}

const TeacherCard = ({ teacher }: TeacherCardProps) => {
  const { lang } = useLang();

 

  const translations = {
    designation: {
      en: "Instructor",
      ar: "معلم"
    },
    courses: {
      en: "lessons",
      ar: "الدورات"
    },
    students: {
      en: "Students",
      ar: "الطلاب"
    },
    rating: {
      en: "Rating",
      ar: "التقييم"
    }
  };

  const getText = (key: keyof typeof translations) => {
    return translations[key][lang as 'en' | 'ar'];
  };

  const getDefaultImage = () => {
    return "/assets/images/team/team-1/1.png";
  };

  return (
    <div className="ed-team__card wow fadeInUp" data-wow-duration="1s">
      <div className="ed-team__cover">
        {/* Teacher Image */}
        <div className="ed-team__img position-relative">
          <Image
            width={400}
            height={400}
            sizes="100vw"
            style={{ 
              width: "100%", 
              height: "300px", 
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
          
          {/* Country Flag */}
          {teacher.country?.image && (
  <div style={{
    position: 'absolute',
    top: '10px',
    left: lang === 'ar' ? 'auto' : '10px',
    right: lang === 'ar' ? '10px' : 'auto',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '2px 6px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backdropFilter: 'blur(2px)',
    border: '1px solid rgba(0,0,0,0.05)',
    maxWidth: '120px'
  }}>
    <div style={{
      width: '16px',
      height: '12px',
      position: 'relative',
      flexShrink: 0
    }}>
      <Image
        fill
        src={teacher.country.image}
        alt={teacher.country.name}
        style={{ 
          borderRadius: '1px',
          objectFit: 'cover'
        }}
      />
    </div>
    <span style={{ 
      fontSize: '10px', 
      fontWeight: '600',
      color: '#1f2937',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '70px'
    }}>
      {teacher.country.name}
    </span>
  </div>
)}
          
          {/* Rating Badge */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            left: lang === 'ar' ? 'auto' : '10px',
            right: lang === 'ar' ? '10px' : 'auto',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            ⭐ {teacher.average_rating.toFixed(1)}
            <span style={{ fontSize: '12px', opacity: 0.8 }}>
              ({getText('rating')})
            </span>
          </div>
        </div>
        
        {/* Social Links */}
        <ul className="ed-team__social" style={{
          justifyContent: 'center',
          marginTop: '15px'
        }}>
      
        </ul>
      </div>
      
      <div className="ed-team__info" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
        <p className="ed-team__designation" style={{
          color: '#6b7280',
          fontSize: '14px',
          marginBottom: '5px'
        }}>
          {teacher.teacher_type || getText('designation')}
        </p>
        
        <Link 
          className="ed-team__name" 
          href={`/instructor-details/${teacher.id}`}
          style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            textDecoration: 'none',
            display: 'block',
            marginBottom: '10px'
          }}
        >
          {teacher.name}
        </Link>
        
        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginTop: '10px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: '#f3f4f6',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '13px'
          }}>
            📚 {teacher.courses_count} {getText('courses')}
          </div>
          <div style={{
            background: '#f3f4f6',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '13px'
          }}>
            👨‍🎓 {teacher.students_count} {getText('students')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;