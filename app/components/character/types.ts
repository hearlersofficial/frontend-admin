

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