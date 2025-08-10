import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AIModel } from '~/types/aiModel';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertAiModelToLabel = (aiModel: AIModel | 'UNRECOGNIZED' | undefined): string => {
  switch (aiModel) {
    case 'GPT_3_5_TURBO':
      return 'GPT-3.5 Turbo';
    case 'GPT_4':
      return 'GPT-4';
    case 'GPT_4O':
      return 'GPT-4o';
    case 'GPT_4O_MINI':
      return 'GPT-4o mini';
    case 'GPT_5_MINI':
      return 'GPT-5 mini';
    case 'GPT_5':
      return 'GPT-5';
    case 'GPT_5_CHAT':
      return 'GPT-5 Chat';
    case 'AI_MODEL_UNSPECIFIED':
      return 'GPT-4o-mini';
    case 'UNRECOGNIZED':
      return 'GPT-4o-mini';
    default:
      return 'GPT-4o-mini';
  }
};
