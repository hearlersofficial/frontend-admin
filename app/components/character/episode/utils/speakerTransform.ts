// Speaker 변환 관련 유틸리티

import type { Counselor } from '~/__generated__/data-contracts';

// API speaker enum type
export type APISpeaker = 'SPEAKER_COUNSELOR' | 'SPEAKER_USER' | 'SPEAKER_UNSPECIFIED';

// API 스펙 상수 (변경되지 않는 값들만)
const API_SPEAKER = {
  COUNSELOR: 'SPEAKER_COUNSELOR',
  USER: 'SPEAKER_USER', 
  UNSPECIFIED: 'SPEAKER_UNSPECIFIED',
} as const;

// 관리자 도구에서 사용할 고정 유저 이름
const ADMIN_USER_NAME = '유저';

// Speaker 매핑: API → UI
export const apiSpeakerToUI = (
  apiSpeaker: string,
  counselor?: Counselor | null,
  fallbackCounselorName = 'counselor'
): string => {
  switch (apiSpeaker) {
    case API_SPEAKER.COUNSELOR:
      return counselor?.name || fallbackCounselorName;
    case API_SPEAKER.USER:
      return ADMIN_USER_NAME;
    default:
      return apiSpeaker || '';
  }
};

// Speaker 매핑: UI → API
export const uiSpeakerToAPI = (
  uiSpeaker: string,
  counselor?: Counselor | null,
  fallbackCounselorName = 'counselor'
): APISpeaker => {
  const counselorName = counselor?.name || fallbackCounselorName;
  
  if (uiSpeaker === counselorName) {
    return API_SPEAKER.COUNSELOR as APISpeaker;
  }
  if (uiSpeaker === ADMIN_USER_NAME) {
    return API_SPEAKER.USER as APISpeaker;
  }
  return API_SPEAKER.UNSPECIFIED as APISpeaker;
};

// Scene 데이터 변환: API cutScene → UI scene
export const transformCutSceneToScene = (
  cutScene: { speaker?: string; content?: string },
  counselor?: Counselor | null,
  fallbackCounselorName?: string
) => ({
  id: `scene_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  speaker: apiSpeakerToUI(cutScene.speaker || '', counselor, fallbackCounselorName),
  dialogue: cutScene.content || '',
});

// Scene 데이터 변환: UI scene → API cutScene
export const transformSceneToCutScene = (
  scene: { id: string; speaker: string; dialogue: string; image?: string },
  index: number,
  counselor?: Counselor | null,
  fallbackCounselorName?: string
) => ({
  speaker: uiSpeakerToAPI(scene.speaker, counselor, fallbackCounselorName),
  content: scene.dialogue,
  orderIndex: index + 1, // 서버는 1부터 시작
  image: scene.image || '', // 실제 이미지 URL 사용
}); 