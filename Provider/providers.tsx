'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 دقيقة قبل اعتبار البيانات قديمة
        gcTime: 5 * 60 * 1000, // 5 دقائق في الكاش
        retry: 1,
        refetchOnWindowFocus: false, // لا يعيد جلب البيانات عند التركيز على النافذة
        refetchOnMount: false, // لا يعيد جلب البيانات عند تركيب الكومبوننت
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}