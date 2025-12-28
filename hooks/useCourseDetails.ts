import { useState, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";

interface CourseDetails {
  id: number;
  title: string;
  description: string;
  type: string;
  original_price: string;
  discount: string;
  price: string;
  what_you_will_learn: string;
  semester: string;
  image: string;
  file_path: string;
  currency: string;
  subscribers_count: number;
  active: boolean;
  teacher: {
    id: number;
    name: string;
    email: string;
    phone: string;
    image: string | null;
    country: {
      name: string;
      image: string;
    };
  };
  curricula: {
    name: string;
  };
  stage: {
    name: string;
  };
  subject: {
    name: string;
  };
  country: {
    name: string;
  };
  details: Array<{
    id: number;
    title: string;
    description: string;
    content_type: string;
    content_link: string;
    file_path: string;
  }>;
  comments: Array<{
    id: number;
    user: {
      name: string;
    };
    comment: string;
    rating: number;
    created_at: string;
  }>;
  average_rating: number;
  students: Array<any>;
}

export const useCourseDetails = (courseId: any) => {
  const { lang } = useLang();
  
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [unenrolling, setUnenrolling] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showAllDetails, setShowAllDetails] = useState(false);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get(`/student-course/${courseId}`);
      
      if (response.data && response.data.data) {
        setCourse(response.data.data);
        toast.success(
          lang === 'ar' ? 'تم تحميل تفاصيل الدورة' : 'Course details loaded',
          {
            position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
            duration: 2000,
          }
        );
      } else {
        throw new Error('Course not found');
      }
      
    } catch (err: any) {
      console.error('Error fetching course details:', err);
      setError(err.response?.data?.message || (lang === 'ar' ? 'فشل تحميل تفاصيل الدورة' : 'Failed to load course details'));
      toast.error(
        err.response?.data?.message || (lang === 'ar' ? 'فشل تحميل تفاصيل الدورة' : 'Failed to load course details'),
        {
          duration: 4000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    const toastId = toast.loading(
      lang === 'ar' ? 'جاري التسجيل في الدورة...' : 'Enrolling in course...',
      {
        position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
      }
    );

    try {
      setEnrolling(true);
      
      const response = await api.post('/student/enroll', {
        course_id: courseId
      });
      
      toast.success(
        lang === 'ar' ? 'تم التسجيل في الدورة بنجاح!' : 'Successfully enrolled in the course!',
        {
          id: toastId,
          duration: 3000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
        }
      );
      
      fetchCourseDetails();
      
    } catch (err: any) {
      console.error('Error enrolling:', err);
      toast.error(
        err.response?.data?.message || (lang === 'ar' ? 'فشل التسجيل في الدورة' : 'Failed to enroll in the course'),
        {
          id: toastId,
          duration: 4000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
        }
      );
    } finally {
      setEnrolling(false);
    }
  };

  const handleUnenroll = async () => {
    toast.warning(
      lang === 'ar' ? 'هل أنت متأكد من إلغاء التسجيل؟' : 'Are you sure you want to unenroll?',
      {
        position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
        duration: 5000,
        action: {
          label: lang === 'ar' ? 'نعم' : 'Yes',
          onClick: async () => {
            await performUnenroll();
          }
        },
        cancel: {
          label: lang === 'ar' ? 'لا' : 'No',
          onClick: () => {
            toast.dismiss();
          }
        }
      }
    );
  };

  const performUnenroll = async () => {
    const toastId = toast.loading(
      lang === 'ar' ? 'جاري إلغاء التسجيل...' : 'Unenrolling...',
      {
        position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
      }
    );

    try {
      setUnenrolling(true);
      
      const response = await api.post('/student/unenroll', {
        course_id: courseId
      });
      
      toast.success(
        lang === 'ar' ? 'تم إلغاء التسجيل من الدورة' : 'Successfully unenrolled from the course',
        {
          id: toastId,
          duration: 3000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
        }
      );
      
      fetchCourseDetails();
      
    } catch (err: any) {
      console.error('Error unenrolling:', err);
      toast.error(
        err.response?.data?.message || (lang === 'ar' ? 'فشل إلغاء التسجيل من الدورة' : 'Failed to unenroll from the course'),
        {
          id: toastId,
          duration: 4000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
        }
      );
    } finally {
      setUnenrolling(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      toast.warning(
        lang === 'ar' ? 'الرجاء إدخال تعليق' : 'Please enter a comment',
        {
          duration: 3000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
        }
      );
      return;
    }

    const toastId = toast.loading(
      lang === 'ar' ? 'جاري إضافة التعليق...' : 'Adding comment...',
      {
        position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
      }
    );

    try {
      setSubmittingComment(true);
      
      const response = await api.post(`/courses/${courseId}/comments`, {
        comment: comment,
        rating: rating
      });
      
      toast.success(
        lang === 'ar' ? 'تم إضافة التعليق بنجاح!' : 'Comment added successfully!',
        {
          id: toastId,
          duration: 3000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
        }
      );
      
      setComment("");
      setRating(5);
      fetchCourseDetails();
      
    } catch (err: any) {
      console.error('Error submitting comment:', err);
      toast.error(
        err.response?.data?.message || (lang === 'ar' ? 'فشل إضافة التعليق' : 'Failed to add comment'),
        {
          id: toastId,
          duration: 4000,
          position: lang === 'ar' ? 'bottom-right' : 'bottom-left',
        }
      );
    } finally {
      setSubmittingComment(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId, lang]);

  const isUserEnrolled = () => {
    return course?.students && course.students.length > 0;
  };

  return {
    course,
    loading,
    error,
    isUserEnrolled: isUserEnrolled(),
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
  };
};