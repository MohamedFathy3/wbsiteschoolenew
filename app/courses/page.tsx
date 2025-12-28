'use client';

import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/context/LanguageContext";
import { Course } from "@/types/course";
import { Pagination } from "@/components/Pagination";
import api from "@/lib/api";
import Link from "next/link";
import EdunaLayout from "@/layout/EdunaLayout";
import PageBanner from "@/components/PageBanner";

// دالة مساعدة للترجمة مع fallback
const translate = (t: any, key: string, fallback: string): string => {
  if (t && typeof t === 'object' && key in t) {
    return t[key] as string;
  }
  return fallback;
};

// تعريف CourseItem بالشكل الجديد
const CourseItem = ({ course }: { course: Course }) => {
  const { t, lang } = useLang();
  const [imgError, setImgError] = useState(false);
  
  const courseData = {
    id: course.id,
    title: course.title,
    description: course.description,
    type: course.type,
    originalPrice: parseFloat(course.original_price) || 0,
    discount: parseFloat(course.discount) || 0,
    price: parseFloat(course.price) || 0,
    semester: course.semester,
    lessons: course.details?.length || 0,
    teacherName: course.teacher?.name,
    teacherImage: course.teacher?.image,
    teacherRating: 0,
    teacherCoursesCount: 0,
    curriculumName: course.curricula?.name,
    stageName: course.stage?.name,
    subjectName: course.subject?.name,
    countryName: course.country?.name,
    students: course.subscribers_count || 0,
    reviews: Math.round(course.average_rating) || 0,
    image: course.image || '/assets/images/course/course-1/default.png',
    currency: course.currency || "$",
    rating: course.average_rating || 0,
  };

  const imageSrc = imgError ? '/assets/images/course/course-1/default.png' : courseData.image;

  return (
    <div className="col-lg-4 col-md-6 col-12 mb-30" >
      <div className="ed-course__card wow fadeInUp" data-wow-duration="1s">
        {/* Course Image */}
        <Link href={`/course-details/${course.id}`} className="ed-course__img">
          <div className="course-image-wrapper">
            <img
              src={imageSrc}
              alt={courseData.title}
              className="course-image"
              onError={() => setImgError(true)}
            />
            {/* Discount Badge */}
            {courseData.discount > 0 && (
              <span className="discount-badge">
                {courseData.discount}% {translate(t, 'discount', 'خصم')}
              </span>
            )}
          </div>
        </Link>
        
        <div className="ed-course__body">
          {/* Course Info */}
          <div className="ed-course__lesson d-flex justify-content-between mb-15">
            <div className="ed-course__part d-flex align-items-center gap-2">
              <i className="fi fi-rr-book text-primary"></i>
              <p className="mb-0 lesson-text">
                {courseData.lessons} {translate(t, 'lessons', 'درس')}
              </p>
            </div>
            
            <div className="ed-course__students d-flex align-items-center gap-2">
              <i className="fi fi-rr-graduation-cap text-primary"></i>
              <p className="mb-0 students-text">
                {courseData.students} {translate(t, 'students', 'طالب')}
              </p>
            </div>
          </div>
          
          {/* Course Title */}
          <Link href={`/course-details/${course.id}`} className="ed-course__title mb-15">
            <h5>
              {courseData.title}
            </h5>
          </Link>
          
          {/* Teacher Info */}
          <div className="ed-course__teacher-info mb-15">
            <div className="d-flex align-items-center gap-2">
              <div>
                <p className="mb-0 teacher-name">
                  {courseData.teacherName || translate(t, 'unknownTeacher', 'مدرس غير معروف')}
                </p>
             
              </div>
            </div>
          </div>
          
          {/* Course Meta Info */}
          <div className="ed-course__meta mb-15">
            <div className="row g-2">
              {courseData.curriculumName && (
                <div className="col-6">
                  <div className="d-flex align-items-center gap-1">
                    <i className="fi fi-rr-document text-info"></i>
                    <span className="meta-text">
                      {courseData.curriculumName}
                    </span>
                  </div>
                </div>
              )}
              
              {courseData.stageName && (
                <div className="col-6">
                  <div className="d-flex align-items-center gap-1">
                    <i className="fi fi-rr-graduation-cap text-secondary"></i>
                    <span className="meta-text">
                      {courseData.stageName}
                    </span>
                  </div>
                </div>
              )}
              
              {courseData.subjectName && (
                <div className="col-6">
                  <div className="d-flex align-items-center gap-1">
                    <i className="fi fi-rr-book text-success"></i>
                    <span className="meta-text">
                      {courseData.subjectName}
                    </span>
                  </div>
                </div>
              )}
              
              {courseData.semester && (
                <div className="col-6">
                  <div className="d-flex align-items-center gap-1">
                    <i className="fi fi-rr-calendar text-warning"></i>
                    <span className="meta-text">
                      {courseData.semester === 'one' ? 
                        translate(t, 'semester1', 'الفصل الأول') : 
                       courseData.semester === 'two' ? 
                        translate(t, 'semester2', 'الفصل الثاني') : 
                        translate(t, 'semester3', 'الفصل الثالث')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Price and Enroll Button */}
          <div className="ed-course__bottom">
            <div className="d-flex justify-content-between align-items-center">
              <div className="price-section">
                {courseData.discount > 0 && (
                  <span className="original-price">
                    {courseData.currency}{courseData.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="current-price">
                  {courseData.currency}{courseData.price.toFixed(2)}
                </span>
              </div>
              <Link 
                href={`/course-details/${course.id}`}
                className="btn btn-primary btn-sm"
              >
                {translate(t, 'viewDetails', 'عرض التفاصيل')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// صفحاتة الدروس الرئيسية
const CoursesPage = () => {
  const { t, lang } = useLang();
  const [isMounted, setIsMounted] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    semester: "",
    curriculum_id: "",
    stage_id: "",
    subject_id: "",
    title: "",
    country_id: ""
  });
  
  // Filter Options
  const [curriculums, setCurriculums] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [loadingStages, setLoadingStages] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  
  const [orderBy, setOrderBy] = useState("created_at");
  const [orderByDirection, setOrderByDirection] = useState<"desc" | "asc">("desc");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch all filter options
  useEffect(() => {
    if (!isMounted) return;
    
    const fetchFilterOptions = async () => {
      try {
        // Fetch countries
        const countriesRes = await api.post('country/index', {
          filters: { active: true },
          perPage: 50,
          paginate: true
        });
        if (countriesRes.data?.data) {
          setCountries(countriesRes.data.data);
        }

        // Fetch curriculums
        const curriculumsRes = await api.post('curriculum/index', {
          filters: {},
          perPage: 100,
          paginate: true
        });
        if (curriculumsRes.data?.data) {
          setCurriculums(curriculumsRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };

    fetchFilterOptions();
  }, [isMounted]);

  // Fetch stages based on selected curriculum
  useEffect(() => {
    const fetchStages = async () => {
      if (!filters.curriculum_id) {
        setStages([]);
        setSubjects([]);
        return;
      }

      try {
        setLoadingStages(true);
        const response = await api.post('stage/list-by-curriculum', {
          curriculum_id: filters.curriculum_id,
          filters: {},
          perPage: 100,
          paginate: true
        });

        if (response.data?.data && Array.isArray(response.data.data)) {
          setStages(response.data.data);
        } else {
          setStages([]);
        }

        // Reset stage and subject filters when curriculum changes
        setFilters(prev => ({
          ...prev,
          stage_id: "",
          subject_id: ""
        }));
      } catch (err) {
        console.error('Error fetching stages:', err);
        setStages([]);
      } finally {
        setLoadingStages(false);
      }
    };

    fetchStages();
  }, [filters.curriculum_id]);

  // Fetch subjects based on selected stage
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!filters.stage_id) {
        setSubjects([]);
        return;
      }

      try {
        setLoadingSubjects(true);
        const response = await api.post('subject/list-by-stage', {
          stage_id: filters.stage_id,
          filters: {},
          perPage: 100,
          paginate: true
        });

        if (response.data?.data && Array.isArray(response.data.data)) {
          setSubjects(response.data.data);
        } else {
          setSubjects([]);
        }

        // Reset subject filter when stage changes
        setFilters(prev => ({
          ...prev,
          subject_id: ""
        }));
      } catch (err) {
        console.error('Error fetching subjects:', err);
        setSubjects([]);
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, [filters.stage_id]);

  const fetchCourses = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      // بناء الفلاتر
      const activeFilters: any = {};
      
      if (searchTerm) activeFilters.title = searchTerm;
      if (filters.semester) activeFilters.semester = filters.semester;
      if (filters.subject_id) activeFilters.subject_id = filters.subject_id;
      if (filters.stage_id) activeFilters.stage_id = filters.stage_id;
      if (filters.country_id) activeFilters.country_id = filters.country_id;

      const response = await api.post('course/index', {
        filters: activeFilters,
        orderBy,
        orderByDirection,
        perPage: 9,
        page,
        paginate: true,
      });

      console.log('✅ API Response:', response.data);
      
      if (response.data?.data && Array.isArray(response.data.data)) {
        setCourses(response.data.data);
        setMeta(response.data.meta || null);
      } else {
        console.warn('⚠️ No courses data found:', response.data);
        setCourses([]);
        setMeta(null);
      }
    } catch (err: any) {
      console.error('❌ Error fetching courses:', err);
      setError(err.response?.data?.message || err.message || translate(t, 'failedToLoadCourses', 'فشل في تحميل الدروس'));
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [filters, orderBy, orderByDirection, searchTerm, t]);

  // Initial fetch on component mount and when filters change
  useEffect(() => {
    if (!isMounted) return;
    fetchCourses(currentPage);
  }, [fetchCourses, currentPage, isMounted, filters, orderBy, orderByDirection]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, title: searchTerm }));
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setCurrentPage(1);
    
    if (filterType === 'curriculum_id') {
      setFilters(prev => ({ 
        ...prev, 
        curriculum_id: value,
        stage_id: "",
        subject_id: ""
      }));
    } else if (filterType === 'stage_id') {
      setFilters(prev => ({ 
        ...prev, 
        stage_id: value,
        subject_id: ""
      }));
    } else {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setFilters({
      semester: "",
      subject_id: "",
      curriculum_id: "",
      stage_id: "",
      title: "",
      country_id: ""
    });
  };

  const handleSortChange = (sortBy: string, direction: "asc" | "desc") => {
    setCurrentPage(1);
    setOrderBy(sortBy);
    setOrderByDirection(direction);
  };

  const showingText = meta ? 
    `${translate(t, 'showing', 'عرض')} ${meta.from || 0}-${meta.to || 0} ${translate(t, 'of', 'من')} ${meta.total || 0} ${translate(t, 'results', 'نتيجة')}` :
    `${translate(t, 'showing', 'عرض')} 0-0 ${translate(t, 'of', 'من')} 0 ${translate(t, 'results', 'نتيجة')}`;

  const isAnyFilterActive = 
    filters.semester || 
    filters.subject_id || 
    filters.curriculum_id || 
    filters.stage_id || 
    filters.country_id ||
    searchTerm;

  // منع التصيير حتى يتم تحميل الكومبوننت على العميل
  if (!isMounted) {
    return (
      <EdunaLayout>
        <PageBanner pageTitleEn='lessons' pageTitleAr='الدروس' />
        <div className="courses-page loading" >
          <div className="container" >
            <div className="courses-header">
              <div className="skeleton skeleton-title"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
            <div className="filters-container">
              <div className="filters-grid">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="filter-group">
                    <div className="skeleton skeleton-label"></div>
                    <div className="skeleton skeleton-input"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="row">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-12 mb-30">
                  <div className="ed-course__card loading">
                    <div className="ed-course__img skeleton"></div>
                    <div className="ed-course__body">
                      <div className="skeleton skeleton-meta"></div>
                      <div className="skeleton skeleton-title-small"></div>
                      <div className="skeleton skeleton-teacher"></div>
                      <div className="skeleton skeleton-footer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EdunaLayout>
    );
  }

  return (
    <EdunaLayout>
      <PageBanner pageTitleEn='lessons' pageTitleAr='الدروس' />
      
      <div className="courses-page">
        <style jsx>{`
          .courses-page {
            padding: 60px 0;
            background: white;
            min-height: 80vh;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 15px;
          }

          /* Loading indicator for dropdowns */
          .dropdown-loading {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: #007bff;
            font-size: 12px;
          }

          .dropdown-loading::after {
            content: " ";
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 5px;
            border: 2px solid #f3f3f3;
            border-top: 2px solid #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Course Card Styles */
          .ed-course__card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            height: 100%;
            border: 1px solid #e9ecef;
          }

          .ed-course__card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }

          .course-image-wrapper {
            position: relative;
            height: 200px;
            overflow: hidden;
          }

          .course-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .ed-course__card:hover .course-image {
            transform: scale(1.05);
          }

          .discount-badge {
            position: absolute;
            top: 10px;
            left: ${lang === 'ar' ? 'auto' : '10px'};
            right: ${lang === 'ar' ? '10px' : 'auto'};
            background-color: #dc3545;
            color: white;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: bold;
            z-index: 2;
          }

          .ed-course__body {
            padding: 20px;
          }

          .ed-course__lesson {
            margin-bottom: 15px;
          }

          .lesson-text, .students-text {
            font-size: 0.9rem;
            color: #666;
            margin: 0;
          }

          .ed-course__title h5 {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            line-height: 1.4;
            margin: 0;
            min-height: 60px;
            text-align: ${lang === 'ar' ? 'right' : 'left'};
            direction: ${lang === 'ar' ? 'rtl' : 'ltr'};
            transition: color 0.2s;
          }

          .ed-course__title:hover h5 {
            color: #007bff;
          }

          .teacher-name {
            font-size: 0.9rem;
            font-weight: 600;
            color: #333;
            margin: 0 0 4px 0;
          }

          .teacher-rating {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .rating-stars i {
            font-size: 12px;
            color: #f39c12;
          }

          .rating-text {
            font-size: 12px;
            color: #95a5a6;
          }

          .meta-text {
            font-size: 0.75rem;
            color: #666;
          }

          .ed-course__meta i {
            font-size: 0.8rem;
          }

          .price-section {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .original-price {
            font-size: 0.8rem;
            color: #95a5a6;
            text-decoration: line-through;
          }

          .current-price {
            font-size: 1.2rem;
            font-weight: bold;
            color: #007bff;
          }

          .ed-course__bottom .btn {
            padding: 6px 20px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 14px;
            transition: all 0.3s ease;
          }

          .ed-course__bottom .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
          }

          /* Filters Section */
          .filters-container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            margin-bottom: 40px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            border: 1px solid #e9ecef;
          }

          .courses-header {
            margin-bottom: 30px;
            text-align: ${lang === 'ar' ? 'right' : 'left'};
          }

          .courses-header h1 {
            font-size: 32px;
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 10px;
          }

          .courses-header p {
            color: #7f8c8d;
            font-size: 16px;
          }

          .filters-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
          }

          .results-text {
            font-size: 16px;
            font-weight: 600;
            color: #2c3e50;
          }

          .filters-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
          }

          .filter-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
            position: relative;
          }

          .filter-group label {
            font-size: 14px;
            font-weight: 500;
            color: #495057;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .filter-group label i {
            color: #6c757d;
          }

          .filter-select, .filter-input {
            padding: 12px 15px;
            border: 1px solid #ced4da;
            border-radius: 8px;
            font-size: 14px;
            color: #495057;
            background: white;
            transition: all 0.2s;
            appearance: none;
            cursor: pointer;
          }

          .filter-select:disabled {
            background-color: #f8f9fa;
            color: #6c757d;
            cursor: not-allowed;
          }

          .filter-select:focus, .filter-input:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
          }

          .filter-select option {
            padding: 10px;
          }

          /* Active Filters */
          .active-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
            align-items: center;
          }

          .filter-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
          }

          .filter-badge.semester {
            background: #e3f2fd;
            color: #1976d2;
          }

          .filter-badge.country {
            background: #fff3cd;
            color: #856404;
          }

          .filter-badge.curriculum {
            background: #e8f5e9;
            color: #2e7d32;
          }

          .filter-badge.stage {
            background: #f3e5f5;
            color: #7b1fa2;
          }

          .filter-badge.subject {
            background: #fff3e0;
            color: #f57c00;
          }

          .filter-badge.search {
            background: #e0f2f1;
            color: #00695c;
          }

          .filter-badge:hover {
            opacity: 0.9;
            transform: translateY(-1px);
          }

          .filter-badge .close-btn {
            background: none;
            border: none;
            color: inherit;
            font-size: 10px;
            padding: 0;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
          }

          .filter-badge .close-btn:hover {
            opacity: 1;
          }

          /* Actions Row */
          .actions-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
          }

          .sort-controls {
            display: flex;
            gap: 10px;
            align-items: center;
          }

          .sort-select {
            padding: 10px 15px;
            border: 1px solid #ced4da;
            border-radius: 6px;
            font-size: 14px;
            background: white;
            min-width: 150px;
            cursor: pointer;
          }

          .clear-btn {
            padding: 10px 20px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
          }

          .clear-btn:hover {
            background: #c82333;
            transform: translateY(-1px);
          }

          /* Search Bar */
          .search-container {
            margin-top: 20px;
          }

          .search-form {
            display: flex;
            gap: 10px;
            max-width: 500px;
          }

          .search-input {
            flex: 1;
            padding: 12px 20px;
            border: 1px solid #ced4da;
            border-radius: 8px;
            font-size: 15px;
            transition: all 0.2s;
          }

          .search-input:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
          }

          .search-btn {
            padding: 12px 25px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
          }

          .search-btn:hover {
            background: #0056b3;
            transform: translateY(-1px);
          }

          /* Loading States */
          .loading-container {
            text-align: center;
            padding: 80px 20px;
          }

          .spinner {
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #007bff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .loading-container h3 {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 10px;
          }

          .loading-container p {
            color: #7f8c8d;
            max-width: 400px;
            margin: 0 auto;
          }

          /* Skeleton Loading */
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            border-radius: 4px;
          }

          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          .skeleton-title {
            height: 40px;
            width: 200px;
            margin-bottom: 10px;
          }

          .skeleton-text {
            height: 20px;
            width: 300px;
          }

          .skeleton-label {
            height: 20px;
            width: 100px;
            margin-bottom: 8px;
          }

          .skeleton-input {
            height: 44px;
            width: 100%;
          }

          .skeleton-meta {
            height: 20px;
            width: 100%;
            margin-bottom: 15px;
          }

          .skeleton-title-small {
            height: 24px;
            width: 80%;
            margin-bottom: 15px;
          }

          .skeleton-teacher {
            height: 40px;
            width: 100%;
            margin-bottom: 15px;
          }

          .skeleton-footer {
            height: 40px;
            width: 100%;
          }

          /* Empty State */
          .empty-state {
            text-align: center;
            padding: 80px 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          }

          .empty-state-icon {
            font-size: 60px;
            color: #bdc3c7;
            margin-bottom: 20px;
          }

          .empty-state h3 {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 10px;
          }

          .empty-state p {
            color: #7f8c8d;
            margin-bottom: 25px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }

          .empty-state .btn {
            padding: 12px 30px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          }

          .empty-state .btn:hover {
            background: #0056b3;
            transform: translateY(-1px);
          }

          /* Error State */
          .error-container {
            text-align: center;
            padding: 80px 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          }

          .error-icon {
            font-size: 60px;
            color: #dc3545;
            margin-bottom: 20px;
          }

          .error-container h3 {
            font-size: 24px;
            color: #2c3e50;
            margin-bottom: 10px;
          }

          .error-container p {
            color: #7f8c8d;
            margin-bottom: 25px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }

          .error-container .btn {
            padding: 12px 30px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          }

          .error-container .btn:hover {
            background: #0056b3;
            transform: translateY(-1px);
          }

          /* Pagination */
          .pagination-container {
            display: flex;
            justify-content: center;
            margin-top: 50px;
          }

          /* Responsive */
          @media (max-width: 768px) {
            .courses-page {
              padding: 30px 0;
            }
            
            .filters-grid {
              grid-template-columns: 1fr;
            }
            
            .actions-row {
              flex-direction: column;
              align-items: stretch;
            }
            
            .sort-controls {
              flex-direction: column;
            }
            
            .search-form {
              flex-direction: column;
            }
          }

          @media (max-width: 576px) {
            .ed-course__card {
              margin-bottom: 30px;
            }
            
            .empty-state,
            .error-container,
            .loading-container {
              padding: 60px 20px;
            }
          }
        `}</style>

        <div className="container" >
          {/* Header */}
          <div className="courses-header">
            <h1>{translate(t, 'lessons', 'الدروس')}</h1>
            <p>{translate(t, 'browseLessons', 'تصفح دروسنا المميزة')}</p>
          </div>

          <div className="filters-container">
            <div className="filters-header">
              <div className="results-text">{showingText}</div>
            </div>

            <div className="filters-grid">
              {/* Country Filter */}
              <div className="filter-group">
                <label>
                  <i className="fi fi-rr-flag"></i>
                  {translate(t, 'country', 'البلد')}
                </label>
                <select 
                  className="filter-select"
                  value={filters.country_id}
                  onChange={(e) => handleFilterChange('country_id', e.target.value)}
                >
                  <option value="">{translate(t, 'allCountries', 'جميع البلدان')}</option>
                  {countries.map(country => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Term Filter */}
              <div className="filter-group">
                <label>
                  <i className="fi fi-rr-calendar"></i>
                  {translate(t, 'Term', 'الفصل الدراسي')}
                </label>
                <select 
                  className="filter-select"
                  value={filters.semester}
                  onChange={(e) => handleFilterChange('semester', e.target.value)}
                >
                  <option value="">{translate(t, 'allTerm', 'جميع الفصول')}</option>
                  <option value="one">{translate(t, 'firstTerm', 'الفصل الأول')}</option>
                  <option value="two">{translate(t, 'secondTerm', 'الفصل الثاني')}</option>
                  <option value="three">{translate(t, 'threeTerm', 'الفصل الثالث')}</option>
                </select>
              </div>

              {/* Curriculum Filter */}
              <div className="filter-group">
                <label>
                  <i className="fi fi-rr-book"></i>
                  {translate(t, 'curriculum', 'المنهاج الدراسي')}
                </label>
                <select 
                  className="filter-select"
                  value={filters.curriculum_id}
                  onChange={(e) => handleFilterChange('curriculum_id', e.target.value)}
                >
                  <option value="">{translate(t, 'allCurricula', 'جميع المناهج')}</option>
                  {curriculums.map(curriculum => (
                    <option key={curriculum.id} value={curriculum.id}>
                      {curriculum.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stage Filter - يعتمد على المنهج المختار */}
              <div className="filter-group">
                <label>
                  <i className="fi fi-rr-graduation-cap"></i>
                  {translate(t, 'stage', 'المرحلة الدراسية')}
                  {loadingStages && <span className="dropdown-loading"></span>}
                </label>
                <select 
                  className="filter-select"
                  value={filters.stage_id}
                  onChange={(e) => handleFilterChange('stage_id', e.target.value)}
                  disabled={!filters.curriculum_id || loadingStages}
                >
                  <option value="">
                    {!filters.curriculum_id 
                      ? translate(t, 'selectCurriculumFirst', 'اختر المنهج أولاً') 
                      : stages.length === 0 
                        ? translate(t, 'noStagesAvailable', 'لا توجد مراحل متاحة') 
                        : translate(t, 'allStages', 'جميع المراحل')}
                  </option>
                  {stages.map(stage => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter - يعتمد على المرحلة المختارة */}
              <div className="filter-group">
                <label>
                  <i className="fi fi-rr-book"></i>
                  {translate(t, 'subject', 'المادة الدراسية')}
                  {loadingSubjects && <span className="dropdown-loading"></span>}
                </label>
                <select 
                  className="filter-select"
                  value={filters.subject_id}
                  onChange={(e) => handleFilterChange('subject_id', e.target.value)}
                  disabled={!filters.stage_id || loadingSubjects}
                >
                  <option value="">
                    {!filters.stage_id 
                      ? translate(t, 'selectStageFirst', 'اختر المرحلة أولاً') 
                      : subjects.length === 0 
                        ? translate(t, 'noSubjectsAvailable', 'لا توجد مواد متاحة') 
                        : translate(t, 'allSubjects', 'جميع المواد')}
                  </option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {isAnyFilterActive && (
              <div className="active-filters">
                {filters.country_id && countries.find(c => c.id == filters.country_id) && (
                  <span className="filter-badge country">
                    {countries.find(c => c.id == filters.country_id)?.name}
                    <button 
                      className="close-btn"
                      onClick={() => handleFilterChange('country_id', '')}
                      aria-label={translate(t, 'removeFilter', 'إزالة الفلتر')}
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {filters.semester && (
                  <span className="filter-badge semester">
                    {filters.semester === 'one' ? translate(t, 'firstSemester', 'الفصل الأول') :
                     filters.semester === 'two' ? translate(t, 'secondSemester', 'الفصل الثاني') : 
                     translate(t, 'thirdSemester', 'الفصل الثالث')}
                    <button 
                      className="close-btn"
                      onClick={() => handleFilterChange('semester', '')}
                      aria-label={translate(t, 'removeFilter', 'إزالة الفلتر')}
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {filters.curriculum_id && curriculums.find(c => c.id == filters.curriculum_id) && (
                  <span className="filter-badge curriculum">
                    {curriculums.find(c => c.id == filters.curriculum_id)?.name}
                    <button 
                      className="close-btn"
                      onClick={() => handleFilterChange('curriculum_id', '')}
                      aria-label={translate(t, 'removeFilter', 'إزالة الفلتر')}
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {filters.stage_id && stages.find(s => s.id == filters.stage_id) && (
                  <span className="filter-badge stage">
                    {stages.find(s => s.id == filters.stage_id)?.name}
                    <button 
                      className="close-btn"
                      onClick={() => handleFilterChange('stage_id', '')}
                      aria-label={translate(t, 'removeFilter', 'إزالة الفلتر')}
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {filters.subject_id && subjects.find(s => s.id == filters.subject_id) && (
                  <span className="filter-badge subject">
                    {subjects.find(s => s.id == filters.subject_id)?.name}
                    <button 
                      className="close-btn"
                      onClick={() => handleFilterChange('subject_id', '')}
                      aria-label={translate(t, 'removeFilter', 'إزالة الفلتر')}
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {searchTerm && (
                  <span className="filter-badge search">
                    {searchTerm}
                    <button 
                      className="close-btn"
                      onClick={() => {
                        setSearchTerm('');
                        handleFilterChange('title', '');
                      }}
                      aria-label={translate(t, 'removeSearch', 'إزالة البحث')}
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Actions Row */}
            <div className="actions-row">
              <div className="sort-controls">
                <select 
                  className="sort-select"
                  value={orderBy}
                  onChange={(e) => handleSortChange(e.target.value, orderByDirection)}
                >
                  <option value="created_at">{translate(t, 'sortByDate', 'الترتيب حسب التاريخ')}</option>
                  <option value="price">{translate(t, 'sortByPrice', 'الترتيب حسب السعر')}</option>
                  <option value="average_rating">{translate(t, 'sortByRating', 'الترتيب حسب التقييم')}</option>
                  <option value="subscribers_count">{translate(t, 'sortByPopularity', 'الترتيب حسب الشعبية')}</option>
                  <option value="title">{translate(t, 'sortByName', 'الترتيب حسب الاسم')}</option>
                </select>
                
                <select 
                  className="sort-select"
                  value={orderByDirection}
                  onChange={(e) => handleSortChange(orderBy, e.target.value as "asc" | "desc")}
                >
                  <option value="desc">{translate(t, 'descending', 'تنازلي')}</option>
                  <option value="asc">{translate(t, 'ascending', 'تصاعدي')}</option>
                </select>
              </div>
              
              {isAnyFilterActive && (
                <button 
                  className="clear-btn"
                  onClick={handleClearFilters}
                >
                  <i className="fi fi-rr-eraser"></i>
                  {translate(t, 'clearAll', 'مسح الكل')}
                </button>
              )}
            </div>

            {/* Search Bar - البحث بالعنوان */}
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="search"
                  className="search-input"
                  placeholder={translate(t, 'searchByTitle', 'ابحث بالعنوان...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-btn">
                  <i className="fi fi-rr-search"></i>
                  {translate(t, 'searchButton', 'بحث')}
                </button>
              </form>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <h3>{translate(t, 'loading', 'جاري تحميل الدروس...')}</h3>
              <p>{translate(t, 'pleaseWait', 'يرجى الانتظار جاري جلب الدروس لك')}</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <h3>{translate(t, 'error', 'خطأ في تحميل الدروس')}</h3>
              <p>{error}</p>
              <button 
                className="btn"
                onClick={() => fetchCourses(1)}
              >
                {translate(t, 'retry', 'حاول مرة أخرى')}
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && courses.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📚</div>
              <h3>{translate(t, 'noCoursesFound', 'لم يتم العثور على دروس')}</h3>
              <p>
                {isAnyFilterActive 
                  ? translate(t, 'noCoursesWithFilters', 'لا توجد دروس تطابق عوامل التصفية الحالية. حاول تغيير معايير البحث.')
                  : translate(t, 'noCoursesMessage', 'لا توجد دروس متاحة حاليًا. يرجى التحقق مرة أخرى لاحقًا.')}
              </p>
              {isAnyFilterActive && (
                <button 
                  className="btn"
                  onClick={handleClearFilters}
                >
                  {translate(t, 'clearFilters', 'مسح الفلاتر')}
                </button>
              )}
            </div>
          )}

          {/* Courses Grid */}
          {!loading && !error && courses.length > 0 && (
            <>
              <div className="row">
                {courses.map((course) => (
                  <CourseItem 
                    key={course.id} 
                    course={course}
                  />
                ))}
              </div>

              {/* Pagination */}
              {meta && meta.last_page > 1 && (
                <div className="pagination-container">
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

export default CoursesPage;