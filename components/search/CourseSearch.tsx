"use client";

interface CourseSearchProps {
  lang: string;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
}

const CourseSearch = ({ lang, searchTerm, onSearchChange, onSearchSubmit }: CourseSearchProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className="search-widget mb-4">
      <form onSubmit={handleSubmit} className="position-relative">
        <input
          type="search"
          className="form-control form-control-lg"
          placeholder={lang === 'ar' ? 'ابحث عن الكورسات...' : 'Search for courses...'}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ 
            paddingRight: lang === 'ar' ? '50px' : '20px',
            paddingLeft: lang === 'ar' ? '20px' : '50px',
            borderRadius: '30px',
            height: '60px'
          }}
        />
        <button
          type="submit"
          className="btn btn-primary position-absolute"
          style={{
            [lang === 'ar' ? 'left' : 'right']: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <i className="fi fi-rr-search" />
        </button>
      </form>
    </div>
  );
};

export default CourseSearch;