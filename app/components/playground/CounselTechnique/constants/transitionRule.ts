import {
  EMOTION_PRIMARY_VALUES,
  VALENCE_VALUES,
  AROUSAL_LEVEL_VALUES,
  IMPACT_DOMAIN_VALUES,
  TIMEFRAME_VALUES,
  PERCEIVED_CONTROL_VALUES,
  MOTIVATION_STAGE_VALUES,
} from '~/components/playground/CounselTechnique/types/transitionRule';

// 필드 타입 정의 (백엔드 스키마와 일치)
export type FieldType = 'boolean' | 'enumList' | 'integer';

// 필드 정의 인터페이스
export interface TransitionRuleField {
  key: string;
  label: string;
  type: FieldType;
  description: string;
  placeholder?: string;
  options?: readonly string[];
  min?: number;
  max?: number;
  section: string;
  order: number;
}

// 한국어 매핑 (백엔드 스키마와 일치)
export const KOREAN_LABELS: Record<string, string> = {
  // 감정 관련
  EMOTION_PRIMARY_UNSPECIFIED: '미지정 또는 불분명한 감정',
  EMOTION_PRIMARY_ANXIETY: '불안, 걱정, 지각된 위협',
  EMOTION_PRIMARY_SADNESS: '낮은 기분, 상실감, 슬픔',
  EMOTION_PRIMARY_ANGER: '짜증, 좌절, 경계 우려',
  EMOTION_PRIMARY_LONELINESS: '고립감 또는 단절감',
  EMOTION_PRIMARY_GUILT: '자기 비난 또는 후회',
  EMOTION_PRIMARY_SHAME: '부적절함이나 가치없음에 대한 깊은 감각',
  EMOTION_PRIMARY_STRESS: '압도감 또는 압박감',
  EMOTION_PRIMARY_HOPE: '낙관주의 또는 긍정적 기대',
  EMOTION_PRIMARY_CALM: '평화롭거나 편안한 상태',
  EMOTION_PRIMARY_OTHER: '목록에 없는 다른 감정',

  // 긍부정
  VALENCE_UNSPECIFIED: '미지정 또는 불분명한 긍부정',
  VALENCE_NEGATIVE: '일반적으로 불쾌하거나 원하지 않는',
  VALENCE_NEUTRAL: '명확하게 쾌적하지도 불쾌하지도 않은',
  VALENCE_POSITIVE: '일반적으로 쾌적하거나 원하는',

  // 각성 수준
  AROUSAL_LEVEL_UNSPECIFIED: '미지정 또는 불분명한 각성',
  AROUSAL_LEVEL_LOW: '차분하거나 억제된 활성화',
  AROUSAL_LEVEL_MEDIUM: '보통의 활성화',
  AROUSAL_LEVEL_HIGH: '높아진 활성화',

  // 삶의 영역
  IMPACT_DOMAIN_UNSPECIFIED: '미지정 또는 불분명한 영역',
  IMPACT_DOMAIN_WORK: '직장 또는 학업 기능',
  IMPACT_DOMAIN_STUDY: '학업 또는 학업 성과',
  IMPACT_DOMAIN_RELATIONSHIP: '가족, 친구, 로맨틱 관계',
  IMPACT_DOMAIN_FAMILY: '가족 관계',
  IMPACT_DOMAIN_HEALTH: '신체적 또는 정신적 건강 문제',
  IMPACT_DOMAIN_FINANCE: '재정적 스트레스',
  IMPACT_DOMAIN_SELF: '자기 개념, 정체성, 개인적 성장',
  IMPACT_DOMAIN_OTHER: '기타 영역',

  // 시간 프레임
  TIMEFRAME_UNSPECIFIED: '미지정 또는 불분명한 시간',
  TIMEFRAME_TODAY: '매우 최근 또는 갑작스러운 발병',
  TIMEFRAME_THIS_WEEK: '지난 주 이내',
  TIMEFRAME_THIS_MONTH: '지난 달 이내',
  TIMEFRAME_THIS_YEAR: '올해 이내',
  TIMEFRAME_LONGER: '1년 이상 전',

  // 통제감
  PERCEIVED_CONTROL_UNSPECIFIED: '미지정된 통제감',
  PERCEIVED_CONTROL_LOW: '통제감이 거의 없다고 느낌',
  PERCEIVED_CONTROL_MEDIUM: '어느 정도 통제감',
  PERCEIVED_CONTROL_HIGH: '강한 통제감',

  // 동기 단계
  MOTIVATION_STAGE_UNSPECIFIED: '미지정된 단계',
  MOTIVATION_STAGE_PRECONTEMPLATION: '변화할 준비가 안됨',
  MOTIVATION_STAGE_CONTEMPLATION: '양가적, 고려 중',
  MOTIVATION_STAGE_PREPARATION: '변화 계획 중',
  MOTIVATION_STAGE_ACTION: '적극적으로 변화 중',
  MOTIVATION_STAGE_MAINTENANCE: '변화 유지 중',

  // 사회적 지원 수준
  SOCIAL_SUPPORT_LEVEL_UNSPECIFIED: '미지정된 지원 수준',
  SOCIAL_SUPPORT_LEVEL_NONE: '지각된 지원 없음',
  SOCIAL_SUPPORT_LEVEL_LOW: '제한된 지각된 지원',
  SOCIAL_SUPPORT_LEVEL_MEDIUM: '일관된 어느 정도의 지원',
  SOCIAL_SUPPORT_LEVEL_HIGH: '강하고 신뢰할 수 있는 네트워크',

  // 위험 유형
  RISK_KIND_UNSPECIFIED: '미지정된 위험 유형',
  RISK_KIND_NONE: '주목할 만한 위험 지표 없음',
  RISK_KIND_SELF_HARM: '자해 사고/행동',
  RISK_KIND_HARM_TO_OTHERS: '타인에 대한 위험',
  RISK_KIND_ABUSE: '학대/폭력 위험 존재',

  // 수면 품질
  SLEEP_QUALITY_UNSPECIFIED: '미지정된 수면 품질',
  SLEEP_QUALITY_POOR: '빈번한 방해와 낮은 휴식감',
  SLEEP_QUALITY_FAIR: '일부 문제가 있지만 관리 가능',
  SLEEP_QUALITY_GOOD: '일반적으로 회복적인 수면',

  // 인지 부하
  COGNITIVE_LOAD_UNSPECIFIED: '미지정된 인지 부하',
  COGNITIVE_LOAD_LOW: '적은 동시 요구',
  COGNITIVE_LOAD_MEDIUM: '관리 가능한 요구',
  COGNITIVE_LOAD_HIGH: '많은 경쟁 요구',

  // 치료 동맹 강도
  ALLIANCE_STRENGTH_UNSPECIFIED: '미지정된 동맹 강도',
  ALLIANCE_STRENGTH_WEAK: '제한된 신뢰/라포',
  ALLIANCE_STRENGTH_MEDIUM: '작업 동맹이 수용 가능',
  ALLIANCE_STRENGTH_STRONG: '높은 신뢰와 협력',
};

