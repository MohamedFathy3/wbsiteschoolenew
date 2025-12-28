"use client";

interface CourseFilterProps {
  lang: string;
  filters: {
    semester: string;
    subject_id: string;
    curriculum_id: string;
  };
  subjects: any[];
  curriculums: any[];
  semesterOptions: { value: string; label: string }[];
  onFilterChange: (name: string, value: string) => void;
  onClearFilters: () => void;
}

const CourseFilter = ({ 
  lang, 
  filters, 
  subjects, 
  curriculums,
  semesterOptions,
  onFilterChange,
  onClearFilters 
}: CourseFilterProps) => {
  const isAr = lang === 'ar';
  
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
      padding: '25px',
      height: 'fit-content',
      width: '100%'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <i className="fi fi-rr-filter" style={{ color: 'white', fontSize: '18px' }}></i>
        </div>
        <h5 style={{ 
          margin: 0,
          fontWeight: '700',
          color: '#333',
          fontSize: '1.1rem'
        }}>
          {isAr ? 'تصفية النتائج' : 'Filter Results'}
        </h5>
      </div>
      
      {/* Curriculum Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          fontWeight: '600',
          marginBottom: '8px',
          color: '#555',
          display: 'block',
          fontSize: '0.9rem'
        }}>
          <i className="fi fi-rr-book-alt" style={{ marginRight: '8px', color: '#3b82f6' }}></i>
          {isAr ? 'المنهج الدراسي' : 'Curriculum'}
        </label>
        <select
          value={filters.curriculum_id}
          onChange={(e) => onFilterChange('curriculum_id', e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            borderRadius: '10px',
            border: '2px solid #e0e0e0',
            backgroundColor: '#fafafa',
            fontSize: '0.9rem',
            color: '#333',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: isAr ? 'left 0.75rem center' : 'right 0.75rem center',
            backgroundSize: '16px 12px',
            paddingRight: isAr ? '15px' : '40px',
            paddingLeft: isAr ? '40px' : '15px'
          }}
        >
          <option value="">{isAr ? 'جميع المناهج' : 'All Curriculums'}</option>
          {curriculums.map(curriculum => (
            <option key={curriculum.id} value={curriculum.id}>
              {isAr ? curriculum.name_ar || curriculum.name : curriculum.name_en || curriculum.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Semester Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          fontWeight: '600',
          marginBottom: '8px',
          color: '#555',
          display: 'block',
          fontSize: '0.9rem'
        }}>
          <i className="fi fi-rr-calendar" style={{ marginRight: '8px', color: '#3b82f6' }}></i>
          {isAr ? 'الفصل الدراسي' : 'Semester'}
        </label>
        <select
          value={filters.semester}
          onChange={(e) => onFilterChange('semester', e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            borderRadius: '10px',
            border: '2px solid #e0e0e0',
            backgroundColor: '#fafafa',
            fontSize: '0.9rem',
            color: '#333',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: isAr ? 'left 0.75rem center' : 'right 0.75rem center',
            backgroundSize: '16px 12px',
            paddingRight: isAr ? '15px' : '40px',
            paddingLeft: isAr ? '40px' : '15px'
          }}
        >
          <option value="">{isAr ? 'جميع الفصول' : 'All Semesters'}</option>
          {semesterOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Subject Filter */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{
          fontWeight: '600',
          marginBottom: '8px',
          color: '#555',
          display: 'block',
          fontSize: '0.9rem'
        }}>
          <i className="fi fi-rr-book" style={{ marginRight: '8px', color: '#3b82f6' }}></i>
          {isAr ? 'المادة الدراسية' : 'Subject'}
        </label>
        <select
          value={filters.subject_id}
          onChange={(e) => onFilterChange('subject_id', e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            borderRadius: '10px',
            border: '2px solid #e0e0e0',
            backgroundColor: '#fafafa',
            fontSize: '0.9rem',
            color: '#333',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: isAr ? 'left 0.75rem center' : 'right 0.75rem center',
            backgroundSize: '16px 12px',
            paddingRight: isAr ? '15px' : '40px',
            paddingLeft: isAr ? '40px' : '15px'
          }}
        >
          <option value="">{isAr ? 'جميع المواد' : 'All Subjects'}</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {isAr ? subject.name_ar || subject.name : subject.name_en || subject.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        style={{
          backgroundColor: 'transparent',
          color: '#666',
          border: '2px solid #e0e0e0',
          padding: '12px 20px',
          borderRadius: '10px',
          fontWeight: '600',
          fontSize: '0.9rem',
          cursor: 'pointer',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f8f9fa';
          e.currentTarget.style.color = '#3b82f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#666';
        }}
      >
        <i className="fi fi-rr-eraser"></i>
        {isAr ? 'مسح الفلاتر' : 'Clear Filters'}
      </button>
    </div>
  );
};

export default CourseFilter;