'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import api from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

interface Country {
  id: number;
  name: string;
  key: string;
  code: string;
  active: boolean;
  image: string;
}

interface Stage {
  id: number;
  name: string;
  postion: number;
  active: boolean;
  image: string | null;
  country: Country;
  curriculum: {
    id: number;
    name: string;
    active: boolean;
    image: string;
  };
}

interface Subject {
  id: number;
  name: string;
  postion: number | null;
  active: boolean;
  image: string;
  stage: Stage;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
  active: boolean | null;
  type: string;
  teacher_type: string;
  total_rate: number | null;
  phone: string;
  image: string | null;
  country: Country;
  account_holder_name: string | null;
  commission: string;
  courses_count: number;
  students_count: number;
  total_income: number;
  all_total_income: number;
  rewards: string | null;
  all_net_income: number;
  average_rating: number;
  stages: Stage[];
  subjects: Subject[];
}

interface ApiResponse {
  data: Teacher[];
  result: string;
  message: string;
  status: number;
}

export const TopTeachers = () => {
  const { lang } = useLang();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.post<ApiResponse>('teacher/index', {
          filters: {},
          orderBy: 'rewards',
          orderByDirection: 'desc',
          perPage: 3,
          paginate: true,
          delete: false
        });

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setTeachers(response.data.data.slice(0, 10));
        } else {
          setTeachers([]);
        }
      } catch (err: any) {
        console.error('❌ Error fetching teachers:', err);
        setError(err.message || (lang === 'ar' ? 'فشل تحميل المدرسين' : 'Failed to load teachers'));
        setTeachers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [lang]);

  const styles = {
    section: {
      padding: '80px 0',
      background: 'linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%)',
      position: 'relative' as const,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '60px',
    },
    badge: {
      display: 'inline-block',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      padding: '6px 20px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600' as const,
      letterSpacing: '0.5px',
      textTransform: 'uppercase' as const,
      marginBottom: '20px',
    },
    title: {
      fontSize: '36px',
      fontWeight: '700' as const,
      color: '#1f2937',
      marginBottom: '16px',
      lineHeight: '1.3',
    },
    subtitle: {
      fontSize: '18px',
      color: '#6b7280',
      maxWidth: '700px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      marginBottom: '40px',
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden' as const,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      height: '100%',
    },
    cardHeader: {
      position: 'relative' as const,
      height: '140px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    },
    rankBadge: {
      position: 'absolute' as const,
      top: '16px',
      left: '16px',
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      borderRadius: '50%',
      width: '44px',
      height: '44px',
      display: 'flex',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      color: 'white',
      fontWeight: '700' as const,
      fontSize: '18px',
    },
    teacherImage: {
      position: 'absolute' as const,
      bottom: '-40px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    imageWrapper: {
      width: '88px',
      height: '88px',
      borderRadius: '50%',
      border: '4px solid white',
      background: 'white',
      overflow: 'hidden' as const,
      position: 'relative' as const,
    },
    cardBody: {
      paddingTop: '56px',
      padding: '24px',
      marginTop: '16px',
    },
    teacherName: {
      fontSize: '20px',
      fontWeight: '700' as const,
      color: '#1f2937',
      textAlign: 'center' as const,
      marginBottom: '8px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap' as const,
    },
    teacherType: {
      display: 'inline-block',
      background: '#f3f4f6',
      color: '#4b5563',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '500' as const,
      marginBottom: '20px',
    },
    rating: {
      display: 'flex',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      gap: '4px',
      marginBottom: '24px',
    },
    star: {
      fontSize: '20px',
    },
    ratingNumber: {
      fontSize: '14px',
      color: '#4b5563',
      fontWeight: '600' as const,
      marginLeft: '8px',
    },
    // New styles for country, stages, and subjects
    infoSection: {
marginBottom: '24px',
    },
    sectionTitle: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '600' as const,
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center' as const,
      gap: '8px',
    },
    countryInfo: {
      display: 'flex',
      alignItems: 'center' as const,
      gap: '12px',
      padding: '12px',
      background: '#f8fafc',
      borderRadius: '12px',
      marginBottom: '16px',
    },
    flagWrapper: {
      width: '32px',
      height: '24px',
      borderRadius: '4px',
      overflow: 'hidden' as const,
      position: 'relative' as const,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      flexShrink: 0,
    },
    countryDetails: {
      flex: 1,
    },
    countryName: {
      fontSize: '15px',
      fontWeight: '600' as const,
      color: '#1f2937',
      marginBottom: '4px',
    },
    countryCode: {
      fontSize: '12px',
      color: '#9ca3af',
      fontFamily: 'monospace' as const,
    },
    stagesList: {
      marginBottom: '16px',
    },
    stageItem: {
      display: 'flex',
      alignItems: 'center' as const,
      gap: '10px',
      padding: '10px',
      background: '#f8fafc',
      borderRadius: '8px',
      marginBottom: '8px',
      fontSize: '14px',
    },
    stageDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: '#3b82f6',
      flexShrink: 0,
    },
    stageName: {
      flex: 1,
      color: '#4b5563',
    },
    curriculumBadge: {
      background: '#e0f2fe',
      color: '#0369a1',
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '11px',
      fontWeight: '600' as const,
    },
    subjectsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '8px',
      marginBottom: '24px',
    },
    subjectBadge: {
      display: 'flex',
      alignItems: 'center' as const,
      gap: '6px',
      padding: '6px 12px',
      background: '#f3f4f6',
      borderRadius: '20px',
      fontSize: '13px',
      color: '#4b5563',
    },
    subjectImage: {
      width: '20px',
      height: '20px',
      borderRadius: '4px',
      overflow: 'hidden' as const,
      position: 'relative' as const,
      flexShrink: 0,
    },
    statsRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px',
      background: '#f8fafc',
      borderRadius: '12px',
      marginBottom: '20px',
    },
    statItem: {
      textAlign: 'center' as const,
      flex: 1,
    },
    statNumber: {
      fontSize: '18px',
      fontWeight: '700' as const,
      color: '#1f2937',
      marginBottom: '4px',
    },
    statLabel: {
      fontSize: '12px',
      color: '#9ca3af',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
    viewButton: {
      display: 'block',
      width: '100%',
      textAlign: 'center' as const,
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      padding: '12px',
      borderRadius: '12px',
      fontSize: '15px',
      fontWeight: '600' as const,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
    viewAllButton: {
      display: 'inline-flex',
      alignItems: 'center' as const,
      gap: '8px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      padding: '14px 32px',
      borderRadius: '12px',
      fontSize: '16px',
      fontWeight: '600' as const,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    },
  };

  // CSS animations and hover effects
  const cssStyles = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .teacher-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    }

    .view-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
    }

    .view-all-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
    }

    .active-status {
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 16px;
      height: 16px;
      background: #10b981;
      border-radius: 50%;
      border: 2px solid white;
    }

    .subject-badge:hover {
      background: #e5e7eb;
      transform: translateY(-1px);
    }

    @media (max-width: 768px) {
      .section-title {
        font-size: 28px;
      }
      
      .teachers-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
      }
      
      .card-header {
        height: 120px;
      }
      
      .teacher-image {
        bottom: -32px;
      }
      
      .image-wrapper {
        width: 72px;
        height: 72px;
      }
      
      .card-body {
        padding: 20px;
      }
      
      .subjects-container {
        justify-content: center;
      }
    }
  `;

  if (loading) {
    return (
      <>
        <style>{cssStyles}</style>
        <section style={styles.section}>
          <div style={styles.container}>
            <div style={styles.header}>
              <div style={styles.badge}></div>
              <div style={{...styles.title, background: '#e5e7eb', height: '36px', borderRadius: '8px', width: '400px', margin: '0 auto 16px'}}></div>
              <div style={{...styles.subtitle, background: '#e5e7eb', height: '20px', borderRadius: '4px', width: '600px', margin: '0 auto'}}></div>
            </div>
            
            <div style={styles.grid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{...styles.card, animation: 'pulse 1.5s infinite'}}>
                  <div style={styles.cardHeader}></div>
                  <div style={styles.cardBody}>
                    <div style={{height: '24px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '12px'}}></div>
                    <div style={{height: '20px', background: '#e5e7eb', borderRadius: '4px', width: '60%', margin: '0 auto 20px'}}></div>
                    <div style={{height: '60px', background: '#e5e7eb', borderRadius: '8px', marginBottom: '16px'}}></div>
                    <div style={{height: '40px', background: '#e5e7eb', borderRadius: '8px', marginBottom: '16px'}}></div>
                    <div style={{height: '40px', background: '#e5e7eb', borderRadius: '8px'}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{cssStyles}</style>
        <section style={styles.section}>
          <div style={styles.container}>
            <div style={{
              maxWidth: '500px',
              margin: '0 auto',
              background: 'white',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#fee2e2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#dc2626',
              }}>
                ⚠️
              </div>
              <h3 style={{fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '8px'}}>
                {lang === 'ar' ? 'حدث خطأ' : 'Error Occurred'}
              </h3>
              <p style={{color: '#6b7280', marginBottom: '24px'}}>{error}</p>
              <button 
                onClick={() => window.location.reload()}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
                className="retry-button"
              >
                {lang === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (teachers.length === 0) {
    return (
      <>
        <style>{cssStyles}</style>
        <section style={styles.section}>
          <div style={styles.container}>
            <div style={{
              maxWidth: '500px',
              margin: '0 auto',
              background: 'white',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#dbeafe',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '32px',
                color: '#1d4ed8',
              }}>
                👨‍🏫
              </div>
              <h3 style={{fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '8px'}}>
                {lang === 'ar' ? 'لا يوجد مدرسين' : 'No Teachers'}
              </h3>
              <p style={{color: '#6b7280'}}>
                {lang === 'ar' 
                  ? 'سيتم إضافة المدرسين قريباً' 
                  : 'Teachers will be added soon'}
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <style>{cssStyles}</style>
      <section style={styles.section}>
        <div style={styles.container}>
          {/* Section Header */}
          <div style={styles.header}>
            <span style={styles.badge}>
              {lang === 'ar' ? 'المدرسون المتميزون' : 'TOP TEACHERS'}
            </span>
            
            <h2 style={styles.title}>
              {lang === 'ar' 
                ? 'أفضل المدرسين  ' 
                : 'Top Teachers by Rewards'}
            </h2>
            
            <p style={styles.subtitle}>
              {lang === 'ar'
                ? 'استفد من أصحاب الخبره'
                : 'Learn from the Best in the Field'}
            </p>
          </div>

          {/* Teachers Grid */}
          <div style={styles.grid} className="teachers-grid">
            {teachers.map((teacher, index) => (
              <div 
                key={teacher.id}
                style={styles.card}
                className="teacher-card"
              >
                {/* Teacher Header */}
                <div style={styles.cardHeader}>
                  {/* Rank Badge */}
                  <div style={styles.rankBadge}>
                    #{index + 1}
                  </div>
                  
                  {/* Teacher Image */}
                  <div style={styles.teacherImage}>
                    <div style={styles.imageWrapper}>
                      {teacher.image ? (
                        <Image
                          src={teacher.image}
                          alt={teacher.name}
                          width={80}
                          height={80}
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/images/default-avatar.svg';
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: '#f3f4f6',
                          color: '#9ca3af',
                          fontSize: '32px',
                        }}>
                          👨‍🏫
                        </div>
                      )}
                    </div>
                    {/* Active Status */}
                    {teacher.active && <div className="active-status"></div>}
                  </div>
                </div>

                {/* Teacher Body */}
                <div style={styles.cardBody}>
                  {/* Teacher Name */}
                  <h3 style={styles.teacherName} title={teacher.name}>
                    {teacher.name}
                  </h3>
                  
                  {/* Teacher Type */}
                  <div style={{textAlign: 'center', marginBottom: '20px'}}>
                    <span style={styles.teacherType}>
                      {teacher.teacher_type || (lang === 'ar' ? 'مدرس' : 'Teacher')}
                    </span>
                  </div>
                  
                 

                  {/* Country Information */}
                  <div style={styles.infoSection}>
                    <div style={styles.sectionTitle}>
                      <span>🌍</span>
                      {lang === 'ar' ? 'البلد' : 'Country'}
                    </div>
                    <div style={styles.countryInfo}>
                      {teacher.country?.image && (
                        <div style={styles.flagWrapper}>
                          <Image
                            src={teacher.country.image}
                            alt={teacher.country.name}
                            fill
                            style={{objectFit: 'cover'}}
                          />
                        </div>
                      )}
                      <div style={styles.countryDetails}>
                        <div style={styles.countryName}>
                          {teacher.country?.name || (lang === 'ar' ? 'غير محدد' : 'Not specified')}
                        </div>
                        <div style={styles.countryCode}>
                          {teacher.country?.code}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stages List */}
                  {teacher.stages && teacher.stages.length > 0 && (
                    <div style={styles.infoSection}>
                      <div style={styles.sectionTitle}>
                        <span>📚</span>
                        {lang === 'ar' ? 'المراحل' : 'Stages'} ({teacher.stages.length})
                      </div>
                      <div style={styles.stagesList}>
                        {teacher.stages.slice(0, 3).map((stage) => (
                          <div key={stage.id} style={styles.stageItem}>
                            <div style={styles.stageDot}></div>
                            <span style={styles.stageName}>{stage.name}</span>
                            {stage.curriculum && (
                              <span style={styles.curriculumBadge}>
                                {stage.curriculum.name}
                              </span>
                            )}
                          </div>
                        ))}
                        {teacher.stages.length > 3 && (
                          <div style={{...styles.stageItem, justifyContent: 'center'}}>
                            <span style={{color: '#6b7280', fontSize: '13px'}}>
                              + {teacher.stages.length - 3} {lang === 'ar' ? 'مرحلة أخرى' : 'more stages'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Subjects */}
                  {teacher.subjects && teacher.subjects.length > 0 && (
                    <div style={styles.infoSection}>
                      <div style={styles.sectionTitle}>
                        <span>🎯</span>
                        {lang === 'ar' ? 'المواد' : 'Subjects'} ({teacher.subjects.length})
                      </div>
                      <div style={styles.subjectsContainer}>
                        {teacher.subjects.slice(0, 4).map((subject) => (
                          <div key={subject.id} className="subject-badge" style={styles.subjectBadge}>
                            {subject.image && (
                              <div style={styles.subjectImage}>
                                <Image
                                  src={subject.image}
                                  alt={subject.name}
                                  width={20}
                                  height={20}
                                  style={{objectFit: 'cover'}}
                                />
                              </div>
                            )}
                            <span>{subject.name}</span>
                          </div>
                        ))}
                        {teacher.subjects.length > 4 && (
                          <div style={styles.subjectBadge}>
                            <span>+{teacher.subjects.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Basic Stats */}
                  <div style={styles.statsRow}>
                    <div style={styles.statItem}>
                      <div style={styles.statNumber}>
                        {teacher.courses_count}
                      </div>
                      <div style={styles.statLabel}>
                        {lang === 'ar' ? 'دروس' : 'lessons'}
                      </div>
                    </div>
                    
                    <div style={styles.statItem}>
                      <div style={styles.statNumber}>
                        {teacher.students_count}
                      </div>
                      <div style={styles.statLabel}>
                        {lang === 'ar' ? 'مشترين' : 'Buyer'}
                      </div>
                    </div>
                    
                    {/* <div style={styles.statItem}>
                      <div style={styles.statNumber}>
                        ${teacher.total_income}
                      </div>
                      <div style={styles.statLabel}>
                        {lang === 'ar' ? 'دخل' : 'Income'}
                      </div>
                    </div> */}
                  </div>
                  
                  {/* View Profile Button */}
                  <Link
                    href={`/instructor-details/${teacher.id}`}
                    style={styles.viewButton}
                    className="view-button"
                  >
                    {lang === 'ar' ? 'عرض الملف الشخصي' : 'View Profile'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div style={{textAlign: 'center'}}>
            <Link
              href="/instructor"
              style={styles.viewAllButton}
              className="view-all-button"
            >
              <span>
                {lang === 'ar' ? 'عرض جميع المدرسين' : 'View All Teachers'}
              </span>
              <i className={`fi fi-rr-arrow-${lang === 'ar' ? 'left' : 'right'}`} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};