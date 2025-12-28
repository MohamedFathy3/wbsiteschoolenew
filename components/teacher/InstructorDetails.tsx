// components/teacher/InstructorDetails.tsx
'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import api from "@/lib/api";
import PageBanner from "@/components/PageBanner";
import EdunaLayout from "@/layout/EdunaLayout";
import InstructorHeader from "./InstructorHeader";
import InstructorStats from "./InstructorStats";
import InstructorContact from "./InstructorContact";
import InstructorSkeleton from "./InstructorSkeleton";
import InstructorError from "./InstructorError";
import { CourseItem } from "@/components/teacher/CourseIteminstrectre";
import { TeacherDetails } from "@/types/teacher";

const translations = {
  pageTitle: { en: "Instructor Details", ar: "تفاصيل المعلم" },
  teacherType: { en: "TEACHER", ar: "مدرس" },
  reviews: { en: "Reviews", ar: "التقييمات" },
  students: { en: "Buyer", ar: "مشتري" },
  support247: { en: "24/7 Support", ar: "دعم على مدار الساعة" },
  sendMessage: { en: "Send Message", ar: "إرسال رسالة" },
  aboutMe: { en: "About Me", ar: "نبذة عني" },
  courses: { en: "lessons", ar: "الدروس" },
  courseName: { en: "lesson Name", ar: "اسم الدرس" },
  studentsCount: { en: "Buyers", ar: "عدد المشترين" },
  loading: { en: "Loading instructor details...", ar: "جاري تحميل تفاصيل المعلم..." },
  error: { en: "Failed to load instructor details", ar: "فشل تحميل تفاصيل المعلم" },
  notFound: { en: "Instructor not found", ar: "المعلم غير موجود" },
  stats: { en: "Statistics", ar: "الإحصائيات" },
  totalCourses: { en: "Total lessons", ar: "إجمالي الدروس" },
  totalStudents: { en: "Total Students", ar: "إجمالي الطلاب" },
  from: { en: "From", ar: "من" },
  rating: { en: "Rating", ar: "التقييم" },
  contactTeacher: { en: "Contact Teacher", ar: "تواصل مع المعلم" },
  enrollNow: { en: "Enroll Now", ar: "اشترك الآن" },
  lessons: { en: "Lessons", ar: "درس" },
  recorded: { en: "Recorded", ar: "مسجل" },
  live: { en: "Live", ar: "مباشر" },
  discount: { en: "OFF", ar: "خصم" },
  semester1: { en: "Semester 1", ar: "الفصل الأول" },
  semester2: { en: "Semester 2", ar: "الفصل الثاني" },
  teacher: { en: "Teacher", ar: "المدرس" },
  unknownTeacher: { en: "Unknown Teacher", ar: "مدرس غير معروف" },
  noCourses: { en: "No lessons available", ar: "لا توجد درس متاحة" },
  allCoursesBy: { en: "All lessons by", ar: "جميع الدروس المقدمة من" },
  hasNoCourses: { en: "has no lessons available yet", ar: "ليس لديه أي دروس حالياً" },
  totalIncome: { en: "Total Income", ar: "إجمالي الدخل" },
  commission: { en: "Commission", ar: "العمولة" },
  averageRating: { en: "Average Rating", ar: "متوسط التقييم" },
};

