'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/context/LanguageContext';
import api from '@/lib/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Country {
  id: number;
  name: string;
  key: string;
  code: string;
  active: boolean;
  image: string;
}

interface Stage {
  id: number;
  name: string;
  postion: number;
  active: boolean;
  image: string | null;
  country: Country;
}

interface ApiResponse {
  data: Stage[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  result: string;
  message: string;
  status: number;
}

export const StagesSlider = () => {
  const { lang } = useLang();
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.post<ApiResponse>('stage/index', {
          perPage: 10,
          page: 1,
          paginate: true,
        });

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          setStages(response.data.data);
        } else {
          setStages([]);
        }
      } catch (err: any) {
        console.error('❌ Error fetching stages:', err);
        setError(err.message || (lang === 'ar' ? 'فشل تحميل البيانات' : 'Failed to load data'));
        setStages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, [lang]);

  if (loading) {
    return (
      <section className="stages-section section-gap position-relative">
        <div className="container ed-container">
          <div className="section-title text-center mb-50">
            <span className="section-subtitle">
              {lang === 'ar' ? 'التعليم الذكي' : 'Smart Education'}
            </span>
            <h2 className="section-title-main">
              {lang === 'ar' ? 'مراحل التعلم المتطورة' : 'Advanced Learning Stages'}
            </h2>
            <p className="section-description">
              {lang === 'ar' 
                ? 'نحضر لك تجربة تعليمية استثنائية' 
                : 'Preparing an exceptional learning experience for you'}
            </p>
          </div>
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-inner"></div>
              <div className="spinner-outer"></div>
            </div>
            <p className="loading-text">
              {lang === 'ar' ? 'جاري تحميل المراحل التعليمية...' : 'Loading educational stages...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="stages-section section-gap position-relative">
        <div className="container ed-container">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h3>{lang === 'ar' ? 'حدث خطأ' : 'An Error Occurred'}</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-btn"
            >
              {lang === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (stages.length === 0) {
    return (
      <section className="stages-section section-gap position-relative">
        <div className="container ed-container">
          <div className="empty-container">
            <div className="empty-icon">🎓</div>
            <h3>{lang === 'ar' ? 'لا توجد مراحل' : 'No Stages Available'}</h3>
            <p>
              {lang === 'ar' 
                ? 'سيتم إضافة المراحل التعليمية قريباً' 
                : 'Educational stages will be added soon'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const colorGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
  ];

  const stageIcons = ['📚', '🎯', '🚀', '🌟', '💡', '⚡', '🎓', '🏆', '🔬', '💻'];

  return (
    <section className="stages-section section-gap position-relative">
      <div className="stages-background">
        <div className="bg-blur-1"></div>
        <div className="bg-blur-2"></div>
        <div className="bg-blur-3"></div>
      </div>
      
      <div className="container ed-container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-text">
              {lang === 'ar' ? 'التعليم المتطور' : 'Advanced Education'}
            </span>
          </div>
          <h2 className="section-title">
            {lang === 'ar' 
              ? 'مراحل التعلم الاحترافية' 
              : 'Professional Learning Stages'}
          </h2>
          <p className="section-subtitle">
            {lang === 'ar'
              ? 'اكتشف مسارات تعليمية مصممة خصيصاً لتنمية مهاراتك وإطلاق إبداعك'
              : 'Discover educational pathways specially designed to develop your skills and unleash your creativity'}
          </p>
        </div>

        <div className="stages-slider-wrapper">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectCards]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 4, spaceBetween: 30 },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={1000}
            loop={true}
            effect="cards"
            grabCursor={true}
            navigation={{
              nextEl: '.stages-swiper-next',
              prevEl: '.stages-swiper-prev',
            }}
            pagination={{
              clickable: true,
              el: '.stages-pagination',
              renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
              },
            }}
            className="stages-swiper"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            {stages.map((stage, index) => (
              <SwiperSlide key={stage.id}>
                <motion.div 
                  className="stage-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div 
                    className="stage-card-header"
                    style={{ background: colorGradients[index % colorGradients.length] }}
                  >
                    <div className="stage-icon">
                      <span className="icon-emoji">{stageIcons[index % stageIcons.length]}</span>
                    </div>
                    <div className="stage-number">
                      <span className="number-text">#{stage.postion}</span>
                    </div>
                  </div>

                  <div className="stage-card-body">
                    <h3 className="stage-name">{stage.name}</h3>
                    
                    <div className="stage-description">
                      <p>
                        {lang === 'ar'
                          ? 'مسار تعليمي متكامل يساعدك على تحقيق أهدافك المهنية'
                          : 'An integrated educational pathway to help you achieve your professional goals'}
                      </p>
                    </div>

                    <div className="stage-meta">
                      <div className="meta-item country-info">
                        <div className="meta-icon">🌍</div>
                        <div className="meta-content">
                          <span className="meta-label">
                            {lang === 'ar' ? 'الدولة' : 'Country'}
                          </span>
                          <div className="country-flag-name">
                            {stage.country.image && (
                              <Image
                                src={stage.country.image}
                                alt={stage.country.name}
                                width={20}
                                height={15}
                                className="country-flag"
                              />
                            )}
                            <span className="country-name">{stage.country.name}</span>
                          </div>
                        </div>
                      </div>

                      <div className="meta-item status-info">
                        <div className="meta-icon">
                          {stage.active ? '✅' : '⏸️'}
                        </div>
                        <div className="meta-content">
                          <span className="meta-label">
                            {lang === 'ar' ? 'الحالة' : 'Status'}
                          </span>
                          <span className={`status-badge ${stage.active ? 'active' : 'inactive'}`}>
                            {stage.active 
                              ? (lang === 'ar' ? 'نشط' : 'Active')
                              : (lang === 'ar' ? 'متوقف' : 'Paused')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="stage-actions">
                      <Link 
                        href={`/stages/${stage.id}/subjects`}
                        className="explore-btn"
                      >
                        <span className="btn-text">
                          {lang === 'ar' ? 'استكشاف الكورسات' : 'Explore Courses'}
                        </span>
                        <span className="btn-icon">
                          <i className={`fi fi-rr-arrow-${lang === 'ar' ? 'left' : 'right'}`} />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="stage-card-footer">
                    <div className="progress-indicator">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${Math.min(100, (stage.postion / stages.length) * 100)}%`,
                            background: colorGradients[index % colorGradients.length]
                          }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {lang === 'ar' ? 'مرحلة' : 'Stage'} {stage.postion} {lang === 'ar' ? 'من' : 'of'} {stages.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="slider-controls">
            <button className="stages-swiper-prev slider-btn">
              <i className={`fi fi-rr-arrow-${lang === 'ar' ? 'right' : 'left'}`} />
            </button>
            
            <div className="stages-pagination"></div>
            
            <button className="stages-swiper-next slider-btn">
              <i className={`fi fi-rr-arrow-${lang === 'ar' ? 'left' : 'right'}`} />
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .stages-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
          position: relative;
          overflow: hidden;
        }

        .stages-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .bg-blur-1, .bg-blur-2, .bg-blur-3 {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.15;
        }

        .bg-blur-1 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: 10%;
          left: 10%;
        }

        .bg-blur-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          bottom: 10%;
          right: 10%;
        }

        .bg-blur-3 {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 1;
        }

        .section-badge {
          display: inline-block;
          margin-bottom: 20px;
        }

        .badge-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 8px 24px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #718096;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .stages-slider-wrapper {
          position: relative;
          z-index: 2;
          padding: 0 40px;
        }

        .stage-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .stage-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .stage-card-header {
          height: 80px;
          position: relative;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .stage-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .icon-emoji {
          font-size: 24px;
        }

        .stage-number {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .number-text {
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stage-card-body {
          padding: 25px;
          flex: 1;
        }

        .stage-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .stage-description {
          margin-bottom: 25px;
        }

        .stage-description p {
          font-size: 0.95rem;
          color: #718096;
          line-height: 1.5;
          margin: 0;
        }

        .stage-meta {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .meta-icon {
          font-size: 20px;
          width: 40px;
          height: 40px;
          background: #f7fafc;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .meta-content {
          flex: 1;
        }

        .meta-label {
          display: block;
          font-size: 0.8rem;
          color: #a0aec0;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .country-flag-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .country-flag {
          border-radius: 3px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .country-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #4a5568;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .status-badge.active {
          background: #c6f6d5;
          color: #22543d;
        }

        .status-badge.inactive {
          background: #fed7d7;
          color: #742a2a;
        }

        .stage-actions {
          margin-top: auto;
        }

        .explore-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 20px;
          background: linear-gradient(135deg, #f6f8fa 0%, #eef2f6 100%);
          border: none;
          border-radius: 12px;
          color: #4a5568;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .explore-btn:hover {
          background: linear-gradient(135deg, #eef2f6 0%, #e2e8f0 100%);
          transform: translateX(5px);
          color: #2d3748;
        }

        .stage-card-footer {
          padding: 20px 25px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }

        .progress-indicator {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .progress-bar {
          flex: 1;
          height: 6px;
          background: #e2e8f0;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 1.5s ease;
        }

        .progress-text {
          font-size: 0.85rem;
          color: #718096;
          font-weight: 600;
          min-width: 100px;
        }

        .slider-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-top: 40px;
        }

        .slider-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #4a5568;
          font-size: 18px;
        }

        .slider-btn:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-color: transparent;
          transform: scale(1.1);
        }

        .stages-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .stages-pagination :global(.swiper-pagination-bullet) {
          width: 12px;
          height: 12px;
          background: #cbd5e0;
          opacity: 1;
          transition: all 0.3s ease;
        }

        .stages-pagination :global(.swiper-pagination-bullet-active) {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transform: scale(1.3);
        }

        .loading-container {
          text-align: center;
          padding: 60px 0;
        }

        .loading-spinner {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
        }

        .spinner-inner, .spinner-outer {
          position: absolute;
          border-radius: 50%;
          border: 4px solid transparent;
        }

        .spinner-inner {
          width: 100%;
          height: 100%;
          border-top: 4px solid #667eea;
          animation: spin 1s linear infinite;
        }

        .spinner-outer {
          width: 120%;
          height: 120%;
          top: -10%;
          left: -10%;
          border-bottom: 4px solid #764ba2;
          animation: spin 1.5s linear infinite reverse;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-text {
          font-size: 1.1rem;
          color: #718096;
          margin-top: 20px;
        }

        .error-container, .empty-container {
          text-align: center;
          padding: 80px 0;
        }

        .error-icon, .empty-icon {
          font-size: 60px;
          margin-bottom: 20px;
        }

        .error-container h3, .empty-container h3 {
          font-size: 1.8rem;
          color: #2d3748;
          margin-bottom: 10px;
        }

        .error-container p {
          color: #718096;
          margin-bottom: 30px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .retry-btn {
          padding: 12px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .retry-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }
          
          .stages-slider-wrapper {
            padding: 0 15px;
          }
          
          .stage-card {
            margin: 10px;
          }
          
          .slider-controls {
            gap: 15px;
          }
        }
      `}</style>
    </section>
  );
};