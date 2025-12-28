export interface Curriculum {
  id: number;
  name: string;
  active: boolean;
  image: string;
}

export interface CurriculumApiResponse {
  data: Curriculum[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}