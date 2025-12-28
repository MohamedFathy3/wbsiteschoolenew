'use client';

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useLang } from "@/context/LanguageContext";
import { Course } from "@/types/course";
import { Pagination } from "@/components/Pagination";
import api from "@/lib/api";

// ⭐⭐ **نقل CourseItem هنا فوق Course3** ⭐⭐
const CourseItem = ({
  course,
  containerClass = "col-lg-6 col-xl-4 col-md-6 col-12",
  lang
}: {
  course: Course;
  containerClass?: string;
  lang: string;
}) => {
  const { t } = useLang();
  
  const courseData = {
    id: course.id,
    title: course.title,
    description: course.description || t.noDescription || "No description available",
    type: course.type,
    originalPrice: parseFloat(course.original_price) || 0,
    discount: parseFloat(course.discount) || 0,
    price: parseFloat(course.price) || 0,
    whatYouWillLearn: course.what_you_will_learn || t.noLearningObjectives || "No learning objectives specified",
    semester: course.semester,
    lessons: course.details?.length || 0,
    teacherName: course.teacher?.name || t.unknownTeacher || "Unknown Teacher",
    teacherImage: course.teacher?.image,
    teacherRating: course.teacher?.average_rating || 0,
    teacherCoursesCount: course.teacher?.courses_count || 0,
    curriculumName: course.curricula?.name || t.noCurriculum || "No Curriculum",
    stageName: course.stage?.name || t.noStage || "No Stage",
    countryName: course.country?.name || t.noCountry || "No Country",
    students: course.subscribers_count || 0,
    reviews: Math.round(course.average_rating) || 0,
    image: course.image || '/assets/images/course/course-1/default.png',
    currency: course.currency || "$",
  };

  const [imgError, setImgError] = useState(false);
  const imageSrc = imgError ? '/assets/images/course/course-1/default.png' : courseData.image;

  return (
    <div className={containerClass}>
      <div className="ed-course__card wow fadeInUp" data-wow-duration="1s">
        {/* Course Image */}
        <Link href={`/course-details/${course.id}`} className="ed-course__img">
          <div style={{ 
            width: '100%', 
            height: '200px', 
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '8px 8px 0 0'
          }}>
            <img
              src={imageSrc}
              alt={courseData.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              onError={() => setImgError(true)}
            />
          </div>
        </Link>
        
        {/* Course Type Badge */}
        <Link href={`/category/${course.subject?.id}`} className="ed-course__tag">
          {courseData.type === 'recorded' ? t.recorded || 'Recorded' : t.live || 'Live'}
        </Link>
        
        <div className="ed-course__body">
          {/* Course Info Row */}
          <div className="ed-course__lesson" style={{display:"flex", justifyContent:"space-between"}}>
            <div className="ed-course__part">
              <i className="fi-rr-book" />
              <p>{courseData.lessons} {t.lessons || "Lessons"}</p>
            </div>
            
            {/* Stage Name */}
            <div className="ed-course__stage">
              <i className="fi-rr-graduation-cap" />
              <p>{courseData.stageName}</p>
            </div>
          </div>
          
          {/* Course Title */}
          <Link href={`/course-details/${course.id}`} className="ed-course__title mb-2">
            <h5 style={{ 
              minHeight: '60px',
              textAlign: lang === 'ar' ? 'right' : 'left',
              direction: lang === 'ar' ? 'rtl' : 'ltr'
            }}>
              {courseData.title}
            </h5>
          </Link>
          
          {/* Teacher Info */}
          <div className="ed-course__teacher-info mb-2" style={{marginTop:"-30px"}}>
            <div className="d-flex align-items-center gap-2">
              {courseData.teacherImage && (
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={courseData.teacherImage} 
                    alt={courseData.teacherName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              )}
              <div>
                <p className="mb-0" style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {courseData.teacherName}
                </p>
                <div className="d-flex align-items-center gap-1">
                  <small className="text-muted">
                    {courseData.teacherCoursesCount} {t.courses || "Courses"}
                  </small>
                </div>
              </div>
            </div>
          </div>
          
          {/* Curriculum and Country */}
          <div className="ed-course__meta mb-2">
            <div className="d-flex justify-content-between">
              <span className="badge bg-info" style={{ fontSize: '0.7rem' }}>
                <i className="fi-rr-document" /> {courseData.curriculumName}
              </span>
              <span className="badge bg-secondary" style={{ fontSize: '0.7rem' }}>
                <i className="fi-rr-flag" /> {courseData.countryName}
              </span>
            </div>
          </div>
          
          {/* Semester Info */}
          <div className="ed-course__semester mb-2">
            <span className="badge bg-light text-dark" style={{ fontSize: '0.75rem' }}>
              <i className="fi-rr-calendar" /> 
              {courseData.semester === 'one' ? t.semesterOne || 'Semester 1' : 
               courseData.semester === 'two' ? t.semesterTwo || 'Semester 2' : 
               courseData.semester}
            </span>
          </div>
          
          {/* Price and Students */}
          <div className="ed-course__bottom">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {courseData.discount > 0 && (
                  <span className="text-muted text-decoration-line-through me-2" style={{ fontSize: '0.8rem' }}>
                    {courseData.currency}{courseData.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="ed-course__price" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  {courseData.currency}{courseData.price.toFixed(2)}
                </span>
                {courseData.discount > 0 && (
                  <span className="badge bg-danger ms-2" style={{ fontSize: '0.7rem' }}>
                    {courseData.discount}% OFF
                  </span>
                )}
              </div>
              <div className="ed-course__students">
                <i className="fi fi-rr-graduation-cap" />
                <p style={{ fontSize: '0.85rem' }}>{courseData.students} {t.students || "Students"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ⭐⭐ **الآن Course3 تظهر بعد تعريف CourseItem** ⭐⭐
export const Course3 = () => {
  const { t, lang } = useLang();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    semester: "",
    subject_id: "",
    curriculum_id: "",
    stage_id: "",
    name: ""
  });
  
  // Filter Options
  const [curriculums, setCurriculums] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  
  const [orderBy, setOrderBy] = useState("id");
  const [orderByDirection, setOrderByDirection] = useState<"asc" | "desc">("desc");

  // Fetch all filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Fetch curriculums
        const curriculumsRes = await api.get('/curriculum');
        if (curriculumsRes.data?.data) {
          setCurriculums(curriculumsRes.data.data);
        }

        // Fetch stages
        const stagesRes = await api.post('/stage/index', {
          perPage: 100,
          paginate: true
        });
        if (stagesRes.data?.data) {
          setStages(stagesRes.data.data);
        }

        // Fetch subjects
        const subjectsRes = await api.post('/subject/index', {
          perPage: 100,
          paginate: true
        });
        if (subjectsRes.data?.data) {
          setSubjects(subjectsRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };

    fetchFilterOptions();
  }, []);

  const fetchCourses = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      // بناء الفلاتر
      const activeFilters: any = {};
      
      if (searchTerm) activeFilters.name = searchTerm;
      if (filters.semester) activeFilters.semester = filters.semester;
      if (filters.subject_id) activeFilters.subject_id = filters.subject_id;
      if (filters.curriculum_id) activeFilters.curriculum_id = filters.curriculum_id;
      if (filters.stage_id) activeFilters.stage_id = filters.stage_id;

      const response = await api.post('course/index', {
        filters: activeFilters,
        orderBy,
        orderByDirection,
        perPage: 9,
        page,
        paginate: true,
      });

      console.log('✅ API Request:', {
        filters: activeFilters,
        page,
        response: response.data
      });
      
      if (response.data && response.data.data && Array.isArray(response.data.data)) {
        setCourses(response.data.data);
        setMeta(response.data.meta || null);
      } else {
        console.warn('⚠️ Invalid data structure:', response.data);
        setCourses([]);
        setMeta(null);
      }
    } catch (err: any) {
      console.error('❌ Error fetching courses:', err);
      setError(err.message || 'Failed to fetch courses');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [filters, orderBy, orderByDirection, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchCourses(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, name: searchTerm }));
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setCurrentPage(1);
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setFilters({
      semester: "",
      subject_id: "",
      curriculum_id: "",
      stage_id: "",
      name: ""
    });
  };

  const handleSortChange = (sortBy: string, direction: "asc" | "desc") => {
    setCurrentPage(1);
    setOrderBy(sortBy);
    setOrderByDirection(direction);
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [fetchCourses, currentPage]);

  const showingText = meta ? 
    `${t.showing || 'Showing'} ${meta.from || 0}-${meta.to || 0} ${t.of || 'Of'} ${meta.total || 0} ${t.results || 'Results'}` :
    `${t.showing || 'Showing'} 1-6 ${t.of || 'Of'} 15 ${t.results || 'Results'}`;

  // Check if any filter is active
  const isAnyFilterActive = 
    filters.semester || 
    filters.subject_id || 
    filters.curriculum_id || 
    filters.stage_id || 
    searchTerm;

  if (loading && courses.length === 0) {
    return (
      <section className="ed-course section-gap position-relative">
        <div className="container ed-container">
          <div className="row">
            <div className="col-12">
              <div className="ed-course__filter">
                <p className="ed-course__filter-text">{showingText}</p>
                <div className="ed-course__filter-search">
                  <form onSubmit={handleSearch} className="ed-hero__search-form">
                    <input
                      type="search"
                      name="search"
                      placeholder={t.search || "Search your courses..."}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      required
                    />
                    <button type="submit">
                      {t.searchButton || "Search"}
                      <i className="fi-rr-search" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">{t.loading || "Loading courses..."}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && courses.length === 0) {
    return (
      <section className="ed-course section-gap position-relative">
        <div className="container ed-container">
          <div className="row">
            <div className="col-12">
              <div className="alert alert-danger">
                <h5>{t.error || "Error"}</h5>
                <p>{error}</p>
                <button 
                  onClick={() => fetchCourses(1)} 
                  className="btn btn-sm btn-primary mt-2"
                >
                  {t.retry || "Retry"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ed-course section-gap position-relative" >
      <div className="container ed-container">
        <div className="row">
          <div className="col-12">
            <div className="ed-course__filter">
              <p className="ed-course__filter-text">{showingText}</p>
              
              {/* Advanced Filters */}
              <div className="row mb-3 g-3">
                {/* Semester Filter */}
                <div className="col-md-6 col-lg-3">
                  <label className="form-label small mb-1">
                    <i className="fi fi-rr-calendar me-1"></i>
                    {t.semester || "Semester"}
                  </label>
                  <select 
                    className="form-select form-select-sm" 
                    value={filters.semester}
                    onChange={(e) => handleFilterChange('semester', e.target.value)}
                  >
                    <option value="">{t.allSemesters || "All Semesters"}</option>
                    <option value="one">{t.firstSemester || "First Semester"}</option>
                    <option value="two">{t.secondSemester || "Second Semester"}</option>
                    <option value="three">{t.thirdSemester || "Third Semester"}</option>
                  </select>
                </div>
                
                {/* Curriculum Filter */}
                <div className="col-md-6 col-lg-3">
                  <label className="form-label small mb-1">
                    <i className="fi fi-rr-document me-1"></i>
                    {t.curriculum || "Curriculum"}
                  </label>
                  <select 
                    className="form-select form-select-sm" 
                    value={filters.curriculum_id}
                    onChange={(e) => handleFilterChange('curriculum_id', e.target.value)}
                  >
                    <option value="">{t.allCurriculums || "All Curriculums"}</option>
                    {curriculums.map(curriculum => (
                      <option key={curriculum.id} value={curriculum.id}>
                        {lang === 'ar' ? curriculum.name_ar || curriculum.name : curriculum.name_en || curriculum.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Stage Filter */}
                <div className="col-md-6 col-lg-3">
                  <label className="form-label small mb-1">
                    <i className="fi fi-rr-graduation-cap me-1"></i>
                    {t.stage || "Stage"}
                  </label>
                  <select 
                    className="form-select form-select-sm" 
                    value={filters.stage_id}
                    onChange={(e) => handleFilterChange('stage_id', e.target.value)}
                  >
                    <option value="">{t.allStages || "All Stages"}</option>
                    {stages.map(stage => (
                      <option key={stage.id} value={stage.id}>
                        {stage.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Subject Filter */}
                <div className="col-md-6 col-lg-3">
                  <label className="form-label small mb-1">
                    <i className="fi fi-rr-book me-1"></i>
                    {t.subject || "Subject"}
                  </label>
                  <select 
                    className="form-select form-select-sm" 
                    value={filters.subject_id}
                    onChange={(e) => handleFilterChange('subject_id', e.target.value)}
                  >
                    <option value="">{t.allSubjects || "All Subjects"}</option>
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {lang === 'ar' ? subject.name_ar || subject.name : subject.name_en || subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Active Filters & Actions */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-wrap gap-2">
                  {isAnyFilterActive && (
                    <>
                      {filters.semester && (
                        <span className="badge bg-primary d-flex align-items-center gap-1">
                          {filters.semester === 'one' ? t.firstSemester || 'First Semester' :
                           filters.semester === 'two' ? t.secondSemester || 'Second Semester' :
                           filters.semester === 'three' ? t.thirdSemester || 'Third Semester' : filters.semester}
                          <button 
                            className="btn-close btn-close-white btn-sm ms-1"
                            onClick={() => handleFilterChange('semester', '')}
                            style={{ fontSize: '10px' }}
                          />
                        </span>
                      )}
                      {filters.curriculum_id && curriculums.find(c => c.id === parseInt(filters.curriculum_id)) && (
                        <span className="badge bg-success d-flex align-items-center gap-1">
                          {lang === 'ar' 
                            ? curriculums.find(c => c.id === parseInt(filters.curriculum_id))?.name_ar 
                            : curriculums.find(c => c.id === parseInt(filters.curriculum_id))?.name_en}
                          <button 
                            className="btn-close btn-close-white btn-sm ms-1"
                            onClick={() => handleFilterChange('curriculum_id', '')}
                            style={{ fontSize: '10px' }}
                          />
                        </span>
                      )}
                      {filters.stage_id && stages.find(s => s.id === parseInt(filters.stage_id)) && (
                        <span className="badge bg-info d-flex align-items-center gap-1">
                          {stages.find(s => s.id === parseInt(filters.stage_id))?.name}
                          <button 
                            className="btn-close btn-close-white btn-sm ms-1"
                            onClick={() => handleFilterChange('stage_id', '')}
                            style={{ fontSize: '10px' }}
                          />
                        </span>
                      )}
                      {filters.subject_id && subjects.find(s => s.id === parseInt(filters.subject_id)) && (
                        <span className="badge bg-warning d-flex align-items-center gap-1">
                          {lang === 'ar' 
                            ? subjects.find(s => s.id === parseInt(filters.subject_id))?.name_ar 
                            : subjects.find(s => s.id === parseInt(filters.subject_id))?.name_en}
                          <button 
                            className="btn-close btn-close-white btn-sm ms-1"
                            onClick={() => handleFilterChange('subject_id', '')}
                            style={{ fontSize: '10px' }}
                          />
                        </span>
                      )}
                      {searchTerm && (
                        <span className="badge bg-secondary d-flex align-items-center gap-1">
                          {searchTerm}
                          <button 
                            className="btn-close btn-close-white btn-sm ms-1"
                            onClick={() => {
                              setSearchTerm('');
                              handleFilterChange('name', '');
                            }}
                            style={{ fontSize: '10px' }}
                          />
                        </span>
                      )}
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={handleClearFilters}
                      >
                        <i className="fi fi-rr-eraser me-1"></i>
                        {t.clearAll || "Clear All"}
                      </button>
                    </>
                  )}
                </div>
                
                {/* Sort Options */}
                <div className="d-flex gap-2">
                  <select 
                    className="form-select form-select-sm" 
                    style={{ width: '150px' }}
                    onChange={(e) => handleSortChange(e.target.value, orderByDirection)}
                  >
                    <option value="id">{t.sortById || "Sort by ID"}</option>
                    <option value="created_at">{t.sortByDate || "Sort by Date"}</option>
                    <option value="price">{t.sortByPrice || "Sort by Price"}</option>
                    <option value="average_rating">{t.sortByRating || "Sort by Rating"}</option>
                  </select>
                  
                  <select 
                    className="form-select form-select-sm" 
                    style={{ width: '120px' }}
                    onChange={(e) => handleSortChange(orderBy, e.target.value as "asc" | "desc")}
                  >
                    <option value="desc">{t.descending || "Descending"}</option>
                    <option value="asc">{t.ascending || "Ascending"}</option>
                  </select>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="ed-course__filter-search">
                <form onSubmit={handleSearch} className="ed-hero__search-form">
                  <input
                    type="search"
                    name="search"
                    placeholder={t.search || "Search your courses..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                  />
                  <button type="submit">
                    {t.searchButton || "Search"}
                    <i className="fi-rr-search" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {courses.length === 0 ? (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="alert alert-warning">
                <h5>{t.noCoursesFound || "No Courses Found"}</h5>
                <p>{isAnyFilterActive 
                  ? (t.noCoursesWithFilters || "No courses found with the selected filters. Try different filters.")
                  : (t.noCoursesMessage || "There are no courses available at the moment.")}
                </p>
                {isAnyFilterActive && (
                  <button 
                    className="btn btn-sm btn-primary mt-2"
                    onClick={handleClearFilters}
                  >
                    {t.clearFilters || "Clear Filters"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              {courses.map((course) => (
                <CourseItem
                  key={course.id}
                  course={course}
                  containerClass="col-lg-6 col-xl-4 col-md-6 col-12"
                  lang={lang}
                />
              ))}
            </div>
            
            {meta && meta.last_page > 1 && (
              <div className="row">
                <div className="col-12">
                  <Pagination meta={meta} onPageChange={handlePageChange} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};