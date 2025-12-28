"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { curriculumService, Curriculum } from '@/lib/api/curriculumService';

interface CurriculumContextType {
  curriculums: Curriculum[];
  loading: boolean;
  error: string | null;
  refetchCurriculums: () => Promise<void>;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

export const useCurriculum = () => {
  const context = useContext(CurriculumContext);
  if (!context) {
    throw new Error('useCurriculum must be used within a CurriculumProvider');
  }
  return context;
};

interface CurriculumProviderProps {
  children: ReactNode;
}

export const CurriculumProvider = ({ children }: CurriculumProviderProps) => {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurriculums = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await curriculumService.getAllCurriculums();
      setCurriculums(response.data);
    } catch (err) {
      setError('فشل في تحميل المناهج');
      console.error('Error fetching curriculums:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculums();
  }, []);

  return (
    <CurriculumContext.Provider
      value={{
        curriculums,
        loading,
        error,
        refetchCurriculums: fetchCurriculums,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};