// 전환 규칙 필드 정의
export const TRANSITION_RULE_FIELDS: TransitionRuleField[] = [
  {
    key: 'priority',
    label: '우선순위',
    type: 'integer',
    description: '전환 규칙의 우선순위 (1-100)',
    placeholder: '1',
    min: 1,
    max: 100,
    section: 'basic',
    order: 1,
  },
  {
    key: 'minCurrentTechniqueMessageCount',
    label: '최소 현재 기법 메시지 수',
    type: 'integer',
    description: '현재 기법에서 최소 메시지 수 (0-100)',
    placeholder: '0',
    min: 0,
    max: 100,
    section: 'messageCount',
    order: 1,
  },
  {
    key: 'maxCurrentTechniqueMessageCount',
    label: '최대 현재 기법 메시지 수',
    type: 'integer',
    description: '현재 기법에서 최대 메시지 수 (0-100)',
    placeholder: '10',
    min: 0,
    max: 100,
    section: 'messageCount',
    order: 2,
  },
  {
    key: 'minEmotionIntensity',
    label: '최소 감정 강도',
    type: 'integer',
    description: '최소 감정 강도 (1-10)',
    placeholder: '1',
    min: 1,
    max: 10,
    section: 'emotion',
    order: 1,
  },
  {
    key: 'maxEmotionIntensity',
    label: '최대 감정 강도',
    type: 'integer',
    description: '최대 감정 강도 (1-10)',
    placeholder: '10',
    min: 1,
    max: 10,
    section: 'emotion',
    order: 2,
  },
  {
    key: 'requiredEmotionPrimaries',
    label: '필수 주요 감정',
    type: 'enumList',
    description: '전환에 필요한 주요 감정들을 선택하세요',
    options: EMOTION_PRIMARY_VALUES,
    section: 'emotion',
    order: 3,
  },
  {
    key: 'requiredValences',
    label: '필수 감정 긍부정',
    type: 'enumList',
    description: '전환에 필요한 감정의 긍부정을 선택하세요',
    options: VALENCE_VALUES,
    section: 'emotion',
    order: 4,
  },
  {
    key: 'requiredArousalLevels',
    label: '필수 각성 수준',
    type: 'enumList',
    description: '전환에 필요한 각성 수준을 선택하세요',
    options: AROUSAL_LEVEL_VALUES,
    section: 'emotion',
    order: 5,
  },
  {
    key: 'requiredImpactDomains',
    label: '필수 삶의 영역',
    type: 'enumList',
    description: '전환에 영향을 받는 삶의 영역을 선택하세요',
    options: IMPACT_DOMAIN_VALUES,
    section: 'impactTimeframe',
    order: 1,
  },
  {
    key: 'requiredTimeframes',
    label: '필수 시간 프레임',
    type: 'enumList',
    description: '전환에 관련된 시간 프레임을 선택하세요',
    options: TIMEFRAME_VALUES,
    section: 'impactTimeframe',
    order: 2,
  },
  {
    key: 'requiredPerceivedControls',
    label: '필수 통제감',
    type: 'enumList',
    description: '전환에 필요한 통제감 수준을 선택하세요',
    options: PERCEIVED_CONTROL_VALUES,
    section: 'alliance',
    order: 4,
  },
  {
    key: 'requiredMotivationStages',
    label: '필수 동기 단계',
    type: 'enumList',
    description: '전환에 필요한 동기 단계를 선택하세요',
    options: MOTIVATION_STAGE_VALUES,
    section: 'impactTimeframe',
    order: 3,
  },
  // 백엔드 스키마에서 추가된 필드들
  {
    key: 'requiredSocialSupportLevels',
    label: '필수 사회적 지원 수준',
    type: 'enumList',
    description: '전환에 필요한 사회적 지원 수준을 선택하세요',
    options: [
      'SOCIAL_SUPPORT_LEVEL_UNSPECIFIED',
      'SOCIAL_SUPPORT_LEVEL_NONE',
      'SOCIAL_SUPPORT_LEVEL_LOW',
      'SOCIAL_SUPPORT_LEVEL_MEDIUM',
      'SOCIAL_SUPPORT_LEVEL_HIGH',
    ],
    section: 'supportSleepCognitive',
    order: 1,
  },
  {
    key: 'requiredRiskKinds',
    label: '필수 위험 유형',
    type: 'enumList',
    description: '전환에 필요한 위험 유형을 선택하세요',
    options: [
      'RISK_KIND_UNSPECIFIED',
      'RISK_KIND_NONE',
      'RISK_KIND_SELF_HARM',
      'RISK_KIND_HARM_TO_OTHERS',
      'RISK_KIND_ABUSE',
    ],
    section: 'supportSleepCognitive',
    order: 2,
  },
  {
    key: 'requiredSleepQualities',
    label: '필수 수면 품질',
    type: 'enumList',
    description: '전환에 필요한 수면 품질을 선택하세요',
    options: ['SLEEP_QUALITY_UNSPECIFIED', 'SLEEP_QUALITY_POOR', 'SLEEP_QUALITY_FAIR', 'SLEEP_QUALITY_GOOD'],
    section: 'supportSleepCognitive',
    order: 3,
  },
  {
    key: 'requiredCognitiveLoads',
    label: '필수 인지 부하',
    type: 'enumList',
    description: '전환에 필요한 인지 부하 수준을 선택하세요',
    options: ['COGNITIVE_LOAD_UNSPECIFIED', 'COGNITIVE_LOAD_LOW', 'COGNITIVE_LOAD_MEDIUM', 'COGNITIVE_LOAD_HIGH'],
    section: 'supportSleepCognitive',
    order: 4,
  },
  {
    key: 'requiredAllianceStrengths',
    label: '필수 치료 동맹 강도',
    type: 'enumList',
    description: '전환에 필요한 치료 동맹 강도를 선택하세요',
    options: [
      'ALLIANCE_STRENGTH_UNSPECIFIED',
      'ALLIANCE_STRENGTH_WEAK',
      'ALLIANCE_STRENGTH_MEDIUM',
      'ALLIANCE_STRENGTH_STRONG',
    ],
    section: 'alliance',
    order: 1,
  },
  {
    key: 'minSelfEfficacy',
    label: '최소 자기 효능감',
    type: 'integer',
    description: '최소 자기 효능감 (0-10)',
    placeholder: '0',
    min: 0,
    max: 10,
    section: 'alliance',
    order: 2,
  },
  {
    key: 'maxSelfEfficacy',
    label: '최대 자기 효능감',
    type: 'integer',
    description: '최대 자기 효능감 (0-10)',
    placeholder: '10',
    min: 0,
    max: 10,
    section: 'alliance',
    order: 3,
  },
  {
    key: 'minRiskSeverity',
    label: '최소 위험 심각도',
    type: 'integer',
    description: '최소 위험 심각도 (0-3)',
    placeholder: '0',
    min: 0,
    max: 3,
    section: 'supportSleepCognitive',
    order: 5,
  },
  {
    key: 'maxRiskSeverity',
    label: '최대 위험 심각도',
    type: 'integer',
    description: '최대 위험 심각도 (0-3)',
    placeholder: '3',
    min: 0,
    max: 3,
    section: 'supportSleepCognitive',
    order: 6,
  },
  // 백엔드 스키마의 추가 필드들
  {
    key: 'consentToDepth',
    label: '치료 깊이에 대한 동의',
    type: 'boolean',
    description: '클라이언트의 치료 깊이에 대한 준비 상태',
    section: 'alliance',
    order: 5,
  },
  {
    key: 'physicalSymptomsPresent',
    label: '신체 증상 존재',
    type: 'boolean',
    description: '신체 증상이나 신체적 불만의 존재 여부',
    section: 'supportSleepCognitive',
    order: 7,
  },
];

