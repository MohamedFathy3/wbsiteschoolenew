'use client';

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

interface CourseDetailsSidebarProps {
  course: any;
  isUserEnrolled: boolean;
  enrolling: boolean;
  unenrolling: boolean;
  handleEnroll: () => void;
  handleUnenroll: () => void;
}

const CourseDetailsSidebar: React.FC<CourseDetailsSidebarProps> = ({
  course,
  isUserEnrolled,
  enrolling,
  unenrolling,
  handleEnroll,
  handleUnenroll
}) => {
  const { lang } = useLang();

  return (
    <div className="ed-course__sidebar">
      {/* Enrollment Status & Button */}
      <div className="ed-course__sidebar-widget" style={{ marginBottom: "20px" }}>
        {isUserEnrolled ? (
          <div style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <div style={{ 
              marginBottom: "15px", 
              fontSize: "18px", 
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}>
              <span>✅</span> {lang === 'ar' ? ' مفتوح ' : ' Enrolled'}
            </div>
            <button
              onClick={handleUnenroll}
              disabled={unenrolling}
              style={{
                background: "white",
                color: "#dc2626",
                border: "none",
                borderRadius: "6px",
                padding: "12px 24px",
                cursor: unenrolling ? "not-allowed" : "pointer",
                fontWeight: "bold",
                width: "100%",
                fontSize: "15px",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                if (!unenrolling) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!unenrolling) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {unenrolling ? (
                <>
                  <div style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid #dc2626",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginRight: "8px"
                  }} />
                  {lang === 'ar' ? 'جاري الإلغاء...' : 'Cancelling...'}
                </>
              ) : (
                <>
                  <i className="fi fi-rr-cross" style={{ marginRight: "8px" }} />
                  {lang === 'ar' ? 'إلغاء التسجيل' : 'Unenroll'}
                </>
              )}
            </button>
          </div>
        ) : (
          <div style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "12px", marginBottom: "5px", opacity: 0.9 }}>
              {lang === 'ar' ? 'السعر النهائي' : 'Final Price'}
            </div>
            <div style={{ 
              fontSize: "28px", 
              fontWeight: "bold", 
              marginBottom: "5px" 
            }}>
              {course.price} {course.currency}
            </div>
            {course.discount && (
              <div style={{ 
                textDecoration: "line-through", 
                color: "#93c5fd",
                marginBottom: "10px",
                fontSize: "14px"
              }}>
                {lang === 'ar' ? 'السعر الأصلي' : 'Original Price'}: {course.original_price} {course.currency}
              </div>
            )}
            
            {course.discount && (
              <div style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "#fef3c7",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "15px",
                display: "inline-block"
              }}>
                {lang === 'ar' ? 'الخصم' : 'Discount'}: {course.discount}%
              </div>
            )}
            
            <button
              onClick={handleEnroll}
              disabled={enrolling}
              style={{
                background: "white",
                color: "#3b82f6",
                border: "none",
                borderRadius: "8px",
                padding: "14px 24px",
                cursor: enrolling ? "not-allowed" : "pointer",
                fontWeight: "bold",
                fontSize: "16px",
                width: "100%",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                if (!enrolling) {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 255, 255, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!enrolling) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {enrolling ? (
                <>
                  <div style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    border: "2px solid #3b82f6",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    marginRight: "8px"
                  }} />
                  {lang === 'ar' ? 'جاري التسجيل...' : 'Enrolling...'}
                </>
              ) : (
                <>
                  <i className="fi fi-rr-add" style={{ marginRight: "8px" }} />
                  {lang === 'ar' ? ' فتح  الدرس' : ' Open lessons'}
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Course Information */}
      <div className="ed-course__sidebar-widget" style={{ 
        background: "#f8fafc",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h4 className="ed-course__sidebar-title" style={{
          color: "#1f2937",
          marginBottom: "20px",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span>📋</span> {lang === 'ar' ? 'معلومات درس' : 'lessons Information'}
        </h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid #e5e7eb"
          }}>
            <span style={{ color: "#6b7280", fontSize: "14px" }}>
              {lang === 'ar' ? 'المدرس ' : 'teacher'}:
            </span>
            <Link 
              href={`/instructor-details/${course.teacher.id}`}
              style={{
                color: "#3b82f6",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "14px"
              }}
            >
              {course.teacher.name}
            </Link>
          </li>
          <li style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid #e5e7eb"
          }}>
            <span style={{ color: "#6b7280", fontSize: "14px" }}>
              {lang === 'ar' ? 'المنهج' : 'Curriculum'}:
            </span>
            <span style={{ color: "#1f2937", fontWeight: "500" }}>
              {course.curricula?.name}
            </span>
          </li>
          <li style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid #e5e7eb"
          }}>
            <span style={{ color: "#6b7280", fontSize: "14px" }}>
              {lang === 'ar' ? 'المرحلة' : 'Stage'}:
            </span>
            <span style={{ color: "#1f2937", fontWeight: "500" }}>
              {course.stage?.name}
            </span>
          </li>
          <li style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid #e5e7eb"
          }}>
            <span style={{ color: "#6b7280", fontSize: "14px" }}>
              {lang === 'ar' ? 'المادة' : 'Subject'}:
            </span>
            <span style={{ color: "#1f2937", fontWeight: "500" }}>
              {course.subject?.name}
            </span>
          </li>
          <li style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            borderBottom: "1px solid #e5e7eb"
          }}>
            <span style={{ color: "#6b7280", fontSize: "14px" }}>
              {lang === 'ar' ? 'الدروس' : 'Lessons'}:
            </span>
            <span style={{ color: "#1f2937", fontWeight: "500" }}>
              {course.details.length}
            </span>
          </li>
        
          <li style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0"
          }}>
            <span style={{ color: "#6b7280", fontSize: "14px" }}>
              {lang === 'ar' ? 'المشتركين' : 'Subscribers'}:
            </span>
            <span style={{ 
              color: "#10b981", 
              fontWeight: "bold",
              fontSize: "15px"
            }}>
              {course.subscribers_count}
            </span>
          </li>
        </ul>
      </div>

    
    </div>
  );
};

export default CourseDetailsSidebar;