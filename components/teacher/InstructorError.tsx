// components/teacher/InstructorError.tsx
interface InstructorErrorProps {
  error: string | null;
  notFoundText: string;
}

const InstructorError = ({ error, notFoundText }: InstructorErrorProps) => {
  return (
    <section className="section-gap">
      <div className="container">
        <div className="alert alert-danger text-center">
          {error || notFoundText}
        </div>
      </div>
    </section>
  );
};

export default InstructorError;