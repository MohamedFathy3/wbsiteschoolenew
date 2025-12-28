import api from './index';

export interface Curriculum {
  id: number;
  name: string;
  active: boolean;
  image: string;
}

export interface PaginatedResponse {
  data: Curriculum[];
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
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  result: string;
  message: string;
  status: number;
}

export const curriculumService = {
  // جلب كل المناهج
  async getAllCurriculums(): Promise<PaginatedResponse> {
    const response = await api.post('/curriculum/index');
    return response.data;
  },

  // جلب منهج معين
  async getCurriculumById(id: number): Promise<{ data: Curriculum }> {
    const response = await api.get(`/curriculum/show/${id}`);
    return response.data;
  },

};