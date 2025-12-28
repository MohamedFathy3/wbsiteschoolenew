// utilities/translations.ts
export const translations = {
  // الوطنية
  nationalDocuments: (hasStudent: boolean, hasTeacher: boolean, lang: string) => {
    if (hasStudent && hasTeacher) {
      return lang === 'ar' ? 'وثائق الهوية الوطنية' : 'National Identity Documents';
    } else if (hasStudent) {
      return lang === 'ar' ? 'هويات الطلاب الوطنية' : 'Students National Identities';
    } else if (hasTeacher) {
      return lang === 'ar' ? 'وثائق عمل المدرسين' : 'Teachers Work Documents';
    } else {
      return lang === 'ar' ? 'المستندات الرسمية' : 'Official Documents';
    }
  },

  // البروفايل
  profile: {
    courses: (lang: string) => lang === 'ar' ? 'الدورات' : 'Courses',
    code: (lang: string) => lang === 'ar' ? 'الكود' : 'Code',
    lessons: (lang: string) => lang === 'ar' ? 'الدروس' : 'Lessons',
    logout: (lang: string) => lang === 'ar' ? 'تسجيل الخروج' : 'Logout',
    myInfo: (lang: string) => lang === 'ar' ? 'معلوماتي' : 'My Info',
    myCourses: (lang: string) => lang === 'ar' ? 'دوراتي' : 'My Courses',
    myActivity: (lang: string) => lang === 'ar' ? 'نشاطي' : 'My Activity',
    personalInfo: (lang: string) => lang === 'ar' ? 'المعلومات الشخصية' : 'Personal Information',
    fullName: (lang: string) => lang === 'ar' ? 'الاسم الكامل' : 'Full Name',
    email: (lang: string) => lang === 'ar' ? 'البريد الإلكتروني' : 'Email',
    phoneNumber: (lang: string) => lang === 'ar' ? 'رقم الهاتف' : 'Phone Number',
    notAdded: (lang: string) => lang === 'ar' ? 'غير مضاف' : 'Not added',
    country: (lang: string) => lang === 'ar' ? 'البلد' : 'Country',
    academicStage: (lang: string) => lang === 'ar' ? 'المرحلة الدراسية' : 'Academic Stage',
    studentID: (lang: string) => lang === 'ar' ? 'الكود التعريفي' : 'Student ID',
    enrolledCourses: (lang: string) => lang === 'ar' ? 'دورة مسجلة' : 'Enrolled Courses',
    availableLessons: (lang: string) => lang === 'ar' ? 'درس متاح' : 'Available Lessons',
    joinYear: (lang: string) => lang === 'ar' ? 'سنة الانضمام' : 'Join Year',
    learningStatistics: (lang: string) => lang === 'ar' ? 'إحصائيات التعلم' : 'Learning Statistics',
    achievements: (lang: string) => lang === 'ar' ? 'الإنجازات' : 'Achievements',
    beginnerLearner: (lang: string) => lang === 'ar' ? 'متعلم مبتدئ' : 'Beginner Learner',
    registeredMember: (lang: string) => lang === 'ar' ? 'عضو مسجل' : 'Registered Member',
    currentStage: (lang: string) => lang === 'ar' ? 'مرحلتك الدراسية الحالية' : 'Your current academic stage',
    noCoursesYet: (lang: string) => lang === 'ar' ? 'لا توجد دورات بعد' : 'No courses yet',
    startLearning: (lang: string) => lang === 'ar' ? 'لم تشترك في أي دورة حتى الآن. ابدأ رحلة التعلم الآن!' : 'You haven\'t enrolled in any courses yet. Start your learning journey now!',
    browseCourses: (lang: string) => lang === 'ar' ? 'تصفح الدورات' : 'Browse Courses',
    loadingCourses: (lang: string) => lang === 'ar' ? 'جاري تحميل الدورات...' : 'Loading courses...'
  }
};


export default translations;