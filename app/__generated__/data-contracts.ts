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

/** Tone 업데이트 요청 DTO */
export interface UpdateToneRequestDto {
  /**
   * Tone 이름 (선택사항)
   * @example "수정된 공감적 상담 톤"
   */
  name?: string;
  /**
   * Tone 내용 (선택사항)
   * @example "내담자의 감정에 더욱 깊이 공감하고 더 따뜻한 어조로 응답합니다."
   */
  body?: string;
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

/** 성공 응답 DTO */
export interface SuccessUpdateToneResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** Tone 업데이트 응답 DTO */
  data?: UpdateToneResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** Tone 응답 DTO */
export interface ToneResponseDto {
  /**
   * Tone ID
   * @example "tn_123456"
   */
  id?: string;
  /**
   * Tone 이름
   * @example "공감적 상담 톤"
   */
  name?: string;
  /**
   * Tone 내용
   * @example "내담자의 감정에 공감하고 따뜻한 어조로 응답합니다."
   */
  body?: string;
  /**
   * Tone 생성 시간
   * @example "2024-12-29T12:34:56.000Z"
   */
  createdAt?: string;
  /**
   * Tone 수정 시간
   * @example "2024-12-29T12:34:56.000Z"
   */
  updatedAt?: string;
  /**
   * Tone 삭제 시간
   * @example "2024-12-29T12:34:56.000Z"
   */
  deletedAt?: string;
}

/** Tone 업데이트 응답 DTO */
export interface UpdateToneResponseDto {
  /** Tone 응답 DTO */
  tone?: ToneResponseDto;
}

/** CounselTechnique 업데이트 요청 DTO */
export interface UpdateCounselTechniqueRequestDto {
  /**
   * CounselTechnique 이름 (선택사항)
   * @example "개선된 공감 반응 기법"
   */
  name?: string;
  /**
   * Tone ID (선택사항)(null로 보낼 시 톤 미변경)
   * @example "tone_567890"
   */
  toneId?: string | null;
  /**
   * Context (선택사항)
   * @example "ctx_123456"
   */
  context?: string;
  /**
   * Instruction (선택사항)
   * @example "instr_789012"
   */
  instruction?: string;
}

/** CounselTechnique 응답 DTO */
export interface CounselTechniqueResponseDto {
  /**
   * CounselTechnique ID
   * @example "ct_123456"
   */
  id?: string;
  /**
   * CounselTechnique 이름
   * @example "공감 반응 기법"
   */
  name?: string;
  /**
   * Tone ID
   * @example "tone_789012"
   */
  toneId?: string;
  /**
   * Context ID
   * @example "ctx_345678"
   */
  context?: string;
  /**
   * Instruction ID
   * @example "instr_901234"
   */
  instruction?: string;
  /**
   * 다음 CounselTechnique ID
   * @example "ct_567890"
   */
  nextCounselTechniqueId?: string;
  /**
   * CounselTechnique 생성 시간
   * @example "2024-12-29T12:34:56.000Z"
   */
  createdAt?: string;
  /**
   * CounselTechnique 수정 시간
   * @example "2024-12-29T12:34:56.000Z"
   */
  updatedAt?: string;
  /**
   * CounselTechnique 삭제 시간
   * @example "2024-12-29T12:34:56.000Z"
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
  /** CounselTechnique 업데이트 응답 DTO */
  data?: UpdateCounselTechniqueResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** CounselTechnique 업데이트 응답 DTO */
export interface UpdateCounselTechniqueResponseDto {
  /** CounselTechnique 응답 DTO */
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

/** Tone 생성 요청 DTO */
export interface CreateToneRequestDto {
  /**
   * Tone 이름
   * @example "공감적 상담 톤"
   */
  name: string;
  /**
   * Tone 내용
   * @example "내담자의 감정에 공감하고 따뜻한 어조로 응답합니다."
   */
  body: string;
}

/** Tone 생성 응답 DTO */
export interface CreateToneResponseDto {
  /** Tone 응답 DTO */
  tone?: ToneResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessCreateToneResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** Tone 생성 응답 DTO */
  data?: CreateToneResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** CounselTechnique 생성 요청 DTO */
export interface CreateCounselTechniqueRequestDto {
  /**
   * CounselTechnique 이름
   * @example "공감 반응 기법"
   */
  name: string;
  /**
   * Tone ID (선택사항)
   * @example "tone_789012"
   */
  toneId?: string;
  /**
   * Context
   * @example "ctx_345678"
   */
  context: string;
  /**
   * Instruction
   * @example "instr_901234"
   */
  instruction: string;
}

/** CounselTechnique 생성 응답 DTO */
export interface CreateCounselTechniqueResponseDto {
  /** CounselTechnique 응답 DTO */
  counselTechnique?: CounselTechniqueResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessCreateCounselTechniqueResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** CounselTechnique 생성 응답 DTO */
  data?: CreateCounselTechniqueResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** CounselTechnique 시퀀스 저장 요청 DTO */
export interface SaveCounselTechniqueSequenceRequestDto {
  /**
   * 순서대로 정렬된 CounselTechnique ID 목록
   * @example ["ct_123","ct_456","ct_789"]
   */
  counselTechniqueIds: string[];
}

/** CounselTechnique 시퀀스 저장 응답 DTO */
export interface SaveCounselTechniqueSequenceResponseDto {
  /** 업데이트된 CounselTechnique 목록 */
  counselTechniques?: CounselTechniqueResponseDto[];
}

/** 성공 응답 DTO */
export interface SuccessSaveCounselTechniqueSequenceResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** CounselTechnique 시퀀스 저장 응답 DTO */
  data?: SaveCounselTechniqueSequenceResponseDto;
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
  deletedAt?: string;
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

/** Tone 목록 조회 요청 DTO */
export interface GetTonesRequestDto {
  /**
   * 조회할 Tone 이름 (선택사항)
   * @example "공감적 상담"
   */
  name?: string;
}

/** Tone 목록 조회 응답 DTO */
export interface GetTonesResponseDto {
  /** Tone 목록 */
  tones?: ToneResponseDto[];
}

/** 성공 응답 DTO */
export interface SuccessGetTonesResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** Tone 목록 조회 응답 DTO */
  data?: GetTonesResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** Tone 조회 응답 DTO */
export interface GetToneByIdResponseDto {
  /** Tone 응답 DTO */
  tone?: ToneResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessGetToneByIdResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** Tone 조회 응답 DTO */
  data?: GetToneByIdResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** CounselTechnique 목록 조회 요청 DTO */
export interface GetCounselTechniquesRequestDto {
  /**
   * 조회할 CounselTechnique 이름 (선택사항)
   * @example "공감"
   */
  name?: string;
  /**
   * 조회할 Tone ID (선택사항)
   * @example "tone_789012"
   */
  toneId?: string;
}

/** CounselTechnique 목록 조회 응답 DTO */
export interface GetCounselTechniquesResponseDto {
  /** CounselTechnique 목록 */
  counselTechniques?: CounselTechniqueResponseDto[];
}

/** 성공 응답 DTO */
export interface SuccessGetCounselTechniquesResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** CounselTechnique 목록 조회 응답 DTO */
  data?: GetCounselTechniquesResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

/** CounselTechnique 조회 응답 DTO */
export interface GetCounselTechniqueByIdResponseDto {
  /** CounselTechnique 응답 DTO */
  counselTechnique?: CounselTechniqueResponseDto;
}

/** 성공 응답 DTO */
export interface SuccessGetCounselTechniqueByIdResponseDto {
  /**
   * 성공 메시지
   * @example "요청이 성공적으로 처리되었습니다."
   */
  message?: string;
  /** CounselTechnique 조회 응답 DTO */
  data?: GetCounselTechniqueByIdResponseDto;
  /**
   * 응답 시간
   * @example "2024-07-01 14:30:45"
   */
  timestamp?: string;
}

export type GetToneData = SuccessGetToneByIdResponseDto;

export type GetToneError = Error;

export type UpdateToneData = SuccessUpdateToneResponseDto;

export type UpdateToneError = Error;

export type GetCounselTechniqueData = SuccessGetCounselTechniqueByIdResponseDto;

export type GetCounselTechniqueError = Error;

export type UpdateCounselTechniqueData = SuccessUpdateCounselTechniqueResponseDto;

export type UpdateCounselTechniqueError = Error;

export type RefreshTokenData = any;

export type RefreshTokenError = Error;

export type CreateUserData = SuccessTokenResponseDto;

export type CreateUserError = Error;

export interface GetTonesParams {
  /** Tone 목록 조회 요청 DTO */
  request: GetTonesRequestDto;
}

export type GetTonesData = SuccessGetTonesResponseDto;

export type GetTonesError = Error;

export type CreateToneData = SuccessCreateToneResponseDto;

export type CreateToneError = Error;

export interface GetCounselTechniquesParams {
  /** CounselTechnique 목록 조회 요청 DTO */
  request: GetCounselTechniquesRequestDto;
}

export type GetCounselTechniquesData = SuccessGetCounselTechniquesResponseDto;

export type GetCounselTechniquesError = Error;

export type CreateCounselTechniqueData = SuccessCreateCounselTechniqueResponseDto;

export type CreateCounselTechniqueError = Error;

export type SaveCounselTechniqueSequenceData = SuccessSaveCounselTechniqueSequenceResponseDto;

export type SaveCounselTechniqueSequenceError = Error;

export interface GetCounselorsParams {
  /** 상담사 조회 요청 */
  request: FindCounselorsRequest;
}

export type GetCounselorsData = SuccessFindCounselorsResponse;

export type GetCounselorsError = Error;

export type KakaoError = Error;

export interface KakaoCallbackParams {
  code: string;
  state: string;
}

export type KakaoCallbackError = Error;
