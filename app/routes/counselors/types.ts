export interface Counselor {
  id: number;
  tone_id: string;
  name: string;
  description: string;
  gender: string;
  intro_message: string;
  response_option: string;
  response_option2: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CutScene {
  id: number;
  title: string;
  description: string;
  image: string;
}
