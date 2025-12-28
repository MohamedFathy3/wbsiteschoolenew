"use client";

import Link from 'next/link';
import { useState } from 'react';

// دالة ترجمة مستقلة
const getText = (key: string, lang: string): string => {
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

interface CourseListProps {
  lang: string;
  courses: any[];
  loading: boolean;
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
  onPageChange: (page: number) => void;
}

const CourseList = ({ lang, courses, loading, pagination, onPageChange }: CourseListProps) => {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const isAr = lang === 'ar';

  const handleImgError = (courseId: number) => {
    setImgErrors(prev => ({ ...prev, [courseId]: true }));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">
          {isAr ? 'جاري تحميل الدروس...' : 'Loading lessons...'}
        </p>
      </div>
    );
  }

  if (!loading && courses.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="fi fi-rr-search" style={{ fontSize: '48px', color: '#ccc' }} />
        </div>
        <h4 className="mb-3">
          {isAr ? 'لا توجد نتائج' : 'No Results Found'}
        </h4>
        <p className="text-muted mb-4">
          {isAr 
            ? 'لم نتمكن من العثور على أي دروس تطابق بحثك.'
            : 'We couldn\'t find any lessons matching your search.'
          }
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.href = '/courses'}
        >
          {isAr ? 'عرض جميع الدروس' : 'View All Lessons'}
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Course Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {courses.map((course) => {
          const courseData = {
            id: course.id,
            title: isAr 
              ? (course.name_ar || course.title || course.name || 'درس بدون عنوان')
              : (course.name_en || course.name || 'Untitled Lesson'),
            type: course.type || 'recorded',
            originalPrice: parseFloat(course.original_price || course.price) || 0,
            discount: parseFloat(course.discount) || 0,
            price: parseFloat(course.price) || 0,
            semester: course.semester,
            lessons: course.details?.length || course.lessons_count || 0,
            teacherName: course.teacher?.name || course.teacher?.user?.name,
            teacherImage: course.teacher?.image || course.teacher?.user?.image,
            curriculumName: isAr ? course.curriculum?.name_ar : course.curriculum?.name_en || course.curriculum?.name,
            stageName: isAr ? course.stage?.name_ar : course.stage?.name_en,
            countryName: isAr ? course.country?.name_ar : course.country?.name_en,
            students: course.subscribers_count || course.students_count || 0,
            reviews: Math.round(course.average_rating) || 0,
            image: course.image || '/assets/images/course/course-1/default.png',
            currency: course.currency || "ج.م",
            rating: course.average_rating || 0,
          };

          const imageSrc = imgErrors[course.id] 
            ? '/assets/images/course/course-1/default.png' 
            : (courseData.image || '/assets/images/course/course-1/default.png');

          // حساب السعر بعد الخصم
          const finalPrice = courseData.discount > 0 
            ? courseData.originalPrice * (1 - courseData.discount / 100)
            : courseData.originalPrice;

          return (
            <div key={course.id} className="col">
              <div className="course-card" style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                height: '100%'
              }}>
                {/* Image Section */}
                <div style={{ 
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden'
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
                    onError={() => handleImgError(course.id)}
                  />
                  
                  {/* Type Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    [isAr ? 'left' : 'right']: '12px',
                    backgroundColor: courseData.type === 'recorded' ? '#28a745' : '#007bff',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {courseData.type === 'recorded' ? 
                      getText('recorded', lang) : 
                      getText('live', lang)}
                  </div>
                  
                  {/* Discount Badge */}
                  {courseData.discount > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      [isAr ? 'right' : 'left']: '12px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {courseData.discount}% {getText('discount', lang)}
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div style={{ padding: '20px' }}>
                  {/* Course Info */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    marginBottom: '15px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <i className="fi fi-rr-document" style={{ color: '#3b82f6', fontSize: '14px' }} />
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {courseData.lessons} {getText('lessons', lang)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <i className="fi fi-rr-users" style={{ color: '#3b82f6', fontSize: '14px' }} />
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>
                        {courseData.students} {getText('students', lang)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Course Title */}
                  <Link href={`/course-details/${course.id}`}>
                    <h5 style={{ 
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      color: '#333',
                      marginBottom: '10px',
                      minHeight: '50px',
                      textAlign: isAr ? 'right' : 'left'
                    }}>
                      {courseData.title}
                    </h5>
                  </Link>
                  
                  {/* Teacher Info */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    marginBottom: '15px'
                  }}>
                    {courseData.teacherImage && (
                      <div style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '2px solid #f0f0f0'
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
                      <p style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: '600',
                        color: '#333',
                        margin: 0
                      }}>
                        {courseData.teacherName || getText('unknownTeacher', lang)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Course Details */}
                  <div style={{ marginBottom: '15px' }}>
                    <div className="row g-2">
                      {courseData.curriculumName && (
                        <div className="col-6">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <i className="fi fi-rr-book" style={{ fontSize: '12px', color: '#3b82f6' }} />
                            <span style={{ fontSize: '0.75rem', color: '#666' }}>
                              {courseData.curriculumName}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {courseData.stageName && (
                        <div className="col-6">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <i className="fi fi-rr-graduation-cap" style={{ fontSize: '12px', color: '#3b82f6' }} />
                            <span style={{ fontSize: '0.75rem', color: '#666' }}>
                              {courseData.stageName}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {courseData.semester && (
                        <div className="col-6">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <i className="fi fi-rr-calendar" style={{ fontSize: '12px', color: '#3b82f6' }} />
                            <span style={{ fontSize: '0.75rem', color: '#666' }}>
                              {courseData.semester === 'one' ? 
                                getText('semester1', lang) : 
                                courseData.semester === 'two' ? 
                                getText('semester2', lang) : 
                                courseData.semester}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {courseData.countryName && (
                        <div className="col-6">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <i className="fi fi-rr-globe" style={{ fontSize: '12px', color: '#3b82f6' }} />
                            <span style={{ fontSize: '0.75rem', color: '#666' }}>
                              {courseData.countryName}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  {courseData.rating > 0 && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: '5px',
                      marginBottom: '15px'
                    }}>
                      <div style={{ color: '#ffc107' }}>
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i}
                            className={`fi fi-${i < Math.floor(courseData.rating) ? 'sr' : 'rr'}-star`}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                        {courseData.rating.toFixed(1)}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#666' }}>
                        ({courseData.reviews} {getText('reviews', lang)})
                      </span>
                    </div>
                  )}
                  
                  {/* Price and Button */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '15px'
                  }}>
                    <div>
                      {courseData.discount > 0 && (
                        <span style={{ 
                          fontSize: '0.85rem', 
                          color: '#999',
                          textDecoration: 'line-through',
                          marginRight: '8px'
                        }}>
                          {courseData.currency}{courseData.originalPrice.toFixed(2)}
                        </span>
                      )}
                      <span style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 'bold',
                        color: '#007bff'
                      }}>
                        {courseData.currency}{finalPrice.toFixed(2)}
                      </span>
                    </div>
                    <Link 
                      href={`/course-details/${course.id}`}
                      style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        padding: '8px 20px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s'
                      }}
                    >
                      {getText('enrollNow', lang)}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Pagination */}
      {courses.length > 0 && pagination.last_page > 1 && (
        <div className="mt-5">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px'
          }}>
            <button
              onClick={() => onPageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              style={{
                padding: '8px 20px',
                backgroundColor: pagination.current_page === 1 ? '#e0e0e0' : '#3b82f6',
                color: pagination.current_page === 1 ? '#999' : 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: pagination.current_page === 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className={`fi fi-rr-arrow-small-left ${isAr ? 'rotate-180' : ''}`} />
              {isAr ? 'السابق' : 'Previous'}
            </button>
            
            <span style={{ color: '#666' }}>
              {isAr 
                ? `الصفحة ${pagination.current_page} من ${pagination.last_page}`
                : `Page ${pagination.current_page} of ${pagination.last_page}`
              }
            </span>
            
            <button
              onClick={() => onPageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              style={{
                padding: '8px 20px',
                backgroundColor: pagination.current_page === pagination.last_page ? '#e0e0e0' : '#3b82f6',
                color: pagination.current_page === pagination.last_page ? '#999' : 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: pagination.current_page === pagination.last_page ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isAr ? 'التالي' : 'Next'}
              <i className={`fi fi-rr-arrow-small-right ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;