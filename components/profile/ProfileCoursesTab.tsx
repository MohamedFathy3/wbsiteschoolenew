"use client";

import { useLang } from '@/context/LanguageContext';
import Link from 'next/link';
import CourseItem from '@/components/CourseItem';
import { Course } from '@/types/course';

interface ProfileCoursesTabProps {
  courses: Course[];
  loading: boolean;
}

const ProfileCoursesTab = ({ courses, loading }: ProfileCoursesTabProps) => {
  const { lang } = useLang();

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">{lang === 'ar' ? 'جاري تحميل الدورات...' : 'Loading courses...'}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="ed-empty-state text-center py-5">
        <div className="ed-empty-state__icon mb-3">
          <i className="fi fi-rr-book display-1 text-muted"></i>
        </div>
        <h4 className="ed-empty-state__title mb-2">
          {lang === 'ar' ? 'لا توجد دورات بعد' : 'No courses yet'}
        </h4>
        <p className="ed-empty-state__text mb-4">
          {lang === 'ar' 
            ? 'لم تشترك في أي دورة حتى الآن. ابدأ رحلة التعلم الآن!' 
            : 'You haven\'t enrolled in any courses yet. Start your learning journey now!'}
        </p>
        <Link href="/courses" className="ed-btn ed-btn--primary">
          <i className="fi fi-rr-search me-2"></i>
          {lang === 'ar' ? 'تصفح الدورات' : 'Browse Courses'}
        </Link>
      </div>
    );
  }

  return (
    <div className="row">
      {courses.map((course) => (
        <CourseItem 
          key={course.id} 
          course={course}
          lang={lang}
          containerClass="col-lg-6 col-12 mb-4"
        />
      ))}
    </div>
  );
};

export default ProfileCoursesTab;