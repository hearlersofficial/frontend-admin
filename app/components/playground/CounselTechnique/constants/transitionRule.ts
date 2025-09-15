export const EMOTION_PRIMARY_VALUES = [
  'EMOTION_PRIMARY_ANXIETY',
  'EMOTION_PRIMARY_SADNESS',
  'EMOTION_PRIMARY_ANGER',
  'EMOTION_PRIMARY_LONELINESS',
  'EMOTION_PRIMARY_GUILT',
  'EMOTION_PRIMARY_SHAME',
  'EMOTION_PRIMARY_STRESS',
  'EMOTION_PRIMARY_HOPE',
  'EMOTION_PRIMARY_CALM',
  'EMOTION_PRIMARY_OTHER',
] as const;

export const VALENCE_VALUES = ['VALENCE_NEGATIVE', 'VALENCE_NEUTRAL', 'VALENCE_POSITIVE'] as const;

export const AROUSAL_LEVEL_VALUES = ['AROUSAL_LEVEL_LOW', 'AROUSAL_LEVEL_MEDIUM', 'AROUSAL_LEVEL_HIGH'] as const;

export const IMPACT_DOMAIN_VALUES = [
  'IMPACT_DOMAIN_WORK',
  'IMPACT_DOMAIN_STUDY',
  'IMPACT_DOMAIN_RELATIONSHIP',
  'IMPACT_DOMAIN_FAMILY',
  'IMPACT_DOMAIN_HEALTH',
  'IMPACT_DOMAIN_FINANCE',
  'IMPACT_DOMAIN_SELF',
  'IMPACT_DOMAIN_OTHER',
] as const;

export const TIMEFRAME_VALUES = [
  'TIMEFRAME_TODAY',
  'TIMEFRAME_THIS_WEEK',
  'TIMEFRAME_THIS_MONTH',
  'TIMEFRAME_THIS_YEAR',
  'TIMEFRAME_LONGER',
] as const;

export const PERCEIVED_CONTROL_VALUES = [
  'PERCEIVED_CONTROL_LOW',
  'PERCEIVED_CONTROL_MEDIUM',
  'PERCEIVED_CONTROL_HIGH',
] as const;

export const MOTIVATION_STAGE_VALUES = [
  'MOTIVATION_STAGE_PRECONTEMPLATION',
  'MOTIVATION_STAGE_CONTEMPLATION',
  'MOTIVATION_STAGE_PREPARATION',
  'MOTIVATION_STAGE_ACTION',
  'MOTIVATION_STAGE_MAINTENANCE',
] as const;

export type FieldType = 'boolean' | 'enumList' | 'integer';
export type Section = 'basic' | 'messageCount' | 'emotion' | 'supportSleepCognitive' | 'alliance' | 'impactTimeframe';
export const SectionKor: Record<Section, string> = {
  basic: '기본 정보',
  messageCount: '메시지 수 조건',
  emotion: '감정 조건',
  supportSleepCognitive: '지원/수면/인지',
  alliance: '치료 동맹',
  impactTimeframe: '영향 영역 및 시간',
};
// 필드 정의 인터페이스
export interface TransitionRuleField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: readonly string[];
  min?: number;
  max?: number;
  section: Section;
  required: boolean;
}

