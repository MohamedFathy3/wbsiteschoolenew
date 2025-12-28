"use client";

import { useLang } from '@/context/LanguageContext';

interface ProfileInfoTabProps {
  student: any;
}

const ProfileInfoTab = ({ student }: ProfileInfoTabProps) => {
  const { lang } = useLang();

  return (
    <div className="ed-profile__info">
      <div className="row">
        <div className="col-12">
          <div className="ed-profile__card mb-30">
            <div className="ed-profile__card-header">
              <h4>
                <i className="fi fi-rr-id-card-clip-alt me-2"></i>
                {lang === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
              </h4>
            </div>
            <div className="ed-profile__card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="ed-profile__info-item mb-3">
                    <label>{lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                    <p>{student?.name}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ed-profile__info-item mb-3">
                    <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                    <p>{student?.email}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ed-profile__info-item mb-3">
                    <label>{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                    <p>{student?.phone || lang === 'ar' ? 'غير مضاف' : 'Not added'}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ed-profile__info-item mb-3">
                    <label>{lang === 'ar' ? 'البلد' : 'Country'}</label>
                    <p>{student?.country}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ed-profile__info-item mb-3">
                    <label>{lang === 'ar' ? 'المرحلة الدراسية' : 'Academic Stage'}</label>
                    <p>{student?.stage}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="ed-profile__info-item mb-3">
                    <label>{lang === 'ar' ? 'الكود التعريفي' : 'Student ID'}</label>
                    <p className="ed-profile__code">#{student?.qr_code}</p>
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

export default ProfileInfoTab;