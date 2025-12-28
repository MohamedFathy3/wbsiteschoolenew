// hooks/useJobLibraries.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { JobLibrary, PaginatedJobResponse } from '@/types/job-library';

// مفاتيح الاستعلامات للتخزين المؤقت
export const jobLibraryKeys = {
  all: ['job-libraries'] as const,
  lists: () => [...jobLibraryKeys.all, 'list'] as const,
  list: (filters: any) => [...jobLibraryKeys.lists(), filters] as const,
  details: () => [...jobLibraryKeys.all, 'detail'] as const,
  detail: (id: number) => [...jobLibraryKeys.details(), id] as const,
};

export const fetchJobLibraries = async (params: any = {}): Promise<PaginatedJobResponse> => {
  const response = await api.post('job-libraries', {
    params: {
      page: params.page || 1,
      perPage: params.perPage || 12,
      ...params.filters,
    }
  });
  
  return response.data;
};

// Hook لجلب مكتبة الوظائف
export const useJobLibraries = (params: any = {}, enabled: boolean = true) => {
  return useQuery({
    queryKey: jobLibraryKeys.list(params),
    queryFn: () => fetchJobLibraries(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 دقائق قبل اعتبار البيانات قديمة
    gcTime: 10 * 60 * 1000, // 10 دقائق في الكاش
  });
};

// Hook لتحديث الـ cache يدويًا
export const useRefreshJobLibraries = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (params: any) => {
      return fetchJobLibraries(params);
    },
    onSuccess: (data, params) => {
      queryClient.setQueryData(jobLibraryKeys.list(params), data);
    },
  });
};

// دالة لإلغاء صلاحية الكاش
export const invalidateJobLibrariesCache = (queryClient: any) => {
  queryClient.invalidateQueries({ queryKey: jobLibraryKeys.all });
};