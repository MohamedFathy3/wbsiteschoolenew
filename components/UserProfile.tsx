"use client";

import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import Link from 'next/link';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const { lang } = useLang();

  if (!user) return null;

  return (
    <div className="dropdown">
      <button 
        className="btn btn-link dropdown-toggle d-flex align-items-center" 
        type="button" 
        data-bs-toggle="dropdown"
        style={{ textDecoration: 'none', color: '#333' }}
      >
        <div className="me-2">
          <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
            style={{ width: '36px', height: '36px', fontSize: '14px' }}>
            {user.name?.charAt(0) || user.email?.charAt(0) || 'S'}
          </div>
        </div>
        <div className="d-none d-md-flex flex-column text-start">
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
            {user.name || user.email}
          </span>
          <small style={{ fontSize: '12px', color: '#666' }}>
            {lang === 'ar' ? 'طالب' : 'Student'}
          </small>
        </div>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link className="dropdown-item" href="/profile">
            <i className="fi fi-rr-user me-2"></i>
            {lang === 'ar' ? 'الملف الشخصي' : 'Profile'}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/my-courses">
            <i className="fi fi-rr-book me-2"></i>
            {lang === 'ar' ? 'دوراتي' : 'My Courses'}
          </Link>
        </li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button className="dropdown-item text-danger" onClick={logout}>
            <i className="fi fi-rr-sign-out-alt me-2"></i>
            {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;