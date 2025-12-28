// components/ProfileTranslations.tsx
import { useLang } from '@/context/LanguageContext';
import { translations } from '@/utilities/translations';

// Hook للترجمة
export const useProfileTranslations = () => {
  const { lang } = useLang();
  
  return {
    // الوطنية
    nationalDocuments: (hasStudent: boolean, hasTeacher: boolean) => 
      translations.nationalDocuments(hasStudent, hasTeacher, lang),
    
    t: {
      courses: () => translations.profile.courses(lang),
      code: () => translations.profile.code(lang),
      lessons: () => translations.profile.lessons(lang),
      logout: () => translations.profile.logout(lang),
      myInfo: () => translations.profile.myInfo(lang),
      myCourses: () => translations.profile.myCourses(lang),
      myActivity: () => translations.profile.myActivity(lang),
      personalInfo: () => translations.profile.personalInfo(lang),
      fullName: () => translations.profile.fullName(lang),
      email: () => translations.profile.email(lang),
      phoneNumber: () => translations.profile.phoneNumber(lang),
      notAdded: () => translations.profile.notAdded(lang),
      country: () => translations.profile.country(lang),
      academicStage: () => translations.profile.academicStage(lang),
      studentID: () => translations.profile.studentID(lang),
      enrolledCourses: () => translations.profile.enrolledCourses(lang),
      availableLessons: () => translations.profile.availableLessons(lang),
      joinYear: () => translations.profile.joinYear(lang),
      learningStatistics: () => translations.profile.learningStatistics(lang),
      achievements: () => translations.profile.achievements(lang),
      beginnerLearner: () => translations.profile.beginnerLearner(lang),
      registeredMember: () => translations.profile.registeredMember(lang),
      currentStage: () => translations.profile.currentStage(lang),
      noCoursesYet: () => translations.profile.noCoursesYet(lang),
      startLearning: () => translations.profile.startLearning(lang),
      browseCourses: () => translations.profile.browseCourses(lang),
      loadingCourses: () => translations.profile.loadingCourses(lang)
    }
  };
};
export default useProfileTranslations;