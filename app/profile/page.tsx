// app/profile/page.tsx - مع الترجمات
"use client";

import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import EdunaLayout from "@/layout/EdunaLayout";
import PageBanner from '@/components/PageBanner';
import CourseItem from '@/components/CourseItem';
import { Course } from '@/types/course';
import { useProfileTranslations } from '@/utilities/ProfileTranslations';

export default function ProfilePage() {
  const { user, isAuthenticated, loading, logout, getFullProfile } = useAuth();
  const { lang } = useLang();
  const [fullProfile, setFullProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'info' | 'courses' | 'activity'>('info');

  // مثال على استخدام nationalDocuments
const { t, nationalDocuments } = useProfileTranslations();
const nationalDocsTitle = nationalDocuments(true, false);
  // جلب البيانات الكاملة
  const loadFullProfile = async () => {
    if (!isAuthenticated) return;
    
    try {
      setProfileLoading(true);
      const data = await getFullProfile();
      
      if (data) {
        setFullProfile(data);
      } else {
        toast.error(lang === 'ar' ? 'فشل في جلب البيانات' : 'Failed to load profile');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error(lang === 'ar' ? 'حدث خطأ' : 'An error occurred');
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadFullProfile();
    }
  }, [isAuthenticated]);

  // إذا كان التحميل مستمر
  if (loading) {
    return (
      <EdunaLayout>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
            </div>
          </div>
        </div>
      </EdunaLayout>
    );
  }

  // إذا المستخدم غير مسجل
  if (!isAuthenticated) {
    return (
      <EdunaLayout>
              <PageBanner pageTitleEn="Profile" pageTitleAr="الملف الشخصي" />

        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="alert alert-warning">
                <h4>{lang === 'ar' ? 'غير مصرح لك' : 'Unauthorized'}</h4>
                <p>{lang === 'ar' ? 'يجب تسجيل الدخول لعرض هذه الصفحة' : 'You must login to view this page'}</p>
                <Link href="/" className="btn btn-primary mt-3">
                  {lang === 'ar' ? 'العودة للرئيسية' : 'Go to Home'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </EdunaLayout>
    );
  }

  const student = fullProfile?.student || user;
  const courses: Course[] = fullProfile?.student?.courses || [];

  return (
    <EdunaLayout>
      <PageBanner pageTitleEn="Profile" pageTitleAr="الملف الشخصي" />
      
      {/* عرض عنوان الوطنية كاختبار */}
      <div className="container mt-4">
        <div className="alert alert-info text-center">
          <strong>{nationalDocsTitle}</strong>
        </div>
      </div>
      
      <section className="ed-profile__area pt-100 pb-100">
        <div className="container">
          <div className="row">
            {/* Profile Sidebar */}
            <div className="col-lg-4 col-md-5">
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
                        <p>{t.courses()}</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="ed-profile__stats-item text-center">
                        <h3>#{student?.qr_code || '0000'}</h3>
                        <p>{t.code()}</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="ed-profile__stats-item text-center">
                        <h3>
                          {courses.reduce((total, course) => total + (course.details?.length || 0), 0)}
                        </h3>
                        <p>{t.lessons()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="ed-profile__actions">
                  <button 
                    onClick={logout} 
                    className="ed-btn ed-btn--secondary w-100 mb-10"
                  >
                    <i className="fi fi-rr-sign-out-alt me-2"></i>
                    {t.logout()}
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Main Content */}
            <div className="col-lg-8 col-md-7">
              <div className="ed-profile__main">
                {/* Profile Tabs */}
                <div className="ed-profile__tabs mb-30">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className={`nav-link ${activeTab === 'info' ? 'active' : ''}`}
                        onClick={() => setActiveTab('info')}
                      >
                        <i className="fi fi-rr-user me-2"></i>
                        {t.myInfo()}
                      </button>
                      <button
                        className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`}
                        onClick={() => setActiveTab('courses')}
                      >
                        <i className="fi fi-rr-book me-2"></i>
                        {t.myCourses()}
                        <span className="badge bg-primary ms-2">{courses.length}</span>
                      </button>
                      {/* <button
                        className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
                        onClick={() => setActiveTab('activity')}
                      >
                        <i className="fi fi-rr-chart-histogram me-2"></i>
                        {t.myActivity()}
                      </button> */}
                    </div>
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="ed-profile__tab-content">
                  {/* Personal Info Tab */}
                  {activeTab === 'info' && (
                    <div className="ed-profile__info">
                      <div className="row">
                        <div className="col-12">
                          <div className="ed-profile__card mb-30">
                            <div className="ed-profile__card-header">
                              <h4>
                                <i className="fi fi-rr-id-card-clip-alt me-2"></i>
                                {t.personalInfo()}
                              </h4>
                            </div>
                            <div className="ed-profile__card-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="ed-profile__info-item mb-3">
                                    <label>{t.fullName()}</label>
                                    <p>{student?.name}</p>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="ed-profile__info-item mb-3">
                                    <label>{t.email()}</label>
                                    <p>{student?.email}</p>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="ed-profile__info-item mb-3">
                                    <label>{t.phoneNumber()}</label>
                                    <p>{student?.phone || t.notAdded()}</p>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="ed-profile__info-item mb-3">
                                    <label>{t.country()}</label>
                                    <p>{student?.country}</p>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="ed-profile__info-item mb-3">
                                    <label>{t.academicStage()}</label>
                                    <p>{student?.stage}</p>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="ed-profile__info-item mb-3">
                                    <label>{t.studentID()}</label>
                                    <p className="ed-profile__code">#{student?.qr_code}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Courses Tab */}
                  {activeTab === 'courses' && (
                    <div className="ed-profile__courses">
                      {profileLoading ? (
                        <div className="text-center py-5">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p className="mt-3">{t.loadingCourses()}</p>
                        </div>
                      ) : courses.length === 0 ? (
                        <div className="ed-empty-state text-center py-5">
                          <div className="ed-empty-state__icon mb-3">
                            <i className="fi fi-rr-book display-1 text-muted"></i>
                          </div>
                          <h4 className="ed-empty-state__title mb-2">
                            {t.noCoursesYet()}
                          </h4>
                          <p className="ed-empty-state__text mb-4">
                            {t.startLearning()}
                          </p>
                          <Link href="/courses" className="ed-btn ed-btn--primary">
                            <i className="fi fi-rr-search me-2"></i>
                            {t.browseCourses()}
                          </Link>
                        </div>
                      ) : (
                        <div className="row">
                          {courses.map((course) => (
                            <CourseItem 
                              key={course.id} 
                              course={{
                                ...course,
                                details: course.details || []
                              }}
                              lang={lang}
                              containerClass="col-lg-6 col-12 mb-4"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Activity Tab */}
                  {activeTab === 'activity' && (
                    <div className="ed-profile__activity" style={{marginTop:"20px"}}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="ed-profile__activity-card mb-4">
                            <div className="ed-profile__activity-card-header">
                              <h5>
                                <i className="fi fi-rr-chart-pie me-2"></i>
                                {t.learningStatistics()}
                              </h5>
                            </div>
                            <div className="ed-profile__activity-card-body">
                              <div className="ed-profile__activity-stats">
                                <div className="ed-profile__activity-stat">
                                  <div className="ed-profile__activity-stat-icon bg-primary">
                                    <i className="fi fi-rr-book"></i>
                                  </div>
                                  <div className="ed-profile__activity-stat-content">
                                    <h3>{courses.length}</h3>
                                    <p>{t.enrolledCourses()}</p>
                                  </div>
                                </div>
                                <div className="ed-profile__activity-stat">
                                  <div className="ed-profile__activity-stat-icon bg-success">
                                    <i className="fi fi-rr-play-circle"></i>
                                  </div>
                                  <div className="ed-profile__activity-stat-content">
                                    <h3>
                                      {courses.reduce((total, course) => total + (course.details?.length || 0), 0)}
                                    </h3>
                                    <p>{t.availableLessons()}</p>
                                  </div>
                                </div>
                                <div className="ed-profile__activity-stat">
                                  <div className="ed-profile__activity-stat-icon bg-info">
                                    <i className="fi fi-rr-calendar"></i>
                                  </div>
                                  <div className="ed-profile__activity-stat-content">
                                    <h3>{new Date().getFullYear()}</h3>
                                    <p>{t.joinYear()}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-6">
                          <div className="ed-profile__activity-card mb-4">
                          
                            <div className="ed-profile__activity-card-body">
                           
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS فقط للبروفايل */}
      <style jsx>{`
        .ed-profile__area {
          background: #f8f9fa;
        }
        
        .ed-profile__sidebar {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          margin-bottom: 30px;
        }
        
        .ed-profile__user-placeholder {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-size: 48px;
          color: white;
          font-weight: bold;
        }
        
        .ed-profile__stats-item {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
        }
        
        .ed-profile__stats-item h3 {
          font-size: 24px;
          margin-bottom: 5px;
          color: #333;
        }
        
        .ed-profile__stats-item p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        
        .ed-profile__main {
          background: white;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }
        
        .ed-profile__tabs .nav-link {
          border: none;
          padding: 12px 20px;
          color: #666;
          font-weight: 500;
          border-radius: 8px;
          margin-right: 10px;
          transition: all 0.3s ease;
        }
        
        .ed-profile__tabs .nav-link.active {
          background: #667eea;
          color: white;
        }
        
        .ed-profile__tabs .nav-link:hover {
          background: #f8f9fa;
        }
        
        .ed-profile__card {
          background: #f8f9fa;
          border-radius: 12px;
          border: none;
        }
        
        .ed-profile__card-header {
          background: transparent;
          border-bottom: 1px solid #eaeaea;
          padding: 20px 25px;
        }
        
        .ed-profile__card-body {
          padding: 25px;
        }
        
        .ed-profile__info-item label {
          font-weight: 600;
          color: #555;
          margin-bottom: 5px;
          display: block;
        }
        
        .ed-profile__info-item p {
          margin: 0;
          color: #333;
          font-size: 16px;
        }
        
        .ed-profile__code {
          font-family: 'Courier New', monospace;
          font-size: 18px;
          font-weight: bold;
          color: #667eea;
        }
        
        .ed-empty-state {
          padding: 60px 20px;
          text-align: center;
        }
        
        .ed-empty-state__icon {
          opacity: 0.5;
        }
        
        .ed-empty-state__title {
          color: #333;
          margin-bottom: 10px;
        }
        
        .ed-empty-state__text {
          color: #666;
          max-width: 400px;
          margin: 0 auto 20px;
        }
        
        .ed-profile__activity-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .ed-profile__activity-stat {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
        }
        
        .ed-profile__activity-stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: white;
          font-size: 20px;
        }
        
        .ed-profile__activity-stat-content h3 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }
        
        .ed-profile__activity-stat-content p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        
        .ed-profile__achievements {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .ed-profile__achievement {
          display: flex;
          align-items: center;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 10px;
        }
        
        .ed-profile__achievement-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-size: 18px;
        }
        
        .ed-profile__achievement-content h6 {
          margin: 0 0 5px 0;
          color: #333;
        }
        
        .ed-profile__achievement-content p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }
        
        .ed-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .ed-btn--primary {
          background: #667eea;
          color: white;
        }
        
        .ed-btn--primary:hover {
          background: #5a67d8;
          color: white;
        }
        
        .ed-btn--secondary {
          background: #e53e3e;
          color: white;
        }
        
        .ed-btn--secondary:hover {
          background: #c53030;
          color: white;
        }
      `}</style>
    </EdunaLayout>
  );
}