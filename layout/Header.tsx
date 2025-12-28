'use client';
import { eduna_config } from "@/utilities";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import Modal from "react-bootstrap/Modal";
import { useLang } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import UserProfile from "./UserProfile";
import { toast } from "sonner";
import api from "@/lib/api";
import Cookies from "js-cookie";

const Header = ({ header }: { header: number }) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { lang, setLangString, toggleLang } = useLang();
  
  useEffect(() => {
    eduna_config.sticky_header();
  }, []);
  
  const HeaderComponent =
    header === 1
      ? Header1
      : Header1;

  return (
    <Fragment>
      <HeaderComponent
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={() => setShowMobileMenu(true)}
        lang={lang}
        setLang={setLangString}
        toggleLang={toggleLang}
      />
      <MobileMenu
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        lang={lang}
        setLang={setLangString}
        toggleLang={toggleLang}
      />
    </Fragment>
  );
};
export default Header;

const Header1 = ({
  showMobileMenu,
  setShowMobileMenu,
  lang,
  setLang,
  toggleLang
}: {
  showMobileMenu: boolean;
  setShowMobileMenu: (show: boolean) => void;
  lang: string;
  setLang: (lang: string) => void;
  toggleLang: () => void;
}) => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { t } = useLang();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (searchTerm: string) => {
    if (searchTerm.trim().length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      // البحث في الـ title بالإضافة إلى الـ title
      const response = await api.post('/course/index', {
        filters: {
          title: searchTerm // البحث في الوصف
        },
        orderBy: "id",
        orderByDirection: "asc",
        perPage: 10,
        paginate: true
      });

      if (response.data?.data) {
        setSearchResults(response.data.data);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/courses?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      <div className="ed-topbar">
        <div className="container ed-container-expand">
          <div className="ed-topbar__inner">
            {/* Logo */}
            <div className="ed-topbar__logo">
              <Link href="/">
                <Image
                  width={200}
                  height={100}
                  src="/favicon.svg"
                  alt="logo"
                />
              </Link>
            </div>
            
            {/* Search Bar with Results */}
            <div className="ed-topbar__search-widget" ref={searchRef}>
              <div className="ed-topbar__search">
                <form onSubmit={handleSearchSubmit}>
                  <input
                    type="search"
                    name="search"
                    placeholder={t.search}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    required
                    style={{borderRadius:'20px'}}
                    autoComplete="off"
                  />
                  <button type="submit">
                    <i className="fi-rr-search" />
                  </button>
                </form>
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="search-results-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    padding: '10px 0',
                    zIndex: 1001,
                    maxHeight: '300px',
                    overflowY: 'auto'
                  }}>
                    {searchResults.map((course) => (
                      <Link 
                        key={course.id} 
                        href={`/course-details/${course.id}`}
                        className="search-result-item"
                        style={{
                          display: 'block',
                          padding: '10px 15px',
                          color: '#333',
                          textDecoration: 'none',
                          borderBottom: '1px solid #f0f0f0',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchTerm('');
                        }}
                      >
                        <div style={{ 
                          fontWeight: '500',
                          fontSize: '14px',
                          color: '#3b82f6'
                        }}>
                          {lang === 'ar' ? course.name_ar || course.title : course.name_en || course.title}
                        </div>
                        {course.description && (
                          <div style={{
                            fontSize: '12px',
                            color: '#666',
                            marginTop: '4px',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {lang === 'ar' ? course.description_ar || course.description : course.description_en || course.description}
                          </div>
                        )}
                        {/* عرض تواريخ بدء وانتهاء الكورس */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          color: '#888',
                          marginTop: '6px'
                        }}>
                          {course.start_date && (
                            <span>
                              <i className="fi fi-rr-calendar" style={{marginRight: '4px'}}></i>
                              {new Date(course.start_date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                            </span>
                          )}
                          {course.end_date && (
                            <span>
                              <i className="fi fi-rr-calendar-check" style={{marginRight: '4px'}}></i>
                              {new Date(course.end_date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US')}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Topbar Info */}
            <div className="ed-topbar__info">
              {/* Topbar Social */}
              <ul className="ed-topbar__info-social">
                <Social />
              </ul>
              
              {/* Topbar Button */}
              <div className="ed-topbar__info-buttons">
                <LanguageSwitcher lang={lang} setLang={setLang} toggleLang={toggleLang} />
                <LoginRegisterButton lang={lang} />
              </div>
              
              {/* Mobile Menu Button */}
              <button
                type="button"
                className="mobile-menu-offcanvas-toggler"
                onClick={() => setShowMobileMenu(true)}
              >
                <span className="line" />
                <span className="line" />
                <span className="line" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <header className="ed-header">
        <div className="container-fluid px-4">
          <div className="ed-header__inner">
            <div className="row align-items-center">
              <div className="col-12">
                {/* Navigation Menu - Full Width */}
                <Nav lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <Sidebar close={() => setToggleSidebar(false)} open={toggleSidebar} lang={lang} />
    </Fragment>
  );
};

const Nav = ({ lang }: { lang: string }) => {
  const { t } = useLang();
  const [curriculums, setCurriculums] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);
  const [showCurriculumDropdown, setShowCurriculumDropdown] = useState(false);
  const [showStageDropdown, setShowStageDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const curriculumRef = useRef<HTMLLIElement>(null);
  const stageRef = useRef<HTMLLIElement>(null);
  const moreRef = useRef<HTMLLIElement>(null);

  // تتبع عرض النافذة
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    handleResize(); // تعيين القيمة الأولية
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Fetch curriculums
    const fetchCurriculums = async () => {
      try {
        const response = await api.get('/curriculum');
        if (response.data?.data) {
          setCurriculums(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching curriculums:', error);
      }
    };
    
    // Fetch stages
    const fetchStages = async () => {
      try {
        const response = await api.post('/stage/index', {
          perPage: 100
        });
        if (response.data?.data) {
          setStages(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching stages:', error);
      }
    };
    
    fetchCurriculums();
    fetchStages();
  }, []);

  // تحديد عدد العناصر المرئية بناءً على عرض الشاشة
  const getVisibleItemsCount = () => {
    if (windowWidth < 768) return 2; // Mobile
    if (windowWidth < 992) return 3; // Tablet
    if (windowWidth < 1200) return 4; // Small Desktop
    if (windowWidth < 1400) return 5; // Medium Desktop
    return 6; // Large Desktop
  };

  const visibleItemsCount = getVisibleItemsCount();

  // قائمة العناصر الأساسية
  const mainMenuItems = useMemo(() => [
    { 
      id: 'home', 
      href: '/', 
      label: t.home,
      type: 'link'
    },
    { 
      id: 'curriculum', 
      href: '#', 
      label: lang === 'ar' ? 'المناهج' : 'Curriculums', 
      type: 'dropdown',
      dropdownType: 'curriculum'
    },
    { 
      id: 'stage', 
      href: '#', 
      label: lang === 'ar' ? 'المراحل' : 'Stages', 
      type: 'dropdown',
      dropdownType: 'stage'
    },
    { 
      id: 'courses', 
      href: '/courses', 
      label: t.courses,
      type: 'link'
    },
    { 
      id: 'resources', 
      href: '/resources', 
      label: t.resources,
      type: 'link'
    },
    { 
      id: 'national', 
      href: '/National', 
      label: t.National,
      type: 'link'
    },
    { 
      id: 'about', 
      href: '/about-1', 
      label: t.about,
      type: 'link'
    },
    { 
      id: 'contact', 
      href: '/contact', 
      label: t.contact,
      type: 'link'
    },
    { 
      id: 'jobs', 
      href: '/job', 
      label: t.jobs,
      type: 'link'
    },
  ], [t, lang]);

  // العناصر المرئية والموجودة في المزيد
  const visibleMenuItems = mainMenuItems.slice(0, visibleItemsCount - 1); // نترك مكان للمزيد
  const moreMenuItems = mainMenuItems.slice(visibleItemsCount - 1);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (curriculumRef.current && !curriculumRef.current.contains(event.target as Node)) {
        setShowCurriculumDropdown(false);
      }
      if (stageRef.current && !stageRef.current.contains(event.target as Node)) {
        setShowStageDropdown(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setShowMoreDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // توليد العنصر حسب النوع
  const renderMenuItem = (item: any, index: number) => {
    const isCurriculum = item.id === 'curriculum';
    const isStage = item.id === 'stage';
    
    if (isCurriculum) {
      return (
        <li 
          key={item.id}
          ref={curriculumRef}
          style={{ 
            listStyle: 'none',
            position: 'relative'
          }}
          onMouseEnter={() => setShowCurriculumDropdown(true)}
          onMouseLeave={() => setTimeout(() => {
            if (!document.querySelector('.curriculum-dropdown:hover')) {
              setShowCurriculumDropdown(false);
            }
          }, 100)}
        >
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setShowCurriculumDropdown(!showCurriculumDropdown);
            }}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '15px 20px',
              color: '#333',
              textDecoration: 'none',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
              fontSize: windowWidth < 992 ? '14px' : '16px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
            onMouseLeave={(e) => {
              if (!showCurriculumDropdown) {
                e.currentTarget.style.color = '#333';
              }
            }}
          >
            {item.label}
            <i className={`fi fi-rr-angle-small-down ${showCurriculumDropdown ? 'rotate-180' : ''}`}></i>
          </a>
          
          {showCurriculumDropdown && curriculums.length > 0 && (
            <div 
              className="curriculum-dropdown"
              style={{
                position: 'absolute',
                top: '100%',
                [lang === 'ar' ? 'right' : 'left']: 0,
                backgroundColor: 'white',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                padding: '15px',
                minWidth: windowWidth < 768 ? '280px' : '350px',
                zIndex: 1000,
                maxHeight: '400px',
                overflowY: 'auto'
              }}
              onMouseEnter={() => setShowCurriculumDropdown(true)}
              onMouseLeave={() => setShowCurriculumDropdown(false)}
            >
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: `repeat(auto-fill, minmax(${windowWidth < 768 ? '120px' : '150px'}, 1fr))`, 
                gap: '15px' 
              }}>
                {curriculums.map((curriculum) => (
                  <Link 
                    key={curriculum.id}
                    href={`/curriculums/${curriculum.id}/stages`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: '#333',
                      transition: 'transform 0.2s',
                      padding: '10px',
                      borderRadius: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setShowCurriculumDropdown(false)}
                  >
                    <div style={{
                      width: windowWidth < 768 ? '80px' : '100px',
                      height: windowWidth < 768 ? '80px' : '100px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      marginBottom: '8px',
                      backgroundColor: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {curriculum.image ? (
                        <Image
                          src={curriculum.image}
                          alt={lang === 'ar' ? curriculum.name_ar || curriculum.name : curriculum.name_en || curriculum.name}
                          width={windowWidth < 768 ? 80 : 100}
                          height={windowWidth < 768 ? 80 : 100}
                          style={{ 
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div style={{ 
                          width: '100%', 
                          height: '100%', 
                          backgroundColor: '#e9ecef',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: windowWidth < 768 ? '12px' : '14px',
                          color: '#6c757d'
                        }}>
                          {lang === 'ar' ? 'لا توجد صورة' : 'No Image'}
                        </div>
                      )}
                    </div>
                    <div style={{
                      textAlign: 'center',
                      fontSize: windowWidth < 768 ? '12px' : '14px',
                      fontWeight: '500',
                      marginTop: '5px',
                      maxWidth: '120px',
                      wordBreak: 'break-word'
                    }}>
                      {lang === 'ar' ? curriculum.name_ar || curriculum.name : curriculum.name_en || curriculum.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>
      );
    }
    
    if (isStage) {
      return (
        <li 
          key={item.id}
          ref={stageRef}
          style={{ 
            listStyle: 'none',
            position: 'relative'
          }}
          onMouseEnter={() => setShowStageDropdown(true)}
          onMouseLeave={() => setTimeout(() => {
            if (!document.querySelector('.stage-dropdown:hover')) {
              setShowStageDropdown(false);
            }
          }, 100)}
        >
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setShowStageDropdown(!showStageDropdown);
            }}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '15px 20px',
              color: '#333',
              textDecoration: 'none',
              fontWeight: '500',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
              fontSize: windowWidth < 992 ? '14px' : '16px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
            onMouseLeave={(e) => {
              if (!showStageDropdown) {
                e.currentTarget.style.color = '#333';
              }
            }}
          >
            {item.label}
            <i className={`fi fi-rr-angle-small-down ${showStageDropdown ? 'rotate-180' : ''}`}></i>
          </a>
          
          {showStageDropdown && stages.length > 0 && (
            <div 
              className="stage-dropdown"
              style={{
                position: 'absolute',
                top: '100%',
                [lang === 'ar' ? 'right' : 'left']: 0,
                backgroundColor: 'white',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                padding: '15px',
                minWidth: windowWidth < 768 ? '300px' : '400px',
                zIndex: 1000,
                maxHeight: '400px',
                overflowY: 'auto'
              }}
              onMouseEnter={() => setShowStageDropdown(true)}
              onMouseLeave={() => setShowStageDropdown(false)}
            >
              <div style={{ display: 'grid', gap: '15px' }}>
                {stages.map((stage) => (
                  <Link 
                    key={stage.id}
                    href={`/stages/${stage.id}/subjects`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: '#333',
                      padding: '10px 15px',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                      gap: '15px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    onClick={() => setShowStageDropdown(false)}
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: '0'
                    }}>
                      <div style={{
                        fontWeight: '500',
                        fontSize: windowWidth < 768 ? '13px' : '14px',
                        marginBottom: '4px'
                      }}>
                        {stage.name}
                      </div>
                      
                      {stage.country && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: windowWidth < 768 ? '11px' : '12px',
                          color: '#666'
                        }}>
                          {stage.country.image && (
                            <Image
                              src={stage.country.image}
                              alt={stage.country.name}
                              width={20}
                              height={15}
                              style={{ borderRadius: '2px' }}
                            />
                          )}
                          <span>{stage.country.name}</span>
                        </div>
                      )}
                      
                      {stage.curriculum && (
                        <div style={{
                          fontSize: windowWidth < 768 ? '11px' : '12px',
                          color: '#888',
                          marginTop: '2px'
                        }}>
                          {lang === 'ar' ? 'المنهج:' : 'Curriculum:'} {lang === 'ar' ? stage.curriculum.name_ar || stage.curriculum.name : stage.curriculum.name_en || stage.curriculum.name}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </li>
      );
    }
    
    return (
      <li key={item.id} style={{ listStyle: 'none' }}>
        <Link href={item.href} style={{
          display: 'block',
          padding: windowWidth < 992 ? '12px 16px' : '15px 20px',
          color: '#333',
          textDecoration: 'none',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          transition: 'color 0.2s',
          fontSize: windowWidth < 992 ? '14px' : '16px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#333'}
        >
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <nav className="ed-header__navigation">
      <ul className="ed-header__menu" style={{ 
        direction: lang === 'ar' ? 'rtl' : 'ltr',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: windowWidth < 1200 ? 'flex-start' : 'space-between',
        alignItems: 'center',
        gap: windowWidth < 768 ? '5px' : windowWidth < 992 ? '10px' : '0',
        margin: '0',
        padding: '0',
        position: 'relative',
        width: '100%',
        overflowX: windowWidth < 1200 ? 'auto' : 'visible',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        {/* إخفاء scrollbar في المتصفحات الحديثة */}
        <style jsx>{`
          .ed-header__menu::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        
        {/* العناصر المرئية */}
        {visibleMenuItems.map((item, index) => renderMenuItem(item, index))}
        
        {/* زر المزيد (إذا كان هناك عناصر مخفية) */}
        {moreMenuItems.length > 0 && (
          <li 
            ref={moreRef}
            style={{ 
              listStyle: 'none',
              position: 'relative',
              marginLeft: lang === 'ar' ? 'auto' : '0',
              marginRight: lang === 'ar' ? '0' : 'auto',
              flexShrink: 0
            }}
            onMouseEnter={() => setShowMoreDropdown(true)}
            onMouseLeave={() => setTimeout(() => {
              if (!document.querySelector('.more-dropdown:hover')) {
                setShowMoreDropdown(false);
              }
            }, 100)}
          >
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                setShowMoreDropdown(!showMoreDropdown);
              }}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: windowWidth < 992 ? '12px 16px' : '15px 20px',
                color: '#333',
                textDecoration: 'none',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
                fontSize: windowWidth < 992 ? '14px' : '16px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#3b82f6'}
              onMouseLeave={(e) => {
                if (!showMoreDropdown) {
                  e.currentTarget.style.color = '#333';
                }
              }}
            >
              {lang === 'ar' ? 'المزيد' : 'More'}
              <i className={`fi fi-rr-angle-small-down ${showMoreDropdown ? 'rotate-180' : ''}`}></i>
            </a>
            
            {showMoreDropdown && (
              <div 
                className="more-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  [lang === 'ar' ? 'right' : 'left']: 0,
                  backgroundColor: 'white',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  padding: '10px 0',
                  minWidth: windowWidth < 768 ? '150px' : '180px',
                  zIndex: 1000,
                  overflow: 'hidden'
                }}
                onMouseEnter={() => setShowMoreDropdown(true)}
                onMouseLeave={() => setShowMoreDropdown(false)}
              >
                {moreMenuItems.map((item) => (
                  <div key={item.id} style={{ padding: '0 5px' }}>
                    <Link 
                      href={item.href}
                      style={{
                        display: 'block',
                        padding: '12px 20px',
                        color: '#333',
                        textDecoration: 'none',
                        fontWeight: '500',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s',
                        fontSize: '14px',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#3b82f6';
                        e.currentTarget.style.backgroundColor = '#f0f7ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#333';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => setShowMoreDropdown(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

const MobileMenu = ({
  show, 
  onHide,
  lang,
  setLang,
  toggleLang
}: {
  show: boolean;
  onHide: () => void;
  lang: string;
  setLang: (lang: string) => void;
  toggleLang: () => void;
}) => {
  const { t } = useLang();
  const { isAuthenticated, logout, user } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [curriculums, setCurriculums] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);
  
  useEffect(() => {
    // Fetch curriculums
    const fetchCurriculums = async () => {
      try {
        const response = await api.get('/curriculum');
        if (response.data?.data) {
          setCurriculums(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching curriculums:', error);
      }
    };
    
    // Fetch stages
    const fetchStages = async () => {
      try {
        const response = await api.post('/stage/index', {
          perPage: 100
        });
        if (response.data?.data) {
          setStages(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching stages:', error);
      }
    };
    
    fetchCurriculums();
    fetchStages();
  }, []);

  const activeMenuSet = (value: string) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value: string) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
      
  return (
    <Modal
      className={`modal mobile-menu-modal offcanvas-modal fade ${lang === 'ar' ? 'rtl' : ''}`}
      show={show}
      onHide={onHide}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="modal-header offcanvas-header">
        <div className="offcanvas-logo">
          <Link href="/">
            <Image
              width={140}
              height={34}
              src="/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
        </div>
        <button type="button" className="btn-close" onClick={onHide}>
          <i className="fi fi-ss-cross" />
        </button>
      </div>
      
      <div className="mobile-menu-modal-main-body">
        <div className="mobile-language-switcher mb-3 px-3">
          <button
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => {
              setLang('en');
              setTimeout(() => window.location.reload(), 100);
            }}
            style={{
              marginLeft: lang === 'ar' ? '10px' : '0',
              marginRight: lang === 'ar' ? '0' : '10px'
            }}
          >
            English
          </button>
          <button
            className={`lang-btn ${lang === 'ar' ? 'active' : ''}`}
            onClick={() => {
              setLang('ar');
              setTimeout(() => window.location.reload(), 100);
            }}
          >
            العربية
          </button>
        </div>
        
        {isAuthenticated && user && (
          <div className="mobile-user-info p-3 mb-3 bg-light" style={{ 
            direction: lang === 'ar' ? 'rtl' : 'ltr',
            textAlign: lang === 'ar' ? 'right' : 'left'
          }}>
            <div className="d-flex align-items-center" style={{ 
              flexDirection: lang === 'ar' ? 'row-reverse' : 'row'
            }}>
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" 
                style={{ 
                  width: '45px', 
                  height: '45px',
                  marginRight: lang === 'ar' ? '0' : '10px',
                  marginLeft: lang === 'ar' ? '10px' : '0'
                }}>
                {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>{user.name || user.email}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {user.role === 'teacher' ? 
                    (lang === 'ar' ? 'بائع' : 'Seller') : 
                    (lang === 'ar' ? 'مشتري' : 'Buyer')}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <nav className="offcanvas__menu">
          <ul className="offcanvas__menu_ul" style={{ 
            direction: lang === 'ar' ? 'rtl' : 'ltr',
            textAlign: lang === 'ar' ? 'right' : 'left'
          }}>
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item active" href="/" onClick={onHide}>
                {t.home}
              </Link>
            </li>
            
            {/* Mobile Curriculums */}
            <li className="offcanvas__menu_li">
              <button
                className="offcanvas__menu_item d-flex justify-content-between align-items-center"
                onClick={() => activeMenuSet("curriculums")}
                style={{
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  padding: '12px 0'
                }}
              >
                <span>{lang === 'ar' ? 'المناهج' : 'Curriculums'}</span>
                <i className={`fi fi-rr-angle-small-down ${
                  activeMenu === "curriculums" ? 'rotate-180' : ''
                }`}></i>
              </button>
              <ul className="offcanvas__sub_menu" style={{ 
                ...activeLi("curriculums"),
                paddingRight: lang === 'ar' ? '15px' : '0',
                paddingLeft: lang === 'ar' ? '0' : '15px'
              }}>
                {curriculums.map((curriculum) => (
                  <li key={curriculum.id} className="offcanvas__sub_menu_li">
                    <Link 
                      href={`/curriculums/${curriculum.id}/stages`}
                      className="offcanvas__sub_menu_item"
                      onClick={onHide}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 0'
                      }}
                    >
                      {curriculum.image && (
                        <Image
                          src={curriculum.image}
                          alt={lang === 'ar' ? curriculum.name_ar || curriculum.name : curriculum.name_en || curriculum.name}
                          width={30}
                          height={30}
                          style={{ 
                            borderRadius: '4px',
                            objectFit: 'cover'
                          }}
                        />
                      )}
                      <span>
                        {lang === 'ar' ? curriculum.name_ar || curriculum.name : curriculum.name_en || curriculum.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            
            {/* Mobile Stages */}
            <li className="offcanvas__menu_li">
              <button
                className="offcanvas__menu_item d-flex justify-content-between align-items-center"
                onClick={() => activeMenuSet("stages")}
                style={{
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  padding: '12px 0'
                }}
              >
                <span>{lang === 'ar' ? 'المراحل' : 'Stages'}</span>
                <i className={`fi fi-rr-angle-small-down ${
                  activeMenu === "stages" ? 'rotate-180' : ''
                }`}></i>
              </button>
              <ul className="offcanvas__sub_menu" style={{ 
                ...activeLi("stages"),
                paddingRight: lang === 'ar' ? '15px' : '0',
                paddingLeft: lang === 'ar' ? '0' : '15px'
              }}>
                {stages.map((stage) => (
                  <li key={stage.id} className="offcanvas__sub_menu_li">
                    <Link 
                      href={`/stages/${stage.id}/subjects`}
                      className="offcanvas__sub_menu_item"
                      onClick={onHide}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '8px 0'
                      }}
                    >
                      <span style={{ fontWeight: '500' }}>{stage.name}</span>
                      {stage.curriculum && (
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          {lang === 'ar' ? stage.curriculum.name_ar || stage.curriculum.name : stage.curriculum.name_en || stage.curriculum.name}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item" href="/courses" onClick={onHide}>
                {t.courses}
              </Link>
            </li>
            
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item" href="/resources" onClick={onHide}>
                {t.resources}
              </Link>
            </li>
            
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item" href="/National" onClick={onHide}>
                {t.National}
              </Link>
            </li>
            
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item" href="/about-1" onClick={onHide}>
                {t.about}
              </Link>
            </li>
            
            <li className="offcanvas__menu_li">
              <Link className="offcanvas__menu_item" href="/contact" onClick={onHide}>
                {t.contact}
              </Link>
            </li>
            
            <li className="offcanvas__menu_li mt-4">
              <div className="mobile-auth-buttons">
                {isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      className="login-btn w-100 mb-2"
                      onClick={() => {
                        onHide();
                        window.location.href = '/profile';
                      }}
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px'
                      }}
                    >
                      <i className="fi fi-rr-user" style={{ 
                        marginRight: lang === 'ar' ? '0' : '8px',
                        marginLeft: lang === 'ar' ? '8px' : '0'
                      }}></i>
                      {lang === 'ar' ? 'الملف الشخصي' : 'Profile'}
                    </button>
                    <button
                      type="button"
                      className="register-btn w-100"
                      onClick={() => {
                        logout();
                        onHide();
                        window.location.reload();
                      }}
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '12px'
                      }}
                    >
                      <i className="fi fi-rr-sign-out-alt" style={{ 
                        marginRight: lang === 'ar' ? '0' : '8px',
                        marginLeft: lang === 'ar' ? '8px' : '0'
                      }}></i>
                      {lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="login-btn w-100 mb-2"
                      onClick={() => {
                        onHide();
                        document.dispatchEvent(new CustomEvent('openLoginModal'));
                      }}
                      style={{ padding: '12px' }}
                    >
                      {t.login}
                    </button>
                    <button
                      type="button"
                      className="register-btn w-100"
                      onClick={() => {
                        onHide();
                        document.dispatchEvent(new CustomEvent('openRegisterModal'));
                      }}
                      style={{ padding: '12px' }}
                    >
                      {t.register}
                    </button>
                  </>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </Modal>
  );
};


const Social = () => {
  const social = [
    { name: "facebook", url: "https://facebook.com" },
    { name: "twitter", url: "https://twitter.com" },
    { name: "instagram", url: "https://instagram.com" },
    { name: "linkedin", url: "https://linkedin.com" },
    { name: "youtube", url: "https://youtube.com" },
  ];
  
  return (
    <Fragment>
       {social.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={social.name}
                  >
                    <i className={`fi fi-brands-${social.name}`}></i>
                  </a>
                ))}
    </Fragment>
  );
};

const Sidebar = ({ 
  close, 
  open, 
  lang 
}: { 
  close: () => void; 
  open: boolean;
  lang: string;
}) => {
  const { t } = useLang();
  const content: {
    id: number;
    title: string;
    content: string;
    link: string;
    icon: string;
  }[] = [
    {
      id: 1,
      title: "24/7 Support",
      content: "24/7 Support",
      link: "tel:+532 321 33 33",
      icon: "/assets/images/icons/icon-phone-blue.svg",
    },
    {
      id: 2,
      title: "Send Message",
      content: "Send Message",
      link: "mailto:eduna@gmail.com",
      icon: "/assets/images/icons/icon-envelope-blue.svg",
    },
    {
      id: 3,
      title: "Our Location",
      content: "Our Location",
      link: "https://www.google.com/maps/place/32/Jenin,+London",
      icon: "/assets/images/icons/icon-location-blue.svg",
    },
  ];
  
  const [beforeClose, setBeforeClose] = useState<boolean>(false);
  const handleClose = () => {
    setBeforeClose(true);
    setTimeout(() => {
      setBeforeClose(false);
      close();
    }, 300);
  };
  
  return (
    <Fragment>
      <div
        className={`offcanvas offcanvas-end ed-sidebar ${
          beforeClose ? "hiding" : open ? "show" : ""
        }`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="ed-sidebar-header">
          <Link href="/" className="ed-sidebar-logo">
            <Image
              width={140}
              height={34}
              src="/assets/images/logo.svg"
              alt="logo"
            />
          </Link>
          <button
            type="button"
            className="text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleClose}
          >
            <i className="fi fi-rr-cross" />
          </button>
        </div>
        
        <div className="ed-sidebar-body m-0" style={{ 
          textAlign: lang === 'ar' ? 'right' : 'left',
          direction: lang === 'ar' ? 'rtl' : 'ltr'
        }}>
          <div className="ed-sidebar-widget">
            <h3 className="ed-sidebar-widget-title">{lang === 'en' ? 'Contact Us:' : 'اتصل بنا:'}</h3>
            {content.map((item) => (
              <div className="ed-contact__info-item" key={item.id} style={{ 
                flexDirection: lang === 'ar' ? 'row-reverse' : 'row'
              }}>
                <div className="ed-contact__info-icon" style={{ 
                  marginRight: lang === 'ar' ? '0' : '15px',
                  marginLeft: lang === 'ar' ? '15px' : '0'
                }}>
                  <Image
                    width={25}
                    height={25}
                    src={item.icon}
                    alt="icon-phone-blue"
                  />
                </div>
                <div className="ed-contact__info-content">
                  <span>{item.title}</span>
                  <a href={item.link}>{item.content}</a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="ed-sidebar-widget">
            <h3 className="ed-sidebar-widget-title">{lang === 'en' ? 'Follow Us:' : 'تابعنا:'}</h3>
            <ul className="ed-sidebar-social" style={{ 
              justifyContent: lang === 'ar' ? 'flex-end' : 'flex-start'
            }}>
              <Social />
            </ul>
          </div>
          
          <div className="ed-sidebar-widget">
            <h3 className="ed-sidebar-widget-title">{lang === 'en' ? 'Subscribe Now:' : 'اشترك الآن:'}</h3>
            <form action="#" method="post" className="ed-sidebar-subscribe">
              <input
                type="email"
                name="email-address"
                placeholder={lang === 'en' ? "Enter email" : "أدخل البريد الإلكتروني"}
                required
              />
              <button type="submit" className="ed-btn">
                {lang === 'en' ? 'Subscribe' : 'اشتراك'}
                <i className="fi fi-rr-arrow-small-right" />
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {open && (
        <div
          className={`offcanvas-backdrop fade ${beforeClose ? "show" : ""}`}
          onClick={handleClose}
        />
      )}
    </Fragment>
  );
};

const LanguageSwitcher = ({ 
  lang, 
  setLang,
  toggleLang
}: { 
  lang: string; 
  setLang: (lang: string) => void;
  toggleLang: () => void;
}) => {
  return (
    <button
      className="lang-btn"
      onClick={() => {
        toggleLang();
      }}
      style={{
        marginRight: lang === 'ar' ? '0' : '10px',
        marginLeft: lang === 'ar' ? '10px' : '0'
      }}
    >
      {lang === "en" ? "عربي" : "English"}
    </button>
  );
};

const LoginRegisterButton = ({ lang }: { lang: string }) => {
  const { t } = useLang();
  const { isAuthenticated, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  useEffect(() => {
    const handleOpenLogin = () => setShowLoginModal(true);
    const handleOpenRegister = () => setShowRegisterModal(true);
    
    document.addEventListener('openLoginModal', handleOpenLogin);
    document.addEventListener('openRegisterModal', handleOpenRegister);
    
    return () => {
      document.removeEventListener('openLoginModal', handleOpenLogin);
      document.removeEventListener('openRegisterModal', handleOpenRegister);
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center">
        <div className="spinner-border spinner-border-sm text-primary" style={{ 
          marginRight: lang === 'ar' ? '0' : '5px',
          marginLeft: lang === 'ar' ? '5px' : '0'
        }}></div>
        <span style={{ fontSize: '12px' }}>{lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}</span>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <UserProfile  />;
  }

  return (
    <Fragment>
      <button
        type="button"
        className="register-btn"
        onClick={() => setShowRegisterModal(true)}
        style={{
          marginRight: lang === 'ar' ? '0' : '10px',
          marginLeft: lang === 'ar' ? '10px' : '0'
        }}
      >
        {t.register}
      </button>
      <button
        type="button"
        className="login-btn"
        onClick={() => setShowLoginModal(true)}
      >
        {t.login}
      </button>
      
      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        lang={lang}
      />
      <RegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
        lang={lang}
      />
    </Fragment>
  );
};

const LoginModal = ({
  show,
  onHide,
  lang
}: {
  show: boolean;
  onHide: () => void;
  lang: string;
}) => {
  const { t } = useLang();
  const { login, loading } = useAuth();
  const [error, setError] = useState<string>('');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // ⭐⭐ **الجديد: لو بائع - روح مباشرة للـ teacher dashboard** ⭐⭐
    if (userType === 'teacher') {
      toast.info(lang === 'ar' 
        ? 'جاري التوجيه لمنصة المعلمين...' 
        : 'Redirecting to teacher platform...'
      );
      
      onHide();
      
      // انتظر شوية ثم اذهب للـ teacher dashboard
      setTimeout(() => {
        window.location.href = 'https://school.dentin.cloud/teacher/dashboard';
      }, 500);
      
      return; // توقف هنا - مش محتاج تسجيل دخول
    }
    
    // ⭐⭐ **الكود القديم للمشتري فقط** ⭐⭐
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      const success = await login(email, password, userType);
      if (success) {
        onHide();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setError(lang === 'ar' ? 'فشل تسجيل الدخول' : 'Login failed');
      }
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  // ⭐⭐ **جديد: رسالة توضيحية للبائع** ⭐⭐
  const getFormTitle = () => {
    if (userType === 'teacher') {
      return lang === 'ar' 
        ? 'تسجيل الدخول كبائع (معلم)' 
        : 'Login as Seller (Teacher)';
    }
    return lang === 'en' ? 'Sign In Now' : 'تسجيل الدخول';
  };
  
  return (
    <Modal 
      className={`modal fade ed-auth__modal ${lang === 'ar' ? 'rtl' : ''}`} 
      show={show} 
      onHide={onHide}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="ed-auth__modal-content">
        <button type="button" className="ed-auth__modal-close" onClick={onHide}>
          <i className="fi-rr-cross" />
        </button>
        
        <div className="ed-auth__modal-head">
          <Link href="/" className="ed-auth__modal-logo">
            <Image
              width={140}
              height={34}
              src="/logo.png"
              alt="logo"
              style={{marginBottom:"80px"}}
            />
          </Link>
          <h3 className="ed-auth__modal-title">
            {getFormTitle()}
          </h3>
          
          {/* User Type Selection */}
          <div className="user-type-selector mb-3" style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <button
              type="button"
              className={`user-type-btn ${userType === 'student' ? 'active' : ''}`}
              onClick={() => setUserType('student')}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: userType === 'student' ? '2px solid #3b82f6' : '1px solid #ddd',
                background: userType === 'student' ? '#f0f7ff' : '#fff',
                color: userType === 'student' ? '#3b82f6' : '#666',
                fontWeight: userType === 'student' ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {lang === 'en' ? 'Buyer' : 'مشتري'}
            </button>
            <button
              type="button"
              className={`user-type-btn ${userType === 'teacher' ? 'active' : ''}`}
              onClick={() => setUserType('teacher')}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: userType === 'teacher' ? '2px solid #10b981' : '1px solid #ddd',
                background: userType === 'teacher' ? '#d1fae5' : '#fff',
                color: userType === 'teacher' ? '#10b981' : '#666',
                fontWeight: userType === 'teacher' ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {lang === 'en' ? 'Seller' : 'بائع'}
            </button>
          </div>
          
          {/* ⭐⭐ جديد: رسالة للبائع ⭐⭐ */}
          {userType === 'teacher' && (
            <div className="teacher-info-alert mb-3 p-3 rounded" style={{
              background: '#f0f9ff',
              border: '1px solid #bae6fd',
              borderRadius: '8px'
            }}>
              <div className="d-flex align-items-center">
                <i className="fi fi-rr-info me-2" style={{ color: '#0284c7' }}></i>
                <span style={{ fontSize: '14px', color: '#0369a1' }}>
                  {lang === 'ar' 
                    ? 'لتسجيل الدخول كبائع (معلم)، يرجى استخدام منصة المعلمين'
                    : 'To login as a seller (teacher), please use the teacher platform'
                  }
                </span>
              </div>
            </div>
          )}
          
          <p className="ed-auth__modal-text">
            {lang === 'en' ? "Didn't Create an account?" : 'ليس لديك حساب؟'}
            <button
              type="button"
              onClick={() => {
                onHide();
                document.dispatchEvent(new CustomEvent('openRegisterModal'));
              }}
              style={{ 
                marginRight: lang === 'ar' ? '5px' : '0', 
                marginLeft: lang === 'ar' ? '0' : '5px',
                color: '#3b82f6',
                fontWeight: '500'
              }}
            >
              {lang === 'en' ? 'Sign Up' : 'إنشاء حساب'}
            </button>
          </p>
        </div>
        
        {error && (
          <div className={`alert alert-danger m-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <i className="fi fi-rr-exclamation me-2"></i>
            {error}
          </div>
        )}
        
        <div className="ed-auth__modal-body">
          <form onSubmit={handleLogin} className="ed-auth__modal-form">
            {/* ⭐⭐ إخفاء الفورم لو بائع ⭐⭐ */}
            {userType === 'teacher' ? (
              <div className="text-center p-4">
                <i className="fi fi-rr-external-link mb-3" style={{ fontSize: '48px', color: '#10b981' }}></i>
                <h5 className="mb-3">
                  {lang === 'ar' ? 'جاري التوجيه لمنصة المعلمين...' : 'Redirecting to teacher platform...'}
                </h5>
                <p className="text-muted">
                  {lang === 'ar' 
                    ? 'سيتم توجيهك إلى منصة المعلمين لتسجيل الدخول'
                    : 'You will be redirected to the teacher platform for login'
                  }
                </p>
                <div className="mt-4">
                  <button 
                    type="button"
                    className="ed-btn"
                    onClick={() => {
                      onHide();
                      window.location.href = 'https://school.dentin.cloud/';
                    }}
                    style={{
                      background: '#10b981',
                      borderColor: '#10b981'
                    }}
                  >
                    {lang === 'en' ? 'Go to Teacher Dashboard' : 'اذهب إلى لوحة التحكم'}
                    <i className="fi fi-rr-external-link ms-2"></i>
                  </button>
                </div>
              </div>
            ) : (
              // ⭐⭐ فورم المشتري فقط ⭐⭐
              <>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder={lang === 'en' ? "Enter email" : "أدخل البريد الإلكتروني"}
                    required
                    disabled={loading}
                    style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder={lang === 'en' ? "Enter password" : "أدخل كلمة المرور"}
                    required
                    disabled={loading}
                    style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                  />
                </div>
                <div className="form-check" style={{ 
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  direction: lang === 'ar' ? 'rtl' : 'ltr'
                }}>
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultChecked={true}
                      id="flexCheckDefault"
                      disabled={loading}
                      style={{ 
                        marginRight: lang === 'ar' ? '0' : '8px',
                        marginLeft: lang === 'ar' ? '8px' : '0'
                      }}
                    />
                    {lang === 'en' ? 'Remember me' : 'تذكرني'}
                  </label>
                </div>
              </>
            )}
            
            <div className="ed-auth__form-btn">
              <button 
                type="submit" 
                className="ed-btn"
                disabled={loading || userType === 'teacher'}
                style={{
                  background: userType === 'teacher' ? '#10b981' : '#3b82f6',
                  borderColor: userType === 'teacher' ? '#10b981' : '#3b82f6',
                  cursor: userType === 'teacher' ? 'default' : 'pointer'
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {lang === 'en' ? 'Signing In...' : 'جاري تسجيل الدخول...'}
                  </>
                ) : userType === 'teacher' ? (
                  <>
                   
                  </>
                ) : (
                  <>
                    {lang === 'en' ? 'Sign In' : 'تسجيل الدخول'}
                    <i className="fi fi-rr-arrow-small-right" style={{ 
                      marginRight: lang === 'ar' ? '8px' : '0',
                      marginLeft: lang === 'ar' ? '0' : '8px'
                    }} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="ed-auth__modal-footer">
         
        </div>
      </div>
    </Modal>
  );
};

const RegisterModal = ({
  show,
  onHide,
  lang
}: {
  show: boolean;
  onHide: () => void;
  lang: string;
}) => {
  const { t } = useLang();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
 const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.password_confirmation) {
      setError(lang === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError(lang === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      const endpoint = userType === 'student' ? '/student/register' : '/teachers/register';
      const response = await api.post(endpoint, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });
      
      const data = response.data;
      
      if (data.result === 'Success') {
        toast.success(lang === 'ar' ? 'تم التسجيل بنجاح!' : 'Registration successful!');
        
        if (data.message?.token) {
          Cookies.set('token', data.message.token, { 
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
        }
        
        if (data.message?.user || data.message?.student || data.message?.teacher) {
          const userData = data.message?.user || data.message?.student || data.message?.teacher;
          userData.role = userType; // إضافة الدور للمستخدم
          Cookies.set('user', JSON.stringify(userData), {
            expires: 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          });
        }
        
        onHide();
        
        // إذا كان معلم، اذهب إلى صفحة الـ login مباشرة
        if (userType === 'teacher') {
          setTimeout(() => {
            window.location.href = 'https://school.dentin.cloud/teacher/login';
          }, 1500);
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        
      } else {
        throw new Error(data.message?.message || (lang === 'ar' ? 'فشل التسجيل' : 'Registration failed'));
      }
      
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = lang === 'ar' ? 'حدث خطأ أثناء التسجيل' : 'An error occurred during registration';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.message) {
          if (typeof errorData.message === 'object') {
            const firstError = Object.values(errorData.message)[0];
            if (Array.isArray(firstError)) {
              errorMessage = firstError[0];
            } else {
              errorMessage = String(firstError);
            }
          } else {
            errorMessage = errorData.message;
          }
        } else if (errorData.errors) {
          const firstErrorKey = Object.keys(errorData.errors)[0];
          errorMessage = errorData.errors[firstErrorKey][0];
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Modal 
      className={`modal fade ed-auth__modal ${lang === 'ar' ? 'rtl' : ''}`} 
      show={show} 
      onHide={onHide}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="ed-auth__modal-content">
        <button type="button" className="ed-auth__modal-close" onClick={onHide}>
          <i className="fi-rr-cross" />
        </button>
        
        <div className="ed-auth__modal-head">
          <Link href="/" className="ed-auth__modal-logo">
            <Image
              width={140}
              height={34}
              src="/logo.png"
              alt="logo"
              style={{marginBottom:"70px"}}
            />
          </Link>
          <h3 className="ed-auth__modal-title">
            {lang === 'en' ? 'Sign Up Now' : 'إنشاء حساب جديد'}
          </h3>
          
          {/* User Type Selection */}
          <div className="user-type-selector mb-3" style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <button
              type="button"
              className={`user-type-btn ${userType === 'student' ? 'active' : ''}`}
              onClick={() => setUserType('student')}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: userType === 'student' ? '2px solid #3b82f6' : '1px solid #ddd',
                background: userType === 'student' ? '#f0f7ff' : '#fff',
                color: userType === 'student' ? '#3b82f6' : '#666',
                fontWeight: userType === 'student' ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {lang === 'en' ? 'Buyer' : 'مشتري'}
            </button>
            <button
              type="button"
              className={`user-type-btn ${userType === 'teacher' ? 'active' : ''}`}
              onClick={() => setUserType('teacher')}
              style={{
                padding: '8px 20px',
                borderRadius: '20px',
                border: userType === 'teacher' ? '2px solid #3b82f6' : '1px solid #ddd',
                background: userType === 'teacher' ? '#f0f7ff' : '#fff',
                color: userType === 'teacher' ? '#3b82f6' : '#666',
                fontWeight: userType === 'teacher' ? '600' : '400',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {lang === 'en' ? 'Seller' : 'بائع'}
            </button>
          </div>
          
          <p className="ed-auth__modal-text">
            {lang === 'en' ? 'already have an account?' : 'هل لديك حساب بالفعل؟'}
            <button
              type="button"
              onClick={() => {
                onHide();
                document.dispatchEvent(new CustomEvent('openLoginModal'));
              }}
              style={{ 
                marginRight: lang === 'ar' ? '5px' : '0', 
                marginLeft: lang === 'ar' ? '0' : '5px',
                color: '#3b82f6',
                fontWeight: '500'
              }}
            >
              {lang === 'en' ? 'Sign In' : 'تسجيل الدخول'}
            </button>
          </p>
        </div>
        
        {error && (
          <div className={`alert alert-danger m-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <i className="fi fi-rr-exclamation me-2"></i>
            {error}
          </div>
        )}
        
        <div className="ed-auth__modal-body">
          <form onSubmit={handleRegister} className="ed-auth__modal-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder={lang === 'en' ? "Enter name" : "أدخل الاسم"}
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder={lang === 'en' ? "Enter email" : "أدخل البريد الإلكتروني"}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder={lang === 'en' ? "Enter password" : "أدخل كلمة المرور"}
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading}
                style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password_confirmation"
                placeholder={lang === 'en' ? "Confirm password" : "تأكيد كلمة المرور"}
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading}
                style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
              />
            </div>
            <div className="form-check" style={{ 
              textAlign: lang === 'ar' ? 'right' : 'left',
              direction: lang === 'ar' ? 'rtl' : 'ltr'
            }}>
              <label className="form-check-label" htmlFor="terms">
                <input
                  className="form-check-input"
                  type="checkbox"
                  required
                  id="terms"
                  disabled={loading}
                  style={{ 
                    marginRight: lang === 'ar' ? '0' : '8px',
                    marginLeft: lang === 'ar' ? '8px' : '0'
                  }}
                />
                {lang === 'en' 
                  ? <>I agree with your <strong>Privacy Policy</strong></>
                  : <>أوافق على <strong>سياسة الخصوصية</strong></>
                }
              </label>
            </div>
            <div className="ed-auth__form-btn">
              <button 
                type="submit" 
                className="ed-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    {lang === 'en' ? 'Registering...' : 'جاري التسجيل...'}
                  </>
                ) : (
                  <>
                    {lang === 'en' ? 'Register Now' : 'إنشاء الحساب'}
                    <i className="fi fi-rr-arrow-small-right" style={{ 
                      marginRight: lang === 'ar' ? '8px' : '0',
                      marginLeft: lang === 'ar' ? '0' : '8px'
                    }} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="ed-auth__modal-footer">
        
        </div>
      </div>
    </Modal>
  );
};