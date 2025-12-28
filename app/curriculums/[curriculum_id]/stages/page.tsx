// في صفحات المراحل StagesPage.tsx
'use client';
import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

interface Stage {
  curricula: any;
  id: number;
  name: string;
  postion: number;
  active: boolean;
  image: string | null;
  country: {
    id: number;
    name: string;
    image: string;
  };
  curriculum: {
    id: number;
    name: string;
    image: string;
    active: boolean;
  };
}

const StagesPage = () => {
  const params = useParams();
  const curriculumId = params.curriculum_id;
  
  const { lang } = useLang();
  const isAr = lang === 'ar';

  const [stages, setStages] = useState<Stage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [curriculumName, setCurriculumName] = useState<string>("");

  const fetchStages = async () => {
    try {
     
      setError(null);
      
      const response = await api.post('/stage/list-by-curriculum', {
        curriculum_id: curriculumId,
        filters: {},
        orderBy: "id",
        orderByDirection: "asc",
        paginate: false
      });

      if (response.data?.data) {
        const raw = response.data.data;
        const normalized = Array.isArray(raw)
          ? raw.map((item: any) => (item?.stage ? item.stage : item))
          : [];

        setStages(normalized);

        if (normalized[0]?.curriculum?.name) {
          setCurriculumName(normalized[0].curriculum.name);
        }
      }
    } catch (err: any) {
      console.error('Error fetching stages:', err);
      setError(isAr ? 'فشل تحميل المراحل' : 'Failed to load stages');
    } finally {
    }
  };

  useEffect(() => {
    if (curriculumId) {
      fetchStages();
    }
  }, [curriculumId, lang]);

  // الترجمة باستخدام isAr
  const translations = {
    pageTitle: isAr ? 'المراحل التعليمية' : 'Educational Stages',
    pageSubtitle: isAr ? 'كل ما تحتاجه من مراحل دراسية في مكان واحد' : 'All the educational stages you need in one place',
    curriculum: isAr ? 'المنهج' : 'Curriculum',
    country: isAr ? 'البلد' : 'Country',
    stage: isAr ? 'مرحلة' : 'Stage',
    viewSubjects: isAr ? 'عرض المواد' : 'View Subjects',
    backToCurriculums: isAr ? 'العودة إلى المناهج' : 'Back to Curriculums',
    loadingText: isAr ? 'جاري تحميل المراحل...' : 'Loading stages...',
    tryAgain: isAr ? 'حاول مرة أخرى' : 'Try Again',
    noStages: isAr ? 'لا توجد مراحل لهذا المنهج' : 'No stages found for this curriculum',
    previous: isAr ? 'السابق' : 'Previous',
    next: isAr ? 'التالي' : 'Next',
  };

 

  if (error) {
    return (
      <EdunaLayout>
        <PageBanner 
          pageTitleEn={translations.pageTitle} 
          pageTitleAr={translations.pageTitle} 
        />
        <div style={{
          background: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '25px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '40px auto'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>❌</div>
          <h4 style={{ color: '#991b1b', marginBottom: '10px', fontSize: '18px' }}>
            {error}
          </h4>
          <button
            onClick={fetchStages}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 24px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fi fi-rr-refresh" />
            {translations.tryAgain}
          </button>
        </div>
      </EdunaLayout>
    );
  }

  return (
    <EdunaLayout>
      <PageBanner 
        pageTitleEn={translations.pageTitle} 
        pageTitleAr={translations.pageTitle} 
      />
      
      <section 
        className="ed-stages position-relative section-gap"
        style={{ direction: isAr ? 'rtl' : 'ltr' }}
      >
        <div className="container ed-container">
          {/* Page Header */}
          <div className="row mb-5">
            <div className="col-12">
              <div style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
                padding: "30px",
                borderRadius: "12px",
                border: "1px solid #e0e7ff",
                marginBottom: "30px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
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
                      {translations.pageTitle}
                    </h1>
                    {curriculumName && (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                      }}>
                        <span style={{
                          background: "#3b82f6",
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "600"
                        }}>
                          📚 {curriculumName}
                        </span>
                        <span style={{ color: "#6b7280", fontSize: "15px" }}>
                          {stages.length} {stages.length === 1 ? 
                            (isAr ? 'مرحلة' : 'Stage') : 
                            (isAr ? 'مراحل' : 'Stages')}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    href="/curriculums"
                    style={{
                      background: "white",
                      color: "#3b82f6",
                      border: "1px solid #3b82f6",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: "600",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#3b82f6";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.color = "#3b82f6";
                    }}
                  >
                    <i className="fi fi-rr-arrow-left" style={{
                      transform: isAr ? 'scaleX(-1)' : 'none'
                    }} />
                    {translations.backToCurriculums}
                  </Link>
                </div>
                
                <p style={{
                  fontSize: "16px",
                  color: "#4b5563",
                  lineHeight: "1.6",
                  maxWidth: "800px",
                  margin: "0 auto"
                }}>
                  {translations.pageSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {stages.length === 0  && !error && (
            <div style={{
              textAlign: 'center',
              padding: '50px 20px',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px', opacity: '0.7' }}>
                📭
              </div>
              <h4 style={{ color: '#6b7280', marginBottom: '10px', fontSize: '18px' }}>
                {translations.noStages}
              </h4>
            </div>
          )}

          {/* Stages Grid */}
          {stages.length > 0 && (
            <div className="row">
              {stages.map((stage) => (
                <div key={stage.id} className="col-lg-4 col-md-6 col-12 mb-4">
                  <div className="ed-stage__card" style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "20px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    height: "100%",
                    transition: "all 0.3s ease",
                    border: "1px solid #e5e7eb",
                    textAlign: isAr ? 'right' : 'left',
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                  }}>
                    
                    {/* Stage Badge */}
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      left: isAr ? 'auto' : '10px',
                      right: isAr ? '10px' : 'auto',
                      background: "#3b82f6",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                      zIndex: 1
                    }}>
                      {translations.stage} #{stage.postion}
                    </div>

                    {/* Stage Image */}
                    <div style={{
                      height: "180px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      marginBottom: "15px",
                      position: "relative"
                    }}>
                      {stage.image ? (
                        <Image
                          src={stage.image}
                          alt={stage.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      ) : (
                        <div style={{
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#9ca3af"
                        }}>
                          <span style={{ fontSize: "48px" }}>📚</span>
                        </div>
                      )}
                    </div>

                    {/* Stage Name */}
                    <h4 style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#1f2937",
                      marginBottom: "10px"
                    }}>
                      {stage.name}
                    </h4>

                    {/* Stage Info */}
                    <div style={{ marginBottom: "20px" }}>
                      {/* Curriculum Info */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px"
                      }}>
                        <div style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "4px",
                          overflow: "hidden",
                          flexShrink: 0
                        }}>
                          {stage.curricula?.image && (
                            <Image
                              src={stage.curricula?.image}
                              alt={stage.curricula?.name}
                              width={24}
                              height={24}
                              style={{ objectFit: "cover" }}
                            />
                          )}
                        </div>
                        <div>
                          <div style={{
                            fontSize: "12px",
                            color: "#6b7280"
                          }}>
                            {translations.curriculum}
                          </div>
                          <div style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#374151"
                          }}>
                            {stage.curricula?.name}
                          </div>
                        </div>
                      </div>

                      {/* Country Info */}
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        <div style={{
                          width: "24px",
                          height: "18px",
                          borderRadius: "2px",
                          overflow: "hidden",
                          flexShrink: 0
                        }}>
                          {stage.country.image && (
                            <Image
                              src={stage.country.image}
                              alt={stage.country.name}
                              width={24}
                              height={18}
                              style={{ objectFit: "cover" }}
                            />
                          )}
                        </div>
                        <div>
                          <div style={{
                            fontSize: "12px",
                            color: "#6b7280"
                          }}>
                            {translations.country}
                          </div>
                          <div style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#374151"
                          }}>
                            {stage.country.name}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Link 
                      href={`/stages/${stage.id}/subjects/`}
                      style={{
                        display: "block",
                        background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                        color: "white",
                        textAlign: "center",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "14px",
                        transition: "all 0.3s",
                        marginTop: "auto"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      {translations.viewSubjects}
                    </Link>
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

export default StagesPage;