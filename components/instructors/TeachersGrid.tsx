'use client';
import TeacherCard from "./TeacherCard";
import { Teacher } from "@/types/teacher";

interface TeachersGridProps {
  teachers: Teacher[];
}

const TeachersGrid = ({ teachers }: TeachersGridProps) => {
  return (
    <div className="row">
      {teachers.map((teacher) => (
        <div className="col-lg-4 col-md-6 col-12 mb-4" key={teacher.id}>
          <TeacherCard teacher={teacher} />
        </div>
      ))}
    </div>
  );
};

export default TeachersGrid;