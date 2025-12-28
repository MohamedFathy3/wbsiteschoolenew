// types/job-library.ts
export interface JobLibrary {
  id: number;
  title: string;
  description: string;
  type: 'job' | 'other'; // يمكنك إضافة أنواع أخرى
  file_path: string | null;
  file_url: string | null;
  thumbnail_path: string | null;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginatedJobResponse {
  data: JobLibrary[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}