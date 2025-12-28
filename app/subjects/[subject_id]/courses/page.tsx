'use client';
import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import { useLang } from '@/context/LanguageContext';
import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";

interface Course {
  id: number;
  title: string;
  description: string;
  type: 'recorded' | 'live';
  original_price: string;
  discount: string;
  price: string;
  what_you_will_learn: string;
  semester: 'one' | 'two' | 'three';
  image: string;
  file_path: string;
  currency: string;
  subscribers_count: number;
  active: boolean;
  teacher: {
    id: number;
    name: string;
    image: string;
    courses_count: number;
    average_rating: number;
  };
  curricula: {
    id: number;
    name: string;
    image: string;
  };
  stage: {
    id: number;
    name: string;
  };
  subject: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
  details: any[];
  average_rating: number;
  created_at: string;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

const CoursesPage = () => {
  const { lang } = useLang();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = params.subject_id as string;
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<Meta | null>(null);
  const stageId = searchParams.get('stage_id')
  // Modal state
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<'one' | 'two' | 'three' | ''>('');
  
  // Filters - ONLY semester
  const [filters, setFilters] = useState({
    semester: '',
     stage_id: stageId || '',
  });
  
  // Sorting
  const [sorting, setSorting] = useState({
    orderBy: 'id',
    orderByDirection: 'asc' as 'asc' | 'desc',
  });
  
  // Search
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  // Translations
  const translations = {
    pageTitle: {
      en: "lessons",
      ar: "دروس"
    },
    bannerTitle: {
      en: "Available lessons",
      ar: "الدروس المتاحة"
    },
    loading: {
      en: "Loading lessons...",
      ar: "جاري تحميل الدروس..."
    },
    error: {
      en: "Failed to load lessons",
      ar: "فشل تحميل الدروس"
    },
    noCourses: {
      en: "No lessons found",
      ar: "لا توجد دروس"
    },
    noCoursesMessage: {
      en: "There are no lessons available for this subject.",
      ar: "لا توجد دروس متاحة لهذه المادة."
    },
    sortById: {
      en: "Sort by ID",
      ar: "ترتيب حسب الرقم"
    },
    sortByDate: {
      en: "Sort by Date",
      ar: "ترتيب حسب التاريخ"
    },
    sortByPrice: {
      en: "Sort by Price",
      ar: "ترتيب حسب السعر"
    },
    sortByRating: {
      en: "Sort by Rating",
      ar: "ترتيب حسب التقييم"
    },
    descending: {
      en: "Descending",
      ar: "تنازلي"
    },
    ascending: {
      en: "Ascending",
      ar: "تصاعدي"
    },
    search: {
      en: "Search lessons...",
      ar: "ابحث عن دروس..."
    },
    searchButton: {
      en: "Search",
      ar: "بحث"
    },
    showing: {
      en: "Showing",
      ar: "عرض"
    },
    of: {
      en: "of",
      ar: "من"
    },
    results: {
      en: "results",
      ar: "نتيجة"
    },
    selectSemester: {
      en: "Select Term",
      ar: "اختر الفصل الدراسي"
    },
    semesterOne: {
      en: " Term 1",
      ar: "الفصل الأول"
    },
    semesterTwo: {
      en: " Term 2",
      ar: "الفصل الثاني"
    },
    semesterThree: {
      en: "Term 3",
      ar: "الفصل الثالث"
    },
    apply: {
      en: "Apply",
      ar: "تطبيق"
    },
    clear: {
      en: "Clear",
      ar: "مسح"
    },
    filterBySemester: {
      en: "Filter by Term",
      ar: "تصفية حسب الفصل"
    },
    sortBy: {
      en: "Sort by",
      ar: "ترتيب حسب"
    },
    order: {
      en: "Order",
      ar: "ترتيب"
    },
    lessons: {
      en: "Lessons",
      ar: "دروس"
    },
    unknownTeacher: {
      en: "Unknown Teacher",
      ar: "معلم غير معروف"
    },
    noCurriculum: {
      en: "No Curriculum",
      ar: "لا يوجد منهج"
    },
    noStage: {
      en: "No Stage",
      ar: "لا توجد مرحلة"
    },
    noCountry: {
      en: "No Country",
      ar: "لا توجد دولة"
    },
    students: {
      en: "Buyer",
      ar: "المشترين"
    },
    courses: {
      en: "lessons",
      ar: "دروس"
    },
    backToSubjects: {
      en: "Back to Subjects",
      ar: "العودة للمواد"
    },
    courseDescription: {
      en: "Explore all available lessons for this subject. You can filter by term and sort by various criteria.",
      ar: "استكشف جميع الدروس المتاحة لهذه المادة. يمكنك التصفية حسب الفصل الدراسي والترتيب حسب معايير مختلفة."
    },
    recorded: {
      en: "Recorded",
      ar: "مسجل"
    },
    live: {
      en: "Live",
      ar: "مباشر"
    }
  };

  const getText = (key: keyof typeof translations) => {
    return translations[key][lang as 'en' | 'ar'];
  };

  const fetchCourses = useCallback(async (page = currentPage, semesterFilter = filters.semester) => {
    if (!subjectId) return;

    try {
      setLoading(true);
      setError(null);

      const requestBody: any = {
        filters: {
          subject_id: subjectId,
          ...(semesterFilter && { semester: semesterFilter }),
          ...(stageId && { stage_id: stageId }),
        },
        orderBy: sorting.orderBy,
        orderByDirection: sorting.orderByDirection,
        perPage: perPage,
        page: page,
        paginate: true,
        delete: false
      };

      // Add search if exists
      if (searchTerm.trim()) {
        requestBody.search = {
          term: searchTerm,
          columns: ['title', 'description']
        };
      }

      console.log('Fetching courses with:', requestBody);
      
      const response = await api.post('/course/index', requestBody);

      if (response.data?.data) {
        setCourses(response.data.data);
        setMeta(response.data.meta);
        console.log('Courses fetched:', response.data.data.length);
      }

    } catch (err: any) {
      console.error('Error fetching courses:', err);
      setError(err.response?.data?.message || getText('error'));
    } finally {
      setLoading(false);
    }
  }, [subjectId,stageId, sorting.orderBy, sorting.orderByDirection, searchTerm]);

  // Effect for initial load and semester modal
  useEffect(() => {
    if (!subjectId) return;
    
    // Check if semester is already selected in URL
    const semesterParam = searchParams.get('semester');
      const stageIdFromUrl = searchParams.get('stage_id');
    if (semesterParam && ['one', 'two', 'three'].includes(semesterParam)) {
      const semester = semesterParam as 'one' | 'two' | 'three';
      setSelectedSemester(semester);
      setFilters(prev => ({ ...prev, semester }));
      setShowSemesterModal(false);
      fetchCourses(1, semester);
    } else {
      // Show modal if no semester selected
      setShowSemesterModal(true);
    }
  }, [subjectId, searchParams]);

  // Effect for filters/sorting changes
  useEffect(() => {
    if (!subjectId || showSemesterModal) return;
    
    // Small delay to prevent too many calls
    const timer = setTimeout(() => {
      fetchCourses(1, filters.semester);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [filters.semester, sorting.orderBy, sorting.orderByDirection, searchTerm, subjectId, showSemesterModal]);

  // Effect for page changes
  useEffect(() => {
    if (!subjectId || showSemesterModal || currentPage === 1) return;
    
    fetchCourses(currentPage, filters.semester);
  }, [currentPage, subjectId, showSemesterModal]);

  const handleSemesterSelect = (semester: 'one' | 'two' | 'three' | '') => {
    setSelectedSemester(semester);
  };

  const applySemesterFilter = () => {
    if (!selectedSemester) {
      alert(lang === 'ar' ? 'يرجى اختيار فصل دراسي' : 'Please select a semester');
      return;
    }
    
    setFilters(prev => ({ ...prev, semester: selectedSemester }));
    
    // Update URL with semester parameter
    const params = new URLSearchParams();
    params.set('semester', selectedSemester);
      if (stageId) {
    params.set('stage_id', stageId);
  }
    router.push(`?${params.toString()}`);
    
    setShowSemesterModal(false);
    setCurrentPage(1);
    
    // Fetch courses with selected semester
    fetchCourses(1, selectedSemester);
  };

  const clearSemesterFilter = () => {
    setSelectedSemester('');
    setFilters(prev => ({ ...prev, semester: '' }));
    
    // Remove semester from URL
    const params = new URLSearchParams();
    router.push('?');
    
    setShowSemesterModal(false);
    setCurrentPage(1);
    
    // Fetch courses without semester filter
    fetchCourses(1, '');
  };

  const handleFilterChange = (value: string) => {
    setFilters(prev => ({ ...prev, semester: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (orderBy: string, direction?: 'asc' | 'desc') => {
    if (direction) {
      setSorting(prev => ({ ...prev, orderByDirection: direction }));
    } else {
      setSorting(prev => ({ ...prev, orderBy }));
    }
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCourses(1, filters.semester);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showingText = meta ? 
    `${getText('showing')} ${meta.from}-${meta.to} ${getText('of')} ${meta.total} ${getText('results')}` : 
    '';

  // Semester Modal Component
  const SemesterModal = () => {
    if (!showSemesterModal) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>
            {getText('selectSemester')}
          </h3>
          
          <p style={{ marginBottom: '30px', color: '#6b7280' }}>
            {lang === 'ar' ? 'يرجى اختيار الفصل الدراسي لعرض الدروس المتاحة' : 'Please select a semester to view available lessons.'}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
            <button
              onClick={() => handleSemesterSelect('one')}
              style={{
                padding: '15px',
                borderRadius: '8px',
                border: selectedSemester === 'one' ? '2px solid #3b82f6' : '1px solid #d1d5db',
                background: selectedSemester === 'one' ? '#eff6ff' : 'white',
                fontSize: '16px',
                fontWeight: '600',
                color: selectedSemester === 'one' ? '#3b82f6' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {getText('semesterOne')}
            </button>
            
            <button
              onClick={() => handleSemesterSelect('two')}
              style={{
                padding: '15px',
                borderRadius: '8px',
                border: selectedSemester === 'two' ? '2px solid #3b82f6' : '1px solid #d1d5db',
                background: selectedSemester === 'two' ? '#eff6ff' : 'white',
                fontSize: '16px',
                fontWeight: '600',
                color: selectedSemester === 'two' ? '#3b82f6' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {getText('semesterTwo')}
            </button>
            
            <button
              onClick={() => handleSemesterSelect('three')}
              style={{
                padding: '15px',
                borderRadius: '8px',
                border: selectedSemester === 'three' ? '2px solid #3b82f6' : '1px solid #d1d5db',
                background: selectedSemester === 'three' ? '#eff6ff' : 'white',
                fontSize: '16px',
                fontWeight: '600',
                color: selectedSemester === 'three' ? '#3b82f6' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {getText('semesterThree')}
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={applySemesterFilter}
              disabled={!selectedSemester}
              style={{
                padding: '12px 30px',
                borderRadius: '8px',
                border: 'none',
                background: selectedSemester ? '#3b82f6' : '#9ca3af',
                color: 'white',
                fontWeight: '600',
                cursor: selectedSemester ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s',
                fontSize: '16px'
              }}
            >
              {getText('apply')}
            </button>
          </div>
          
          <p style={{ marginTop: '20px', fontSize: '14px', color: '#9ca3af' }}>
            {lang === 'ar' ? 'يمكنك تغيير الفصل الدراسي لاحقاً من خيارات التصفية' : 'You can change the term later from the filter options'}
          </p>
        </div>
      </div>
    );
  };

  // Course Item Component
  const CourseItem = ({ course }: { course: Course }) => {
    const [imgError, setImgError] = useState(false);
    const defaultImage = '/assets/images/course/default-course.jpg';
    const imageSrc = imgError || !course.image ? defaultImage : course.image;

    return (
      <div className="col-lg-4 col-md-6 col-12 mb-4">
        <div className="ed-course__card" style={{
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          height: "100%",
          border: "1px solid #e5e7eb",
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
          {/* Course Type Badge */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: course.type === 'recorded' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 2
          }}>
            {course.type === 'recorded' ? getText('recorded') : getText('live')}
          </div>

          {/* Course Image */}
          <Link href={`/course-details/${course.id}`} style={{ display: 'block' }}>
            <div style={{ 
              width: '100%', 
              height: '200px', 
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img
                src={imageSrc}
                alt={course.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                onError={() => setImgError(true)}
              />
              
              {/* Overlay on hover */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.2)',
                opacity: 0,
                transition: 'opacity 0.3s'
              }} />
            </div>
          </Link>

          <div style={{ padding: '20px' }}>
            {/* Lessons Count */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '10px',
              color: '#6b7280',
              fontSize: '14px'
            }}>
              <i className="fi fi-rr-book" style={{ fontSize: '14px' }} />
              <span>{course.details?.length || 0} {getText('lessons')}</span>
            </div>

            {/* Course Title */}
            <Link href={`/course-details/${course.id}`} style={{ textDecoration: 'none' }}>
              <h5 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '12px',
                minHeight: '54px',
                textAlign: lang === 'ar' ? 'right' : 'left',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {course.title}
              </h5>
            </Link>

            {/* Teacher Info */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {course.teacher?.image ? (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}>
                    <img 
                      src={course.teacher.image} 
                      alt={course.teacher.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    flexShrink: 0
                  }}>
                    <i className="fi fi-rr-user" />
                  </div>
                )}
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: '#374151',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {course.teacher?.name || getText('unknownTeacher')}
                  </p>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '12px', 
                    color: '#6b7280'
                  }}>
                    {course.teacher?.courses_count || 0} {getText('courses')}
                  </p>
                </div>
              </div>
            </div>

            {/* Curriculum and Country */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '15px'
            }}>
              <span style={{
                background: '#dbeafe',
                color: '#1e40af',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <i className="fi fi-rr-document" style={{ fontSize: '10px' }} />
                {course.curricula?.name || getText('noCurriculum')}
              </span>
              
              <span style={{
                background: '#f3f4f6',
                color: '#374151',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <i className="fi fi-rr-flag" style={{ fontSize: '10px' }} />
                {course.country?.name || getText('noCountry')}
              </span>
            </div>

            {/* Semester */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{
                background: '#fef3c7',
                color: '#92400e',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <i className="fi fi-rr-calendar" style={{ fontSize: '12px' }} />
                {course.semester === 'one' ? getText('semesterOne') : 
                 course.semester === 'two' ? getText('semesterTwo') : 
                 getText('semesterThree')}
              </span>
            </div>

            {/* Price and Students */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '15px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div>
                {parseFloat(course.discount) > 0 && (
                  <span style={{
                    color: '#9ca3af',
                    textDecoration: 'line-through',
                    fontSize: '14px',
                    marginRight: '8px'
                  }}>
                    {course.currency}{parseFloat(course.original_price).toFixed(2)}
                  </span>
                )}
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#1f2937'
                }}>
                  {course.currency}{parseFloat(course.price).toFixed(2)}
                </span>
                {parseFloat(course.discount) > 0 && (
                  <span style={{
                    background: '#fee2e2',
                    color: '#dc2626',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    marginLeft: '8px'
                  }}>
                    {course.discount}% OFF
                  </span>
                )}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fi fi-rr-graduation-cap" style={{ color: '#6b7280', fontSize: '14px' }} />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  {course.subscribers_count || 0} {getText('students')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Pagination Component
  const Pagination = () => {
    if (!meta || meta.last_page <= 1) return null;

    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, meta.current_page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(meta.last_page, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
          {meta.current_page > 1 && (
            <button
              onClick={() => handlePageChange(meta.current_page - 1)}
              style={{
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '14px',
                minHeight: '40px'
              }}
            >
              <i className="fi fi-rr-arrow-left" />
              {lang === 'ar' ? 'السابق' : 'Previous'}
            </button>
          )}
          
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={{
                background: page === meta.current_page ? '#3b82f6' : '#f3f4f6',
                color: page === meta.current_page ? 'white' : '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '8px 12px',
                minWidth: '40px',
                minHeight: '40px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: page === meta.current_page ? '600' : '400'
              }}
            >
              {page}
            </button>
          ))}
          
          {meta.current_page < meta.last_page && (
            <button
              onClick={() => handlePageChange(meta.current_page + 1)}
              style={{
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '14px',
                minHeight: '40px'
              }}
            >
              {lang === 'ar' ? 'التالي' : 'Next'}
              <i className="fi fi-rr-arrow-right" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <EdunaLayout>
      <PageBanner 
        pageTitleEn='Lessons'
        pageTitleAr='دروس'
      />
      
      <section className="ed-course section-gap position-relative">
        <div className="container ed-container">
          {/* Semester Selection Modal */}
          <SemesterModal />
          
          {/* Page Header */}
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
                      {getText('pageTitle')}
                    </h1>
                    
                    {/* Selected Semester Badge */}
                    {filters.semester && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <span style={{
                          background: '#3b82f6',
                          color: 'white',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <i className="fi fi-rr-calendar" />
                          {filters.semester === 'one' ? getText('semesterOne') : 
                           filters.semester === 'two' ? getText('semesterTwo') : 
                           getText('semesterThree')}
                        </span>
                        
                        <button
                          onClick={clearSemesterFilter}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '13px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            transition: 'all 0.3s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fef2f2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <i className="fi fi-rr-cross-small" />
                          {lang === 'ar' ? 'إزالة الفلتر' : 'Remove Filter'}
                        </button>
                      </div>
                    )}
                    
                    {courses.length > 0 && (
                      <div style={{ color: "#6b7280", fontSize: '15px' }}>
                        <span style={{ fontWeight: '600' }}>{courses[0].subject?.name}</span>
                        <span style={{ margin: "0 10px" }}>•</span>
                        <span>{courses[0].stage?.name}</span>
                      </div>
                    )}
                  </div>
                  
               
                </div>
                
                <p style={{
                  fontSize: "16px",
                  color: "#4b5563",
                  lineHeight: "1.6"
                }}>
                  {getText('courseDescription')}
                </p>
              </div>
            </div>
          </div>

          {/* Filters and Search - ONLY if semester is selected */}
          {!showSemesterModal && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="ed-course__filter">
                  <p className="ed-course__filter-text">{showingText}</p>
                  
                  {/* Filters Row */}
                  <div className="row mb-3 g-3">
                    <div className="col-md-4 col-12">
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                       {lang === 'ar' ? ' جميع الفصول' : 'All Terms'}
                        </label>
                        <select 
                          className="form-select"
                          value={filters.semester}
                          onChange={(e) => handleFilterChange(e.target.value)}
                          style={{ padding: '10px', borderRadius: '8px' }}
                        >
                          <option value="">{lang === 'ar' ? 'جميع الفصول' : 'All Terms'}</option>
                          <option value="one">{getText('semesterOne')}</option>
                          <option value="two">{getText('semesterTwo')}</option>
                          <option value="three">{getText('semesterThree')}</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="col-md-4 col-12">
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                          {getText('sortBy')}
                        </label>
                        <select 
                          className="form-select"
                          value={sorting.orderBy}
                          onChange={(e) => handleSortChange(e.target.value)}
                          style={{ padding: '10px', borderRadius: '8px' }}
                        >
                          <option value="id">{getText('sortById')}</option>
                          <option value="created_at">{getText('sortByDate')}</option>
                          <option value="price">{getText('sortByPrice')}</option>
                          <option value="average_rating">{getText('sortByRating')}</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="col-md-4 col-12">
                      <div className="form-group">
                        <label className="form-label" style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>
                          {getText('order')}
                        </label>
                        <select 
                          className="form-select"
                          value={sorting.orderByDirection}
                          onChange={(e) => handleSortChange(sorting.orderBy, e.target.value as 'asc' | 'desc')}
                          style={{ padding: '10px', borderRadius: '8px' }}
                        >
                          <option value="desc">{getText('descending')}</option>
                          <option value="asc">{getText('ascending')}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Search */}
                  <div className="ed-course__filter-search">
                    <form onSubmit={handleSearch} className="ed-hero__search-form" style={{ maxWidth: '600px', margin: '0 auto' }}>
                      <input
                        type="search"
                        name="search"
                        placeholder={getText('search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                        style={{ flex: 1, padding: '12px 20px', borderRadius: '8px 0 0 8px' }}
                      />
                      <button type="submit" style={{ padding: '12px 25px', borderRadius: '0 8px 8px 0' }}>
                        {getText('searchButton')}
                        <i className="fi-rr-search" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && !showSemesterModal && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">{getText('loading')}</span>
              </div>
              <p className="mt-3 fs-5">{getText('loading')}</p>
            </div>
          )}

       
          {error && !loading && !showSemesterModal && (
            <div className="alert alert-danger text-center" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h5>{error}</h5>
              <button 
                className="btn btn-primary mt-2"
                onClick={() => fetchCourses(1, filters.semester)}
              >
                {lang === 'ar' ? 'حاول مرة أخرى' : 'Try Again'}
              </button>
            </div>
          )}

         
          {!loading && !error && !showSemesterModal && courses.length === 0 && (
            <div className="text-center py-5">
              <div style={{ fontSize: '64px', marginBottom: '20px', opacity: '0.7' }}>📚</div>
              <h4 className="mb-3" style={{ color: '#374151' }}>{getText('noCourses')}</h4>
              <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 20px' }}>
                {getText('noCoursesMessage')}
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowSemesterModal(true)}
                >
                  {getText('selectSemester')}
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={clearSemesterFilter}
                >
                  {lang === 'ar' ? 'عرض جميع الدروس' : 'Show All Lessons'}
                </button>
              </div>
            </div>
          )}

          {/* Courses Grid */}
          {!loading && !error && !showSemesterModal && courses.length > 0 && (
            <>
              <div className="row">
                {courses.map((course) => (
                  <CourseItem key={course.id} course={course} />
                ))}
              </div>
              
              {/* Pagination */}
              <Pagination />
            </>
          )}
        </div>
      </section>
      
    
    </EdunaLayout>
  );
};

export default CoursesPage;