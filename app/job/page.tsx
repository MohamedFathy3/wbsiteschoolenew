// app/job-libraries/page.tsx
'use client';

import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/context/LanguageContext";
import EdunaLayout from "@/layout/EdunaLayout";
import PageBanner from "@/components/PageBanner";
import { Pagination } from "@/components/Pagination";
import { useJobLibraries } from "@/hooks/useJobLibraries";

// مكون بطاقة الوظيفة البسيط
const JobCard = ({ job, lang }: { job: any; lang: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getJobInfo = useCallback(() => {
    if (!job?.description) return { title: 'No Title', url: '#', isExternal: false };
    
    const desc = job.description.trim();
    let title = job.title || '';
    let url = '#';
    let isExternal = false;

    // محاولة استخراج عنوان من الوصف
    if (!title && desc) {
      if (desc.includes('http')) {
        const urlMatch = desc.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) {
          try {
            const domain = new URL(urlMatch[0]).hostname;
            title = domain.replace('www.', '');
            if (title.length > 20) title = title.substring(0, 20) + '...';
          } catch {
            title = 'External Link';
          }
        } else {
          title = desc.length > 40 ? desc.substring(0, 40) + '...' : desc;
        }
      } else {
        title = desc.length > 40 ? desc.substring(0, 40) + '...' : desc;
      }
    }

    // استخراج الرابط
    if (desc.includes('http')) {
      const urlMatch = desc.match(/(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        url = urlMatch[0];
        isExternal = true;
      }
    }

    return { title, url, isExternal };
  }, [job]);

  const { title, url, isExternal } = getJobInfo();

  return (
    <div 
      className={`group bg-white rounded-lg border transition-all duration-200 hover:shadow-md ${
        isHovered ? 'border-blue-300 shadow-sm' : 'border-gray-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 mb-1 truncate">
              {title}
            </h3>
            
            <div className="flex items-center gap-2">
              <a 
                href={isExternal ? url : '#'}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className={`text-sm truncate ${isExternal ? 'text-blue-600 hover:text-blue-800 hover:underline' : 'text-gray-500'}`}
              >
                {job?.description && job.description.length > 60 
                  ? job.description.substring(0, 60) + '...' 
                  : job.description || 'No description'}
              </a>
              
              {isExternal && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                  ↗
                </span>
              )}
            </div>
          </div>
          
          <div className={`ml-3 transition-all duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-60'
          }`}>
            <span className={`inline-block w-3 h-3 rounded-full ${
              job?.type === 'job' ? 'bg-green-500' : 'bg-blue-500'
            }`}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

// صفحة مكتبة الوظائف الرئيسية
const JobLibrariesPage = () => {
  const { t, lang } = useLang();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  
  // استخدام useCallback لمنع إعادة إنشاء الدوال في كل render
  const params = {
    page: currentPage,
    perPage: 10,
    filters: {
      search: searchTerm || undefined
    }
  };

  const {
    data: jobData,
    isLoading,
    error,
    refetch,
  } = useJobLibraries(params, isMounted);

  // تحميل الصفحة عند المونت
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // دالة البحث
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  }, []);

  // دالة تغيير الصفحة
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // دالة مسح البحث
  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
    setCurrentPage(1);
  }, []);

  // التحقق من البيانات
  const jobs = jobData?.data || [];
  const meta = jobData?.meta || null;

  if (!isMounted) {
    return (
      <EdunaLayout>
        <PageBanner 
          pageTitleEn="Job Libraries" 
          pageTitleAr="مكتبة الوظائف"
        />
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </EdunaLayout>
    );
  }

  return (
    <EdunaLayout>
      <PageBanner 
        pageTitleEn="Job Libraries" 
        pageTitleAr="مكتبة الوظائف"
      />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
         

          {/* Search Bar */}
        

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-4 max-w-2xl mx-auto">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-full"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="text-center max-w-md mx-auto">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ar' ? 'حدث خطأ' : 'Error'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {error instanceof Error ? error.message : 'فشل في تحميل البيانات'}
                </p>
                <button 
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {lang === 'ar' ? 'إعادة المحاولة' : 'Retry'}
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && jobs.length === 0 && (
            <div className="text-center max-w-md mx-auto">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="text-5xl mb-4">📂</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'ar' ? 'لا توجد وظائف' : 'No Jobs Found'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm 
                    ? lang === 'ar' 
                      ? 'لم يتم العثور على وظائف تطابق بحثك'
                      : 'No jobs found matching your search'
                    : lang === 'ar'
                      ? 'لا توجد وظائف متاحة حالياً'
                      : 'No jobs available at the moment'
                  }
                </p>
                {searchTerm && (
                  <button 
                    onClick={handleClearSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {lang === 'ar' ? 'عرض جميع الوظائف' : 'Show All Jobs'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Jobs List */}
          {!isLoading && !error && jobs.length > 0 && (
            <>
              <div className="space-y-3 max-w-2xl mx-auto mb-8">
                {jobs.map((job) => (
                  <JobCard 
                    key={job.id} 
                    job={job}
                    lang={lang}
                  />
                ))}
              </div>

              {/* Pagination */}
              {meta && meta.last_page > 1 && (
                <div className="mt-8">
                  <Pagination 
                    meta={meta}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}

            
             
            </>
          )}
        </div>
      </div>
    </EdunaLayout>
  );
};

export default JobLibrariesPage;