// 필드별 스키마 매핑
export const FIELD_SCHEMAS: Record<string, any> = {
  priority: { type: 'number', min: 1, max: 100 },
  minCurrentTechniqueMessageCount: { type: 'number', min: 0, max: 100 },
  maxCurrentTechniqueMessageCount: { type: 'number', min: 0, max: 100 },
  minEmotionIntensity: { type: 'number', min: 1, max: 10 },
  maxEmotionIntensity: { type: 'number', min: 1, max: 10 },
  requiredEmotionPrimaries: { type: 'array', enum: EMOTION_PRIMARY_VALUES },
  requiredValences: { type: 'array', enum: VALENCE_VALUES },
  requiredArousalLevels: { type: 'array', enum: AROUSAL_LEVEL_VALUES },
  requiredImpactDomains: { type: 'array', enum: IMPACT_DOMAIN_VALUES },
  requiredTimeframes: { type: 'array', enum: TIMEFRAME_VALUES },
  requiredPerceivedControls: { type: 'array', enum: PERCEIVED_CONTROL_VALUES },
  requiredMotivationStages: { type: 'array', enum: MOTIVATION_STAGE_VALUES },
};

// 섹션 정보 (백엔드 스키마와 일치)
export const SECTIONS = {
  basic: {
    title: '기본 정보',
    description: '전환 규칙의 기본 설정',
  },
  messageCount: {
    title: '메시지 수 조건',
    description: '현재 기법에서의 메시지 수 제한',
  },
  emotion: {
    title: '감정 조건',
    description: '감정 관련 전환 조건 (Emotion Domain)',
  },
  supportSleepCognitive: {
    title: '지원/수면/인지',
    description: '사회적 지원, 수면 품질, 인지 부하 (Support/Sleep/Cognitive Domain)',
  },
  alliance: {
    title: '치료 동맹',
    description: '치료 동맹 강도 및 클라이언트 참여 (Alliance Domain)',
  },
  impactTimeframe: {
    title: '영향 영역 및 시간',
    description: '삶의 영역 영향 및 시간적 맥락 (Impact/Timeframe Domain)',
  },
};

// 필드 그룹화
export const FIELD_GROUPS = {
  basic: ['priority'],
  messageCount: ['minCurrentTechniqueMessageCount', 'maxCurrentTechniqueMessageCount'],
  emotion: [
    'minEmotionIntensity',
    'maxEmotionIntensity',
    'requiredEmotionPrimaries',
    'requiredValences',
    'requiredArousalLevels',
  ],
  context: ['requiredImpactDomains', 'requiredTimeframes', 'requiredPerceivedControls', 'requiredMotivationStages'],
};
