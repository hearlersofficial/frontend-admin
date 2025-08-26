import React, { useState } from 'react';
import { X, Edit, Save, Plus } from 'lucide-react';
import {
  CounselTechniqueTransitionRuleResponseDto,
  CreateCounselTechniqueTransitionRuleRequestDto,
  UpdateCounselTechniqueTransitionRuleRequestDto,
} from '~/__generated__/data-contracts';
import {
  TRANSITION_RULE_FIELDS,
  KOREAN_LABELS,
  SECTIONS,
  TransitionRuleField,
} from '~/components/playground/CounselTechnique/constants/transitionRule';
import { Modal } from '~/components/Modal';
import { useTransitionRuleManagement } from '~/components/playground/CounselTechnique/hooks/useTransitionRuleManagement';

interface TransitionRuleDetailModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  transitionRule: CounselTechniqueTransitionRuleResponseDto | null;
  fromTechniqueName?: string;
  toTechniqueName?: string;
  onSuccess?: () => void;
}

const TransitionRuleDetailModal: React.FC<TransitionRuleDetailModalProps> = ({
  isOpen,
  setIsOpen,
  transitionRule,
  fromTechniqueName,
  toTechniqueName,
  onSuccess,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { handleCreateTransitionRule, handleUpdateTransitionRule } = useTransitionRuleManagement();

  // 폼 상태
  const [formData, setFormData] = useState({
    priority: transitionRule?.priority || 1,
    minCurrentTechniqueMessageCount: transitionRule?.minCurrentTechniqueMessageCount,
    maxCurrentTechniqueMessageCount: transitionRule?.maxCurrentTechniqueMessageCount,
    requiredEmotionPrimaries: transitionRule?.requiredEmotionPrimaries || [],
    requiredValences: transitionRule?.requiredValences || [],
    requiredArousalLevels: transitionRule?.requiredArousalLevels || [],
    minEmotionIntensity: transitionRule?.minEmotionIntensity,
    maxEmotionIntensity: transitionRule?.maxEmotionIntensity,
    requiredImpactDomains: transitionRule?.requiredImpactDomains || [],
    requiredTimeframes: transitionRule?.requiredTimeframes || [],
    requiredPerceivedControls: transitionRule?.requiredPerceivedControls || [],
    requiredMotivationStages: transitionRule?.requiredMotivationStages || [],
    requiredSocialSupportLevels: transitionRule?.requiredSocialSupportLevels || [],
    requiredRiskKinds: transitionRule?.requiredRiskKinds || [],
    requiredSleepQualities: transitionRule?.requiredSleepQualities || [],
    requiredCognitiveLoads: transitionRule?.requiredCognitiveLoads || [],
    requiredAllianceStrengths: transitionRule?.requiredAllianceStrengths || [],
    minSelfEfficacy: transitionRule?.minSelfEfficacy,
    maxSelfEfficacy: transitionRule?.maxSelfEfficacy,
    minRiskSeverity: transitionRule?.minRiskSeverity,
    maxRiskSeverity: transitionRule?.maxRiskSeverity,
  });

  const isCreateMode = !transitionRule?.id || transitionRule?.id === '';
  const isUpdateMode = !!transitionRule?.id && transitionRule?.id !== '';

  const handleInputChange = (field: string, value: string | number | string[] | boolean | undefined) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayInputChange = (field: string, value: string) => {
    const currentArray = (formData[field as keyof typeof formData] as string[]) || [];
    if (value && !currentArray.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...currentArray, value],
      }));
    }
  };

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = (formData[field as keyof typeof formData] as string[]) || [];
    setFormData((prev) => ({
      ...prev,
      [field]: currentArray.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!transitionRule?.fromCounselTechniqueId || !transitionRule?.toCounselTechniqueId) return;

    setIsLoading(true);
    try {
      if (isCreateMode) {
        const createData: CreateCounselTechniqueTransitionRuleRequestDto = {
          fromCounselTechniqueId: transitionRule.fromCounselTechniqueId,
          toCounselTechniqueId: transitionRule.toCounselTechniqueId,
          priority: formData.priority,
          minCurrentTechniqueMessageCount: formData.minCurrentTechniqueMessageCount,
          maxCurrentTechniqueMessageCount: formData.maxCurrentTechniqueMessageCount,
          requiredEmotionPrimaries: formData.requiredEmotionPrimaries,
          requiredValences: formData.requiredValences,
          requiredArousalLevels: formData.requiredArousalLevels,
          minEmotionIntensity: formData.minEmotionIntensity,
          maxEmotionIntensity: formData.maxEmotionIntensity,
          requiredImpactDomains: formData.requiredImpactDomains,
          requiredTimeframes: formData.requiredTimeframes,
          requiredPerceivedControls: formData.requiredPerceivedControls,
          requiredMotivationStages: formData.requiredMotivationStages,
          requiredSocialSupportLevels: formData.requiredSocialSupportLevels,
          requiredRiskKinds: formData.requiredRiskKinds,
          requiredSleepQualities: formData.requiredSleepQualities,
          requiredCognitiveLoads: formData.requiredCognitiveLoads,
          requiredAllianceStrengths: formData.requiredAllianceStrengths,
          minSelfEfficacy: formData.minSelfEfficacy,
          maxSelfEfficacy: formData.maxSelfEfficacy,
          minRiskSeverity: formData.minRiskSeverity,
          maxRiskSeverity: formData.maxRiskSeverity,
        };

        handleCreateTransitionRule(createData);
      } else if (isUpdateMode) {
        const updateData: UpdateCounselTechniqueTransitionRuleRequestDto = {
          priority: formData.priority,
          minCurrentTechniqueMessageCount: formData.minCurrentTechniqueMessageCount,
          maxCurrentTechniqueMessageCount: formData.maxCurrentTechniqueMessageCount,
          requiredEmotionPrimaries: formData.requiredEmotionPrimaries,
          requiredValences: formData.requiredValences,
          requiredArousalLevels: formData.requiredArousalLevels,
          minEmotionIntensity: formData.minEmotionIntensity,
          maxEmotionIntensity: formData.maxEmotionIntensity,
          requiredImpactDomains: formData.requiredImpactDomains,
          requiredTimeframes: formData.requiredTimeframes,
          requiredPerceivedControls: formData.requiredPerceivedControls,
          requiredMotivationStages: formData.requiredMotivationStages,
          requiredSocialSupportLevels: formData.requiredSocialSupportLevels,
          requiredRiskKinds: formData.requiredRiskKinds,
          requiredSleepQualities: formData.requiredSleepQualities,
          requiredCognitiveLoads: formData.requiredCognitiveLoads,
          requiredAllianceStrengths: formData.requiredAllianceStrengths,
          minSelfEfficacy: formData.minSelfEfficacy,
          maxSelfEfficacy: formData.maxSelfEfficacy,
          minRiskSeverity: formData.minRiskSeverity,
          maxRiskSeverity: formData.maxRiskSeverity,
        };

        handleUpdateTransitionRule(transitionRule.id!, updateData);
      }

      onSuccess?.();
      setIsOpen(false);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error saving transition rule:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormField = (field: TransitionRuleField) => {
    const fieldValue = formData[field.key as keyof typeof formData];

    return (
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor={field.key}>
          {field.label}
          {field.type === 'integer' && field.min !== undefined && field.max !== undefined && (
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({field.min} ~ {field.max})
            </span>
          )}
        </label>
        {field.type === 'boolean' ? (
          <select
            id={field.key}
            value={
              typeof fieldValue === 'boolean' && fieldValue === true
                ? 'true'
                : typeof fieldValue === 'boolean' && fieldValue === false
                  ? 'false'
                  : ''
            }
            onChange={(e) =>
              handleInputChange(
                field.key,
                e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined
              )
            }
            className="w-full rounded border p-2"
          >
            <option value="">선택하세요</option>
            <option value="true">예</option>
            <option value="false">아니오</option>
          </select>
        ) : (
          <input
            id={field.key}
            type="number"
            step="1"
            value={typeof fieldValue === 'number' ? fieldValue : ''}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^\d+$/.test(value)) {
                const numValue = value === '' ? undefined : parseInt(value, 10);
                if (
                  numValue === undefined ||
                  ((field.min === undefined || numValue >= field.min) &&
                    (field.max === undefined || numValue <= field.max))
                ) {
                  handleInputChange(field.key, numValue);
                }
              }
            }}
            onKeyDown={(e) => {
              // 소숫점, 음수 부호, e, E 등 입력 방지
              if (['.', '-', 'e', 'E'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className="w-full rounded border p-2"
          />
        )}
      </div>
    );
  };

  const renderArrayField = (field: TransitionRuleField) => {
    const currentArray = (formData[field.key as keyof typeof formData] as string[]) || [];
    const availableOptions = field.options?.filter((option) => !currentArray.includes(option)) || [];

    return (
      <div>
        <label className="mb-1 block font-semibold text-[#4F4F4F]" htmlFor={field.key}>
          {field.label}
          <span className="ml-2 text-sm font-normal text-gray-500">({currentArray.length}개 선택됨)</span>
        </label>

        {/* 선택된 항목들 */}
        {currentArray.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {currentArray.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-[#F0D467] px-3 py-1 text-sm text-[#4F4F4F]"
              >
                {KOREAN_LABELS[item] || item}
                <button
                  type="button"
                  onClick={() => removeArrayItem(field.key, index)}
                  className="ml-2 text-[#4F4F4F] hover:text-[#4F4F4F]/80"
                  title="제거"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* 추가 선택 드롭다운 */}
        {availableOptions.length > 0 && (
          <div className="flex gap-2">
            <select
              id={field.key}
              onChange={(e) => {
                if (e.target.value && e.target.value !== '') {
                  handleArrayInputChange(field.key, e.target.value);
                  e.target.value = '';
                }
              }}
              className="flex-1 rounded border p-2"
            >
              <option value="">추가할 항목 선택...</option>
              {availableOptions.map((option) => (
                <option key={option} value={option}>
                  {KOREAN_LABELS[option] || option}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                const select = document.querySelector(`select#${field.key}`) as HTMLSelectElement;
                if (select?.value && select.value !== '') {
                  handleArrayInputChange(field.key, select.value);
                  select.value = '';
                }
              }}
              className="rounded-full bg-[#736A84] px-3 py-2 text-white hover:bg-[#736A84]/80 disabled:opacity-50"
              disabled={availableOptions.length === 0}
              title="선택된 항목 추가"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* 모든 옵션이 선택된 경우 */}
        {availableOptions.length === 0 && currentArray.length > 0 && (
          <div className="text-sm italic text-gray-500">모든 항목이 선택되었습니다.</div>
        )}
      </div>
    );
  };

  const renderDetailView = () => {
    const sections = Object.keys(SECTIONS);

    return (
      <div className="space-y-6">
        {/* constants 기반 필드 렌더링 */}
        {sections.map((sectionKey) => {
          const section = SECTIONS[sectionKey as keyof typeof SECTIONS];
          const sectionFields = TRANSITION_RULE_FIELDS.filter((field) => field.section === sectionKey).sort(
            (a, b) => a.order - b.order
          );

          if (sectionFields.length === 0) return null;

          return (
            <div key={sectionKey}>
              <h3 className="mb-3 text-lg font-medium">{section.title}</h3>
              <div className="space-y-2">
                {sectionFields.map((field) => {
                  const value = transitionRule?.[field.key as keyof typeof transitionRule];

                  if (field.type === 'integer') {
                    return (
                      <div key={field.key}>
                        <div className="text-sm font-medium text-gray-600">{field.label}</div>
                        <div className="text-sm">{value || '제한 없음'}</div>
                      </div>
                    );
                  } else if (field.type === 'boolean') {
                    const boolValue = value as boolean;
                    if (boolValue !== undefined) {
                      return (
                        <div key={field.key}>
                          <div className="text-sm font-medium text-gray-600">{field.label}</div>
                          <div className="text-sm">{boolValue ? '예' : '아니오'}</div>
                        </div>
                      );
                    }
                  } else if (field.type === 'enumList') {
                    const arrayValue = value as string[];
                    if (arrayValue?.length) {
                      return (
                        <div key={field.key}>
                          <div className="text-sm font-medium text-gray-600">{field.label}</div>
                          <div className="text-sm">
                            {arrayValue.map((item) => KOREAN_LABELS[item] || item).join(', ')}
                          </div>
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderFormView = () => {
    const sections = Object.keys(SECTIONS);

    return (
      <div className="space-y-6">
        {sections.map((sectionKey) => {
          const section = SECTIONS[sectionKey as keyof typeof SECTIONS];
          const sectionFields = TRANSITION_RULE_FIELDS.filter((field) => field.section === sectionKey).sort(
            (a, b) => a.order - b.order
          );

          if (sectionFields.length === 0) return null;

          return (
            <div key={sectionKey}>
              <h3 className="mb-3 text-lg font-medium">{section.title}</h3>
              <div className="space-y-4">
                {sectionFields.map((field) => (
                  <div key={field.key}>
                    {field.type === 'integer' || field.type === 'boolean'
                      ? renderFormField(field)
                      : renderArrayField(field)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!isOpen || !transitionRule) return null;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxWidth="4xl">
      <div className="flex h-[90vh] w-full flex-col">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold text-[#4F4F4F]">
            {fromTechniqueName} → {toTechniqueName}
          </h2>
          <div className="flex items-center gap-2">
            {!isEditMode && isUpdateMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-2 rounded-full bg-[#736A84] px-4 py-2 text-white hover:bg-[#736A84]/80"
              >
                <Edit className="h-4 w-4" />
                수정하기
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isEditMode || isCreateMode ? renderFormView() : renderDetailView()}
        </div>

        {/* Footer */}
        <div className="flex flex-shrink-0 justify-end gap-3 border-t p-6">
          {(isEditMode || isCreateMode) && (
            <>
              {isEditMode && (
                <button
                  onClick={() => setIsEditMode(false)}
                  className="rounded-full border-2 border-[#848484] bg-white px-4 py-2 text-sm font-semibold text-[#848484] hover:bg-gray-50"
                >
                  취소
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center gap-2 rounded-full bg-[#736A84] px-4 py-2 text-white hover:bg-[#736A84]/80 disabled:opacity-50"
              >
                {isLoading ? (
                  '저장 중...'
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {isCreateMode ? '생성' : '수정'}
                  </>
                )}
              </button>
            </>
          )}
          {!isEditMode && !isCreateMode && (
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-[#736A84] px-4 py-2 text-white hover:bg-[#736A84]/80"
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransitionRuleDetailModal;
