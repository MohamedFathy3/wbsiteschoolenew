"use client";

import Image from 'next/image';
import { useLang } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Course } from '@/types/course';

interface ProfileSidebarProps {
  student: any;
  courses: Course[];
  onLogout: () => void;
}

const ProfileSidebar = ({ student, courses, onLogout }: ProfileSidebarProps) => {
  const { lang } = useLang();

  return (
    <div className="ed-profile__sidebar mb-30">
      <div className="ed-profile__user text-center mb-30">
        <div className="ed-profile__user-img mb-20">
          {student?.image ? (
            <Image 
              src={student.image} 
              alt={student.name} 
              width={150} 
              height={150}
              className="rounded-circle"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="ed-profile__user-placeholder">
              <span>{student?.name?.charAt(0) || 'S'}</span>
            </div>
          )}
        </div>
        <div className="ed-profile__user-content">
          <h4 className="ed-profile__user-name">{student?.name}</h4>
          <p className="ed-profile__user-email">
            <i className="fi fi-rr-envelope"></i> {student?.email}
          </p>
          <div className="ed-profile__user-meta">
            <span className="ed-profile__user-meta-item">
              <i className="fi fi-rr-graduation-cap"></i> {student?.stage}
            </span>
            <span className="ed-profile__user-meta-item">
              <i className="fi fi-rr-flag"></i> {student?.country}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="ed-profile__stats mb-30">
        <div className="row g-2">
          <div className="col-6">
            <div className="ed-profile__stats-item text-center">
              <h3>{courses.length}</h3>
              <p>{lang === 'ar' ? 'الدورات' : 'Courses'}</p>
            </div>
          </div>
          <div className="col-6">
            <div className="ed-profile__stats-item text-center">
              <h3>#{student?.qr_code || '0000'}</h3>
              <p>{lang === 'ar' ? 'الكود' : 'Code'}</p>
            </div>
          </div>
          <div className="col-6">
            <div className="ed-profile__stats-item text-center">
              <h3>
                {courses.reduce((total, course) => total + (course.details?.length || 0), 0)}
              </h3>
              <p>{lang === 'ar' ? 'الدروس' : 'Lessons'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="ed-profile__actions">
        <button 
          onClick={onLogout} 
          className="ed-btn ed-btn--secondary w-100 mb-10"
        >
          <i className="fi fi-rr-sign-out-alt me-2"></i>
          {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;