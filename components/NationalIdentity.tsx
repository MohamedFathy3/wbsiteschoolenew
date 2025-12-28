'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import api from '@/lib/api';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";
interface LibraryItem {
  id: number;
  title: string;
  description: string;
  type: string;
  file_path: string;
  file_url: string;
  thumbnail_path: string | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: LibraryItem[];
  meta: {
    current_page: number;
    total: number;
    per_page: number;
  };
}

const FreeResources = () => {
  const { lang } = useLang();
  const [libraries, setLibraries] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.post<ApiResponse>('teacher-libraries');
        
        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setLibraries(response.data.data);
        } else {
          setLibraries([]);
        }
      } catch (err: any) {
        console.error('❌ Error fetching libraries:', err);
        setError(err.message || (lang === 'ar' ? 'فشل تحميل المصادر' : 'Failed to load resources'));
        setLibraries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLibraries();
  }, [lang]);

  // دالة لتحديد أيقونة الملف حسب الامتداد
  const getFileIcon = (fileUrl: string) => {
    const extension = fileUrl.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '/assets/images/icons/pdf-icon.svg';
      case 'doc':
      case 'docx':
        return '/assets/images/icons/doc-icon.svg';
      case 'xls':
      case 'xlsx':
        return '/assets/images/icons/excel-icon.svg';
      case 'ppt':
      case 'pptx':
        return '/assets/images/icons/ppt-icon.svg';
      default:
        return '/assets/images/icons/file-icon.svg';
    }
  };

  // دالة لتحديد النص حسب النوع
  const getTypeText = (type: string) => {
    if (type === 'student') {
      return lang === 'ar' ? 'هوية وطنية' : 'National Identity';
    } else if (type === 'teacher') {
      return lang === 'ar' ? 'وثيقة عمل' : 'Work Document';
    } else {
      return lang === 'ar' ? 'وثيقة رسمية' : 'Official Document';
    }
  };

  // دالة لتحديد أيقونة النوع
  const getTypeIcon = (type: string) => {
    if (type === 'student') {
      return lang === 'ar' ? '🆔' : '🆔';
    } else if (type === 'teacher') {
      return lang === 'ar' ? '📄' : '📄';
    } else {
      return lang === 'ar' ? '📑' : '📑';
    }
  };

  // دالة لتحديد لون النوع
  const getTypeColor = (type: string) => {
    if (type === 'student') {
      return {
        background: '#dbeafe',
        text: '#1e40af',
        badgeBg: '#3b82f6',
        badgeText: '#ffffff'
      };
    } else if (type === 'teacher') {
      return {
        background: '#f0f9ff',
        text: '#0c4a6e',
        badgeBg: '#0ea5e9',
        badgeText: '#ffffff'
      };
    } else {
      return {
        background: '#f5f3ff',
        text: '#5b21b6',
        badgeBg: '#8b5cf6',
        badgeText: '#ffffff'
      };
    }
  };

  // دالة لتحديد عنوان الصفحة حسب النوع
  const getPageTitle = () => {
    const hasStudent = libraries.some(lib => lib.type === 'student');
    const hasTeacher = libraries.some(lib => lib.type === 'teacher');
    
    if (hasStudent && hasTeacher) {
      return lang === 'ar' ? 'وثائق الهوية الوطنية' : 'National Identity Documents';
    } else if (hasStudent) {
      return lang === 'ar' ? 'هويات الطلاب الوطنية' : 'Students National Identities';
    } else if (hasTeacher) {
      return lang === 'ar' ? '  ملفات الهويه الوطنيه ' : 'Teachers National Identities';
    } else {
      return lang === 'ar' ? 'المستندات الرسمية' : 'Official Documents';
    }
  };

  // دالة لتحديد وصف الصفحة
  const getPageDescription = () => {
    const hasStudent = libraries.some(lib => lib.type === 'student');
    const hasTeacher = libraries.some(lib => lib.type === 'teacher');
    
    if (hasStudent && hasTeacher) {
      return lang === 'ar'
        ? 'مجموعة من وثائق الهوية الوطنية والمستندات الرسمية للطلاب والمدرسين'
        : 'A collection of national identity documents and official papers for students and teachers';
    } else if (hasStudent) {
      return lang === 'ar'
        ? 'هويات وطنية ووثائق رسمية خاصة بالطلاب'
        : 'National identities and official documents for students';
    } else if (hasTeacher) {
      return lang === 'ar'
        ? 'وثائق عمل وشهادات رسمية خاصة بالمدرسين'
        : 'Work documents and official certificates for teachers';
    } else {
      return lang === 'ar'
        ? 'مجموعة من المستندات والوثائق الرسمية'
        : 'A collection of official documents and papers';
    }
  };

  // دالة لتنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const cssStyles = `
    .free-resources-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);
    }
    
    .section-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .section-badge {
      display: inline-block;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      padding: 6px 20px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    
    .section-title {
      font-size: 36px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 16px;
      line-height: 1.3;
      text-align: center;
    }
    
    .section-subtitle {
      font-size: 18px;
      color: #6b7280;
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.6;
      text-align: center;
    }
    
    .resources-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .resource-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      border: 1px solid #e5e7eb;
      height: 100%;
    }
    
    .resource-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
    }
    
    .card-content {
      padding: 24px;
    }
    
    .card-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 20px;
    }
    
    .file-icon {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .file-icon img {
      width: 32px;
      height: 32px;
    }
    
    .card-info {
      flex: 1;
    }
    
    .resource-title {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .resource-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    
    .resource-type {
      font-size: 12px;
      background: #f3f4f6;
      color: #4b5563;
      padding: 4px 8px;
      border-radius: 12px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .resource-date {
      font-size: 12px;
      color: #9ca3af;
    }
    
    .resource-description {
      font-size: 14px;
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .file-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: #f9fafb;
      border-radius: 12px;
      margin-bottom: 20px;
    }
    
    .file-type {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .file-type-label {
      font-size: 12px;
      color: #6b7280;
    }
    
    .file-type-value {
      font-size: 13px;
      font-weight: 600;
      color: #374151;
    }
    
    .free-badge {
      font-size: 11px;
      color: #059669;
      background: #d1fae5;
      padding: 4px 8px;
      border-radius: 12px;
      font-weight: 600;
    }
    
    .action-buttons {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .download-button {
      flex: 1;
      text-align: center;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      padding: 12px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
    }
    
    .download-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
    }
    
    .share-button {
      width: 48px;
      background: #f3f4f6;
      color: #4b5563;
      border: none;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .share-button:hover {
      background: #e5e7eb;
    }
    
    .card-footer {
      padding: 16px 24px;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .free-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .free-circle {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 11px;
      font-weight: 700;
    }
    
    .free-text {
      font-size: 12px;
      color: #6b7280;
    }
    
    .resource-id {
      font-size: 11px;
      color: #9ca3af;
      font-family: monospace;
    }
    
    .refresh-section {
      text-align: center;
      margin-top: 40px;
    }
    
    .refresh-container {
      display: inline-flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
      border-radius: 16px;
    }
    
    .refresh-info {
      text-align: left;
    }
    
    .refresh-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 4px;
    }
    
    .refresh-subtitle {
      font-size: 13px;
      color: #6b7280;
    }
    
    .refresh-button {
      padding: 10px 24px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .refresh-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
    }
    
    /* Type-specific styles */
    .document-stats {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-number {
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 4px;
    }
    
    .stat-label {
      font-size: 11px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .type-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
      margin-left: 8px;
    }
    
    @media (max-width: 768px) {
      .free-resources-section {
        padding: 60px 0;
      }
      
      .section-title {
        font-size: 28px;
      }
      
      .resources-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .refresh-container {
        flex-direction: column;
        text-align: center;
        gap: 16px;
      }
      
      .refresh-info {
        text-align: center;
      }
      
      .action-buttons {
        flex-direction: column;
      }
      
      .share-button {
        width: 100%;
        padding: 12px;
      }
      
      .document-stats {
        flex-direction: column;
        gap: 15px;
      }
    }
    
    /* Loading, Error, Empty States */
    .loading-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .error-container, .empty-container {
      max-width: 500px;
      margin: 80px auto;
      background: white;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      text-align: center;
    }
    
    .error-icon, .empty-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 32px;
    }
    
    .error-icon {
      background: #fee2e2;
      color: #dc2626;
    }
    
    .empty-icon {
      background: #dbeafe;
      color: #1d4ed8;
    }
    
    .error-title, .empty-title {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin-bottom: 8px;
    }
    
    .error-message, .empty-message {
      color: #6b7280;
      margin-bottom: 24px;
    }
    
    .retry-button {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }
    
    .retry-button:hover {
      background: #2563eb;
    }
  `;

  // إحصائيات الوثائق
  const studentDocs = libraries.filter(lib => lib.type === 'student').length;
  const teacherDocs = libraries.filter(lib => lib.type === 'teacher').length;
  const totalDocs = libraries.length;

  if (loading) {
    return (
      <>
        <style>{cssStyles}</style>
        <section className="free-resources-section">
          <div className="section-container">
            <div className="section-header">
              <div className="section-badge"></div>
              <div className="section-title" style={{background: '#e5e7eb', height: '36px', borderRadius: '8px', width: '400px', margin: '0 auto 16px'}}></div>
              <div className="section-subtitle" style={{background: '#e5e7eb', height: '20px', borderRadius: '4px', width: '600px', margin: '0 auto'}}></div>
            </div>
            
            <div className="resources-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="loading-card">
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px'}}>
                    <div style={{width: '64px', height: '64px', background: '#e5e7eb', borderRadius: '12px'}}></div>
                    <div style={{flex: 1}}>
                      <div style={{height: '20px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '8px', width: '80%'}}></div>
                      <div style={{height: '16px', background: '#e5e7eb', borderRadius: '4px', width: '60%'}}></div>
                    </div>
                  </div>
                  <div style={{marginBottom: '16px'}}>
                    <div style={{height: '16px', background: '#e5e7eb', borderRadius: '4px', marginBottom: '8px'}}></div>
                    <div style={{height: '16px', background: '#e5e7eb', borderRadius: '4px', width: '90%'}}></div>
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
        <section className="free-resources-section">
          <div className="section-container">
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <h3 className="error-title">
                {lang === 'ar' ? 'حدث خطأ' : 'Error Occurred'}
              </h3>
              <p className="error-message">{error}</p>
              <button 
                onClick={() => window.location.reload()}
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

  if (libraries.length === 0) {
    return (
      <>
        <style>{cssStyles}</style>
        <section className="free-resources-section">
          <div className="section-container">
            <div className="empty-container">
              <div className="empty-icon">📄</div>
              <h3 className="empty-title">
                {lang === 'ar' ? 'لا توجد وثائق متاحة' : 'No Documents Available'}
              </h3>
              <p className="empty-message">
                {lang === 'ar' 
                  ? 'سيتم إضافة وثائق رسمية قريباً' 
                  : 'Official documents will be added soon'}
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
      <section className="free-resources-section">
        <div className="section-container">
          {/* Section Header */}
          <div className="section-header">
            <span className="section-badge">
              {lang === 'ar' ? 'المستندات الرسمية' : 'OFFICIAL DOCUMENTS'}
            </span>
            
            <h2 className="section-title">
              {getPageTitle()}
            </h2>
            
          

            {/* Document Statistics */}
          
          </div>

          {/* Resources Grid */}
          <div className="resources-grid">
            {libraries.map((library) => {
              const typeColor = getTypeColor(library.type);
              
              return (
                <div 
                  key={library.id}
                  className="resource-card"
                  style={{
                    borderLeft: `4px solid ${typeColor.badgeBg}`,
                    borderTopLeftRadius: '0',
                    borderBottomLeftRadius: '0'
                  }}
                >
                  {/* Resource Content */}
                  <div className="card-content">
                    <div className="card-header">
                      <div className="file-icon" style={{ background: typeColor.background }}>
                         <FontAwesomeIcon icon={faFileWord} size="lg" color="white" />

                      </div>
                      
                      <div className="card-info">
                       
                        <div className="resource-meta">
                       
                          <span className="resource-date">
                            {formatDate(library.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="resource-description" title={library.description}>
                      {library.description}
                    </p>

                    {/* File Info */}
                    <div className="file-info">
                      <div className="file-type">
                        <span className="file-type-label">
                          {lang === 'ar' ? 'نوع الملف:' : 'File Type:'}
                        </span>
                        <span className="file-type-value">
                          {library.file_url.split('.').pop()?.toUpperCase()}
                        </span>
                      </div>
                   
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                      <a
                        href={library.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-button"
                        style={{ background: `linear-gradient(135deg, ${typeColor.badgeBg} 0%, ${typeColor.text} 100%)` }}
                      >
                        {lang === 'ar' ? 'تحميل الوثيقة' : 'Download Document'}
                      </a>
                      
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: library.title,
                              text: library.description,
                              url: library.file_url,
                            });
                          }
                        }}
                        className="share-button"
                        title={lang === 'ar' ? 'مشاركة' : 'Share'}
                      >
                        <i className="fi fi-rr-share" />
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="card-footer">
                    <div className="free-indicator">
                      <div className="free-circle" style={{ background: `linear-gradient(135deg, ${typeColor.badgeBg} 0%, ${typeColor.text} 100%)` }}>
                        {library.type === 'student' ? '🆔' : library.type === 'teacher' ? '📄' : '📑'}
                      </div>
                      <span className="free-text">
                        {getTypeText(library.type)}
                      </span>
                    </div>
                    
                    <span className="resource-id">
                      {lang === 'ar' ? 'رقم:' : 'ID:'} {library.id}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Refresh Section */}
        
        </div>
      </section>
    </>
  );
};

export default FreeResources;