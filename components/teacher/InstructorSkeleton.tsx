// components/teacher/InstructorSkeleton.tsx
interface InstructorSkeletonProps {
  lang: 'en' | 'ar';
  text: string;
}

const InstructorSkeleton = ({ lang, text }: InstructorSkeletonProps) => {
  return (
    <div className="section-gap">
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{text}</span>
        </div>
        <p className="mt-3">{text}</p>
      </div>
    </div>
  );
};

export default InstructorSkeleton;