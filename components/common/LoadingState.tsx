'use client';
import { useLang } from "@/context/LanguageContext";

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingState = ({ message, fullScreen = false }: LoadingStateProps) => {
  const { lang } = useLang();

  const translations = {
    loading: {
      en: "Loading...",
      ar: "جاري التحميل..."
    }
  };

  const getText = () => {
    return message || translations.loading[lang as 'en' | 'ar'];
  };

  if (fullScreen) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }} />
        <p style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0
        }}>
          {getText()}
        </p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{
      textAlign: 'center',
      padding: '40px 20px',
      width: '100%'
    }}>
      <div style={{
        display: 'inline-block',
        width: '40px',
        height: '40px',
        border: '3px solid #f3f3f3',
        borderTop: '3px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '15px'
      }} />
      <p style={{
        fontSize: '16px',
        color: '#6b7280',
        margin: 0
      }}>
        {getText()}
      </p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingState;