'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLang } from "@/context/LanguageContext";
import { Course } from "@/types/course";
import api from "@/lib/api";

export const Course3 = () => {
  const { t, lang } = useLang();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.post('course/index', {
          orderBy: 'created_at',
          orderByDirection: 'desc',
          perPage: 3,
          page: 1,
          paginate: true,
        });

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setCourses(response.data.data.slice(0, 6));
        } else {
          setCourses([]);
        }
      } catch (err: any) {
        console.error('❌ Error fetching courses:', err);
        setError(err.message || 'Failed to fetch courses');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="ed-course section-gap position-relative">
        <div className="container ed-container">
          <div className="section-title text-center mb-40">
            <h2 className="title">
              {lang === 'ar' ? 'أحدث الدروس' : 'Latest lessons'}
            </h2>
            <p className="text">
              {lang === 'ar' ? 'استكشف أحدث الدروس المضافة لدينا' : 'Explore our latest added lessons'}
            </p>
          </div>
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">{t.loading || "Loading lessons..."}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="ed-course section-gap position-relative">
        <div className="container ed-container">
          <div className="section-title text-center mb-40">
            <h2 className="title">
              {lang === 'ar' ? 'أحدث الدروس' : 'Latest lessons'}
            </h2>
            <p className="text">
              {lang === 'ar' ? 'استكشف أحدث الدروس المضافة لدينا' : 'Explore our latest added lessons'}
            </p>
          </div>
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="alert alert-danger">
                <h5>{t.error || "Error"}</h5>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="ed-course section-gap position-relative">
        <div className="container ed-container">
          <div className="section-title text-center mb-40">
            <h2 className="title">
              {lang === 'ar' ? 'أحدث الدروس' : 'Latest lessons'}
            </h2>
            <p className="text">
              {lang === 'ar' ? 'استكشف أحدث الدروس المضافة لدينا' : 'Explore our latest added lessons'}
            </p>
          </div>
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="alert alert-warning">
                <h5>{t.noCoursesFound || "No lessons Found"}</h5>
                <p>{t.noCoursesMessage || "There are no lessons available at the moment."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ed-course section-gap position-relative">
      <div className="container ed-container">
        <div className="section-title text-center mb-40">
          <h2 className="title">
            {lang === 'ar' ? 'أحدث الدروس' : 'Latest lessons'}
          </h2>
          <p className="text">
            {lang === 'ar' ? 'استكشف أحدث الدروس المضافة لدينا' : 'Explore our latest added lessons'}
          </p>
        </div>
        <div className="row">
          {courses.map((course) => (
            <CourseItem
              key={course.id}
              course={course}
              containerClass="col-lg-6 col-xl-4 col-md-6 col-12"
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CourseItem = ({
  course,
  containerClass = "col-lg-6 col-xl-4 col-md-6 col-12",
  lang
}: {
  course: Course;
  containerClass?: string;
  lang: string;
}) => {
  const { t } = useLang();
  
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
    teacherRating: course.teacher?.average_rating || 0,
    teacherCoursesCount: course.teacher?.courses_count || 0,
    curriculumName: course.curricula?.name,
    stageName: course.stage?.name,
    countryName: course.country?.name,
    students: course.subscribers_count || 0,
    reviews: Math.round(course.average_rating) || 0,
    image: course.image || '/assets/images/course/course-1/default.png',
    currency: course.currency || "$",
    whatYouWillLearn: course.what_you_will_learn,
    createdAt: course.created_at,
  };

  const [imgError, setImgError] = useState(false);
  const imageSrc = imgError ? '/assets/images/course/course-1/default.png' : courseData.image;

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
                (lang === 'ar' ? 'مسجل' : 'Recorded') : 
                (lang === 'ar' ? 'مباشر' : 'Live')}
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
                {courseData.discount}% {lang === 'ar' ? 'خصم' : 'OFF'}
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
                {courseData.lessons} {lang === 'ar' ? 'درس' : 'Lessons'}
              </p>
            </div>
            
            <div className="ed-course__students d-flex align-items-center gap-2">
              <i className="fi fi-rr-graduation-cap text-primary" />
              <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                {courseData.students} {lang === 'ar' ? 'طالب' : 'Buyer'}
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
          
          {/* Course Description */}
        
          
          {/* Teacher Info */}
          <div className="ed-course__teacher-info mb-3" style={{  marginTop: '-30px' }}>
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
                  {courseData.teacherName || (lang === 'ar' ? 'مدرس غير معروف' : 'Unknown Teacher')}
                </p>
                {courseData.teacherRating > 0 && (
                  <div className="d-flex align-items-center gap-1">
                    <span className="text-warning">
                      <i className="icofont-star" /> {courseData.teacherRating.toFixed(1)}
                    </span>
                    <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                      ({courseData.teacherCoursesCount} {lang === 'ar' ? 'درس' : 'lessons'})
                    </small>
                  </div>
                )}
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
                        (lang === 'ar' ? 'الفصل الأول' : 'Semester 1') : 
                       courseData.semester === 'two' ? 
                        (lang === 'ar' ? 'الفصل الثاني' : 'Semester 2') : 
                        courseData.semester}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Rating */}
     
          
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
                  marginLeft: lang === 'ar' ? '0' : '10px',
                }}
              >
                {lang === 'ar' ? 'اشترك الآن' : 'Enroll Now'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

