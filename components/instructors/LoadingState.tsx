'use client';
import { useLang } from "@/context/LanguageContext";

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message }: LoadingStateProps) => {
  const { lang } = useLang();

  const translations = {
    loading: {
      en: "Loading instructors...",
      ar: "جاري تحميل المعلمين..."
    }
  };

  const getText = (key: keyof typeof translations) => {
    return translations[key][lang as 'en' | 'ar'];
  };

  return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{message || getText('loading')}</span>
      </div>
      <p className="mt-3">{message || getText('loading')}</p>
    </div>
  );
};

export default LoadingState;