// 한국어 매핑 (백엔드 스키마와 일치)
export const KOREAN_LABELS: Record<string, string> = {
  // 감정 관련
  EMOTION_PRIMARY_ANXIETY: '불안',
  EMOTION_PRIMARY_SADNESS: '슬픔',
  EMOTION_PRIMARY_ANGER: '분노',
  EMOTION_PRIMARY_LONELINESS: '외로움',
  EMOTION_PRIMARY_GUILT: '죄책감',
  EMOTION_PRIMARY_SHAME: '수치심',
  EMOTION_PRIMARY_STRESS: '스트레스',
  EMOTION_PRIMARY_HOPE: '희망',
  EMOTION_PRIMARY_CALM: '평온',

  // 감정의 방향성(Valence)
  VALENCE_NEGATIVE: '부정적인 쪽으로 치우침 ',
  VALENCE_NEUTRAL: '특별히 긍정적이거나 부정적이지 않음',
  VALENCE_POSITIVE: '긍정적인 쪽으로 치우침',

  AROUSAL_LEVEL_LOW: '저활성',
  AROUSAL_LEVEL_MEDIUM: '중간 활성',
  AROUSAL_LEVEL_HIGH: '고활성',

  // 삶의 영역
  IMPACT_DOMAIN_WORK: '직업/학업',
  IMPACT_DOMAIN_STUDY: '학업 성과',
  IMPACT_DOMAIN_RELATIONSHIP: '대인관계',
  IMPACT_DOMAIN_FAMILY: '가족',
  IMPACT_DOMAIN_HEALTH: '건강',
  IMPACT_DOMAIN_FINANCE: '경제',
  IMPACT_DOMAIN_SELF: '자기개념',
  IMPACT_DOMAIN_OTHER: '기타',

  // 시간 프레임
  TIMEFRAME_TODAY: '오늘',
  TIMEFRAME_THIS_WEEK: '이번 주',
  TIMEFRAME_THIS_MONTH: '이번 달',
  TIMEFRAME_THIS_YEAR: '올해',
  TIMEFRAME_LONGER: '1년 이상',

  // 통제감
  PERCEIVED_CONTROL_LOW: '통제감 낮음',
  PERCEIVED_CONTROL_MEDIUM: '통제감 보통',
  PERCEIVED_CONTROL_HIGH: '통제감 높음',

  // 동기 단계
  MOTIVATION_STAGE_PRECONTEMPLATION: '변화 거부',
  MOTIVATION_STAGE_CONTEMPLATION: '변화 고민',
  MOTIVATION_STAGE_PREPARATION: '변화 준비',
  MOTIVATION_STAGE_ACTION: '변화 실행',
  MOTIVATION_STAGE_MAINTENANCE: '변화 유지',

  // 사회적 지원 수준
  SOCIAL_SUPPORT_LEVEL_NONE: '지원 없음',
  SOCIAL_SUPPORT_LEVEL_LOW: '지원 부족',
  SOCIAL_SUPPORT_LEVEL_MEDIUM: '지원 보통',
  SOCIAL_SUPPORT_LEVEL_HIGH: '지원 충분',

  // 위험 유형
  RISK_KIND_NONE: '위험 없음',
  RISK_KIND_SELF_HARM: '자해 위험',
  RISK_KIND_HARM_TO_OTHERS: '타해 위험',
  RISK_KIND_ABUSE: '학대 위험',

  // 수면 품질
  SLEEP_QUALITY_POOR: '수면 나쁨',
  SLEEP_QUALITY_FAIR: '수면 보통',
  SLEEP_QUALITY_GOOD: '수면 좋음',

  // 인지 부하
  COGNITIVE_LOAD_LOW: '인지부하 낮음',
  COGNITIVE_LOAD_MEDIUM: '인지부하 보통',
  COGNITIVE_LOAD_HIGH: '인지부하 높음',

  // 치료 동맹 강도
  ALLIANCE_STRENGTH_WEAK: '동맹 약함',
  ALLIANCE_STRENGTH_MEDIUM: '동맹 보통',
  ALLIANCE_STRENGTH_STRONG: '동맹 강함',
};

