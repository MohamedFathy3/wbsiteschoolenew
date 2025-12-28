'use client';
import { CallToAction1 } from "@/components/CallToAction";
import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
import { useLang } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Curriculum, CurriculumApiResponse } from "@/types/curriculum";

// استيراد الكومبوننتات
import CurriculumGrid from "@/components/curriculums/CurriculumGrid";
import CurriculumStats from "@/components/curriculums/CurriculumStats";
import CurriculumPagination from "@/components/curriculums/CurriculumPagination";
import CurriculumEmptyState from "@/components/curriculums/CurriculumEmptyState";

const CurriculumsPage = () => {
  const { lang } = useLang();
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 5,
    total: 0
  });

  const fetchCurriculums = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/curriculum/index', {
        orderBy: "id",
        orderByDirection: "asc",
        perPage: 12,
        page: page,
        paginate: true
      });

      const data: CurriculumApiResponse = response.data;
      
      setCurriculums(data.data);
      setPagination({
        current_page: data.meta.current_page,
        last_page: data.meta.last_page,
        per_page: data.meta.per_page,
        total: data.meta.total
      });
      
    } catch (err: any) {
      console.error('Error fetching curriculums:', err);
      setError(lang === 'ar' ? 'فشل تحميل المناهج' : 'Failed to load curriculums');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculums(1);
  }, [lang]);

  const handlePageChange = (page: number) => {
    fetchCurriculums(page);
  };

  return (
    <EdunaLayout>
      <PageBanner 
        pageTitleEn='Educational Curriculums'
        pageTitleAr='المناهج الدراسية'
      />
      
      <section className="ed-curriculums position-relative section-gap">
        <div className="container ed-container">
          {/* Title Section */}
       
          {/* Loading State */}
          {loading && (
            <div className="row">
              <div className="col-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">
                    {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                  </span>
                </div>
                <p className="mt-3">
                  {lang === 'ar' ? 'جاري تحميل المناهج...' : 'Loading curriculums...'}
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="row">
              <div className="col-12">
                <div className="alert alert-danger text-center">
                  {error}
                </div>
              </div>
            </div>
          )}

          {/* Curriculums Content */}
          {!loading && !error && curriculums.length > 0 && (
            <>
              <CurriculumGrid curriculums={curriculums} lang={lang} />
              <CurriculumStats 
                curriculums={curriculums} 
                lang={lang} 
                total={pagination.total} 
              />
              <CurriculumPagination
                currentPage={pagination.current_page}
                totalPages={pagination.last_page}
                onPageChange={handlePageChange}
                lang={lang}
              />
            </>
          )}

          {/* Empty State */}
          {!loading && !error && curriculums.length === 0 && (
            <CurriculumEmptyState 
              lang={lang}
              onRetry={() => fetchCurriculums(1)}
            />
          )}
        </div>
      </section>
      
    </EdunaLayout>
  );
};

export default CurriculumsPage;