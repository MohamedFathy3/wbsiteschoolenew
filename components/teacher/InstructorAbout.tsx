// components/teacher/InstructorAbout.tsx
interface InstructorAboutProps {
  teacher: {
    name: string;
    teacher_type: string;
    courses_count: number;
    students_count: number;
    total_rate: number;
  };
  getText: (key: string) => string;
}

const InstructorAbout = ({ teacher, getText }: InstructorAboutProps) => {
  return (
    <div className="about-section">
      <h5 className="about-title">
        👤 {getText('aboutMe')}
      </h5>
      <p className="about-paragraph">
        {teacher.name} is an experienced {teacher.teacher_type} with expertise in multiple fields. 
        With a strong background in education and {teacher.courses_count} published courses, 
        they have successfully taught {teacher.students_count} students.
      </p>
      <p className="about-paragraph">
        Their teaching philosophy focuses on practical, hands-on learning experiences 
        and personalized attention to each student. With a {teacher.total_rate.toFixed(1)}/5 rating, 
        they are recognized for their dedication and effective teaching methods.
      </p>

      <style jsx>{`
        .about-section {
          background: #f8fafc;
          padding: 30px;
          border-radius: 12px;
          margin-top: 30px;
        }
        
        .about-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .about-paragraph {
          font-size: 16px;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 15px;
        }
        
        .about-paragraph:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default InstructorAbout;