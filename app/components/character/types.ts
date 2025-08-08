import { Counselor as GeneratedCounselor } from '~/__generated__/data-contracts';

export type Counselor = GeneratedCounselor;

export interface Tab {
  id: string;
  name: string;
}

export type TabId = 'cutscene' | 'opening';

export interface Episode {
  id: string;
  title: string;
  level: number;
  createdAt: string;
  status: string;
  imageUrl: string;
} 