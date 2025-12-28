// components/teacher/InstructorCoursesGrid.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { Course } from "@/types/course";

interface InstructorCoursesGridProps {
  courses: Course[];
  getText: (key: string) => string;
  lang: string;
}

const InstructorCoursesGrid = ({ 
  courses, 
  getText, 
  lang 
}: InstructorCoursesGridProps) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="empty-courses text-center py-5">
        <div className="empty-icon" style={{ fontSize: '3rem', color: '#ccc' }}>
          📚
        </div>
        <h5 className="empty-title mt-3" style={{ color: '#666' }}>
          {getText('courses')}
        </h5>
        <p className="empty-text text-muted">
          {getText('noCourses')}
        </p>
      </div>
    );
  }

  return (
    <div className="courses-grid-section">
      <div className="courses-header mb-4">
        <h3 className="courses-title mb-2">
          📚 {getText('courses')} <span className="badge bg-primary">({courses.length})</span>
        </h3>
        <p className="courses-subtitle text-muted">
          {getText('allCoursesBy')?.replace('{name}', courses[0]?.teacher?.name) || 
           `${courses.length} courses available`}
        </p>
      </div>
      
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-lg-4 col-md-6 col-12 mb-4">
            <CourseGridCard 
              course={course} 
              getText={getText}
              lang={lang}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const CourseGridCard = ({ 
  course, 
  getText,
  lang 
}: { 
  course: Course; 
  getText: (key: string) => string;
  lang: string;
}) => {
  const courseData = {
    id: course.id,
    title: course.title,
    description: course.description,
    type: course.type,
    originalPrice: parseFloat(course.original_price) || 0,
    discount: parseFloat(course.discount) || 0,
    price: parseFloat(course.price) || 0,
    lessons: course.details?.length || 0,
    teacherName: course.teacher?.name,
    teacherImage: course.teacher?.image,
    stageName: course.stage?.name,
    students: course.subscribers_count || 0,
    rating: course.average_rating || 0,
    image: course.image || '/assets/images/course/course-1/default.png',
    currency: course.currency || "$",
  };

  const [imgError, setImgError] = useState(false);
  const imageSrc = imgError ? '/assets/images/course/course-1/default.png' : courseData.image;

  return (
    <div className="course-grid-card-wrapper">
      <div className="card h-100" style={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        transition: 'all 0.3s ease'
      }}>
        {/* Course Image */}
        <Link href={`/course-details/${course.id}`}>
          <div style={{ 
            width: '100%', 
            height: '180px', 
            position: 'relative',
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
              onError={() => setImgError(true)}
            />
            
            {/* Course Type Badge */}
            <span style={{
              position: 'absolute',
              top: '10px',
              right: lang === 'ar' ? 'auto' : '10px',
              left: lang === 'ar' ? '10px' : 'auto',
              backgroundColor: courseData.type === 'recorded' ? '#28a745' : '#007bff',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 'bold'
            }}>
              {courseData.type === 'recorded' ? 
                getText('recorded') : 
                getText('live')}
            </span>
            
            {/* Discount Badge */}
            {courseData.discount > 0 && (
              <span style={{
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
        
        <div className="card-body p-3">
          {/* Course Meta */}
          <div className="d-flex justify-content-between mb-2">
            <small className="text-muted">
              <i className="fi-rr-book me-1" /> {courseData.lessons} {getText('lessons')}
            </small>
            <small className="text-muted">
              <i className="fi fi-rr-graduation-cap me-1" /> {courseData.students} {getText('students')}
            </small>
          </div>
          
          {/* Course Title */}
          <Link href={`/course-details/${course.id}`} className="text-decoration-none">
            <h6 className="card-title mb-2" style={{ 
              fontSize: '1rem',
              fontWeight: '600',
              color: '#1f2937',
              lineHeight: '1.4',
              minHeight: '45px'
            }}>
              {courseData.title}
            </h6>
          </Link>
          
          {/* Stage */}
          {courseData.stageName && (
            <div className="mb-2">
              <small className="text-muted">
                <i className="fi-rr-graduation-cap me-1" /> {courseData.stageName}
              </small>
            </div>
          )}
          
          {/* Rating */}
          {courseData.rating > 0 && (
            <div className="d-flex align-items-center mb-2">
              <div className="text-warning">
                <i className="icofont-star" /> {courseData.rating.toFixed(1)}
              </div>
              <small className="text-muted ms-2">
                ({courseData.students} {getText('reviews')})
              </small>
            </div>
          )}
          
          {/* Price and Button */}
          <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
            <div>
              {courseData.discount > 0 && (
                <small className="text-muted text-decoration-line-through me-2">
                  {courseData.currency}{courseData.originalPrice.toFixed(2)}
                </small>
              )}
              <span style={{ 
                fontSize: '1.1rem', 
                fontWeight: 'bold',
                color: '#007bff'
              }}>
                {courseData.currency}{courseData.price.toFixed(2)}
              </span>
            </div>
            
            <Link 
              href={`/course-details/${course.id}`}
              className="btn btn-sm btn-primary"
              style={{
                borderRadius: '20px',
                padding: '4px 12px',
                fontSize: '0.85rem'
              }}
            >
              {getText('enrollNow')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCoursesGrid;