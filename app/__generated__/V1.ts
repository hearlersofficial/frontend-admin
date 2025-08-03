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
  ActivatePromptVersionData,
  ActivatePromptVersionError,
  CreateBubbleData,
  CreateBubbleError,
  CreateBubbleRequest,
  CreateCounselData,
  CreateCounselError,
  CreateCounselRequest,
  CreateCounselTechniqueData,
  CreateCounselTechniqueError,
  CreateCounselTechniqueRequestDto,
  CreateCounselorData,
  CreateCounselorError,
  CreateCounselorRequest,
  CreateEpisodeData,
  CreateEpisodeError,
  CreateEpisodeRequest,
  CreateMessageData,
  CreateMessageError,
  CreateMessageRequest,
  CreateToneData,
  CreateToneError,
  CreateToneRequest,
  CreateUserData,
  CreateUserError,
  GenerateCounselorImageUrlData,
  GenerateCounselorImageUrlError,
  GenerateCounselorImageUrlRequest,
  GenerateCutSceneImageUrlData,
  GenerateCutSceneImageUrlError,
  GenerateCutSceneImageUrlRequest,
  GetActiveVersionData,
  GetActiveVersionError,
  GetBubbles1Data,
  GetBubbles1Error,
  GetBubblesData,
  GetBubblesError,
  GetCounselData,
  GetCounselError,
  GetCounselTechniqueByIdData,
  GetCounselTechniqueByIdError,
  GetCounselor1Data,
  GetCounselor1Error,
  GetCounselor2Data,
  GetCounselor2Error,
  GetCounselor3Data,
  GetCounselor3Error,
  GetCounselorData,
  GetCounselorError,
  GetCounselorUserRelationshipsData,
  GetCounselorUserRelationshipsError,
  GetCounselors1Data,
  GetCounselors1Error,
  GetCounselors1Params,
  GetCounselorsData,
  GetCounselorsError,
  GetCounselorsParams,
  GetCounselsData,
  GetCounselsError,
  GetEpisode1Data,
  GetEpisode1Error,
  GetEpisodeData,
  GetEpisodeError,
  GetEpisodes1Data,
  GetEpisodes1Error,
  GetEpisodesData,
  GetEpisodesError,
  GetMessagesData,
  GetMessagesError,
  GetOrderedCounselTechniquesData,
  GetOrderedCounselTechniquesError,
  GetOrderedCounselTechniquesParams,
  GetPersonaPromptByIdData,
  GetPersonaPromptByIdError,
  GetPromptActivateHistoriesData,
  GetPromptActivateHistoriesError,
  GetPromptActivateHistoriesParams,
  GetPromptVersionByIdData,
  GetPromptVersionByIdError,
  GetPromptVersionsData,
  GetPromptVersionsError,
  GetPromptVersionsParams,
  GetRandomBubble1Data,
  GetRandomBubble1Error,
  GetRandomBubbleData,
  GetRandomBubbleError,
  GetTemporaryVersionData,
  GetTemporaryVersionError,
  GetTone1Data,
  GetTone1Error,
  GetToneData,
  GetToneError,
  GetTonePromptByIdData,
  GetTonePromptByIdError,
  GetTones1Data,
  GetTones1Error,
  GetTones1Params,
  GetTonesData,
  GetTonesError,
  GetTonesParams,
  KakaoCallbackError,
  KakaoCallbackParams,
  KakaoError,
  KakaoParams,
  LoadPromptVersionData,
  LoadPromptVersionError,
  ReactMessageData,
  ReactMessageError,
  ReactMessageRequest,
  RefreshTokenData,
  RefreshTokenError,
  SaveCounselTechniqueSequenceData,
  SaveCounselTechniqueSequenceError,
  SaveCounselTechniqueSequenceRequestDto,
  SaveTemporaryVersionRequestDto,
  SaveVersionData,
  SaveVersionError,
  UpdateBubbleData,
  UpdateBubbleError,
  UpdateBubbleRequest,
  UpdateCounselTechniqueData,
  UpdateCounselTechniqueError,
  UpdateCounselTechniqueRequestDto,
  UpdateCounselorData,
  UpdateCounselorError,
  UpdateCounselorRequest,
  UpdateEpisodeData,
  UpdateEpisodeError,
  UpdateEpisodeRequest,
  UpdatePersonaPromptData,
  UpdatePersonaPromptError,
  UpdatePersonaPromptRequestDto,
  UpdateToneData,
  UpdateToneError,
  UpdateTonePromptData,
  UpdateTonePromptError,
  UpdateTonePromptRequestDto,
  UpdateToneRequest,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class V1<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 톤을 단건 조회합니다.
   *
   * @tags 어드민/상담사
   * @name GetTone1
   * @summary 톤 단건 조회
   * @request GET:/v1/admin/tones/{tone-id}
   * @secure
   */
  getTone1 = (toneId: string, params: RequestParams = {}) =>
    this.request<GetTone1Data, GetTone1Error>({
      path: `/v1/admin/tones/${toneId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 기존 톤 정보를 업데이트합니다.
   *
   * @tags 어드민/상담사
   * @name UpdateTone
   * @summary 톤 업데이트
   * @request PUT:/v1/admin/tones/{tone-id}
   * @secure
   */
  updateTone = (toneId: string, data: UpdateToneRequest, params: RequestParams = {}) =>
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
   * @description 현재 수정 중인 임시 프롬프트 버전을 조회합니다. 2025.04.17 기준 피그마 상 보이는 모든 뷰는 이 API를 통하면 됩니다. 추후 토글을 통해 임시 버전과 활성화 버전을 왔다갈 수 있게 해야 좋을 듯 합니다. 임시 버전이 비게 되면, 임시 버전 라이프사이클에 의해 새로운 임시 버전이 자동 생성됩니다. 즉 오직 1개의 임시 버전이 항상 존재합니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name GetTemporaryVersion
   * @summary 현재 수정 중인 임시 프롬프트 버전 조회
   * @request GET:/v1/admin/prompt-versions/temporary-version
   * @secure
   */
  getTemporaryVersion = (params: RequestParams = {}) =>
    this.request<GetTemporaryVersionData, GetTemporaryVersionError>({
      path: `/v1/admin/prompt-versions/temporary-version`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 현재 수정 중인 임시 프롬프트 버전을 영구 저장합니다. 이름과 설명을 지정하여 임시 상태(isTemporary=true)에서 정식 버전(isTemporary=false)으로 전환됩니다. 저장을 통해 임시 버전이 비게 되면, 임시 버전 라이프사이클에 의해 새로운 임시 버전이 자동 생성됩니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name SaveVersion
   * @summary 임시 프롬프트 버전에 이름과 설명을 지정하고 영구 상태로 변경하여 저장
   * @request PUT:/v1/admin/prompt-versions/temporary-version
   * @secure
   */
  saveVersion = (data: SaveTemporaryVersionRequestDto, params: RequestParams = {}) =>
    this.request<SaveVersionData, SaveVersionError>({
      path: `/v1/admin/prompt-versions/temporary-version`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 저장된 버전을 임시 버전으로 복사합니다. 기존 수정 중이던 임시 버전을 덮어씁니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name LoadPromptVersion
   * @summary 임시 버전에 기존 프롬프트 버전 로드
   * @request PUT:/v1/admin/prompt-versions/temporary-version/{prompt-version-id}
   * @secure
   */
  loadPromptVersion = (promptVersionId: string, params: RequestParams = {}) =>
    this.request<LoadPromptVersionData, LoadPromptVersionError>({
      path: `/v1/admin/prompt-versions/temporary-version/${promptVersionId}`,
      method: 'PUT',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 임시 버전에서 톤 프롬프트를 업데이트합니다. 톤 ID와 본문을 지정할 수 있습니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name UpdateTonePrompt
   * @summary 임시 버전에서 톤 프롬프트 업데이트
   * @request PUT:/v1/admin/prompt-versions/temporary-version/tone-prompts
   * @secure
   */
  updateTonePrompt = (data: UpdateTonePromptRequestDto, params: RequestParams = {}) =>
    this.request<UpdateTonePromptData, UpdateTonePromptError>({
      path: `/v1/admin/prompt-versions/temporary-version/tone-prompts`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 임시 버전에서 페르소나 프롬프트를 업데이트합니다. 카운셀러 ID와 본문을 지정할 수 있습니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name UpdatePersonaPrompt
   * @summary 임시 버전에서 페르소나 프롬프트 업데이트
   * @request PUT:/v1/admin/prompt-versions/temporary-version/persona-prompts
   * @secure
   */
  updatePersonaPrompt = (data: UpdatePersonaPromptRequestDto, params: RequestParams = {}) =>
    this.request<UpdatePersonaPromptData, UpdatePersonaPromptError>({
      path: `/v1/admin/prompt-versions/temporary-version/persona-prompts`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 임시 버전에서 기존 상담 기법을 업데이트합니다. 아직 링크되지 않은 임시기법은 수정할 수 없습니다. 수정 후 해당 기법이 포함된 기법리스트가 반환됩니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name UpdateCounselTechnique
   * @summary 임시 버전에서 상담 기법 업데이트
   * @request PUT:/v1/admin/prompt-versions/temporary-version/counsel-techniques/{counsel-technique-id}
   * @secure
   */
  updateCounselTechnique = (
    counselTechniqueId: string,
    data: UpdateCounselTechniqueRequestDto,
    params: RequestParams = {}
  ) =>
    this.request<UpdateCounselTechniqueData, UpdateCounselTechniqueError>({
      path: `/v1/admin/prompt-versions/temporary-version/counsel-techniques/${counselTechniqueId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담사를 단건 조회합니다.
   *
   * @tags 어드민/상담사
   * @name GetCounselor2
   * @summary 상담사 단건 조회
   * @request GET:/v1/admin/counselors/{counselor-id}
   * @secure
   */
  getCounselor2 = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetCounselor2Data, GetCounselor2Error>({
      path: `/v1/admin/counselors/${counselorId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 기존 상담사 정보를 업데이트합니다.
   *
   * @tags 어드민/상담사
   * @name UpdateCounselor
   * @summary 상담사 업데이트
   * @request PUT:/v1/admin/counselors/{counselor-id}
   * @secure
   */
  updateCounselor = (counselorId: string, data: UpdateCounselorRequest, params: RequestParams = {}) =>
    this.request<UpdateCounselorData, UpdateCounselorError>({
      path: `/v1/admin/counselors/${counselorId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 에피소드를 단건 조회합니다.
   *
   * @tags 어드민/상담사
   * @name GetEpisode1
   * @summary 에피소드 단건 조회
   * @request GET:/v1/admin/counselors/{counselor-id}/episodes/{episode-id}
   * @secure
   */
  getEpisode1 = (episodeId: string, counselorId: string, params: RequestParams = {}) =>
    this.request<GetEpisode1Data, GetEpisode1Error>({
      path: `/v1/admin/counselors/${counselorId}/episodes/${episodeId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 기존 에피소드 정보를 업데이트합니다. 만약 컷씬을 업데이트하려면, 해당 컷씬의 ID를 포함해야 합니다. ID가 없는 경우, 새로운 컷씬이 생성됩니다. 만약 기존에 존재하는 컷씬을 포함하지 않으면, 해당 컷씬은 삭제됩니다.
   *
   * @tags 어드민/상담사
   * @name UpdateEpisode
   * @summary 에피소드 업데이트
   * @request PUT:/v1/admin/counselors/{counselor-id}/episodes/{episode-id}
   * @secure
   */
  updateEpisode = (episodeId: string, counselorId: string, data: UpdateEpisodeRequest, params: RequestParams = {}) =>
    this.request<UpdateEpisodeData, UpdateEpisodeError>({
      path: `/v1/admin/counselors/${counselorId}/episodes/${episodeId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 버블을 단건 조회합니다.
   *
   * @tags 어드민/상담사
   * @name GetCounselor3
   * @summary 버블 단건 조회
   * @request GET:/v1/admin/counselors/{counselor-id}/bubbles/{bubble-id}
   * @secure
   */
  getCounselor3 = (bubbleId: string, counselorId: string, params: RequestParams = {}) =>
    this.request<GetCounselor3Data, GetCounselor3Error>({
      path: `/v1/admin/counselors/${counselorId}/bubbles/${bubbleId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 기존 버블 정보를 업데이트합니다.
   *
   * @tags 어드민/상담사
   * @name UpdateBubble
   * @summary 버블 업데이트
   * @request PUT:/v1/admin/counselors/{counselor-id}/bubbles/{bubble-id}
   * @secure
   */
  updateBubble = (bubbleId: string, counselorId: string, data: UpdateBubbleRequest, params: RequestParams = {}) =>
    this.request<UpdateBubbleData, UpdateBubbleError>({
      path: `/v1/admin/counselors/${counselorId}/bubbles/${bubbleId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담사 ID 또는 'all'을 입력하여 상담 목록을 조회합니다.
   *
   * @tags 앱/상담
   * @name GetCounsels
   * @summary 상담 목록 조회
   * @request GET:/v1/counselors/{counselor-id}/counsels
   * @secure
   */
  getCounsels = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetCounselsData, GetCounselsError>({
      path: `/v1/counselors/${counselorId}/counsels`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 새로운 상담을 생성합니다.
   *
   * @tags 앱/상담
   * @name CreateCounsel
   * @summary 상담 생성
   * @request POST:/v1/counselors/{counselor-id}/counsels
   * @secure
   */
  createCounsel = (counselorId: string, data: CreateCounselRequest, params: RequestParams = {}) =>
    this.request<CreateCounselData, CreateCounselError>({
      path: `/v1/counselors/${counselorId}/counsels`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담의 메시지 목록을 조회합니다.
   *
   * @tags 앱/상담
   * @name GetMessages
   * @summary 메시지 목록 조회
   * @request GET:/v1/counselors/{counselor-id}/counsels/{counsel-id}/messages
   * @secure
   */
  getMessages = (counselorId: string, counselId: string, params: RequestParams = {}) =>
    this.request<GetMessagesData, GetMessagesError>({
      path: `/v1/counselors/${counselorId}/counsels/${counselId}/messages`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담에 새로운 메시지를 생성합니다.
   *
   * @tags 앱/상담
   * @name CreateMessage
   * @summary 메시지 생성
   * @request POST:/v1/counselors/{counselor-id}/counsels/{counsel-id}/messages
   * @secure
   */
  createMessage = (counselorId: string, counselId: string, data: CreateMessageRequest, params: RequestParams = {}) =>
    this.request<CreateMessageData, CreateMessageError>({
      path: `/v1/counselors/${counselorId}/counsels/${counselId}/messages`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 메시지에 반응을 추가합니다.
   *
   * @tags 앱/상담
   * @name ReactMessage
   * @summary 메시지 반응
   * @request POST:/v1/counselors/{counselor-id}/counsels/{counsel-id}/messages/{message-id}/react
   * @secure
   */
  reactMessage = (
    counselorId: string,
    counselId: string,
    messageId: string,
    data: ReactMessageRequest,
    params: RequestParams = {}
  ) =>
    this.request<ReactMessageData, ReactMessageError>({
      path: `/v1/counselors/${counselorId}/counsels/${counselId}/messages/${messageId}/react`,
      method: 'POST',
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
      format: 'json',
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
   * @description 톤을 복수 조회합니다.
   *
   * @tags 어드민/상담사
   * @name GetTones1
   * @summary 톤 복수 조회
   * @request GET:/v1/admin/tones
   * @secure
   */
  getTones1 = (query: GetTones1Params, params: RequestParams = {}) =>
    this.request<GetTones1Data, GetTones1Error>({
      path: `/v1/admin/tones`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 새로운 톤을 생성합니다.
   *
   * @tags 어드민/상담사
   * @name CreateTone
   * @summary 톤 생성
   * @request POST:/v1/admin/tones
   * @secure
   */
  createTone = (data: CreateToneRequest, params: RequestParams = {}) =>
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
   * @description 저장된 버전을 활성화합니다(서비스에 반영). 이후 생성되는 상담들부터 해당 버전이 적용되며, 기존 상담들에는 영향이 없습니다. 임시버전은 활성화할 수 없습니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name ActivatePromptVersion
   * @summary 프롬프트 버전 활성화
   * @request POST:/v1/admin/prompt-versions/{prompt-version-id}/activate
   * @secure
   */
  activatePromptVersion = (promptVersionId: string, params: RequestParams = {}) =>
    this.request<ActivatePromptVersionData, ActivatePromptVersionError>({
      path: `/v1/admin/prompt-versions/${promptVersionId}/activate`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 새로운 상담 기법을 임시기법으로 생성합니다. 임시기법은 다른 기법들과 링크되지 않으며, 추후 순서 지정이 필요합니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name CreateCounselTechnique
   * @summary 임시 버전에 새로운 상담 기법 생성
   * @request POST:/v1/admin/prompt-versions/temporary-version/counsel-techniques
   * @secure
   */
  createCounselTechnique = (data: CreateCounselTechniqueRequestDto, params: RequestParams = {}) =>
    this.request<CreateCounselTechniqueData, CreateCounselTechniqueError>({
      path: `/v1/admin/prompt-versions/temporary-version/counsel-techniques`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 임시 버전에서 상담 기법 시퀀스를 저장합니다. 기존 기법 및 임시기법들을 연결하고, 연결된 최종 기법 리스트를 반환합니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name SaveCounselTechniqueSequence
   * @summary 임시 버전에서 상담 기법 시퀀스 저장
   * @request POST:/v1/admin/prompt-versions/temporary-version/counsel-techniques/all/sequences
   * @secure
   */
  saveCounselTechniqueSequence = (data: SaveCounselTechniqueSequenceRequestDto, params: RequestParams = {}) =>
    this.request<SaveCounselTechniqueSequenceData, SaveCounselTechniqueSequenceError>({
      path: `/v1/admin/prompt-versions/temporary-version/counsel-techniques/all/sequences`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담사를 복수 조회합니다.
   *
   * @tags 어드민/상담사
   * @name GetCounselors1
   * @summary 상담사 복수 조회
   * @request GET:/v1/admin/counselors
   * @secure
   */
  getCounselors1 = (query: GetCounselors1Params, params: RequestParams = {}) =>
    this.request<GetCounselors1Data, GetCounselors1Error>({
      path: `/v1/admin/counselors`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 새로운 상담사를 생성합니다.
   *
   * @tags 어드민/상담사
   * @name CreateCounselor
   * @summary 상담사 생성
   * @request POST:/v1/admin/counselors
   * @secure
   */
  createCounselor = (data: CreateCounselorRequest, params: RequestParams = {}) =>
    this.request<CreateCounselorData, CreateCounselorError>({
      path: `/v1/admin/counselors`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담사 이미지 업로드를 위한 Presigned URL을 생성합니다.
   *
   * @tags 어드민/상담사
   * @name GenerateCounselorImageUrl
   * @summary 상담사 이미지 URL 생성
   * @request POST:/v1/admin/counselors/{counselor-id}/image-url
   * @secure
   */
  generateCounselorImageUrl = (
    counselorId: string,
    data: GenerateCounselorImageUrlRequest,
    params: RequestParams = {}
  ) =>
    this.request<GenerateCounselorImageUrlData, GenerateCounselorImageUrlError>({
      path: `/v1/admin/counselors/${counselorId}/image-url`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 에피소드를 복수 조회합니다.
   *
   * @tags 어드민/상담사
   * @name GetEpisodes1
   * @summary 에피소드 복수 조회
   * @request GET:/v1/admin/counselors/{counselor-id}/episodes
   * @secure
   */
  getEpisodes1 = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetEpisodes1Data, GetEpisodes1Error>({
      path: `/v1/admin/counselors/${counselorId}/episodes`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 새로운 에피소드를 생성합니다.
   *
   * @tags 어드민/상담사
   * @name CreateEpisode
   * @summary 에피소드 생성
   * @request POST:/v1/admin/counselors/{counselor-id}/episodes
   * @secure
   */
  createEpisode = (counselorId: string, data: CreateEpisodeRequest, params: RequestParams = {}) =>
    this.request<CreateEpisodeData, CreateEpisodeError>({
      path: `/v1/admin/counselors/${counselorId}/episodes`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 컷신 이미지 업로드를 위한 Presigned URL을 생성합니다.
   *
   * @tags 어드민/상담사
   * @name GenerateCutSceneImageUrl
   * @summary 컷신 이미지 URL 생성
   * @request POST:/v1/admin/counselors/{counselor-id}/episodes/{episode-id}/image-url
   * @secure
   */
  generateCutSceneImageUrl = (
    episodeId: string,
    counselorId: string,
    data: GenerateCutSceneImageUrlRequest,
    params: RequestParams = {}
  ) =>
    this.request<GenerateCutSceneImageUrlData, GenerateCutSceneImageUrlError>({
      path: `/v1/admin/counselors/${counselorId}/episodes/${episodeId}/image-url`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 버블을 복수 조회합니다.
   *
   * @tags 어드민/상담사
   * @name GetBubbles1
   * @summary 버블 복수 조회
   * @request GET:/v1/admin/counselors/{counselor-id}/bubbles
   * @secure
   */
  getBubbles1 = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetBubbles1Data, GetBubbles1Error>({
      path: `/v1/admin/counselors/${counselorId}/bubbles`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 새로운 버블을 생성합니다.
   *
   * @tags 어드민/상담사
   * @name CreateBubble
   * @summary 버블 생성
   * @request POST:/v1/admin/counselors/{counselor-id}/bubbles
   * @secure
   */
  createBubble = (counselorId: string, data: CreateBubbleRequest, params: RequestParams = {}) =>
    this.request<CreateBubbleData, CreateBubbleError>({
      path: `/v1/admin/counselors/${counselorId}/bubbles`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description 톤을 복수 조회합니다.
   *
   * @tags 앱/상담사
   * @name GetTones
   * @summary 톤 복수 조회
   * @request GET:/v1/tones
   * @secure
   */
  getTones = (query: GetTonesParams, params: RequestParams = {}) =>
    this.request<GetTonesData, GetTonesError>({
      path: `/v1/tones`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 톤을 단건 조회합니다.
   *
   * @tags 앱/상담사
   * @name GetTone
   * @summary 톤 단건 조회
   * @request GET:/v1/tones/{tone-id}
   * @secure
   */
  getTone = (toneId: string, params: RequestParams = {}) =>
    this.request<GetToneData, GetToneError>({
      path: `/v1/tones/${toneId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담사를 복수 조회합니다.
   *
   * @tags 앱/상담사
   * @name GetCounselors
   * @summary 상담사 복수 조회
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
   * @description 상담사를 단건 조회합니다.
   *
   * @tags 앱/상담사
   * @name GetCounselor
   * @summary 상담사 단건 조회
   * @request GET:/v1/counselors/{counselor-id}
   * @secure
   */
  getCounselor = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetCounselorData, GetCounselorError>({
      path: `/v1/counselors/${counselorId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담사와 유저의 관계를 조회합니다.
   *
   * @tags 앱/상담
   * @name GetCounselorUserRelationships
   * @summary 상담사와 유저의 관계 조회
   * @request GET:/v1/counselors/{counselor-id}/relationships
   * @secure
   */
  getCounselorUserRelationships = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetCounselorUserRelationshipsData, GetCounselorUserRelationshipsError>({
      path: `/v1/counselors/${counselorId}/relationships`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 에피소드를 복수 조회합니다.
   *
   * @tags 앱/상담사
   * @name GetEpisodes
   * @summary 에피소드 복수 조회
   * @request GET:/v1/counselors/{counselor-id}/episodes
   * @secure
   */
  getEpisodes = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetEpisodesData, GetEpisodesError>({
      path: `/v1/counselors/${counselorId}/episodes`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 에피소드를 단건 조회합니다.
   *
   * @tags 앱/상담사
   * @name GetEpisode
   * @summary 에피소드 단건 조회
   * @request GET:/v1/counselors/{counselor-id}/episodes/{episode-id}
   * @secure
   */
  getEpisode = (episodeId: string, counselorId: string, params: RequestParams = {}) =>
    this.request<GetEpisodeData, GetEpisodeError>({
      path: `/v1/counselors/${counselorId}/episodes/${episodeId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담을 단건 조회합니다.
   *
   * @tags 앱/상담
   * @name GetCounsel
   * @summary 상담 단건 조회
   * @request GET:/v1/counselors/{counselor-id}/counsels/{counsel-id}
   * @secure
   */
  getCounsel = (counselorId: string, counselId: string, params: RequestParams = {}) =>
    this.request<GetCounselData, GetCounselError>({
      path: `/v1/counselors/${counselorId}/counsels/${counselId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 버블을 복수 조회합니다.
   *
   * @tags 앱/상담사
   * @name GetBubbles
   * @summary 버블 복수 조회
   * @request GET:/v1/counselors/{counselor-id}/bubbles
   * @secure
   */
  getBubbles = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetBubblesData, GetBubblesError>({
      path: `/v1/counselors/${counselorId}/bubbles`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 버블을 단건 조회합니다.
   *
   * @tags 앱/상담사
   * @name GetCounselor1
   * @summary 버블 단건 조회
   * @request GET:/v1/counselors/{counselor-id}/bubbles/{bubble-id}
   * @secure
   */
  getCounselor1 = (bubbleId: string, counselorId: string, params: RequestParams = {}) =>
    this.request<GetCounselor1Data, GetCounselor1Error>({
      path: `/v1/counselors/${counselorId}/bubbles/${bubbleId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 버블을 랜덤으로 조회합니다.
   *
   * @tags 앱/상담사
   * @name GetRandomBubble
   * @summary 버블 랜덤 조회
   * @request GET:/v1/counselors/{counselor-id}/bubbles/random
   * @secure
   */
  getRandomBubble = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetRandomBubbleData, GetRandomBubbleError>({
      path: `/v1/counselors/${counselorId}/bubbles/random`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 카카오 로그인을 위한 인증 코드 요청, 카카오로 리다이렉트. swagger에서는 사용 불가. a 태그로 접근
   *
   * @tags 인증
   * @name Kakao
   * @summary 카카오 로그인 요청
   * @request GET:/v1/auth/login/kakao
   * @secure
   */
  kakao = (query: KakaoParams, params: RequestParams = {}) =>
    this.request<any, KakaoError>({
      path: `/v1/auth/login/kakao`,
      method: 'GET',
      query: query,
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
   */
  kakaoCallback = (query: KakaoCallbackParams, params: RequestParams = {}) =>
    this.request<any, KakaoCallbackError>({
      path: `/v1/auth/callback/kakao`,
      method: 'GET',
      query: query,
      ...params,
    });
  /**
   * @description ID로 톤 프롬프트를 조회합니다. 톤 프롬프트는 불변객체이며, 수정 시 새로운 객체가 생성됩니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name GetTonePromptById
   * @summary 톤 프롬프트 조회
   * @request GET:/v1/admin/tone-prompts/{tone-prompt-id}
   * @secure
   */
  getTonePromptById = (tonePromptId: string, params: RequestParams = {}) =>
    this.request<GetTonePromptByIdData, GetTonePromptByIdError>({
      path: `/v1/admin/tone-prompts/${tonePromptId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 프롬프트 버전 목록을 조회합니다. 옵션으로 이름 검색이 가능합니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name GetPromptVersions
   * @summary 프롬프트 버전 목록 조회
   * @request GET:/v1/admin/prompt-versions
   * @secure
   */
  getPromptVersions = (query: GetPromptVersionsParams, params: RequestParams = {}) =>
    this.request<GetPromptVersionsData, GetPromptVersionsError>({
      path: `/v1/admin/prompt-versions`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description ID로 특정 프롬프트 버전을 조회합니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name GetPromptVersionById
   * @summary 프롬프트 버전 조회
   * @request GET:/v1/admin/prompt-versions/{prompt-version-id}
   * @secure
   */
  getPromptVersionById = (promptVersionId: string, params: RequestParams = {}) =>
    this.request<GetPromptVersionByIdData, GetPromptVersionByIdError>({
      path: `/v1/admin/prompt-versions/${promptVersionId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 현재 활성화된 프롬프트 버전을 조회합니다. 활성화된 버전은 수정이 불가능 합니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name GetActiveVersion
   * @summary 현재 활성화된 프롬프트 버전 조회 (TBD)
   * @request GET:/v1/admin/prompt-versions/active-version
   * @secure
   */
  getActiveVersion = (params: RequestParams = {}) =>
    this.request<GetActiveVersionData, GetActiveVersionError>({
      path: `/v1/admin/prompt-versions/active-version`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 프롬프트 활성화 히스토리 목록을 조회합니다. 특정 버전 ID로 필터링할 수 있습니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name GetPromptActivateHistories
   * @summary 프롬프트 활성화 히스토리 목록 조회
   * @request GET:/v1/admin/prompt-activate-histories
   * @secure
   */
  getPromptActivateHistories = (query: GetPromptActivateHistoriesParams, params: RequestParams = {}) =>
    this.request<GetPromptActivateHistoriesData, GetPromptActivateHistoriesError>({
      path: `/v1/admin/prompt-activate-histories`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description ID로 페르소나 프롬프트를 조회합니다. 페르소나 프롬프트는 불변객체이며, 수정 시 새로운 객체가 생성됩니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name GetPersonaPromptById
   * @summary 페르소나 프롬프트 조회
   * @request GET:/v1/admin/persona-prompts/{persona-prompt-id}
   * @secure
   */
  getPersonaPromptById = (personaPromptId: string, params: RequestParams = {}) =>
    this.request<GetPersonaPromptByIdData, GetPersonaPromptByIdError>({
      path: `/v1/admin/persona-prompts/${personaPromptId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 버블을 랜덤으로 조회합니다.
   *
   * @tags 어드민/상담사
   * @name GetRandomBubble1
   * @summary 버블 랜덤 조회
   * @request GET:/v1/admin/counselors/{counselor-id}/bubbles/random
   * @secure
   */
  getRandomBubble1 = (counselorId: string, params: RequestParams = {}) =>
    this.request<GetRandomBubble1Data, GetRandomBubble1Error>({
      path: `/v1/admin/counselors/${counselorId}/bubbles/random`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description 상담 기법을 전체 조회하거나, 첫 번째 상담 기법 ID를 통해 연결된 모든 상담 기법 목록을 조회합니다. first-counsel-technique-id 파라미터가 없으면 전체 조회, 있으면 해당 ID로 시작하는 연결된 기법들을 순서대로 반환합니다. **현재 전체 조회는 구현되지 않았습니다. 이에 따라 쿼리 파라미터가 필수입니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name GetOrderedCounselTechniques
   * @summary 상담 기법 전체 조회 || 첫 번째 상담 기법 ID를 통해 연결된 모든 상담 기법 목록 조회
   * @request GET:/v1/admin/counsel-techniques
   * @secure
   */
  getOrderedCounselTechniques = (query: GetOrderedCounselTechniquesParams, params: RequestParams = {}) =>
    this.request<GetOrderedCounselTechniquesData, GetOrderedCounselTechniquesError>({
      path: `/v1/admin/counsel-techniques`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    });
  /**
   * @description ID로 상담 기법을 조회합니다. 상담 기법은 불변객체이며, 수정 시 새로운 객체가 생성됩니다.
   *
   * @tags 어드민/상담 프롬프트
   * @name GetCounselTechniqueById
   * @summary 상담 기법 조회
   * @request GET:/v1/admin/counsel-techniques/{counsel-technique-id}
   * @secure
   */
  getCounselTechniqueById = (counselTechniqueId: string, params: RequestParams = {}) =>
    this.request<GetCounselTechniqueByIdData, GetCounselTechniqueByIdError>({
      path: `/v1/admin/counsel-techniques/${counselTechniqueId}`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...params,
    });
}
