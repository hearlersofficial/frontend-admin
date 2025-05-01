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
}

/** 에러 응답 DTO */
export interface Error {
  /**
   * HTTP 상태 코드
   * @example "BAD_REQUEST"
   */
  status?:
    | '100 CONTINUE'
    | '101 SWITCHING_PROTOCOLS'
    | '102 PROCESSING'
    | '103 EARLY_HINTS'
    | '103 CHECKPOINT'
    | '200 OK'
    | '201 CREATED'
    | '202 ACCEPTED'
    | '203 NON_AUTHORITATIVE_INFORMATION'
    | '204 NO_CONTENT'
    | '205 RESET_CONTENT'
    | '206 PARTIAL_CONTENT'
    | '207 MULTI_STATUS'
    | '208 ALREADY_REPORTED'
    | '226 IM_USED'
    | '300 MULTIPLE_CHOICES'
    | '301 MOVED_PERMANENTLY'
    | '302 FOUND'
    | '302 MOVED_TEMPORARILY'
    | '303 SEE_OTHER'
    | '304 NOT_MODIFIED'
    | '305 USE_PROXY'
    | '307 TEMPORARY_REDIRECT'
    | '308 PERMANENT_REDIRECT'
    | '400 BAD_REQUEST'
    | '401 UNAUTHORIZED'
    | '402 PAYMENT_REQUIRED'
    | '403 FORBIDDEN'
    | '404 NOT_FOUND'
    | '405 METHOD_NOT_ALLOWED'
    | '406 NOT_ACCEPTABLE'
    | '407 PROXY_AUTHENTICATION_REQUIRED'
    | '408 REQUEST_TIMEOUT'
    | '409 CONFLICT'
    | '410 GONE'
    | '411 LENGTH_REQUIRED'
    | '412 PRECONDITION_FAILED'
    | '413 PAYLOAD_TOO_LARGE'
    | '413 REQUEST_ENTITY_TOO_LARGE'
    | '414 URI_TOO_LONG'
    | '414 REQUEST_URI_TOO_LONG'
    | '415 UNSUPPORTED_MEDIA_TYPE'
    | '416 REQUESTED_RANGE_NOT_SATISFIABLE'
    | '417 EXPECTATION_FAILED'
    | '418 I_AM_A_TEAPOT'
    | '419 INSUFFICIENT_SPACE_ON_RESOURCE'
    | '420 METHOD_FAILURE'
    | '421 DESTINATION_LOCKED'
    | '422 UNPROCESSABLE_ENTITY'
    | '423 LOCKED'
    | '424 FAILED_DEPENDENCY'
    | '425 TOO_EARLY'
    | '426 UPGRADE_REQUIRED'
    | '428 PRECONDITION_REQUIRED'
    | '429 TOO_MANY_REQUESTS'
    | '431 REQUEST_HEADER_FIELDS_TOO_LARGE'
    | '451 UNAVAILABLE_FOR_LEGAL_REASONS'
    | '500 INTERNAL_SERVER_ERROR'
    | '501 NOT_IMPLEMENTED'
    | '502 BAD_GATEWAY'
    | '503 SERVICE_UNAVAILABLE'
    | '504 GATEWAY_TIMEOUT'
    | '505 HTTP_VERSION_NOT_SUPPORTED'
    | '506 VARIANT_ALSO_NEGOTIATES'
    | '507 INSUFFICIENT_STORAGE'
    | '508 LOOP_DETECTED'
    | '509 BANDWIDTH_LIMIT_EXCEEDED'
    | '510 NOT_EXTENDED'
    | '511 NETWORK_AUTHENTICATION_REQUIRED';
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
  active?: boolean;
  temporary?: boolean;
  bookmarked?: boolean;
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
   * 상담 기법 ID
   * @example "ct_123456"
   */
  counselTechniqueId?: string;
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
   * 다음 상담 기법 ID
   * @example "ct_789012"
   */
  nextCounselTechniqueId?: string;
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
  temporary?: boolean;
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
  /** 상담 기법 응답 DTO */
  counselTechnique?: CounselTechniqueResponseDto;
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

/** 톤 목록 조회 요청 */
export interface FindTonesRequest {
  /**
   * 톤 이름 (선택)
   * @example "공감"
   */
  name?: string | null;
}

/** 톤 목록 조회 응답 */
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
  /** 톤 목록 조회 응답 */
  data?: FindTonesResponse;
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
  /**
   * 톤 이름
   * @example "공감"
   */
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

/** 톤 ID로 조회 응답 */
export interface FindToneResponse {
  /** 톤 */
  tone?: Tone;
}

/** 성공 응답 DTO */
export interface SuccessFindToneResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 톤 ID로 조회 응답 */
  data?: FindToneResponse;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** 상담사 조회 요청 */
export interface FindCounselorsRequest {
  /**
   * 톤 ID (선택)
   * @example "tone_123456"
   */
  toneId?: string | null;
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
  /** 상담사 성별 */
  gender?:
    | 'COUNSELOR_GENDER_UNSPECIFIED'
    | 'COUNSELOR_GENDER_MALE'
    | 'COUNSELOR_GENDER_FEMALE'
    | 'COUNSELOR_GENDER_NONE'
    | 'UNRECOGNIZED';
  /** 상담사 소개 메시지 */
  introMessage?: string;
  /** 상담사 응답 옵션 1 */
  responseOption1?: string;
  /** 상담사 응답 옵션 2 */
  responseOption2?: string;
  /** 상담사 생성 시간 */
  createdAt?: string;
  /** 상담사 수정 시간 */
  updatedAt?: string;
  /** 상담사 삭제 시간 */
  deletedAt?: string | null;
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

/** 상담사 단일 조회 응답 */
export interface FindCounselorResponse {
  /** 상담사 */
  counselor?: Counselor;
}

/** 성공 응답 DTO */
export interface SuccessFindCounselorResponse {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 상담사 단일 조회 응답 */
  data?: FindCounselorResponse;
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

/** 프롬프트 버전 조회 요청 DTO */
export interface FindPromptVersionsRequestDto {
  /**
   * 프롬프트 버전 이름
   * @example "2024년"
   */
  name?: string;
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

/** 성공 응답 DTO */
export interface SuccessVoid {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** 응답 데이터 */
  data?: object;
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

export type UpdateCounselTechniqueData = SuccessUpdateCounselTechniqueResponseDto;

export type UpdateCounselTechniqueError = Error;

export type RefreshTokenData = any;

export type RefreshTokenError = Error;

export type CreateUserData = SuccessTokenResponseDto;

export type CreateUserError = Error;

export type ActivatePromptVersionData = SuccessActivatePromptVersionResponseDto;

export type ActivatePromptVersionError = Error;

export type CreateCounselTechniqueData = SuccessCreateCounselTechniqueResponseDto;

export type CreateCounselTechniqueError = Error;

export type SaveCounselTechniqueSequenceData = SuccessSaveCounselTechniqueSequenceResponseDto;

export type SaveCounselTechniqueSequenceError = Error;

export interface GetTonesParams {
  /** 톤 목록 조회 요청 */
  request: FindTonesRequest;
}

export type GetTonesData = SuccessFindTonesResponse;

export type GetTonesError = Error;

export type GetToneData = SuccessFindToneResponse;

export type GetToneError = Error;

export interface GetCounselorsParams {
  /** 상담사 조회 요청 */
  request: FindCounselorsRequest;
}

export type GetCounselorsData = SuccessFindCounselorsResponse;

export type GetCounselorsError = Error;

export type GetCounselorData = SuccessFindCounselorResponse;

export type GetCounselorError = Error;

export type KakaoError = Error;

export interface KakaoCallbackParams {
  code?: string;
  state: string;
}

export type KakaoCallbackError = Error;

export type GetTonePromptByIdData = SuccessFindTonePromptByIdResponseDto;

export type GetTonePromptByIdError = Error;

export interface GetPromptVersionsParams {
  /** 프롬프트 버전 조회 요청 DTO */
  request: FindPromptVersionsRequestDto;
}

export type GetPromptVersionsData = SuccessFindPromptVersionsResponseDto;

export type GetPromptVersionsError = Error;

export type GetPromptVersionByIdData = SuccessFindPromptVersionByIdResponseDto;

export type GetPromptVersionByIdError = Error;

export type GetActiveVersionData = SuccessVoid;

export type GetActiveVersionError = Error;

export interface GetPromptActivateHistoriesParams {
  'prompt-version-id'?: string;
}

export type GetPromptActivateHistoriesData = SuccessFindPromptActivateHistoriesResponseDto;

export type GetPromptActivateHistoriesError = Error;

export type GetPersonaPromptByIdData = SuccessFindPersonaPromptByIdResponseDto;

export type GetPersonaPromptByIdError = Error;

export interface GetOrderedCounselTechniquesParams {
  'first-counsel-technique-id': string;
}

export type GetOrderedCounselTechniquesData = SuccessFindOrderedCounselTechniquesResponseDto;

export type GetOrderedCounselTechniquesError = Error;

export type GetCounselTechniqueByIdData = SuccessFindCounselTechniqueByIdResponseDto;

export type GetCounselTechniqueByIdError = Error;
