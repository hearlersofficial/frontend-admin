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

import {
  CreateCounselTechniqueData,
  CreateCounselTechniqueError,
  CreateCounselTechniqueRequestDto,
  CreateToneData,
  CreateToneError,
  CreateToneRequestDto,
  CreateUserData,
  CreateUserError,
  GetCounselorsData,
  GetCounselorsError,
  GetCounselorsParams,
  GetCounselTechniqueData,
  GetCounselTechniqueError,
  GetCounselTechniquesData,
  GetCounselTechniquesError,
  GetCounselTechniquesParams,
  GetToneData,
  GetToneError,
  GetTonesData,
  GetTonesError,
  GetTonesParams,
  KakaoCallbackError,
  KakaoCallbackParams,
  KakaoError,
  RefreshTokenData,
  RefreshTokenError,
  SaveCounselTechniqueSequenceData,
  SaveCounselTechniqueSequenceError,
  SaveCounselTechniqueSequenceRequestDto,
  UpdateCounselTechniqueData,
  UpdateCounselTechniqueError,
  UpdateCounselTechniqueRequestDto,
  UpdateToneData,
  UpdateToneError,
  UpdateToneRequestDto,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class V1<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description ID로 Tone을 조회합니다.
   *
   * @tags 상담 프롬프트
   * @name GetTone
   * @summary Tone 조회
   * @request GET:/v1/admin/tones/{toneId}
   * @secure
   */
  getTone = (toneId: string, params: RequestParams = {}) =>
    this.request<GetToneData, GetToneError>({
      path: `/v1/admin/tones/${toneId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 기존 Tone을 업데이트합니다.
   *
   * @tags 상담 프롬프트
   * @name UpdateTone
   * @summary Tone 업데이트
   * @request PUT:/v1/admin/tones/{toneId}
   * @secure
   */
  updateTone = (toneId: string, data: UpdateToneRequestDto, params: RequestParams = {}) =>
    this.request<UpdateToneData, UpdateToneError>({
      path: `/v1/admin/tones/${toneId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description ID로 CounselTechnique를 조회합니다.
   *
   * @tags 상담 프롬프트
   * @name GetCounselTechnique
   * @summary CounselTechnique 조회
   * @request GET:/v1/admin/counsel-techniques/{counselTechniqueId}
   * @secure
   */
  getCounselTechnique = (counselTechniqueId: string, params: RequestParams = {}) =>
    this.request<GetCounselTechniqueData, GetCounselTechniqueError>({
      path: `/v1/admin/counsel-techniques/${counselTechniqueId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 기존 CounselTechnique를 업데이트합니다.
   *
   * @tags 상담 프롬프트
   * @name UpdateCounselTechnique
   * @summary CounselTechnique 업데이트
   * @request PUT:/v1/admin/counsel-techniques/{counselTechniqueId}
   * @secure
   */
  updateCounselTechnique = (
    counselTechniqueId: string,
    data: UpdateCounselTechniqueRequestDto,
    params: RequestParams = {}
  ) =>
    this.request<UpdateCounselTechniqueData, UpdateCounselTechniqueError>({
      path: `/v1/admin/counsel-techniques/${counselTechniqueId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 리프레시 토큰으로 액세스 토큰 재발급
   *
   * @tags 인증
   * @name RefreshToken
   * @summary 액세스 토큰 재발급
   * @request POST:/v1/auth/refresh
   * @secure
   */
  refreshToken = (params: RequestParams = {}) =>
    this.request<RefreshTokenData, RefreshTokenError>({
      path: `/v1/auth/refresh`,
      method: 'POST',
      secure: true,
      ...params,
    });
  /**
   * @description 비로그인 유저를 생성하고, accessToken 발급
   *
   * @tags 인증
   * @name CreateUser
   * @summary 비로그인 유저 생성
   * @request POST:/v1/auth/initiate
   */
  createUser = (params: RequestParams = {}) =>
    this.request<CreateUserData, CreateUserError>({
      path: `/v1/auth/initiate`,
      method: 'POST',
      format: 'json',
      ...params,
    });
  /**
   * @description Tone 목록을 조회합니다.
   *
   * @tags 상담 프롬프트
   * @name GetTones
   * @summary Tone 목록 조회
   * @request GET:/v1/admin/tones
   * @secure
   */
  getTones = (query: GetTonesParams, params: RequestParams = {}) =>
    this.request<GetTonesData, GetTonesError>({
      path: `/v1/admin/tones`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 새로운 Tone을 생성합니다.
   *
   * @tags 상담 프롬프트
   * @name CreateTone
   * @summary Tone 생성
   * @request POST:/v1/admin/tones
   * @secure
   */
  createTone = (data: CreateToneRequestDto, params: RequestParams = {}) =>
    this.request<CreateToneData, CreateToneError>({
      path: `/v1/admin/tones`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description CounselTechnique 목록을 조회합니다.
   *
   * @tags 상담 프롬프트
   * @name GetCounselTechniques
   * @summary CounselTechnique 목록 조회
   * @request GET:/v1/admin/counsel-techniques
   * @secure
   */
  getCounselTechniques = (query: GetCounselTechniquesParams, params: RequestParams = {}) =>
    this.request<GetCounselTechniquesData, GetCounselTechniquesError>({
      path: `/v1/admin/counsel-techniques`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 새로운 CounselTechnique를 생성합니다.
   *
   * @tags 상담 프롬프트
   * @name CreateCounselTechnique
   * @summary CounselTechnique 생성
   * @request POST:/v1/admin/counsel-techniques
   * @secure
   */
  createCounselTechnique = (data: CreateCounselTechniqueRequestDto, params: RequestParams = {}) =>
    this.request<CreateCounselTechniqueData, CreateCounselTechniqueError>({
      path: `/v1/admin/counsel-techniques`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description CounselTechnique 시퀀스를 저장합니다.
   *
   * @tags 상담 프롬프트
   * @name SaveCounselTechniqueSequence
   * @summary CounselTechnique 시퀀스 저장
   * @request POST:/v1/admin/counsel-techniques/sequence
   * @secure
   */
  saveCounselTechniqueSequence = (data: SaveCounselTechniqueSequenceRequestDto, params: RequestParams = {}) =>
    this.request<SaveCounselTechniqueSequenceData, SaveCounselTechniqueSequenceError>({
      path: `/v1/admin/counsel-techniques/sequence`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담사를 조회합니다.
   *
   * @tags 상담사
   * @name GetCounselors
   * @summary 상담사 조회
   * @request GET:/v1/counselors
   * @secure
   */
  getCounselors = (query: GetCounselorsParams, params: RequestParams = {}) =>
    this.request<GetCounselorsData, GetCounselorsError>({
      path: `/v1/counselors`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 카카오 로그인을 위한 인증 코드 요청, 카카오로 리다이렉트
   *
   * @tags 인증
   * @name Kakao
   * @summary 카카오 로그인 요청
   * @request GET:/v1/auth/login/kakao
   * @secure
   */
  kakao = (params: RequestParams = {}) =>
    this.request<any, KakaoError>({
      path: `/v1/auth/login/kakao`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * @description 카카오 로그인을 통해 받은 인증코드 바탕으로 액세스토큰과 리프레시토큰 발급 후 쿠키에 저장
   *
   * @tags 인증
   * @name KakaoCallback
   * @summary 카카오 로그인 콜백
   * @request GET:/v1/auth/callback/kakao
   * @secure
   */
  kakaoCallback = (query: KakaoCallbackParams, params: RequestParams = {}) =>
    this.request<any, KakaoCallbackError>({
      path: `/v1/auth/callback/kakao`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    });
}