const InstructorDetails = () => {
  const { lang } = useLang();
  const params = useParams();
  const teacherId = params.id;
  
  const [teacher, setTeacher] = useState<TeacherDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);

  // دالة getText معدلة
  const getText = (key: string): string => {
    const translationKey = key as keyof typeof translations;
    if (translations[translationKey]) {
      return translations[translationKey][lang as 'en' | 'ar'];
    }
    return key;
  };

  const getDefaultImage = (): string => {
    return "/assets/images/team/team-1/3.png";
  };

  const fetchTeacherDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/teacher/${teacherId}`);
      
      if (response.data?.data) {
        const teacherData = response.data.data;
        
        // تحويل بيانات المعلم
        const teacherInfo: TeacherDetails = {
          id: teacherData.id,
          name: teacherData.name,
          email: teacherData.email,
          phone: teacherData.phone,
          teacher_type: teacherData.teacher_type,
          total_rate: teacherData.average_rating || teacherData.total_rate || 0,
          image: teacherData.image,
          courses_count: teacherData.courses_count,
          students_count: teacherData.students_count,
          country: teacherData.country,
          total_income: teacherData.total_income || 0,
          commission: teacherData.commission,
          average_rating: teacherData.average_rating || 0,
        };
        
        setTeacher(teacherInfo);
        
        // جلب الكورسات الفعلية للمعلم
        await fetchTeacherCourses(teacherData.id);
        
      } else {
        throw new Error('Teacher not found');
      }
      
    } catch (err: any) {
      console.error('Error fetching teacher details:', err);
      setError(err.response?.data?.message || getText('error'));
    } finally {
      setLoading(false);
    }
  };

  const fetchTeacherCourses = async (teacherId: number) => {
    try {
      const response = await api.post('/course/index', {
        filters: {
          teacher_id: teacherId
        },
        orderBy: 'created_at',
        orderByDirection: 'desc',
        perPage: 12,
        page: 1,
        paginate: true
      });

      if (response.data?.data) {
        setCourses(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching teacher lessons:', err);
      // يمكنك تجاهل الخطأ أو استخدام الكورسات من API السابق
      setCourses([]);
    }
  };

  useEffect(() => {
    if (teacherId) {
      fetchTeacherDetails();
    }
  }, [teacherId, lang]);

  if (loading) {
    return (
      <EdunaLayout>
        <PageBanner pageTitleEn='teacher details' pageTitleAr="تفاصيل المعلم" />
        <InstructorSkeleton lang={lang as 'en' | 'ar'} text={getText('loading')} />
      </EdunaLayout>
    );
  }

  if (error || !teacher) {
    return (
      <EdunaLayout>
      <PageBanner pageTitleEn='instructor details' pageTitleAr="تفاصيل المعلم" />
        <InstructorError error={error} notFoundText={getText('notFound')} />
      </EdunaLayout>
    );
  }

  return (
    <EdunaLayout>
      <PageBanner pageTitleEn='instructor details' pageTitleAr="تفاصيل المعلم" />
      
      <section 
        className="ed-team__details position-relative section-gap" 
        style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }}
      >
        <div className="container ed-container">
          <div className="row">
            <div className="col-12">
              {/* الرأس */}
              <InstructorHeader
                teacher={teacher}
                getText={getText}
                lang={lang as 'en' | 'ar'}
                getDefaultImage={getDefaultImage}
              />
              
              {/* الإحصائيات - مع إضافة إحصائيات جديدة */}
              <InstructorStats
                courses_count={teacher.courses_count}
                students_count={teacher.students_count}
    total_rate={teacher.average_rating || teacher.total_rate || 0} // استخدام القيمة الافتراضية
  total_income={teacher.total_income || 0} // القيمة الافتراضية
  commission={teacher.commission || "0%"}
                getText={getText}
              />
              
              {/* معلومات التواصل */}
              <InstructorContact
                email={teacher.email}
                phone={teacher.phone}
                getText={getText}
              />
              
              {/* قسم الكورسات */}
              <div className="courses-section mt-5">
                <div className="section-title mb-4">
                  <h3 className="title">
                    📚 {getText('courses')} ({courses.length || 0})
                  </h3>
                  <p className="text text-muted">
                    {getText('allCoursesBy')} {teacher.name}
                  </p>
                </div>
                
                {courses.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="alert alert-info">
                      <h5>{getText('noCourses')}</h5>
                      <p className="mb-0">
                        {teacher.name} {getText('hasNoCourses')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    {courses.map((course) => (
                      <CourseItem
                        key={course.id}
                        course={course}
                        containerClass="col-lg-4 col-md-6 col-12 mb-4"
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </EdunaLayout>
  );
};

export default InstructorDetails;