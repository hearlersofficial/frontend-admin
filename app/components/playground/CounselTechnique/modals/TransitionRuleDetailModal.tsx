import React from 'react';
import { X } from 'lucide-react';
import { CounselTechniqueTransitionRuleResponseDto } from '~/__generated__/data-contracts';

interface TransitionRuleDetailModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  transitionRule: CounselTechniqueTransitionRuleResponseDto | null;
  fromTechniqueName?: string;
  toTechniqueName?: string;
}

const TransitionRuleDetailModal: React.FC<TransitionRuleDetailModalProps> = ({
  isOpen,
  setIsOpen,
  transitionRule,
  fromTechniqueName,
  toTechniqueName,
}) => {
  if (!isOpen || !transitionRule) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold">전환 규칙 상세 정보</h2>
          <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* 기본 정보 */}
          <div>
            <h3 className="mb-3 text-lg font-medium">기본 정보</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-600">전환 규칙 ID</div>
                <div className="text-sm">{transitionRule.id}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">우선순위</div>
                <div className="text-sm">{transitionRule.priority}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">출발 기법</div>
                <div className="text-sm">{fromTechniqueName || transitionRule.fromCounselTechniqueId}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">도착 기법</div>
                <div className="text-sm">{toTechniqueName || transitionRule.toCounselTechniqueId}</div>
              </div>
            </div>
          </div>

          {/* 메시지 수 조건 */}
          <div>
            <h3 className="mb-3 text-lg font-medium">메시지 수 조건</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-gray-600">최소 현재 기법 메시지 수</div>
                <div className="text-sm">{transitionRule.minCurrentTechniqueMessageCount || '제한 없음'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">최대 현재 기법 메시지 수</div>
                <div className="text-sm">{transitionRule.maxCurrentTechniqueMessageCount || '제한 없음'}</div>
              </div>
            </div>
          </div>

          {/* 감정 조건 */}
          {(transitionRule.requiredEmotionPrimaries?.length ||
            transitionRule.requiredValences?.length ||
            transitionRule.requiredArousalLevels?.length) && (
            <div>
              <h3 className="mb-3 text-lg font-medium">감정 조건</h3>
              <div className="space-y-2">
                {transitionRule.requiredEmotionPrimaries?.length && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">필수 주요 감정</div>
                    <div className="text-sm">{transitionRule.requiredEmotionPrimaries.join(', ')}</div>
                  </div>
                )}
                {transitionRule.requiredValences?.length && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">필수 감정 긍부정</div>
                    <div className="text-sm">{transitionRule.requiredValences.join(', ')}</div>
                  </div>
                )}
                {transitionRule.requiredArousalLevels?.length && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">필수 각성 수준</div>
                    <div className="text-sm">{transitionRule.requiredArousalLevels.join(', ')}</div>
                  </div>
                )}
                {(transitionRule.minEmotionIntensity || transitionRule.maxEmotionIntensity) && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600">최소 감정 강도</div>
                      <div className="text-sm">{transitionRule.minEmotionIntensity || '제한 없음'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">최대 감정 강도</div>
                      <div className="text-sm">{transitionRule.maxEmotionIntensity || '제한 없음'}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 기타 조건들 */}
          {(transitionRule.requiredImpactDomains?.length ||
            transitionRule.requiredTimeframes?.length ||
            transitionRule.requiredPerceivedControls?.length ||
            transitionRule.requiredMotivationStages?.length) && (
            <div>
              <h3 className="mb-3 text-lg font-medium">기타 조건</h3>
              <div className="space-y-2">
                {transitionRule.requiredImpactDomains?.length && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">필수 삶의 영역</div>
                    <div className="text-sm">{transitionRule.requiredImpactDomains.join(', ')}</div>
                  </div>
                )}
                {transitionRule.requiredTimeframes?.length && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">필수 시간 프레임</div>
                    <div className="text-sm">{transitionRule.requiredTimeframes.join(', ')}</div>
                  </div>
                )}
                {transitionRule.requiredPerceivedControls?.length && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">필수 통제감</div>
                    <div className="text-sm">{transitionRule.requiredPerceivedControls.join(', ')}</div>
                  </div>
                )}
                {transitionRule.requiredMotivationStages?.length && (
                  <div>
                    <div className="text-sm font-medium text-gray-600">필수 동기 단계</div>
                    <div className="text-sm">{transitionRule.requiredMotivationStages.join(', ')}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransitionRuleDetailModal;
