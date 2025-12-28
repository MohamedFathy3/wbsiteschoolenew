"use client";

import { useLang } from '@/context/LanguageContext';
import { Course } from '@/types/course';
import { translations } from '@/utilities/translations';

interface ProfileActivityTabProps {
  student: any;
  courses: Course[];
}

const ProfileActivityTab = ({ student, courses }: ProfileActivityTabProps) => {
  const { lang } = useLang();
  
  // هنا مثال على استخدام الترجمة
  const nationalDocumentsTitle = translations.nationalDocuments(
    true, // hasStudent - غيرها حسب الحاجة
    false, // hasTeacher - غيرها حسب الحاجة
    lang
  );

  return (
    <div className="ed-profile__activity">
      <div className="row">
        <div className="col-md-6">
          <div className="ed-profile__activity-card mb-4">
            <div className="ed-profile__activity-card-header">
              <h5>
                <i className="fi fi-rr-chart-pie me-2"></i>
                {lang === 'ar' ? 'إحصائيات التعلم' : 'Learning Statistics'}
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
                    <p>{lang === 'ar' ? 'دورة مسجلة' : 'Enrolled Courses'}</p>
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
                    <p>{lang === 'ar' ? 'درس متاح' : 'Available Lessons'}</p>
                  </div>
                </div>
                <div className="ed-profile__activity-stat">
                  <div className="ed-profile__activity-stat-icon bg-info">
                    <i className="fi fi-rr-calendar"></i>
                  </div>
                  <div className="ed-profile__activity-stat-content">
                    <h3>{new Date().getFullYear()}</h3>
                    <p>{lang === 'ar' ? 'سنة الانضمام' : 'Join Year'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="ed-profile__activity-card mb-4">
            <div className="ed-profile__activity-card-header">
              <h5>
                <i className="fi fi-rr-trophy me-2"></i>
                {lang === 'ar' ? 'الإنجازات' : 'Achievements'}
              </h5>
            </div>
            <div className="ed-profile__activity-card-body">
              <div className="ed-profile__achievements">
                {courses.length > 0 && (
                  <div className="ed-profile__achievement">
                    <div className="ed-profile__achievement-icon">
                      <i className="fi fi-rr-badge-check text-success"></i>
                    </div>
                    <div className="ed-profile__achievement-content">
                      <h6>{lang === 'ar' ? 'متعلم مبتدئ' : 'Beginner Learner'}</h6>
                      <p>
                        {lang === 'ar' 
                          ? `لقد أنجزت ${courses.length} دورة`
                          : `You've completed ${courses.length} courses`}
                      </p>
                    </div>
                  </div>
                )}
                
                {student?.qr_code && (
                  <div className="ed-profile__achievement">
                    <div className="ed-profile__achievement-icon">
                      <i className="fi fi-rr-qrcode text-primary"></i>
                    </div>
                    <div className="ed-profile__achievement-content">
                      <h6>{lang === 'ar' ? 'عضو مسجل' : 'Registered Member'}</h6>
                      <p>
                        {lang === 'ar' 
                          ? `رقم عضويتك: ${student.qr_code}`
                          : `Your membership ID: ${student.qr_code}`}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="ed-profile__achievement">
                  <div className="ed-profile__achievement-icon">
                    <i className="fi fi-rr-graduation-cap text-warning"></i>
                  </div>
                  <div className="ed-profile__achievement-content">
                    <h6>{student?.stage}</h6>
                    <p>
                      {lang === 'ar' 
                        ? 'مرحلتك الدراسية الحالية'
                        : 'Your current academic stage'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileActivityTab;