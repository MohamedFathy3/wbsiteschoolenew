'use client';
import { useLang } from "@/context/LanguageContext";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  const { lang } = useLang();

  const translations = {
    error: {
      en: "Failed to load instructors",
      ar: "فشل تحميل المعلمين"
    },
    retry: {
      en: "Try Again",
      ar: "حاول مرة أخرى"
    }
  };

  const getText = (key: keyof typeof translations) => {
    return translations[key][lang as 'en' | 'ar'];
  };

  return (
    <div className="alert alert-danger text-center">
      <p>{message || getText('error')}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="btn btn-primary mt-2"
        >
          {getText('retry')}
        </button>
      )}
    </div>
  );
};

export default ErrorState;