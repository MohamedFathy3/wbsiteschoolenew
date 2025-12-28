export interface Country {
  id: number;
  name: string;
  image: string;
}

export interface Curriculum {
  id: number;
  name: string;
  image: string;
  active: boolean;
}

export interface Stage {
  id: number;
  name: string;
  postion: number;
  active: boolean;
  image: string | null;
  country: Country;
  curriculum: Curriculum;
}

export interface ApiResponse {
  data: Stage[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}