// context/LanguageContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "@/locales/translations";

type Lang = "en" | "ar";
type LangDetection = "auto" | "manual";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang, reloadPage?: boolean) => void;
  setLangString: (lang: string, reloadPage?: boolean) => void;
  t: typeof translations.en | typeof translations.ar;
  toggleLang: (reloadPage?: boolean) => void;
  direction: "ltr" | "rtl";
  detectionMode: LangDetection;
  setDetectionMode: (mode: LangDetection) => void;
  browserLang: Lang;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const getBrowserLang = (): Lang => {
    if (typeof window === 'undefined') return 'en';
    
    const browserLang = navigator.language.split('-')[0];
    const userLangs = navigator.languages?.map(lang => lang.split('-')[0]);
    
    const hasArabic = userLangs?.some(lang => lang === 'ar');
    return hasArabic ? 'ar' : 'en';
  };

  const getInitialLang = (): { lang: Lang; mode: LangDetection } => {
    if (typeof window === 'undefined') return { lang: 'en', mode: 'manual' };
    
    const savedMode = localStorage.getItem('eduna_lang_mode') as LangDetection || 'auto';
    const savedLang = localStorage.getItem('eduna_lang') as Lang;
    
    if (savedMode === 'manual' && savedLang) {
      return { lang: savedLang, mode: 'manual' };
    }
    
    return { lang: getBrowserLang(), mode: 'auto' };
  };

  const browserLang = getBrowserLang();
  const initialSettings = getInitialLang();
  
  const [lang, setLangState] = useState<Lang>(initialSettings.lang);
  const [detectionMode, setDetectionModeState] = useState<LangDetection>(initialSettings.mode);

  const saveSettings = (newLang: Lang, mode: LangDetection) => {
    localStorage.setItem('eduna_lang', newLang);
    localStorage.setItem('eduna_lang_mode', mode);
  };

  const setLang = (newLang: Lang, reloadPage: boolean = true) => { // ✅ تغيير هنا
    setLangState(newLang);
    setDetectionModeState('manual');
    saveSettings(newLang, 'manual');
    updateDocumentSettings(newLang);
    
    // إعادة تحميل الصفحة إذا طُلب ذلك
    if (reloadPage && typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.reload();
      }, 150);
    }
  };

  const setLangString = (newLang: string, reloadPage: boolean = true) => {
    if (newLang === 'en' || newLang === 'ar') {
      setLang(newLang as Lang, reloadPage);
    } else {
      console.warn(`Language "${newLang}" is not supported. Defaulting to "en".`);
      setLang('en', reloadPage);
    }
  };

  const setDetectionMode = (mode: LangDetection) => {
    setDetectionModeState(mode);
    localStorage.setItem('eduna_lang_mode', mode);
    
    if (mode === 'auto') {
      const newLang = browserLang;
      setLangState(newLang);
      saveSettings(newLang, 'auto');
      updateDocumentSettings(newLang);
    }
  };

  const toggleLang = (reloadPage: boolean = true) => { // ✅ تغيير هنا
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang, reloadPage);
  };

  const updateDocumentSettings = (newLang: Lang) => {
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    
    document.documentElement.classList.remove('lang-ar', 'lang-en');
    document.documentElement.classList.add(`lang-${newLang}`);
    
    updateMetaTags(newLang);
  };

  const updateMetaTags = (newLang: Lang) => {
    let metaLang = document.querySelector('meta[name="lang"]');
    if (!metaLang) {
      metaLang = document.createElement('meta');
      metaLang.setAttribute('name', 'lang');
      document.head.appendChild(metaLang);
    }
    metaLang.setAttribute('content', newLang);
    
    let metaDir = document.querySelector('meta[name="text-direction"]');
    if (!metaDir) {
      metaDir = document.createElement('meta');
      metaDir.setAttribute('name', 'text-direction');
      document.head.appendChild(metaDir);
    }
    metaDir.setAttribute('content', newLang === 'ar' ? 'rtl' : 'ltr');
  };

  useEffect(() => {
    const handleLanguageChange = () => {
      if (detectionMode === 'auto') {
        const newLang = getBrowserLang();
        setLangState(newLang);
        saveSettings(newLang, 'auto');
        updateDocumentSettings(newLang);
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => window.removeEventListener('languagechange', handleLanguageChange);
  }, [detectionMode]);

  useEffect(() => {
    updateDocumentSettings(lang);
  }, [lang]);

  const t = lang === 'ar' ? translations.ar : translations.en;
  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ 
      lang, 
      setLang, 
      setLangString,
      t, 
      toggleLang,
      direction,
      detectionMode,
      setDetectionMode,
      browserLang
    }}>
      <div dir={direction} className={`lang-${lang}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used within LanguageProvider');
  }
  return context;
};