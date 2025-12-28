'use client';
import CurriculumCard from "./CurriculumCard";

interface CurriculumGridProps {
  curriculums: Array<{
    id: number;
    name: string;
    active: boolean;
    image: string;
  }>;
  lang: 'en' | 'ar';
}

const CurriculumGrid = ({ curriculums, lang }: CurriculumGridProps) => {
  if (curriculums.length === 0) {
    return null;
  }

  return (
    <div className="row">
      {curriculums.map((curriculum) => (
        <div key={curriculum.id} className="col-lg-4 col-md-6 col-12 mb-30">
          <CurriculumCard curriculum={curriculum} lang={lang} />
        </div>
      ))}
    </div>
  );
};

export default CurriculumGrid;