'use client';
import { useLang } from "@/context/LanguageContext";

const EmptyState = () => {
  const { lang } = useLang();

  const translations = {
    noInstructors: {
      en: "No instructors found",
      ar: "لم يتم العثور على معلمين"
    }
  };

  const getText = (key: keyof typeof translations) => {
    return translations[key][lang as 'en' | 'ar'];
  };

  return (
    <div className="text-center py-5">
      <p className="fs-5">{getText('noInstructors')}</p>
    </div>
  );
};

export default EmptyState;