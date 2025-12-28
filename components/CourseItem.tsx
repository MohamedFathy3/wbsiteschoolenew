// components/CourseItem.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  description: string;
  type: string;
  original_price: string;
  discount: string;
  price: string;
  image: string;
  currency: string;
  subscribers_count: number;
  teacher: {
    name: string;
    image: string;
  };
  stage: {
    name: string;
  };
  subject: {
    name: string;
  };
  details?: any[];
  average_rating: number;
  created_at: string;
}

interface CourseItemProps {
  course: Course;
  containerClass?: string;
  lang: string;
}

const CourseItem = ({ course, containerClass = "col-lg-6 col-12 mb-4", lang }: CourseItemProps) => {
  const [imgError, setImgError] = useState(false);
  
  const imageSrc = imgError || !course.image 
    ? '/assets/images/course/course-1/default.png' 
    : course.image;

  const courseData = {
    id: course.id,
    title: course.title,
    description: course.description || "No description available",
    type: course.type,
    originalPrice: parseFloat(course.original_price) || 0,
    discount: parseFloat(course.discount) || 0,
    price: parseFloat(course.price) || 0,
    lessons: course.details?.length || 0,
    teacherName: course.teacher?.name || "Unknown Teacher",
    teacherImage: course.teacher?.image,
    stageName: course.stage?.name || "No Stage",
    students: course.subscribers_count || 0,
    rating: course.average_rating || 0,
    image: imageSrc,
    currency: course.currency || "$",
    created_at: course.created_at
  };

  return (
    <div className={containerClass}>
      <div className="ed-course__card ed-course__card--profile wow fadeInUp" data-wow-duration="1s">
        {/* Course Image */}
        <Link href={`/course-details/${course.id}`} className="ed-course__img">
          <div style={{ 
            width: '100%', 
            height: '180px', 
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px 12px 0 0'
          }}>
            <img
              src={courseData.image}
              alt={courseData.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              onError={() => setImgError(true)}
            />
            <div className="ed-course__overlay">
              <span className="ed-course__badge">
                {courseData.type === 'recorded' 
                  ? (lang === 'ar' ? 'مسجل' : 'Recorded') 
                  : (lang === 'ar' ? 'مباشر' : 'Live')}
              </span>
            </div>
          </div>
        </Link>
        
        <div className="ed-course__body">
          {/* Course Meta */}
          <div className="ed-course__meta mb-2">
            <div className="d-flex justify-content-between">
              <div className="ed-course__lessons">
                <i className="fi fi-rr-play-circle" />
                <span>{courseData.lessons} {lang === 'ar' ? 'درس' : 'Lessons'}</span>
              </div>
              <div className="ed-course__students">
                <i className="fi fi-rr-users" />
                <span>{courseData.students}</span>
              </div>
            </div>
          </div>
          
          {/* Course Title */}
          <h5 className="ed-course__title mb-2">
            <Link href={`/course-details/${course.id}`}>
              {courseData.title}
            </Link>
          </h5>
          
          {/* Course Description */}
          <p className="ed-course__desc mb-3">
            {courseData.description.length > 80 
              ? `${courseData.description.substring(0, 80)}...`
              : courseData.description}
          </p>
          
          {/* Teacher Info */}
          <div className="ed-course__teacher mb-3">
            <div className="d-flex align-items-center">
              {courseData.teacherImage && (
                <div className="ed-course__teacher-img me-2">
                  <img 
                    src={courseData.teacherImage} 
                    alt={courseData.teacherName}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/assets/images/avatar/default.png';
                    }}
                  />
                </div>
              )}
              <div className="ed-course__teacher-name">
                <small>{lang === 'ar' ? 'المدرس:' : 'Teacher:'}</small>
                <span className="ms-1 fw-bold">{courseData.teacherName}</span>
              </div>
            </div>
          </div>
          
          {/* Stage & Subject */}
          <div className="ed-course__info mb-3">
            <div className="row g-2">
              <div className="col-6">
                <div className="ed-course__info-item">
                  <i className="fi fi-rr-graduation-cap" />
                  <span>{courseData.stageName}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="ed-course__info-item">
                  <i className="fi fi-rr-book" />
                  <span>{course.subject?.name || lang === 'ar' ? 'مادة' : 'Subject'}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Price & Rating */}
          <div className="ed-course__footer">
            <div className="d-flex justify-content-between align-items-center">
              <div className="ed-course__price">
                <span className="ed-course__current-price">
                  {courseData.currency}{courseData.price.toFixed(2)}
                </span>
                {courseData.discount > 0 && (
                  <>
                    <span className="ed-course__old-price ms-2">
                      {courseData.currency}{courseData.originalPrice.toFixed(2)}
                    </span>
                    <span className="ed-course__discount ms-2">
                      {courseData.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              
              <div className="ed-course__rating">
                <i className="fi fi-rr-star" />
                <span>{courseData.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .ed-course__card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }
        
        .ed-course__card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }
        
        .ed-course__overlay {
          position: absolute;
          top: 15px;
          right: 15px;
        }
        
        .ed-course__badge {
          background: #667eea;
          color: white;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .ed-course__body {
          padding: 20px;
        }
        
        .ed-course__title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        
        .ed-course__title a {
          color: inherit;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .ed-course__title a:hover {
          color: #667eea;
        }
        
        .ed-course__desc {
          color: #666;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 15px;
        }
        
        .ed-course__meta {
          color: #888;
          font-size: 13px;
        }
        
        .ed-course__meta i {
          margin-right: 5px;
          color: #667eea;
        }
        
        .ed-course__teacher-img img {
          border: 2px solid #f0f0f0;
        }
        
        .ed-course__teacher-name {
          font-size: 14px;
        }
        
        .ed-course__teacher-name small {
          color: #888;
        }
        
        .ed-course__info-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 13px;
          background: #f8f9fa;
          padding: 6px 10px;
          border-radius: 6px;
        }
        
        .ed-course__info-item i {
          color: #667eea;
        }
        
        .ed-course__current-price {
          font-size: 18px;
          font-weight: 600;
          color: #667eea;
        }
        
        .ed-course__old-price {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
        }
        
        .ed-course__discount {
          font-size: 12px;
          color: #10b981;
          background: #d1fae5;
          padding: 2px 6px;
          border-radius: 4px;
        }
        
        .ed-course__rating {
          color: #f59e0b;
          font-weight: 600;
          font-size: 14px;
        }
        
        .ed-course__rating i {
          margin-right: 4px;
        }
      `}</style>
    </div>
  );
};

export default CourseItem;