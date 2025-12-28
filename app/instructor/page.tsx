'use client';
import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
import { useLang } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Teacher, ApiResponse } from "@/types/teacher";

// استيراد الكومبوننتات
import TeachersGrid from "@/components/instructors/TeachersGrid";
import Pagination from "@/components/instructors/Pagination";
import LoadingState from "@/components/instructors/LoadingState";
import ErrorState from "@/components/instructors/ErrorState";
import EmptyState from "@/components/instructors/EmptyState";

const InstructorsPage = () => {
  const { lang } = useLang();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 5,
    total: 0
  });

  // نصوص الترجمة
  const translations = {
    pageTitle: {
      en: "Our Instructors",
      ar: "المعلمين لدينا"
    },
    bannerTitle: {
      en: "Our Instructors",
      ar: "معلمينا"
    }
  };

  const fetchTeachers = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      // **تعديل مهم**: استخدم GET بدل POST
      const response = await api.post('/teacher/index', {
        params: {
          perPage: 1,
          page: page,
          orderBy: 'id',
          orderByDirection: 'asc',
          paginate: true
        }
      });

      const data: ApiResponse = response.data;
      
      setTeachers(data.data);
      setPagination({
        current_page: data.meta.current_page,
        last_page: data.meta.last_page,
        per_page: data.meta.per_page,
        total: data.meta.total
      });
      
    } catch (err: any) {
      console.error('Error fetching teachers:', err);
      setError(err.response?.data?.message || "Failed to load instructors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers(1);
  }, [lang]);

  const handlePageChange = (page: number) => {
    fetchTeachers(page);
  };

  const getText = (key: keyof typeof translations) => {
    return translations[key][lang as 'en' | 'ar'];
  };

  return (
    <EdunaLayout>
      <PageBanner pageTitleEn='Our teacher' pageTitleAr='معلمينا' />
      
      <section 
        className="ed-team ed-team__page position-relative section-gap"
        style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
      >
        <div className="container ed-container">
          {/* Loading State */}
          {loading && <LoadingState />}

          {/* Error State */}
          {error && !loading && (
            <ErrorState 
              message={error} 
              onRetry={() => fetchTeachers(pagination.current_page)} 
            />
          )}

          {/* No Data State */}
          {!loading && !error && teachers.length === 0 && <EmptyState />}

          {/* Teachers Grid */}
          {!loading && !error && teachers.length > 0 && (
            <>
              <TeachersGrid teachers={teachers} />

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <div className="row mt-4">
                  <div className="col-12">
                    <Pagination
                      current_page={pagination.current_page}
                      last_page={pagination.last_page}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
    </EdunaLayout>
  );
};

export default InstructorsPage;