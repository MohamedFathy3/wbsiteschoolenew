'use client';
import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
import { useLang } from "@/context/LanguageContext";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

interface Subject {
  id: number;
  name: string;
  position: number | null;
  active: boolean;
  image: string;
  stage: {
    id: number;
    name: string;
    curriculum: {
      name: string;
    };
    country: {
      name: string;
    };
  };
}

const SubjectsPage = () => {
  const { lang, direction } = useLang();
  const params = useParams();
  const stageId = params.stage_id;
  
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [stageInfo, setStageInfo] = useState<any>(null);

  // استخدام useMemo للحصول على الترجمات مباشرة
  const t = useMemo(() => {
    const translations = {
      pageTitle: {
        en: "Subjects",
        ar: "المواد الدراسية"
      },
      bannerTitle: {
        en: "Subjects",
        ar: "مواد المرحلة"
      },
      loading: {
        en: "Loading subjects...",
        ar: "جاري تحميل المواد..."
      },
      error: {
        en: "Failed to load subjects",
        ar: "فشل تحميل المواد"
      },
      noSubjects: {
        en: "No subjects found for this stage",
        ar: "لا توجد مواد لهذه المرحلة"
      },
      viewCourses: {
        en: "View lessons",
        ar: "عرض الدروس"
      },
      stageSubjects: {
        en: "Stage Subjects",
        ar: "مواد المرحلة"
      },
     
      subjectDescription: {
        en: "Explore subjects available in this stage",
        ar: "استكشف المواد الدراسية المتاحة في هذه المرحلة"
      }
    };
    
    // دالة للحصول على النص المترجم مباشرة
    const getText = (key: keyof typeof translations) => {
      return translations[key][lang];
    };
    
    return { getText, translations };
  }, [lang]);

  const fetchSubjects = async () => {
    try {
      setError(null);
      
      const response = await api.post('/subject/list-by-stage', {
        stage_id: stageId,
        filters: {},
        orderBy: "id",
        orderByDirection: "asc",
        paginate: false
      });

      if (response.data && response.data.data) {
        setSubjects(response.data.data);
        
        if (response.data.data.length > 0) {
          setStageInfo(response.data.data[0].stage);
        }
      }
      
    } catch (err: any) {
      console.error('Error fetching subjects:', err);
      setError(err.response?.data?.message || t.getText('error'));
    } finally {
    }
  };

  useEffect(() => {
    if (stageId) {
      fetchSubjects();
    }
  }, [stageId, lang]); // إضافة lang كـ dependency

  const getDefaultImage = () => {
    return "/assets/images/subject/default-subject.jpg";
  };

  return (
    <EdunaLayout>
      <PageBanner 
        pageTitleEn='Subjects'
        pageTitleAr='مواد المرحلة' 
      />
      
      <section style={{ 
        direction,
        padding: "40px 0"
      }}>
        <div className="container ed-container">
          {/* Header */}
          <div className="row mb-5">
            <div className="col-12">
              <div style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                marginBottom: "30px"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "15px"
                }}>
                  <div>
                    <h1 style={{
                      fontSize: "2rem",
                      fontWeight: "700",
                      color: "#1f2937",
                      marginBottom: "10px"
                    }}>
                      {t.getText('pageTitle')}
                    </h1>
                    {stageInfo && (
                      <div style={{ color: "#6b7280" }}>
                        <span style={{ color: "#3b82f6", fontWeight: "600" }}>
                          {stageInfo.name}
                        </span>
                        <span style={{ margin: "0 10px" }}>•</span>
                        <span>{stageInfo.curriculum?.name}</span>
                        <span style={{ margin: "0 10px" }}>•</span>
                        <span>{stageInfo.country.name}</span>
                      </div>
                    )}
                  </div>
                 
                </div>
                
                <p style={{
                  fontSize: "16px",
                  color: "#4b5563",
                  lineHeight: "1.6"
                }}>
                  {t.getText('subjectDescription')}
                </p>
              </div>
            </div>
          </div>

        

          {/* Error State */}
          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          {/* No Subjects State */}
          {  !error && subjects.length === 0 && (
            <div className="text-center py-5">
              <p className="fs-5">{t.getText('noSubjects')}</p>
            </div>
          )}

          {/* Subjects Grid */}
          {!error && subjects.length > 0 && (
            <div className="row">
              {subjects.map((subject) => (
                <div key={subject.id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
                  <div style={{
                    background: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    height: "100%",
                    border: "1px solid #e5e7eb"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                  }}>
                    {/* Subject Image */}
                    <div style={{
                      height: "150px",
                      background: subject.image ? `url(${subject.image})` : "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative"
                    }}>
                      {!subject.image && (
                        <div style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "48px",
                          color: "#9ca3af"
                        }}>
                          📖
                        </div>
                      )}
                    </div>

                    {/* Subject Content */}
                    <div style={{ padding: "20px" }}>
                      <h5 style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginBottom: "10px",
                        minHeight: "54px"
                      }}>
                        {subject.name}
                      </h5>
                      
                      {subject.position && (
                        <div style={{
                          display: "inline-block",
                          background: "#f3f4f6",
                          color: "#6b7280",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          marginBottom: "15px"
                        }}>
                          {lang === 'ar' ? 'ترتيب' : 'Position'}: {subject.position}
                        </div>
                      )}

                      <Link 
                        href={`/subjects/${subject.id}/courses?stage_id=${stageId}`}
                        style={{
                          display: "block",
                          background: "#3b82f6",
                          color: "white",
                          textAlign: "center",
                          padding: "10px",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontWeight: "600",
                          fontSize: "14px",
                          transition: "all 0.3s"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#2563eb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#3b82f6";
                        }}
                      >
                        {t.getText('viewCourses')}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
    </EdunaLayout>
  );
};

export default SubjectsPage;