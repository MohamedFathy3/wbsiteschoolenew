import { Course } from "./course";

export interface Teacher {
  id: number;
  name: string;
  image: string | null;
  teacher_type: string;
  courses_count: number;
  students_count: number;
  average_rating: number;
  country: {
    name: string;
    image: string;
  };
  
}

export interface ApiResponse {
  data: Teacher[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
export interface Country {
  name: string;
  image: string;
}
export interface TeacherDetails {
  id: number;
  name: string; // إزالة علامة ؟
  email: string; // إزالة علامة ؟
  phone: string; // إزالة علامة ؟
  teacher_type: string; // إزالة علامة ؟
  total_rate: number; // إزالة علامة ؟
  image: string | null;
  courses_count: number;
  students_count: number;
  country: Country; // إزالة علامة ؟
  courses?: any[]; 
  total_income?: number;
  commission?: string; // تغيير من number إلى string لأن البيانات تأتي كنسبة مئوية
  average_rating?: number;
}


export interface TeacherTranslations {
  pageTitle: { en: string; ar: string };
  teacherType: { en: string; ar: string };
  reviews: { en: string; ar: string };
  students: { en: string; ar: string };
  support247: { en: string; ar: string };
  sendMessage: { en: string; ar: string };
  aboutMe: { en: string; ar: string };
  courses: { en: string; ar: string };
  courseName: { en: string; ar: string };
  studentsCount: { en: string; ar: string };
  loading: { en: string; ar: string };
  error: { en: string; ar: string };
  notFound: { en: string; ar: string };
  stats: { en: string; ar: string };
  totalCourses: { en: string; ar: string };
  totalStudents: { en: string; ar: string };
  from: { en: string; ar: string };
  rating: { en: string; ar: string };
  contactTeacher: { en: string; ar: string };
}


export type TranslationKey = 
  | 'pageTitle'
  | 'teacherType'
  | 'reviews'
  | 'students'
  | 'support247'
  | 'sendMessage'
  | 'aboutMe'
  | 'courses'
  | 'courseName'
  | 'studentsCount'
  | 'loading'
  | 'error'
  | 'notFound'
  | 'stats'
  | 'totalCourses'
  | 'totalStudents'
  | 'from'
  | 'rating'
  | 'contactTeacher'
  | 'enrollNow'
  | 'lessons'
  | 'recorded'
  | 'live'
  | 'discount'
  | 'semester1'
  | 'semester2'
  | 'teacher'
  | 'unknownTeacher'
  | 'noCourses';