// 전환 규칙 필드 정의
export const TRANSITION_RULE_FIELDS: TransitionRuleField[] = [
  {
    key: 'priority',
    label: '우선순위 (높을수록 우선)',
    type: 'integer',
    placeholder: '1',
    min: 1,
    max: 100,
    section: 'basic',
    required: true,
  },
  {
    key: 'minCurrentTechniqueMessageCount',
    label: '최소 현재 기법 메시지 수',
    type: 'integer',
    placeholder: '0',
    min: 0,
    max: 100,
    section: 'messageCount',
    required: false,
  },
  {
    key: 'maxCurrentTechniqueMessageCount',
    label: '최대 현재 기법 메시지 수',
    type: 'integer',
    placeholder: '10',
    min: 0,
    max: 100,
    section: 'messageCount',
    required: false,
  },
  {
    key: 'minEmotionIntensity',
    label: '최소 감정 강도',
    type: 'integer',
    placeholder: '1',
    min: 1,
    max: 10,
    section: 'emotion',
    required: false,
  },
  {
    key: 'maxEmotionIntensity',
    label: '최대 감정 강도',
    type: 'integer',
    placeholder: '10',
    min: 1,
    max: 10,
    section: 'emotion',
    required: false,
  },
  {
    key: 'requiredEmotionPrimaries',
    label: '주요 감정',
    type: 'enumList',
    options: EMOTION_PRIMARY_VALUES,
    section: 'emotion',
    required: false,
  },
  {
    key: 'requiredValences',
    label: '감정의 방향성',
    type: 'enumList',
    options: VALENCE_VALUES,
    section: 'emotion',
    required: false,
  },
  {
    key: 'requiredArousalLevels',
    label: '각성 수준',
    type: 'enumList',
    options: AROUSAL_LEVEL_VALUES,
    section: 'emotion',
    required: false,
  },
  {
    key: 'requiredImpactDomains',
    label: '영향 영역',
    type: 'enumList',
    options: IMPACT_DOMAIN_VALUES,
    section: 'impactTimeframe',
    required: false,
  },
  {
    key: 'requiredTimeframes',
    label: '시간 범위',
    type: 'enumList',
    options: TIMEFRAME_VALUES,
    section: 'impactTimeframe',
    required: false,
  },
  {
    key: 'requiredPerceivedControls',
    label: '통제감',
    type: 'enumList',
    options: PERCEIVED_CONTROL_VALUES,
    section: 'alliance',
    required: false,
  },
  {
    key: 'requiredMotivationStages',
    label: '변화 단계',
    type: 'enumList',
    options: MOTIVATION_STAGE_VALUES,
    section: 'impactTimeframe',
    required: false,
  },
  // 백엔드 스키마에서 추가된 필드들
  {
    key: 'requiredSocialSupportLevels',
    label: '사회적 지원',
    type: 'enumList',
    options: [
      'SOCIAL_SUPPORT_LEVEL_NONE',
      'SOCIAL_SUPPORT_LEVEL_LOW',
      'SOCIAL_SUPPORT_LEVEL_MEDIUM',
      'SOCIAL_SUPPORT_LEVEL_HIGH',
    ],
    section: 'supportSleepCognitive',
    required: false,
  },
  {
    key: 'requiredRiskKinds',
    label: '위험 유형',
    type: 'enumList',
    options: ['RISK_KIND_NONE', 'RISK_KIND_SELF_HARM', 'RISK_KIND_HARM_TO_OTHERS', 'RISK_KIND_ABUSE'],
    section: 'supportSleepCognitive',
    required: false,
  },
  {
    key: 'requiredSleepQualities',
    label: '수면 품질',
    type: 'enumList',
    options: ['SLEEP_QUALITY_POOR', 'SLEEP_QUALITY_FAIR', 'SLEEP_QUALITY_GOOD'],
    section: 'supportSleepCognitive',
    required: false,
  },
  {
    key: 'requiredCognitiveLoads',
    label: '인지 부하',
    type: 'enumList',
    options: ['COGNITIVE_LOAD_LOW', 'COGNITIVE_LOAD_MEDIUM', 'COGNITIVE_LOAD_HIGH'],
    section: 'supportSleepCognitive',
    required: false,
  },
  {
    key: 'requiredAllianceStrengths',
    label: '치료 동맹',
    type: 'enumList',
    options: ['ALLIANCE_STRENGTH_WEAK', 'ALLIANCE_STRENGTH_MEDIUM', 'ALLIANCE_STRENGTH_STRONG'],
    section: 'alliance',
    required: false,
  },
  {
    key: 'minSelfEfficacy',
    label: '최소 자기 효능감',
    type: 'integer',
    placeholder: '0',
    min: 0,
    max: 10,
    section: 'alliance',
    required: false,
  },
  {
    key: 'maxSelfEfficacy',
    label: '최대 자기 효능감',
    type: 'integer',
    placeholder: '10',
    min: 0,
    max: 10,
    section: 'alliance',
    required: false,
  },
  {
    key: 'minRiskSeverity',
    label: '최소 위험 심각도',
    type: 'integer',
    placeholder: '0',
    min: 0,
    max: 3,
    section: 'supportSleepCognitive',
    required: false,
  },
  {
    key: 'maxRiskSeverity',
    label: '최대 위험 심각도',
    type: 'integer',
    placeholder: '3',
    min: 0,
    max: 3,
    section: 'supportSleepCognitive',
    required: false,
  },
  {
    key: 'requiredConsentToDepth',
    label: '치료 깊이에 대한 동의',
    type: 'boolean',
    section: 'alliance',
    required: false,
  },
  {
    key: 'requiredPhysicalSymptomsPresent',
    label: '신체 증상 존재',
    type: 'boolean',
    section: 'supportSleepCognitive',
    required: false,
  },
];
