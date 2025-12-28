"use client";

import { useLang } from '@/context/LanguageContext';

interface ProfileTabsProps {
  activeTab: 'info' | 'courses' | 'activity';
  onTabChange: (tab: 'info' | 'courses' | 'activity') => void;
  coursesCount: number;
}

const ProfileTabs = ({ activeTab, onTabChange, coursesCount }: ProfileTabsProps) => {
  const { lang } = useLang();

  return (
    <div className="ed-profile__tabs mb-30">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => onTabChange('info')}
          >
            <i className="fi fi-rr-user me-2"></i>
            {lang === 'ar' ? 'معلوماتي' : 'My Info'}
          </button>
          <button
            className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => onTabChange('courses')}
          >
            <i className="fi fi-rr-book me-2"></i>
            {lang === 'ar' ? 'دوراتي' : 'My Courses'}
            <span className="badge bg-primary ms-2">{coursesCount}</span>
          </button>
          <button
            className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => onTabChange('activity')}
          >
            <i className="fi fi-rr-chart-histogram me-2"></i>
            {lang === 'ar' ? 'نشاطي' : 'My Activity'}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ProfileTabs;