// types/course.ts
export interface Country {
  id: number;
  name: string;
  key: string;
  code: string;
  active: boolean;
  image: string;
  orderId: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  deleted: boolean;
}

export interface Stage {
  id: number;
  name: string;
  postion: number;
  active: boolean;
  image: string | null;
  country: Country;
}

export interface Subject {
  id: number;
  name: string;
  postion: number | null;
  active: boolean;
  image: string;
  stage: Stage;
}

export interface Curricula {
  id: number;
  name: string;
  active: boolean;
  image: string;
}

export interface TeacherCourse {
  course_name: string;
  students_count: number;
  course_income: number;
  teacher_share: number;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  secound_email: string | null;
  active: boolean;
  type: string;
  teacher_type: string;
  total_rate: number;
  phone: string;
  national_id: string;
  image: string;
  certificate_image: string | null;
  experience_image: string | null;
  id_card_front: string | null;
  id_card_back: string | null;
  country: Country;
  account_holder_name: string;
  account_number: string;
  iban: string;
  swift_code: string;
  branch_name: string;
  postal_transfer_full_name: string | null;
  postal_transfer_office_address: string | null;
  postal_transfer_recipient_name: string | null;
  postal_transfer_recipient_phone: string | null;
  wallets_name: string | null;
  wallets_number: string | null;
  commission: string;
  courses_count: number;
  students_count: number;
  total_income: number;
  all_total_income: number;
  courses: TeacherCourse[];
  rewards: string;
  all_net_income: number;
  average_rating: number;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  type: string;
  original_price: string;
  discount: string;
  price: string;
  what_you_will_learn: string;
  semester: string;
  image: string;
  file_path: string;
  currency: string;
  subscribers_count: number;
  active: boolean;
  teacher: Teacher;
  curricula: Curricula;
  stage: Stage;
  subject: Subject;
  country: Country;
  average_rating: number;
  created_at: string;
  details?: CourseDetail[];
  students_count: number;
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  content_type: string;
  content_link: string;
  session_date: string | null;
  session_time: string | null;
  file_path: string;
  created_at: string;
  watching_data: any;
  students: any[];
}
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  status: number;
  message?: string;
}
export interface PaginationMeta {
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
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ApiResponse<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
  result: string;
  message: string;
  status: number;
}

export interface Filters {
  teacher_id?: number;
  stage_id?: number;
  subject_id?: number;
  country_id?: number;
  curricula_id?: number;
  type?: string;
  search?: string;
  price_min?: number;
  price_max?: number;
  rating_min?: number;
  active?: boolean;
}

export interface FetchCoursesParams {
  filters?: Filters;
  orderBy?: string;
  orderByDirection?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
  paginate?: boolean;
}


export interface FullProfile {
  message: string;
  student: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    image: string | null;
    qr_code: string;
    stage: string;
    country: string;
    average_rating: number;
    courses: Course[];
    comments: any[];
  };
}