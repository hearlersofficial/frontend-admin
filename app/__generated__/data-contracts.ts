/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 톤 업데이트 요청 */
export interface UpdateToneRequest {
  /** 톤 ID */
  toneId: string;
  /** 톤 이름 */
  name?: string | null;
  /** 톤 설명 */
  description?: string | null;
}

/** 에러 응답 DTO */
export interface Error {
  /**
   * HTTP 상태 코드
   * @example "BAD_REQUEST"
   */
  status?:
    | "100 CONTINUE"
    | "101 SWITCHING_PROTOCOLS"
    | "102 PROCESSING"
    | "103 EARLY_HINTS"
    | "103 CHECKPOINT"
    | "200 OK"
    | "201 CREATED"
    | "202 ACCEPTED"
    | "203 NON_AUTHORITATIVE_INFORMATION"
    | "204 NO_CONTENT"
    | "205 RESET_CONTENT"
    | "206 PARTIAL_CONTENT"
    | "207 MULTI_STATUS"
    | "208 ALREADY_REPORTED"
    | "226 IM_USED"
    | "300 MULTIPLE_CHOICES"
    | "301 MOVED_PERMANENTLY"
    | "302 FOUND"
    | "302 MOVED_TEMPORARILY"
    | "303 SEE_OTHER"
    | "304 NOT_MODIFIED"
    | "305 USE_PROXY"
    | "307 TEMPORARY_REDIRECT"
    | "308 PERMANENT_REDIRECT"
    | "400 BAD_REQUEST"
    | "401 UNAUTHORIZED"
    | "402 PAYMENT_REQUIRED"
    | "403 FORBIDDEN"
    | "404 NOT_FOUND"
    | "405 METHOD_NOT_ALLOWED"
    | "406 NOT_ACCEPTABLE"
    | "407 PROXY_AUTHENTICATION_REQUIRED"
    | "408 REQUEST_TIMEOUT"
    | "409 CONFLICT"
    | "410 GONE"
    | "411 LENGTH_REQUIRED"
    | "412 PRECONDITION_FAILED"
    | "413 PAYLOAD_TOO_LARGE"
    | "413 REQUEST_ENTITY_TOO_LARGE"
    | "414 URI_TOO_LONG"
    | "414 REQUEST_URI_TOO_LONG"
    | "415 UNSUPPORTED_MEDIA_TYPE"
    | "416 REQUESTED_RANGE_NOT_SATISFIABLE"
    | "417 EXPECTATION_FAILED"
    | "418 I_AM_A_TEAPOT"
    | "419 INSUFFICIENT_SPACE_ON_RESOURCE"
    | "420 METHOD_FAILURE"
    | "421 DESTINATION_LOCKED"
    | "422 UNPROCESSABLE_ENTITY"
    | "423 LOCKED"
    | "424 FAILED_DEPENDENCY"
    | "425 TOO_EARLY"
    | "426 UPGRADE_REQUIRED"
    | "428 PRECONDITION_REQUIRED"
    | "429 TOO_MANY_REQUESTS"
    | "431 REQUEST_HEADER_FIELDS_TOO_LARGE"
    | "451 UNAVAILABLE_FOR_LEGAL_REASONS"
    | "500 INTERNAL_SERVER_ERROR"
    | "501 NOT_IMPLEMENTED"
    | "502 BAD_GATEWAY"
    | "503 SERVICE_UNAVAILABLE"
    | "504 GATEWAY_TIMEOUT"
    | "505 HTTP_VERSION_NOT_SUPPORTED"
    | "506 VARIANT_ALSO_NEGOTIATES"
    | "507 INSUFFICIENT_STORAGE"
    | "508 LOOP_DETECTED"
    | "509 BANDWIDTH_LIMIT_EXCEEDED"
    | "510 NOT_EXTENDED"
    | "511 NETWORK_AUTHENTICATION_REQUIRED";
  /**
   * 에러 코드
   * @example "E40001"
   */
  code?: string;
  /**
   * 에러 메시지
   * @example "요청 처리 중 오류가 발생하였습니다."
   */
  message?: string;
  /** 상세 에러 정보 */
  details?: string[];
  /** 추가 데이터 */
  data?: object;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 성공 응답 DTO */
export interface SuccessUpdateToneResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 톤 업데이트 응답 */
  data?: UpdateToneResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 톤 */
export interface Tone {
  /** 톤 ID */
  id?: string;
  /** 톤 이름 */
  name?: string;
  /** 톤 설명 */
  description?: string;
  /** 톤 생성 시간 */
  createdAt?: string;
  /** 톤 수정 시간 */
  updatedAt?: string;
  /** 톤 삭제 시간 */
  deletedAt?: string | null;
}

/** 톤 업데이트 응답 */
export interface UpdateToneResponse {
  /** 톤 */
  tone?: Tone;
}

/** 임시 버전 저장 요청 DTO */
export interface SaveTemporaryVersionRequestDto {
  /**
   * 프롬프트 버전 이름
   * @example "2024년 7월 프롬프트 버전"
   */
  name: string;
  /**
   * 프롬프트 버전 설명
   * @example "2024년 7월 배포 예정 버전입니다."
   */
  description: string;
  /** 북마크 여부 */
  isBookmarked: boolean;
  /** AI 모델 */
  aiModel:
    | "AI_MODEL_UNSPECIFIED"
    | "GPT_3_5_TURBO"
    | "GPT_4"
    | "GPT_4O"
    | "GPT_4O_MINI"
    | "UNRECOGNIZED";
}

/** 상담사별 프롬프트 응답 DTO */
export interface CounselorScopedPromptResponseDto {
  /**
   * 상담사 ID
   * @example "counselor_123456"
   */
  counselorId?: string;
  /**
   * 페르소나 프롬프트 ID
   * @example "pp_123456"
   */
  personaPromptId?: string;
  /**
   * 생성 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  createdAt?: string;
  /**
   * 수정 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  updatedAt?: string;
  /**
   * 삭제 시간
   * @example "null"
   */
  deletedAt?: string;
}

/** 프롬프트 버전 응답 DTO */
export interface PromptVersionResponseDto {
  /**
   * 프롬프트 버전 ID
   * @example "pv_123456"
   */
  id?: string;
  /**
   * 프롬프트 버전 이름
   * @example "2024년 6월 프롬프트 버전"
   */
  name?: string;
  /**
   * 프롬프트 버전 설명
   * @example "2024년 6월 배포 버전입니다."
   */
  description?: string;
  /**
   * 활성화 여부
   * @example true
   */
  isActive?: boolean;
  /**
   * 임시 버전 여부
   * @example false
   */
  isTemporary?: boolean;
  /**
   * 북마크 여부
   * @example false
   */
  isBookmarked?: boolean;
  /** AI 모델 */
  aiModel?:
    | "AI_MODEL_UNSPECIFIED"
    | "GPT_3_5_TURBO"
    | "GPT_4"
    | "GPT_4O"
    | "GPT_4O_MINI"
    | "UNRECOGNIZED";
  /** 상담사별 프롬프트 목록 */
  counselorScopedPrompts?: CounselorScopedPromptResponseDto[];
  /** 톤별 프롬프트 목록 */
  toneScopedPrompts?: ToneScopedPromptResponseDto[];
  /**
   * 생성 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  createdAt?: string;
  /**
   * 수정 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  updatedAt?: string;
  /**
   * 삭제 시간
   * @example "null"
   */
  deletedAt?: string;
}

/** 임시 버전 저장 응답 DTO */
export interface SaveTemporaryVersionResponseDto {
  /** 프롬프트 버전 응답 DTO */
  promptVersion?: PromptVersionResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessSaveTemporaryVersionResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 임시 버전 저장 응답 DTO */
  data?: SaveTemporaryVersionResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 톤별 프롬프트 응답 DTO */
export interface ToneScopedPromptResponseDto {
  /**
   * 톤 ID
   * @example "tone_123456"
   */
  toneId?: string;
  /**
   * 톤 프롬프트 ID
   * @example "tp_123456"
   */
  tonePromptId?: string;
  /**
   * 첫 번째 상담 기법 ID
   * @example "ct_123456"
   */
  firstCounselTechniqueId?: string;
  /**
   * 생성 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  createdAt?: string;
  /**
   * 수정 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  updatedAt?: string;
  /**
   * 삭제 시간
   * @example "null"
   */
  deletedAt?: string;
}

/** 기존 프롬프트 버전 로드 응답 DTO */
export interface LoadExistingPromptVersionResponseDto {
  /** 프롬프트 버전 응답 DTO */
  promptVersion?: PromptVersionResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessLoadExistingPromptVersionResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 기존 프롬프트 버전 로드 응답 DTO */
  data?: LoadExistingPromptVersionResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 톤 프롬프트 업데이트 요청 DTO */
export interface UpdateTonePromptRequestDto {
  /**
   * 톤 ID
   * @example "tone_123456"
   */
  toneId: string;
  /**
   * 톤 프롬프트 내용
   * @example "공감적이고 따뜻한 어조로 대화하세요."
   */
  body: string;
}

/** 성공 응답 DTO */
export interface SuccessUpdateTonePromptResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 톤 프롬프트 업데이트 응답 DTO */
  data?: UpdateTonePromptResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 톤 프롬프트 응답 DTO */
export interface TonePromptResponseDto {
  /**
   * 톤 프롬프트 ID
   * @example "tp_123456"
   */
  id?: string;
  /**
   * 톤 프롬프트 내용
   * @example "공감적이고 따뜻한 어조로 대화하세요."
   */
  body?: string;
  /**
   * 톤 ID
   * @example "tone_123456"
   */
  toneId?: string;
  /**
   * 생성 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  createdAt?: string;
  /**
   * 수정 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  updatedAt?: string;
  /**
   * 삭제 시간
   * @example "null"
   */
  deletedAt?: string;
}

/** 톤 프롬프트 업데이트 응답 DTO */
export interface UpdateTonePromptResponseDto {
  /** 톤 프롬프트 응답 DTO */
  tonePrompt?: TonePromptResponseDto;
}

/** 페르소나 프롬프트 업데이트 요청 DTO */
export interface UpdatePersonaPromptRequestDto {
  /**
   * 상담사 ID
   * @example "counselor_123456"
   */
  counselorId: string;
  /**
   * 페르소나 프롬프트 내용
   * @example "저는 12년 경력의 심리상담사로, 우울증, 불안장애, 트라우마 분야를 전문으로 다룹니다."
   */
  body: string;
}

/** 페르소나 프롬프트 응답 DTO */
export interface PersonaPromptResponseDto {
  /**
   * 페르소나 프롬프트 ID
   * @example "pp_123456"
   */
  id?: string;
  /**
   * 페르소나 프롬프트 내용
   * @example "저는 10년 경력의 심리상담사로, 우울증과 불안장애 분야를 전문으로 다룹니다."
   */
  body?: string;
  /**
   * 상담사 ID
   * @example "counselor_123456"
   */
  counselorId?: string;
  /**
   * 생성 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  createdAt?: string;
  /**
   * 수정 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  updatedAt?: string;
  /**
   * 삭제 시간
   * @example "null"
   */
  deletedAt?: string;
}

/** 성공 응답 DTO */
export interface SuccessUpdatePersonaPromptResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 페르소나 프롬프트 업데이트 응답 DTO */
  data?: UpdatePersonaPromptResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 페르소나 프롬프트 업데이트 응답 DTO */
export interface UpdatePersonaPromptResponseDto {
  /** 페르소나 프롬프트 응답 DTO */
  personaPrompt?: PersonaPromptResponseDto;
}

/** 상담 기법 업데이트 요청 DTO */
export interface UpdateCounselTechniqueRequestDto {
  /**
   * 상담 기법 이름
   * @example "개선된 공감 반응 기법"
   */
  name?: string;
  /**
   * 컨텍스트
   * @example "내담자의 감정에 더 깊이 공감하는 컨텍스트"
   */
  context?: string;
  /**
   * 지시사항
   * @example "내담자의 감정을 더 깊이 반영하고 공감하세요."
   */
  instruction?: string;
  /**
   * 메시지 임계값
   * @format int32
   * @example 5
   */
  messageThreshold?: number;
  /**
   * AI 모델 temperature 값
   * @format double
   */
  temperature?: number;
}

/** 상담 기법 응답 DTO */
export interface CounselTechniqueResponseDto {
  /**
   * 상담 기법 ID
   * @example "ct_123456"
   */
  id?: string;
  /**
   * 상담 기법 이름
   * @example "공감 반응 기법"
   */
  name?: string;
  /**
   * 톤 ID
   * @example "tone_123456"
   */
  toneId?: string;
  /**
   * 컨텍스트
   * @example "내담자의 감정에 공감하는 컨텍스트"
   */
  context?: string;
  /**
   * 지시사항
   * @example "내담자의 감정을 반영하고 공감하세요."
   */
  instruction?: string;
  /**
   * 메시지 임계값
   * @format int32
   * @example 3
   */
  messageThreshold?: number;
  /**
   * 임시 기법 여부
   * @example false
   */
  isTemporary?: boolean;
  /**
   * 다음 상담 기법 ID
   * @example "ct_789012"
   */
  nextCounselTechniqueId?: string;
  /**
   * AI 모델 temperature 값
   * @format double
   */
  temperature?: number;
  /**
   * 생성 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  createdAt?: string;
  /**
   * 수정 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  updatedAt?: string;
  /**
   * 삭제 시간
   * @example "null"
   */
  deletedAt?: string;
}

/** 성공 응답 DTO */
export interface SuccessUpdateCounselTechniqueResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담 기법 업데이트 응답 DTO */
  data?: UpdateCounselTechniqueResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담 기법 업데이트 응답 DTO */
export interface UpdateCounselTechniqueResponseDto {
  /** 상담 기법 목록 */
  counselTechnique?: CounselTechniqueResponseDto[];
}

/** 상담사 업데이트 요청 */
export interface UpdateCounselorRequest {
  /** 톤 ID */
  toneId?: string | null;
  /** 상담사 이름 */
  name?: string | null;
  /** 상담사 설명 */
  description?: string | null;
  /** 상담사 프로필 이미지 */
  profileImage?: string | null;
  /** 상담사 성별 */
  gender?:
    | "COUNSELOR_GENDER_UNSPECIFIED"
    | "COUNSELOR_GENDER_MALE"
    | "COUNSELOR_GENDER_FEMALE"
    | "COUNSELOR_GENDER_NONE"
    | "UNRECOGNIZED"
    | null;
}

/** 상담사 */
export interface Counselor {
  /** 상담사 ID */
  id?: string;
  /** 톤 ID */
  toneId?: string;
  /** 상담사 이름 */
  name?: string;
  /** 상담사 설명 */
  description?: string;
  /** 상담사 프로필 이미지 */
  profileImage?: string;
  /** 상담사 성별 */
  gender?:
    | "COUNSELOR_GENDER_UNSPECIFIED"
    | "COUNSELOR_GENDER_MALE"
    | "COUNSELOR_GENDER_FEMALE"
    | "COUNSELOR_GENDER_NONE"
    | "UNRECOGNIZED";
  /** 상담사 생성 시간 */
  createdAt?: string;
  /** 상담사 수정 시간 */
  updatedAt?: string;
  /** 상담사 삭제 시간 */
  deletedAt?: string | null;
}

/** 성공 응답 DTO */
export interface SuccessUpdateCounselorResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담사 업데이트 응답 */
  data?: UpdateCounselorResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담사 업데이트 응답 */
export interface UpdateCounselorResponse {
  /** 상담사 */
  counselor?: Counselor;
}

/** 에피소드 컷신 저장 요청 */
export type SaveEpisodeCutSceneRequest = {
  /** 컷신 ID (수정 시 필요) */
  id?: string | null;
  /** 컷신 발화자 */
  speaker:
    | "SPEAKER_UNSPECIFIED"
    | "SPEAKER_COUNSELOR"
    | "SPEAKER_USER"
    | "UNRECOGNIZED";
  /** 컷신 내용 */
  content: string;
  /**
   * 컷신 순서 인덱스
   * @format int32
   */
  orderIndex: number;
  /** 컷신 이미지 URL */
  image: string;
};

/** 에피소드 업데이트 요청 */
export interface UpdateEpisodeRequest {
  /** 에피소드 제목 */
  title?: string | null;
  /**
   * 에피소드 해금을 위한 라포 수치
   * @format int32
   */
  requiredRapportThreshold?: number | null;
  /** 임시 여부 */
  isTemporary?: boolean | null;
  /** 에피소드 컷신 목록 */
  cutScenes?: SaveEpisodeCutSceneRequest[] | null;
}

/** 에피소드 */
export interface Episode {
  /** 에피소드 ID */
  id?: string;
  /** 상담사 ID */
  counselorId?: string;
  /** 에피소드 제목 */
  title?: string;
  /**
   * 에피소드 해금을 위한 라포 수치
   * @format int32
   */
  requiredRapportThreshold?: number;
  /** 임시 여부 */
  isTemporary?: boolean;
  /** 에피소드 컷신 목록 */
  cutScenes?: EpisodeCutScene[];
  /** 에피소드 생성 시간 */
  createdAt?: string;
  /** 에피소드 수정 시간 */
  updatedAt?: string;
  /** 에피소드 삭제 시간 */
  deletedAt?: string | null;
}

/** 에피소드 컷신 */
export interface EpisodeCutScene {
  /** 컷신 ID */
  id?: string;
  /** 에피소드 ID */
  episodeId?: string;
  /** 컷신 발화자 */
  speaker?:
    | "SPEAKER_UNSPECIFIED"
    | "SPEAKER_COUNSELOR"
    | "SPEAKER_USER"
    | "UNRECOGNIZED";
  /** 컷신 내용 */
  content?: string;
  /**
   * 컷신 순서 인덱스
   * @format int32
   */
  orderIndex?: number;
  /** 컷신 이미지 URL */
  image?: string;
  /** 컷신 생성 시간 */
  createdAt?: string;
  /** 컷신 수정 시간 */
  updatedAt?: string;
  /** 컷신 삭제 시간 */
  deletedAt?: string | null;
}

/** 성공 응답 DTO */
export interface SuccessUpdateEpisodeResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 에피소드 업데이트 응답 */
  data?: UpdateEpisodeResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 에피소드 업데이트 응답 */
export interface UpdateEpisodeResponse {
  /** 에피소드 */
  episode?: Episode;
}

/** 버블 업데이트 요청 */
export interface UpdateBubbleRequest {
  /** 버블 질문 */
  question?: string | null;
  /** 버블 응답 1 */
  responseOption1?: string | null;
  /** 버블 응답 2 */
  responseOption2?: string | null;
}

/** 버블 */
export interface Bubble {
  /** 버블 ID */
  id?: string;
  /** 버블 질문 */
  question?: string;
  /** 버블 응답 1 */
  responseOption1?: string;
  /** 버블 응답 2 */
  responseOption2?: string;
  /** 버블 생성 시간 */
  createdAt?: string;
  /** 버블 수정 시간 */
  updatedAt?: string;
  /** 버블 삭제 시간 */
  deletedAt?: string | null;
}

/** 성공 응답 DTO */
export interface SuccessUpdateBubbleResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 버블 업데이트 응답 */
  data?: UpdateBubbleResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 버블 업데이트 응답 */
export interface UpdateBubbleResponse {
  /** 버블 */
  bubble?: Bubble;
}

/** 성공 응답 DTO */
export interface SuccessTokenResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 토큰 생성 응답 */
  data?: TokenResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 토큰 생성 응답 */
export interface TokenResponseDto {
  /** 액세스 토큰 */
  accessToken?: string;
  /** 리프레시 토큰 */
  refreshToken?: string;
  /**
   * 액세스 토큰 만료 시간
   * @format date-time
   */
  accessTokenExpiresAt?: string;
  /**
   * 리프레시 토큰 만료 시간
   * @format date-time
   */
  refreshTokenExpiresAt?: string;
}

/** 톤 생성 요청 */
export interface CreateToneRequest {
  /** 톤 이름 */
  name: string;
  /** 톤 설명 */
  description: string;
}

/** 톤 생성 응답 */
export interface CreateToneResponse {
  /** 톤 */
  tone?: Tone;
}

/** 성공 응답 DTO */
export interface SuccessCreateToneResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 톤 생성 응답 */
  data?: CreateToneResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 프롬프트 버전 활성화 응답 DTO */
export interface ActivatePromptVersionResponseDto {
  /** 프롬프트 버전 응답 DTO */
  promptVersion?: PromptVersionResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessActivatePromptVersionResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 프롬프트 버전 활성화 응답 DTO */
  data?: ActivatePromptVersionResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담 기법 생성 요청 DTO */
export interface CreateCounselTechniqueRequestDto {
  /**
   * 상담 기법 이름
   * @example "공감 반응 기법"
   */
  name: string;
  /**
   * 톤 ID
   * @example "tone_123456"
   */
  toneId: string;
  /**
   * 컨텍스트
   * @example "내담자의 감정에 공감하는 컨텍스트"
   */
  context: string;
  /**
   * 지시사항
   * @example "내담자의 감정을 반영하고 공감하세요."
   */
  instruction: string;
  /**
   * 메시지 임계값
   * @format int32
   * @example 3
   */
  messageThreshold: number;
  /**
   * AI 모델 temperature 값
   * @format double
   */
  temperature: number;
}

/** 상담 기법 생성 응답 DTO */
export interface CreateCounselTechniqueResponseDto {
  /** 상담 기법 응답 DTO */
  counselTechnique?: CounselTechniqueResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessCreateCounselTechniqueResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담 기법 생성 응답 DTO */
  data?: CreateCounselTechniqueResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담 기법 시퀀스 저장 요청 DTO */
export interface SaveCounselTechniqueSequenceRequestDto {
  /**
   * 톤 ID
   * @example "tone_123456"
   */
  toneId: string;
  /**
   * 상담 기법 ID 목록
   * @example ["ct_123456","ct_789012"]
   */
  counselTechniqueIds: string[];
}

/** 상담 기법 시퀀스 저장 응답 DTO */
export interface SaveCounselTechniqueSequenceResponseDto {
  /** 상담 기법 목록 */
  counselTechniques?: CounselTechniqueResponseDto[];
}

/** 성공 응답 DTO */
export interface SuccessSaveCounselTechniqueSequenceResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담 기법 시퀀스 저장 응답 DTO */
  data?: SaveCounselTechniqueSequenceResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담사 생성 요청 */
export interface CreateCounselorRequest {
  /** 톤 ID */
  toneId: string;
  /** 상담사 이름 */
  name: string;
  /** 상담사 설명 */
  description: string;
  /** 상담사 프로필 이미지 */
  profileImage: string;
  /** 상담사 성별 */
  gender:
    | "COUNSELOR_GENDER_UNSPECIFIED"
    | "COUNSELOR_GENDER_MALE"
    | "COUNSELOR_GENDER_FEMALE"
    | "COUNSELOR_GENDER_NONE"
    | "UNRECOGNIZED";
}

/** 상담사 생성 응답 */
export interface CreateCounselorResponse {
  /** 상담사 */
  counselor?: Counselor;
}

/** 성공 응답 DTO */
export interface SuccessCreateCounselorResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담사 생성 응답 */
  data?: CreateCounselorResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담사 이미지 URL 생성 요청 */
export interface GenerateCounselorImageUrlRequest {
  /** 이미지 확장자 */
  extension:
    | "EXTENSION_UNSPECIFIED"
    | "EXTENSION_JPG"
    | "EXTENSION_PNG"
    | "EXTENSION_GIF"
    | "EXTENSION_WEBP"
    | "UNRECOGNIZED";
}

/** 상담사 이미지 URL 생성 응답 */
export interface GenerateCounselorImageUrlResponse {
  /** Presigned URL 응답 */
  presignedUrl?: PresignedUrlResponse;
}

/** Presigned URL 응답 */
export interface PresignedUrlResponse {
  /**
   * Presigned URL
   * @example "https://example.com/presigned-url"
   */
  uploadUrl?: string;
  /**
   * Presigned URL로 업로드한 파일의 공개 URL
   * @example "https://example.com/public-url"
   */
  publicUrl?: string;
  /**
   * Presigned URL 만료 시간
   * @example "2023-10-01T12:00:00Z"
   */
  expiresAt?: string;
}

/** 성공 응답 DTO */
export interface SuccessGenerateCounselorImageUrlResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담사 이미지 URL 생성 응답 */
  data?: GenerateCounselorImageUrlResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 에피소드 생성 요청 */
export interface CreateEpisodeRequest {
  /** 에피소드 제목 */
  title: string;
  /**
   * 에피소드 해금을 위한 라포 수치
   * @format int32
   */
  requiredRapportThreshold: number;
  /** 임시 여부 */
  isTemporary: boolean;
  /** 에피소드 컷신 목록 */
  cutScenes: SaveNewEpisodeCutSceneRequest[];
}

/** 에피소드 컷신 저장 요청 */
export interface SaveNewEpisodeCutSceneRequest {
  /** 컷신 발화자 */
  speaker:
    | "SPEAKER_UNSPECIFIED"
    | "SPEAKER_COUNSELOR"
    | "SPEAKER_USER"
    | "UNRECOGNIZED";
  /** 컷신 내용 */
  content: string;
  /**
   * 컷신 순서 인덱스
   * @format int32
   */
  orderIndex: number;
  /** 컷신 이미지 URL */
  image: string;
}

/** 에피소드 생성 응답 */
export interface CreateEpisodeResponse {
  /** 에피소드 */
  episode?: Episode;
}

/** 성공 응답 DTO */
export interface SuccessCreateEpisodeResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 에피소드 생성 응답 */
  data?: CreateEpisodeResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 컷신 이미지 URL 생성 요청 */
export interface GenerateCutSceneImageUrlRequest {
  /** 이미지 확장자 */
  extension:
    | "EXTENSION_UNSPECIFIED"
    | "EXTENSION_JPG"
    | "EXTENSION_PNG"
    | "EXTENSION_GIF"
    | "EXTENSION_WEBP"
    | "UNRECOGNIZED";
}

/** 컷신 이미지 URL 생성 응답 */
export interface GenerateCutSceneImageUrlResponse {
  /** Presigned URL 응답 */
  presignedUrl?: PresignedUrlResponse;
}

/** 성공 응답 DTO */
export interface SuccessGenerateCutSceneImageUrlResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 컷신 이미지 URL 생성 응답 */
  data?: GenerateCutSceneImageUrlResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담 생성 요청 */
export interface CreateCounselRequest {
  /** 버블 ID */
  bubbleId?: string | null;
  /**
   * 응답 옵션 번호
   * @format int32
   */
  responseOptionNo?: number | null;
  /** 프롬프트 버전 아이디 */
  promptVersionId?: string | null;
}

/** 상담 */
export interface Counsel {
  /**
   * 상담 ID
   * @example "123534543"
   */
  id?: string;
  /**
   * 상담사 ID
   * @example "53453454323"
   */
  counselorId?: string;
  /**
   * 유저 ID
   * @example "53453454323"
   */
  userId?: string;
  /**
   * 마지막 메시지
   * @example "안녕하세요, 상담사님!"
   */
  lastMessage?: string | null;
  /**
   * 마지막 채팅 날짜
   * @example "2024-12-29T12:34:56.000Z"
   */
  lastChatedAt?: string | null;
  /**
   * 프롬프트 버전 ID
   * @example "5435345345"
   */
  promptVersionId?: string;
  /**
   * 상담 테크닉 ID
   * @example "436534342321"
   */
  counselTechniqueId?: string;
  /**
   * 상담사와 유저의 관계 ID
   * @example "436534342321"
   */
  counselorUserRelationshipId?: string;
  /** 상담 생성 시간 */
  createdAt?: string;
  /** 상담 수정 시간 */
  updatedAt?: string;
  /** 상담 삭제 시간 */
  deletedAt?: string | null;
}

/** 상담 메세지 */
export interface CounselMessage {
  /** 메시지 ID */
  id?: string;
  /** 상담 ID */
  counselId?: string;
  /** 메시지 내용 */
  message?: string;
  /** 메시지 반응 시간 (ISO 8601) */
  reactedAt?: string | null;
  /** 메시지 반응 객체 */
  reaction?:
    | "COUNSEL_MESSAGE_REACTION_UNSPECIFIED"
    | "COUNSEL_MESSAGE_REACTION_LIKE"
    | "COUNSEL_MESSAGE_REACTION_DISLIKE"
    | "UNRECOGNIZED"
    | null;
  /**
   * 상담 테크닉 ID
   * @example "436534342321"
   */
  counselTechniqueId?: string;
  /** 생성 시간 (ISO 8601) */
  createdAt?: string;
  /** 수정 시간 (ISO 8601) */
  updatedAt?: string;
  /** 삭제 시간 (ISO 8601) */
  deletedAt?: string | null;
  userMessage?: boolean;
}

/** 상담 생성 응답 */
export interface CreateCounselResponse {
  /** 상담 */
  counsel?: Counsel;
  /** 상담 메시지 목록 */
  counselMessages?: CounselMessage[];
}

/** 성공 응답 DTO */
export interface SuccessCreateCounselResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담 생성 응답 */
  data?: CreateCounselResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 메시지 생성 요청 */
export interface CreateMessageRequest {
  /** 메시지 내용 */
  message: string;
}

/** 메시지 생성 응답 */
export interface CreateMessageResponse {
  /** 상담 메세지 */
  createdCounselMessage?: CounselMessage;
  /** 상담 메세지 */
  counselorResponseMessage?: CounselMessage;
}

/** 성공 응답 DTO */
export interface SuccessCreateMessageResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 메시지 생성 응답 */
  data?: CreateMessageResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 메시지 반응 요청 */
export interface ReactMessageRequest {
  /** 메시지 반응 */
  reaction:
    | "COUNSEL_MESSAGE_REACTION_UNSPECIFIED"
    | "COUNSEL_MESSAGE_REACTION_LIKE"
    | "COUNSEL_MESSAGE_REACTION_DISLIKE"
    | "UNRECOGNIZED";
}

/** 메시지 반응 응답 */
export interface ReactMessageResponse {
  /** 상담 메세지 */
  counselMessage?: CounselMessage;
}

/** 성공 응답 DTO */
export interface SuccessReactMessageResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 메시지 반응 응답 */
  data?: ReactMessageResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 버블 생성 요청 */
export interface CreateBubbleRequest {
  /** 버블 질문 */
  question: string;
  /** 버블 응답 1 */
  responseOption1: string;
  /** 버블 응답 2 */
  responseOption2: string;
}

/** 버블 생성 응답 */
export interface CreateBubbleResponse {
  /** 버블 */
  bubble?: Bubble;
}

/** 성공 응답 DTO */
export interface SuccessCreateBubbleResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 버블 생성 응답 */
  data?: CreateBubbleResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 유저 ID로 조회 응답 */
export interface FindUserByIdResponse {
  /** 유저 정보 */
  user?: User;
}

/** 성공 응답 DTO */
export interface SuccessFindUserByIdResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 유저 ID로 조회 응답 */
  data?: FindUserByIdResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 유저 정보 */
export interface User {
  /** 유저 ID */
  id?: string;
  /** 닉네임 */
  nickname?: string;
  /** 유저 프로필 정보 */
  userProfile?: UserProfile;
  /** 생성 시간 */
  createdAt?: string;
  /** 수정 시간 */
  updatedAt?: string;
  /** 삭제 시간 */
  deletedAt?: string | null;
}

/** 유저 프로필 정보 */
export interface UserProfile {
  /** 프로필 이미지 URL */
  profileImage?: string | null;
  /** 성별 */
  gender?:
    | "GENDER_UNSPECIFIED"
    | "GENDER_MALE"
    | "GENDER_FEMALE"
    | "UNRECOGNIZED"
    | null;
  /** MBTI */
  mbti?:
    | "MBTI_UNSPECIFIED"
    | "MBTI_ENTP"
    | "MBTI_ENFP"
    | "MBTI_ENTJ"
    | "MBTI_ENFJ"
    | "MBTI_ESTP"
    | "MBTI_ESTJ"
    | "MBTI_ESFP"
    | "MBTI_ESFJ"
    | "MBTI_INTJ"
    | "MBTI_INFJ"
    | "MBTI_INTP"
    | "MBTI_INFP"
    | "MBTI_ISTP"
    | "MBTI_ISTJ"
    | "MBTI_ISFP"
    | "MBTI_ISFJ"
    | "UNRECOGNIZED"
    | null;
  /**
   * 생년
   * @format int32
   */
  birthYear?: number | null;
}

/** 톤 조회 응답 */
export interface FindTonesResponse {
  /** 톤 목록 */
  tones?: Tone[];
}

/** 성공 응답 DTO */
export interface SuccessFindTonesResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 톤 조회 응답 */
  data?: FindTonesResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 톤 ID로 조회 응답 */
export interface FindToneByIdResponse {
  /** 톤 */
  tone?: Tone;
}

/** 성공 응답 DTO */
export interface SuccessFindToneByIdResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 톤 ID로 조회 응답 */
  data?: FindToneByIdResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 톤 프롬프트 조회 응답 DTO */
export interface FindTonePromptByIdResponseDto {
  /** 톤 프롬프트 응답 DTO */
  tonePrompt?: TonePromptResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessFindTonePromptByIdResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 톤 프롬프트 조회 응답 DTO */
  data?: FindTonePromptByIdResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 프롬프트 버전 목록 조회 응답 DTO */
export interface FindPromptVersionsResponseDto {
  /** 프롬프트 버전 목록 */
  promptVersions?: PromptVersionResponseDto[];
}

/** 성공 응답 DTO */
export interface SuccessFindPromptVersionsResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 프롬프트 버전 목록 조회 응답 DTO */
  data?: FindPromptVersionsResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 프롬프트 버전 조회 응답 DTO */
export interface FindPromptVersionByIdResponseDto {
  /** 프롬프트 버전 응답 DTO */
  promptVersion?: PromptVersionResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessFindPromptVersionByIdResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 프롬프트 버전 조회 응답 DTO */
  data?: FindPromptVersionByIdResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 임시 버전 조회 응답 DTO */
export interface FindTemporaryVersionResponseDto {
  /** 프롬프트 버전 응답 DTO */
  promptVersion?: PromptVersionResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessFindTemporaryVersionResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 임시 버전 조회 응답 DTO */
  data?: FindTemporaryVersionResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 활성 버전 조회 응답 DTO */
export interface FindActiveVersionResponseDto {
  /** 프롬프트 버전 응답 DTO */
  promptVersion?: PromptVersionResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessFindActiveVersionResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 활성 버전 조회 응답 DTO */
  data?: FindActiveVersionResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 프롬프트 활성화 히스토리 목록 조회 응답 DTO */
export interface FindPromptActivateHistoriesResponseDto {
  /** 프롬프트 활성화 히스토리 목록 */
  promptActivateHistories?: PromptActivateHistoryResponseDto[];
}

/** 프롬프트 활성화 히스토리 응답 DTO */
export interface PromptActivateHistoryResponseDto {
  /**
   * 프롬프트 활성화 히스토리 ID
   * @example "pah_123456"
   */
  id?: string;
  /**
   * 프롬프트 버전 ID
   * @example "pv_123456"
   */
  promptVersionId?: string;
  /**
   * 활성화 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  activatedAt?: string;
  /**
   * 생성 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  createdAt?: string;
  /**
   * 수정 시간
   * @example "2024-06-01T12:34:56.000Z"
   */
  updatedAt?: string;
  /**
   * 삭제 시간
   * @example "null"
   */
  deletedAt?: string;
}

/** 성공 응답 DTO */
export interface SuccessFindPromptActivateHistoriesResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 프롬프트 활성화 히스토리 목록 조회 응답 DTO */
  data?: FindPromptActivateHistoriesResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 페르소나 프롬프트 조회 응답 DTO */
export interface FindPersonaPromptByIdResponseDto {
  /** 페르소나 프롬프트 응답 DTO */
  personaPrompt?: PersonaPromptResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessFindPersonaPromptByIdResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 페르소나 프롬프트 조회 응답 DTO */
  data?: FindPersonaPromptByIdResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담사 조회 응답 */
export interface FindCounselorsResponse {
  /** 상담사 목록 */
  counselors?: Counselor[];
}

/** 성공 응답 DTO */
export interface SuccessFindCounselorsResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담사 조회 응답 */
  data?: FindCounselorsResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담사 ID로 조회 응답 */
export interface FindCounselorByIdResponse {
  /** 상담사 */
  counselor?: Counselor;
}

/** 성공 응답 DTO */
export interface SuccessFindCounselorByIdResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담사 ID로 조회 응답 */
  data?: FindCounselorByIdResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 에피소드 조회 응답 */
export interface FindEpisodesResponse {
  /** 에피소드 목록 */
  episodes?: Episode[];
}

/** 성공 응답 DTO */
export interface SuccessFindEpisodesResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 에피소드 조회 응답 */
  data?: FindEpisodesResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 에피소드 ID로 조회 응답 */
export interface FindEpisodeByIdResponse {
  /** 에피소드 */
  episode?: Episode;
}

/** 성공 응답 DTO */
export interface SuccessFindEpisodeByIdResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 에피소드 ID로 조회 응답 */
  data?: FindEpisodeByIdResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담 목록 조회 응답 */
export interface FindCounselsResponse {
  /** 상담 목록 */
  counsels?: Counsel[];
}

/** 성공 응답 DTO */
export interface SuccessFindCounselsResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담 목록 조회 응답 */
  data?: FindCounselsResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담 단건 조회 응답 */
export interface FindCounselByIdResponse {
  /** 상담 */
  counsel?: Counsel;
}

/** 성공 응답 DTO */
export interface SuccessFindCounselByIdResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담 단건 조회 응답 */
  data?: FindCounselByIdResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 메시지 목록 조회 응답 */
export interface FindMessagesResponse {
  /** 상담 메시지 목록 */
  counselMessages?: CounselMessage[];
}

/** 성공 응답 DTO */
export interface SuccessFindMessagesResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 메시지 목록 조회 응답 */
  data?: FindMessagesResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 버블 조회 응답 */
export interface FindBubblesResponse {
  /** 버블 목록 */
  bubbles?: Bubble[];
}

/** 성공 응답 DTO */
export interface SuccessFindBubblesResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 버블 조회 응답 */
  data?: FindBubblesResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 버블 ID로 조회 응답 */
export interface FindBubbleByIdResponse {
  /** 버블 */
  bubble?: Bubble;
}

/** 성공 응답 DTO */
export interface SuccessFindBubbleByIdResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 버블 ID로 조회 응답 */
  data?: FindBubbleByIdResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담 기법 목록 조회 응답 DTO */
export interface FindOrderedCounselTechniquesResponseDto {
  /** 상담 기법 목록 */
  counselTechniques?: CounselTechniqueResponseDto[];
}

/** 성공 응답 DTO */
export interface SuccessFindOrderedCounselTechniquesResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담 기법 목록 조회 응답 DTO */
  data?: FindOrderedCounselTechniquesResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담 기법 조회 응답 DTO */
export interface FindCounselTechniqueByIdResponseDto {
  /** 상담 기법 응답 DTO */
  counselTechnique?: CounselTechniqueResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessFindCounselTechniqueByIdResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담 기법 조회 응답 DTO */
  data?: FindCounselTechniqueByIdResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

export type GetToneData = SuccessFindToneByIdResponse;

export type GetToneError = Error;

export type UpdateToneData = SuccessUpdateToneResponse;

export type UpdateToneError = Error;

export type GetTemporaryVersionData = SuccessFindTemporaryVersionResponseDto;

export type GetTemporaryVersionError = Error;

export type SaveVersionData = SuccessSaveTemporaryVersionResponseDto;

export type SaveVersionError = Error;

export type LoadPromptVersionData = SuccessLoadExistingPromptVersionResponseDto;

export type LoadPromptVersionError = Error;

export type UpdateTonePromptData = SuccessUpdateTonePromptResponseDto;

export type UpdateTonePromptError = Error;

export type UpdatePersonaPromptData = SuccessUpdatePersonaPromptResponseDto;

export type UpdatePersonaPromptError = Error;

export type UpdateCounselTechniqueData =
  SuccessUpdateCounselTechniqueResponseDto;

export type UpdateCounselTechniqueError = Error;

export type GetCounselorData = SuccessFindCounselorByIdResponse;

export type GetCounselorError = Error;

export type UpdateCounselorData = SuccessUpdateCounselorResponse;

export type UpdateCounselorError = Error;

export type GetEpisodeData = SuccessFindEpisodeByIdResponse;

export type GetEpisodeError = Error;

export type UpdateEpisodeData = SuccessUpdateEpisodeResponse;

export type UpdateEpisodeError = Error;

export type GetCounselor1Data = SuccessFindBubbleByIdResponse;

export type GetCounselor1Error = Error;

export type UpdateBubbleData = SuccessUpdateBubbleResponse;

export type UpdateBubbleError = Error;

export type RefreshTokenData = SuccessTokenResponseDto;

export type RefreshTokenError = Error;

export type CreateUserData = SuccessTokenResponseDto;

export type CreateUserError = Error;

export interface GetTonesParams {
  /** 톤 이름 (선택) */
  name?: string | null;
}

export type GetTonesData = SuccessFindTonesResponse;

export type GetTonesError = Error;

export type CreateToneData = SuccessCreateToneResponse;

export type CreateToneError = Error;

export type ActivatePromptVersionData = SuccessActivatePromptVersionResponseDto;

export type ActivatePromptVersionError = Error;

export type CreateCounselTechniqueData =
  SuccessCreateCounselTechniqueResponseDto;

export type CreateCounselTechniqueError = Error;

export type SaveCounselTechniqueSequenceData =
  SuccessSaveCounselTechniqueSequenceResponseDto;

export type SaveCounselTechniqueSequenceError = Error;

export interface GetCounselorsParams {
  /** 톤 ID (선택) */
  "tone-id"?: string;
}

export type GetCounselorsData = SuccessFindCounselorsResponse;

export type GetCounselorsError = Error;

export type CreateCounselorData = SuccessCreateCounselorResponse;

export type CreateCounselorError = Error;

export type GenerateCounselorImageUrlData =
  SuccessGenerateCounselorImageUrlResponse;

export type GenerateCounselorImageUrlError = Error;

export type GetEpisodesData = SuccessFindEpisodesResponse;

export type GetEpisodesError = Error;

export type CreateEpisodeData = SuccessCreateEpisodeResponse;

export type CreateEpisodeError = Error;

export type GenerateCutSceneImageUrlData =
  SuccessGenerateCutSceneImageUrlResponse;

export type GenerateCutSceneImageUrlError = Error;

export type GetCounselsData = SuccessFindCounselsResponse;

export type GetCounselsError = Error;

export type CreateCounselData = SuccessCreateCounselResponse;

export type CreateCounselError = Error;

export type GetMessagesData = SuccessFindMessagesResponse;

export type GetMessagesError = Error;

export type CreateMessageData = SuccessCreateMessageResponse;

export type CreateMessageError = Error;

export type ReactMessageData = SuccessReactMessageResponse;

export type ReactMessageError = Error;

export type GetBubblesData = SuccessFindBubblesResponse;

export type GetBubblesError = Error;

export type CreateBubbleData = SuccessCreateBubbleResponse;

export type CreateBubbleError = Error;

export interface KakaoParams {
  /** 로그인 후 리다이렉트할 클라이언트 URL */
  "redirect-url": string;
}

export type KakaoError = Error;

export interface KakaoCallbackParams {
  code?: string;
  state: string;
}

export type KakaoCallbackError = Error;

export type GetUserData = SuccessFindUserByIdResponse;

export type GetUserError = Error;

export type GetTonePromptByIdData = SuccessFindTonePromptByIdResponseDto;

export type GetTonePromptByIdError = Error;

export interface GetPromptVersionsParams {
  /**
   * 프롬프트 버전 이름
   * @example "2024년"
   */
  name?: string;
}

export type GetPromptVersionsData = SuccessFindPromptVersionsResponseDto;

export type GetPromptVersionsError = Error;

export type GetPromptVersionByIdData = SuccessFindPromptVersionByIdResponseDto;

export type GetPromptVersionByIdError = Error;

export type GetActiveVersionData = SuccessFindActiveVersionResponseDto;

export type GetActiveVersionError = Error;

export interface GetPromptActivateHistoriesParams {
  "prompt-version-id"?: string;
}

export type GetPromptActivateHistoriesData =
  SuccessFindPromptActivateHistoriesResponseDto;

export type GetPromptActivateHistoriesError = Error;

export type GetPersonaPromptByIdData = SuccessFindPersonaPromptByIdResponseDto;

export type GetPersonaPromptByIdError = Error;

export type GetCounselData = SuccessFindCounselByIdResponse;

export type GetCounselError = Error;

export type GetRandomBubbleData = SuccessFindBubbleByIdResponse;

export type GetRandomBubbleError = Error;

export interface GetOrderedCounselTechniquesParams {
  "first-counsel-technique-id": string;
}

export type GetOrderedCounselTechniquesData =
  SuccessFindOrderedCounselTechniquesResponseDto;

export type GetOrderedCounselTechniquesError = Error;

export type GetCounselTechniqueByIdData =
  SuccessFindCounselTechniqueByIdResponseDto;

export type GetCounselTechniqueByIdError = Error;
