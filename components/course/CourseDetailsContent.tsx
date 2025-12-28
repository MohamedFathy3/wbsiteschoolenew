'use client';

import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from '@/context/AuthContext';
import { getSecureFileUrl, ensureHttps, handleFileError } from "@/utilities/urlHelper";

interface CourseDetailsContentProps {
  course: any;
  comment: string;
  rating: number;
  submittingComment: boolean;
  showAllDetails: boolean;
  setShowAllDetails: (show: boolean) => void;
  setComment: (comment: string) => void;
  setRating: (rating: number) => void;
  handleSubmitComment: () => void;
  isUserEnrolled: boolean;
}

const CourseDetailsContent: React.FC<CourseDetailsContentProps> = ({
  course,
  comment,
  rating,
  submittingComment,
  showAllDetails,
  setShowAllDetails,
  setComment,
  setRating,
  handleSubmitComment,
  isUserEnrolled
}) => {
  const { lang } = useLang();
  const { user, isAuthenticated, loading, logout, getFullProfile } = useAuth();

  const getDefaultImage = () => {
    return "/assets/images/course/course-details/details-img-1.png";
  };

  // دالة لمعالجة رابط الصورة
  const getSecureImageUrl = (imageUrl: string | undefined | null): string => {
    if (!imageUrl) return getDefaultImage();
    return ensureHttps(imageUrl);
  };

  // دالة لمعالجة رابط الملف
  const getSecureFileUrlFromPath = (filePath: string | undefined | null): string => {
    if (!filePath) return '';
    return getSecureFileUrl(filePath);
  };

  // دالة للحصول على اسم الملف من المسار
  const getFileNameFromPath = (path: string): string => {
    if (!path) return '';
    return path.split('/').pop() || path;
  };

  // دالة للتحقق من نوع الملف وعرض الأيقونة المناسبة
  const getFileIcon = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'ppt':
      case 'pptx':
        return '📑';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return '🖼️';
      case 'mp4':
      case 'avi':
      case 'mov':
        return '🎬';
      case 'mp3':
      case 'wav':
        return '🎵';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📎';
    }
  };

  // دالة للتحقق من أن الرابط آمن قبل فتحه
  const openSecureLink = (url: string, fileName: string) => {
    const secureUrl = getSecureFileUrl(url);
    
    if (!secureUrl.startsWith('https://')) {
      alert(`${lang === 'ar' ? 'رابط غير آمن' : 'Insecure link'}: ${fileName}`);
      return;
    }
    
    window.open(secureUrl, '_blank', 'noopener,noreferrer');
  };

  // دالة للتحميل الآمن
  const downloadSecureFile = async (url: string, fileName: string) => {
    const secureUrl = getSecureFileUrl(url);
    
    if (!secureUrl.startsWith('https://')) {
      alert(`${lang === 'ar' ? 'رابط التحميل غير آمن' : 'Download link is not secure'}`);
      return;
    }
    
    try {
      // استخدم fetch لتحميل الملف
      const response = await fetch(secureUrl, {
        mode: 'cors',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
      
    } catch (error) {
      console.error('Download failed:', error);
      // فتح الرابط في تاب جديد كبديل
      window.open(secureUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const visibleDetails = showAllDetails 
    ? course?.details || []
    : (course?.details || []).slice(0, 3);

  return (
    <div className="ed-course__details-content">
      {/* Course Details Image */}
      <div className="ed-course__details-img">
        <Image
          width={800}
          height={450}
          sizes="100vw"
          style={{ 
            width: "100%", 
            height: "450px", 
            objectFit: "cover",
            borderRadius: "8px"
          }}
          src={getSecureImageUrl(course.image)}
          alt={course.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = getDefaultImage();
          }}
        />
      </div>
      
      <h3 style={{ marginTop: "20px", color: "#1f2937" }}>
        {course.title}
      </h3>
      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#4b5563" }}>
        {course.description}
      </p>
      
      {/* What You'll Learn */}
      {/* {course.what_you_will_learn && (
        <div className="ed-course__details-list" style={{ marginTop: "30px" }}>
          <h5 style={{ 
            color: "#1f2937", 
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <span>🎯</span> {lang === 'ar' ? 'ماذا ستتعلم؟' : 'What You\'ll Learn?'}
          </h5>
          <ul>
            {course.what_you_will_learn.split('\n').map((item: string, index: number) => (
              item.trim() && (
                <li key={index} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "8px"
                }}>
                  <Image
                    width={18}
                    height={18}
                    src="/assets/images/icons/icon-check-blue.svg"
                    alt="check"
                  />
                  <span style={{ flex: 1, color: "#374151" }}>{item}</span>
                </li>
              )
            ))}
          </ul>
        </div>
      )} */}

      {/* Course Files Section */}
      <div style={{ marginTop: "40px" }}>
        <h5 style={{ 
          color: "#1f2937", 
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span>📁</span> {lang === 'ar' ? '  نبذه عن الدرس' : ' About the lesson File'}
        </h5>
        
        {/* Main Course File */}
        {course.file_path && (
          <div style={{
            background: "#f8fafc",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
            border: "1px solid #e5e7eb"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "15px",
              flexWrap: "wrap"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ fontSize: "24px" }}>
                  {getFileIcon(course.file_path)}
                </div>
                <div>
                  <h6 style={{ margin: "0 0 5px 0", color: "#1f2937" }}>
                    {lang === 'ar' ? 'بنذه عن الدرس' : 'lessons File'}
                  </h6>
                  <p style={{ 
                    margin: 0, 
                    fontSize: "14px", 
                    color: "#6b7280",
                    wordBreak: "break-all"
                  }}>
                    {getFileNameFromPath(course.file_path)}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
               
                <button
                  onClick={() => downloadSecureFile(course.file_path, getFileNameFromPath(course.file_path))}
                  style={{
                    background: "#10b981",
                    color: "white",
                    padding: "8px 15px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  <i className="fi fi-rr-download" style={{ fontSize: "12px" }} />
                  {lang === 'ar' ? 'تحميل' : 'Download'}
                </button>
              </div>
            </div>
            
            {/* Security Info */}
          
          </div>
        )}

        {/* Course Content */}
        {isAuthenticated && isUserEnrolled && course.details && course.details.length > 0 && (
          <div className="ed-course__details-list">
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
              flexWrap: "wrap",
              gap: "10px"
            }}>
              <h5 style={{ 
                color: "#1f2937",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span>📚</span> {lang === 'ar' ? 'محتويات الدرس' : 'lesson Content'} ({course.details.length})
              </h5>
              
              {course.details.length > 3 && (
                <button
                  onClick={() => setShowAllDetails(!showAllDetails)}
                  style={{
                    background: "transparent",
                    border: "1px solid #3b82f6",
                    color: "#3b82f6",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                >
                  {showAllDetails ? (lang === 'ar' ? 'عرض أقل' : 'Show Less') : (lang === 'ar' ? 'عرض المزيد' : 'Show More')}
                </button>
              )}
            </div>
            
            <div style={{ marginTop: "15px" }}>
              {visibleDetails.map((detail: any) => {
                const secureContentLink = getSecureFileUrl(detail.content_link);
                const secureFilePath = getSecureFileUrl(detail.file_path);
                const isContentSecure = secureContentLink.startsWith('https://');
                const isFileSecure = secureFilePath.startsWith('https://');
                
                return (
                  <div key={detail.id} style={{
                    background: "#f8fafc",
                    padding: "15px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.3s"
                  }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "15px",
                      flexWrap: "wrap"
                    }}>
                      <div style={{ flex: 1 }}>
                        <h6 style={{ 
                          margin: "0 0 5px 0", 
                          color: "#1f2937",
                          fontSize: "16px"
                        }}>
                          {detail.title}
                        </h6>
                        <p style={{ 
                          margin: 0, 
                          fontSize: "14px", 
                          color: "#6b7280",
                          lineHeight: "1.4"
                        }}>
                          {detail.description}
                        </p>
                        
                        {/* Display file info */}
                        {detail.file_path && (
                          <div style={{
                            marginTop: "8px",
                            fontSize: "12px",
                            color: "#9ca3af",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px"
                          }}>
                            <span style={{ fontSize: "16px" }}>
                              {getFileIcon(detail.file_path)}
                            </span>
                            <span>
                              {lang === 'ar' ? 'ملف' : 'File'}: 
                              <span style={{ 
                                marginLeft: "5px",
                                fontFamily: "monospace",
                                wordBreak: "break-all"
                              }}>
                                {getFileNameFromPath(detail.file_path)}
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "5px",
                        minWidth: "fit-content"
                      }}>
                        {/* Content Link Button */}
                        {detail.content_link && (
                          <button
                            onClick={() => openSecureLink(detail.content_link, detail.title)}
                            disabled={!isContentSecure}
                            style={{
                              background: isContentSecure ? "#3b82f6" : "#9ca3af",
                              color: "white",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontSize: "13px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              whiteSpace: "nowrap",
                              border: "none",
                              cursor: isContentSecure ? "pointer" : "not-allowed",
                              opacity: isContentSecure ? 1 : 0.7
                            }}
                            title={!isContentSecure ? (lang === 'ar' ? 'رابط غير آمن' : 'Insecure link') : ''}
                          >
                            {detail.content_type === 'video' ? (
                              <>
                                <i className="fi fi-rr-play" style={{ fontSize: "10px" }} />
                                {lang === 'ar' ? 'مشاهدة' : 'Watch'}
                              </>
                            ) : (
                              <>
                                <i className="fi fi-rr-globe" style={{ fontSize: "10px" }} />
                                {lang === 'ar' ? 'عرض الملف' : 'View File'}
                              </>
                            )}
                            {!isContentSecure && (
                              <i className="fi fi-rr-shield-exclamation" style={{ fontSize: "10px" }} />
                            )}
                          </button>
                        )}
                        
                        {/* File Download Button */}
                        {detail.file_path && (
                          <button
                            onClick={() => downloadSecureFile(detail.file_path, getFileNameFromPath(detail.file_path))}
                            disabled={!isFileSecure}
                            style={{
                              background: isFileSecure ? "#10b981" : "#9ca3af",
                              color: "white",
                              padding: "8px 12px",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontSize: "13px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              whiteSpace: "nowrap",
                              border: "none",
                              cursor: isFileSecure ? "pointer" : "not-allowed",
                              opacity: isFileSecure ? 1 : 0.7
                            }}
                            title={!isFileSecure ? (lang === 'ar' ? 'رابط غير آمن' : 'Insecure link') : ''}
                          >
                            <i className="fi fi-rr-download" style={{ fontSize: "10px" }} />
                            {lang === 'ar' ? 'تحميل' : 'Download'}
                            {!isFileSecure && (
                              <i className="fi fi-rr-shield-exclamation" style={{ fontSize: "10px" }} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div style={{
                      marginTop: "10px",
                      fontSize: "12px",
                      color: "#9ca3af",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      flexWrap: "wrap"
                    }}>
                      <span>📁 {detail.content_type === 'video' ? (lang === 'ar' ? 'فيديو' : 'Video') : (lang === 'ar' ? 'وثيقة' : 'Document')}</span>
                      {detail.content_link && (
                        <span style={{
                          color: isContentSecure ? "#3b82f6" : "#ef4444",
                          fontSize: "11px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px"
                        }}>
                          {isContentSecure ? (
                            <>
                              <i className="fi fi-rr-shield-check" style={{ fontSize: "10px" }} />
                              <span>{lang === 'ar' ? 'رابط آمن' : 'Secure link'}</span>
                            </>
                          ) : (
                            <>
                              <i className="fi fi-rr-shield-exclamation" style={{ fontSize: "10px" }} />
                              <span>{lang === 'ar' ? 'رابط غير آمن' : 'Insecure link'}</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Security Warning for All Files */}
  
        
        {isAuthenticated && !isUserEnrolled && course.details && course.details.length > 0 && (
          <div style={{
            background: "#fef3c7",
            padding: "25px",
            borderRadius: "8px",
            marginTop: "20px",
            textAlign: "center",
            border: "1px solid #fbbf24"
          }}>
            <div style={{ 
              fontSize: "48px", 
              marginBottom: "15px",
              color: "#d97706"
            }}>
              🔒
            </div>
            <h6 style={{ 
              margin: "0 0 12px 0", 
              color: "#92400e",
              fontSize: "20px",
              fontWeight: "bold"
            }}>
              {lang === 'ar' ? 'المحتوى مقفل' : 'Content Locked'}
            </h6>
            <p style={{ 
              margin: "0 0 20px 0", 
              color: "#78350f",
              fontSize: "15px",
              lineHeight: "1.5"
            }}>
              {lang === 'ar' 
                ? 'يجب عليك التسجيل في هذه الدرس أولاً لمشاهدة المحتوى الكامل.'
                : 'You must enroll in this lessons first to view the full content.'}
            </p>
            <div style={{ 
              fontSize: "14px", 
              color: "#92400e",
              marginBottom: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px"
            }}>
              <span>📚</span>
              <span>
                {lang === 'ar' ? 'عدد الدروس المتاحة' : 'Available lessons'}: <strong>{course.details.length}</strong>
              </span>
            </div>
          </div>
        )}

        {/* إذا المستخدم مش مسجل دخول أصلاً */}
        {!isAuthenticated && course.details && course.details.length > 0 && (
          <div style={{
            background: "#f3f4f6",
            padding: "25px",
            borderRadius: "8px",
            marginTop: "20px",
            textAlign: "center",
            border: "1px solid #d1d5db"
          }}>
            <div style={{ 
              fontSize: "48px", 
              marginBottom: "15px",
              color: "#6b7280"
            }}>
              👤
            </div>
            <h6 style={{ 
              margin: "0 0 12px 0", 
              color: "#4b5563",
              fontSize: "20px",
              fontWeight: "bold"
            }}>
              {lang === 'ar' ? 'تسجيل الدخول مطلوب' : 'Login Required'}
            </h6>
            <p style={{ 
              margin: "0 0 20px 0", 
              color: "#6b7280",
              fontSize: "15px",
              lineHeight: "1.5"
            }}>
              {lang === 'ar' 
                ? 'يجب تسجيل الدخول أولاً لمشاهدة محتويات الدرس.'
                : 'Please login first to view lesson contents.'}
            </p>
            <button
              onClick={() => {
                document.dispatchEvent(new CustomEvent('openLoginModal'));
              }}
              style={{
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "12px 24px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "500",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <i className="fi fi-rr-sign-in" />
              {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </button>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div style={{ marginTop: "40px" }}>
        <h5 style={{ 
          color: "#1f2937", 
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span>💬</span> {lang === 'ar' ? 'التعليقات' : 'Comments'} ({course.comments.length})
        </h5>
        
        {/* Add Comment Form */}
        <div style={{
          background: "#f8fafc",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#374151"
            }}>
              {lang === 'ar' ? 'تقييمك' : 'Your Rating'}
            </label>
            <div style={{ display: "flex", gap: "5px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: star <= rating ? "#fbbf24" : "#d1d5db",
                    padding: "0",
                    transition: "transform 0.2s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={lang === 'ar' ? "اكتب تعليقك هنا..." : "Write your comment here..."}
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                resize: "vertical",
                fontSize: "14px",
                fontFamily: "inherit"
              }}
            />
          </div>
          
          <button
            onClick={handleSubmitComment}
            disabled={submittingComment}
            style={{
              background: submittingComment ? "#9ca3af" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              cursor: submittingComment ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            {submittingComment ? (
              <>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid white",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }} />
                {lang === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
              </>
            ) : (
              <>
                <i className="fi fi-rr-comment" />
                {lang === 'ar' ? 'إرسال' : 'Submit'}
              </>
            )}
          </button>
        </div>

        {/* Comments List */}
        {course.comments.length > 0 ? (
          <div>
            {course.comments.map((commentItem: any) => (
              <div key={commentItem.id} style={{
                background: "white",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "10px",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "10px"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "16px"
                    }}>
                      {commentItem.student?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong style={{ color: "#1f2937" }}>
                        {commentItem.student?.name}
                      </strong>
                      <div style={{ 
                        fontSize: "12px", 
                        color: "#6b7280",
                        marginTop: "2px"
                      }}>
                        {new Date(commentItem.created_at).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div style={{ color: "#fbbf24" }}>
                    {"★".repeat(commentItem.rating)}
                    <span style={{ 
                      color: "#9ca3af", 
                      marginLeft: "5px",
                      fontSize: "14px"
                    }}>
                      ({commentItem.rating}/5)
                    </span>
                  </div>
                </div>
                <p style={{ 
                  margin: 0, 
                  color: "#374151",
                  lineHeight: "1.5"
                }}>
                  {commentItem.comment}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "30px",
            background: "#f9fafb",
            borderRadius: "8px",
            color: "#6b7280"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>💬</div>
            <p style={{ margin: 0, fontSize: "16px" }}>
              {lang === 'ar' ? 'لا توجد تعليقات بعد. كن أول من يعلق!' : 'No comments yet. Be the first to comment!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetailsContent;