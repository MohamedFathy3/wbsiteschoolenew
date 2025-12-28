'use client';

import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
import CourseDetailsContent from "@/components/course/CourseDetailsContent";
import CourseDetailsSidebar from "@/components/course/CourseDetailsSidebar";
import LoadingState from "@/components/course/LoadingState";
import ErrorState from "@/components/course/ErrorState";
import { useCourseDetails } from "@/hooks/useCourseDetails";
import { useParams } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

const CourseDetailsPage = () => {
  const { lang } = useLang();
  const params = useParams();
  const courseId = params.id;
  
  const { 
    course, 
    loading, 
    error, 
    isUserEnrolled,
    handleEnroll,
    handleUnenroll,
    handleSubmitComment,
    showAllDetails,
    setShowAllDetails,
    comment,
    setComment,
    rating,
    setRating,
    submittingComment,
    enrolling,
    unenrolling
  } = useCourseDetails(courseId);

  if (loading) return <LoadingState />;
  if (error || !course) return <ErrorState error={error} />;

  return (
    <EdunaLayout>
      <PageBanner pageTitleEn='lesson Details' pageTitleAr='تفاصيل الدرس' />
      <section 
        className="ed-course__details section-gap" 
        style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
      >
        <div className="container ed-container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <CourseDetailsContent 
                course={course}
                comment={comment}
                rating={rating}
                submittingComment={submittingComment}
                showAllDetails={showAllDetails}
                setShowAllDetails={setShowAllDetails}
                setComment={setComment}
                setRating={setRating}
                handleSubmitComment={handleSubmitComment}
                isUserEnrolled={isUserEnrolled ?? false} // أضف هذا السطر!
              />
            </div>
            
            <div className="col-lg-4 col-12">
              <CourseDetailsSidebar 
                course={course}
                isUserEnrolled={isUserEnrolled ?? false}
                enrolling={enrolling}
                unenrolling={unenrolling}
                handleEnroll={handleEnroll}
                handleUnenroll={handleUnenroll}
              />
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </EdunaLayout>
  );
};

export default CourseDetailsPage;