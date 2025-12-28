// components/CourseItem.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from "@/context/LanguageContext";
import { Course } from '@/types/course';

interface CourseItemProps {
  course: Course;
  containerClass?: string;
  lang: string;
}

export const CourseItem = ({ course, containerClass = "col-lg-4 col-md-6 col-12 mb-4", lang }: CourseItemProps) => {
  const { t } = useLang();
  const [imgError, setImgError] = useState(false);
  
  const courseData = {
    id: course.id,
    title: course.title,
    description: course.description,
    type: course.type,
    originalPrice: parseFloat(course.original_price) || 0,
    discount: parseFloat(course.discount) || 0,
    price: parseFloat(course.price) || 0,
    semester: course.semester,
    lessons: course.details?.length || 0,
    teacherName: course.teacher?.name,
    teacherImage: course.teacher?.image,
    teacherRating: 0,
    teacherCoursesCount: 0,
    curriculumName: course.curricula?.name,
    stageName: course.stage?.name,
    countryName: course.country?.name,
    students: course.subscribers_count || 0,
    reviews: Math.round(course.average_rating) || 0,
    image: course.image || '/assets/images/course/course-1/default.png',
    currency: course.currency || "$",
    rating: course.average_rating || 0,
  };

  const imageSrc = imgError ? '/assets/images/course/course-1/default.png' : courseData.image;

  // دالة آمنة للحصول على الترجمة
  const getText = (key: string): string => {
    // حل مشكلة TypeScript باستخدام type assertion
    if (t && typeof t === 'object') {
      // تحويل t إلى Record<string, string> للوصول الآمن
      const translations = t as Record<string, string>;
      if (translations[key]) {
        return translations[key];
      }
    }
    
    // ترجمات افتراضية إذا لم توجد في context
    const defaultTranslations: Record<string, { en: string; ar: string }> = {
      lessons: { en: "Lessons", ar: "درس" },
      students: { en: "Students", ar: "طالب" },
      recorded: { en: "Recorded", ar: "مسجل" },
      live: { en: "Live", ar: "مباشر" },
      discount: { en: "OFF", ar: "خصم" },
      semester1: { en: "Semester 1", ar: "الفصل الأول" },
      semester2: { en: "Semester 2", ar: "الفصل الثاني" },
      enrollNow: { en: "Enroll Now", ar: "اشترك الآن" },
      teacher: { en: "Teacher", ar: "المدرس" },
      unknownTeacher: { en: "Unknown Teacher", ar: "مدرس غير معروف" },
      reviews: { en: "Reviews", ar: "التقييمات" },
      courses: { en: "Courses", ar: "الدورات" },
    };
    
    if (defaultTranslations[key]) {
      return defaultTranslations[key][lang as 'en' | 'ar'];
    }
    
    return key;
  };

  return (
    <div className={containerClass}>
      <div className="ed-course__card wow fadeInUp" data-wow-duration="1s">
        {/* Course Image */}
        <Link href={`/course-details/${course.id}`} className="ed-course__img">
          <div style={{ 
            width: '100%', 
            height: '200px', 
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '8px 8px 0 0'
          }}>
            <img
              src={imageSrc}
              alt={courseData.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              onError={() => setImgError(true)}
            />
            {/* Course Type Badge */}
            <span className="course-type-badge" style={{
              position: 'absolute',
              top: '10px',
              right: lang === 'ar' ? 'auto' : '10px',
              left: lang === 'ar' ? '10px' : 'auto',
              backgroundColor: courseData.type === 'recorded' ? '#28a745' : '#007bff',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>
              {courseData.type === 'recorded' ? 
                getText('recorded') : 
                getText('live')}
            </span>
            
            {/* Discount Badge */}
            {courseData.discount > 0 && (
              <span className="discount-badge" style={{
                position: 'absolute',
                top: '10px',
                left: lang === 'ar' ? 'auto' : '10px',
                right: lang === 'ar' ? '10px' : 'auto',
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}>
                {courseData.discount}% {getText('discount')}
              </span>
            )}
          </div>
        </Link>
        
        <div className="ed-course__body">
          {/* Course Info */}
          <div className="ed-course__lesson d-flex justify-content-between mb-3">
            <div className="ed-course__part d-flex align-items-center gap-2">
              <i className="fi-rr-book text-primary" />
              <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                {courseData.lessons} {getText('lessons')}
              </p>
            </div>
            
            <div className="ed-course__students d-flex align-items-center gap-2">
              <i className="fi fi-rr-graduation-cap text-primary" />
              <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                {courseData.students} {getText('students')}
              </p>
            </div>
          </div>
          
          {/* Course Title */}
          <Link href={`/course-details/${course.id}`} className="ed-course__title mb-2">
            <h5 style={{ 
              minHeight: '60px',
              textAlign: lang === 'ar' ? 'right' : 'left',
              direction: lang === 'ar' ? 'rtl' : 'ltr',
              fontWeight: 'bold',
              color: '#333'
            }}>
              {courseData.title}
            </h5>
          </Link>
          
          {/* Teacher Info */}
          <div className="ed-course__teacher-info mb-3">
            <div className="d-flex align-items-center gap-2">
              {courseData.teacherImage && (
                <div style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #f0f0f0',
                }}>
                  <img 
                    src={courseData.teacherImage} 
                    alt={courseData.teacherName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}
              <div>
                <p className="mb-0" style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {courseData.teacherName || getText('unknownTeacher')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Course Meta Info */}
          <div className="ed-course__meta mb-3">
            <div className="row g-2">
              {courseData.curriculumName && (
                <div className="col-6">
                  <div className="d-flex align-items-center gap-1">
                    <i className="fi-rr-document text-info" style={{ fontSize: '0.8rem' }} />
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>
                      {courseData.curriculumName}
                    </span>
                  </div>
                </div>
              )}
              
              {courseData.stageName && (
                <div className="col-6">
                  <div className="d-flex align-items-center gap-1">
                    <i className="fi-rr-graduation-cap text-secondary" style={{ fontSize: '0.8rem' }} />
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>
                      {courseData.stageName}
                    </span>
                  </div>
                </div>
              )}
              
              {courseData.countryName && (
                <div className="col-6">
                  <div className="d-flex align-items-center gap-1">
                    <i className="fi-rr-flag text-success" style={{ fontSize: '0.8rem' }} />
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>
                      {courseData.countryName}
                    </span>
                  </div>
                </div>
              )}
              
              {courseData.semester && (
                <div className="col-6">
                  <div className="d-flex align-items-center gap-1">
                    <i className="fi-rr-calendar text-warning" style={{ fontSize: '0.8rem' }} />
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>
                      {courseData.semester === 'one' ? 
                        getText('semester1') : 
                       courseData.semester === 'two' ? 
                        getText('semester2') : 
                        courseData.semester}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Rating */}
          {courseData.rating > 0 && (
            <div className="ed-course__rating mb-3">
              <div className="d-flex align-items-center gap-1">
                <i className="icofont-star text-warning" />
                <span className="text-warning">{courseData.rating.toFixed(1)}</span>
                <small className="text-muted">
                  ({courseData.reviews} {getText('reviews')})
                </small>
              </div>
            </div>
          )}
          
          {/* Price and Enroll Button */}
          <div className="ed-course__bottom">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {courseData.discount > 0 && (
                  <span className="text-muted text-decoration-line-through me-2" style={{ fontSize: '0.8rem' }}>
                    {courseData.currency}{courseData.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="ed-course__price" style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold',
                  color: '#007bff'
                }}>
                  {courseData.currency}{courseData.price.toFixed(2)}
                </span>
              </div>
              <Link 
                href={`/course-details/${course.id}`}
                className="btn btn-primary btn-sm"
                style={{
                  padding: '6px 20px',
                  borderRadius: '20px',
                  fontWeight: 'bold',
                }}
              >
                {getText('enrollNow')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};