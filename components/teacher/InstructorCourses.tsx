// components/teacher/InstructorCourses.tsx
import { Course } from "@/types/course";
import { TeacherDetails } from "@/types/teacher";

interface InstructorCoursesProps {
  courses: Course[];
  getText: (key: string) => string;
}

const InstructorCourses = ({ courses, getText }: InstructorCoursesProps) => {
  if (courses.length === 0) return null;

  return (
    <div className="courses-section">
      <div className="courses-header">
        <h5 className="courses-title">
          📚 {getText('courses')} ({courses.length})
        </h5>
      </div>
      
      <div className="courses-grid">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <div className="course-header">
              <h6 className="course-name">
                {course.title}
              </h6>
              <span className="course-students-badge">
                👨‍🎓 {course.students_count}
              </span>
            </div>
            <div className="course-stats">
              {getText('studentsCount')}: {course.students_count}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .courses-section {
          background: white;
          padding: 30px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-top: 30px;
        }
        
        .courses-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
        }
        
        .courses-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 15px;
        }
        
        .course-card {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s;
          cursor: pointer;
        }
        
        .course-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-color: #3b82f6;
        }
        
        .course-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        
        .course-name {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
          flex: 1;
        }
        
        .course-students-badge {
          background: #dbeafe;
          color: #1d4ed8;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          margin-left: 10px;
          flex-shrink: 0;
        }
        
        .course-stats {
          font-size: 13px;
          color: #64748b;
        }
        
        @media (max-width: 768px) {
          .courses-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default InstructorCourses;