import React, { useState, useEffect } from 'react';
import {
  CounselTechniqueTransitionRuleResponseDto,
  UpdateCounselTechniqueTransitionRuleRequestDto,
} from '~/__generated__/data-contracts';
import {
  TRANSITION_RULE_FIELDS,
  KOREAN_LABELS,
  SectionKor,
} from '~/components/playground/CounselTechnique/constants/transitionRule';
import { Modal } from '~/components/Modal';
import { useTransitionRuleManagement } from '~/components/playground/CounselTechnique/hooks/useTransitionRuleManagement';
import { Button } from '~/components/ui/button';
import { DialogFooter } from '~/components/ui/dialog';
import TransitionRuleArrayField from '~/components/playground/CounselTechnique/modals/fields/TransitionRuleArrayField';
import TransitionRuleFormField from '~/components/playground/CounselTechnique/modals/fields/TransitionRuleFormField';

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
  const { handleUpdateTransitionRule, handleDeleteTransitionRule } = useTransitionRuleManagement();

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
    requiredConsentToDepth: transitionRule?.requiredConsentToDepth,
    requiredPhysicalSymptomsPresent: transitionRule?.requiredPhysicalSymptomsPresent,
  });

  // transitionRule이 변경될 때 formData 업데이트
  useEffect(() => {
    if (transitionRule) {
      setFormData({
        priority: transitionRule.priority || 1,
        minCurrentTechniqueMessageCount: transitionRule.minCurrentTechniqueMessageCount,
        maxCurrentTechniqueMessageCount: transitionRule.maxCurrentTechniqueMessageCount,
        requiredEmotionPrimaries: transitionRule.requiredEmotionPrimaries || [],
        requiredValences: transitionRule.requiredValences || [],
        requiredArousalLevels: transitionRule.requiredArousalLevels || [],
        minEmotionIntensity: transitionRule.minEmotionIntensity,
        maxEmotionIntensity: transitionRule.maxEmotionIntensity,
        requiredImpactDomains: transitionRule.requiredImpactDomains || [],
        requiredTimeframes: transitionRule.requiredTimeframes || [],
        requiredPerceivedControls: transitionRule.requiredPerceivedControls || [],
        requiredMotivationStages: transitionRule.requiredMotivationStages || [],
        requiredSocialSupportLevels: transitionRule.requiredSocialSupportLevels || [],
        requiredRiskKinds: transitionRule.requiredRiskKinds || [],
        requiredSleepQualities: transitionRule.requiredSleepQualities || [],
        requiredCognitiveLoads: transitionRule.requiredCognitiveLoads || [],
        requiredAllianceStrengths: transitionRule.requiredAllianceStrengths || [],
        minSelfEfficacy: transitionRule.minSelfEfficacy,
        maxSelfEfficacy: transitionRule.maxSelfEfficacy,
        minRiskSeverity: transitionRule.minRiskSeverity,
        maxRiskSeverity: transitionRule.maxRiskSeverity,
        requiredConsentToDepth: transitionRule.requiredConsentToDepth,
        requiredPhysicalSymptomsPresent: transitionRule.requiredPhysicalSymptomsPresent,
      });
    }
  }, [transitionRule]);

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

  const handleDelete = async () => {
    if (!transitionRule?.id) return;

    setIsLoading(true);
    try {
      await handleDeleteTransitionRule(transitionRule.id);
    } catch (error) {
      console.error('Error deleting transition rule:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!transitionRule?.id) return;

    setIsLoading(true);
    try {
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
        requiredConsentToDepth: formData.requiredConsentToDepth,
        requiredPhysicalSymptomsPresent: formData.requiredPhysicalSymptomsPresent,
      };

      await handleUpdateTransitionRule(transitionRule.id, updateData);
      onSuccess?.();
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating transition rule:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDetailView = () => {
    const sections = Object.keys(SectionKor);

    return (
      <div className="space-y-6">
        {/* constants 기반 필드 렌더링 */}
        {sections.map((sectionKey) => {
          const sectionFields = TRANSITION_RULE_FIELDS.filter((field) => sectionKey.includes(field.section));

          if (sectionFields.length === 0) return null;

          return (
            <div key={sectionKey}>
              <h3 className="mb-3 text-lg font-medium">{SectionKor[sectionKey as keyof typeof SectionKor]}</h3>
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
                    const boolValue = value;

                    return (
                      <div key={field.key}>
                        <div className="text-sm font-medium text-gray-600">{field.label}</div>
                        <div className="text-sm">
                          {boolValue === undefined ? '제한 없음' : boolValue ? '예' : '아니오'}
                        </div>
                      </div>
                    );
                  } else if (field.type === 'enumList') {
                    const arrayValue = value as string[];
                    return (
                      <div key={field.key}>
                        <div className="text-sm font-medium text-gray-600">{field.label}</div>
                        <div className="text-sm">
                          {arrayValue?.length
                            ? arrayValue.map((item) => KOREAN_LABELS[item] || item).join(', ')
                            : '제한 없음'}
                        </div>
                      </div>
                    );
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
    const sections = Object.keys(SectionKor);

    return (
      <div className="space-y-6">
        {sections.map((sectionKey) => {
          const sectionFields = TRANSITION_RULE_FIELDS.filter((field) => sectionKey.includes(field.section));

          if (sectionFields.length === 0) return null;

          return (
            <div key={sectionKey}>
              <h3 className="mb-3 text-lg font-medium">{SectionKor[sectionKey as keyof typeof SectionKor]}</h3>
              <div className="space-y-4">
                {sectionFields.map((field) => (
                  <div key={field.key}>
                    {field.type === 'integer' || field.type === 'boolean' ? (
                      <TransitionRuleFormField
                        field={field}
                        value={formData[field.key as keyof typeof formData] as string | number | boolean | undefined}
                        required={field.required}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <TransitionRuleArrayField
                        field={field}
                        value={formData[field.key as keyof typeof formData] as string[]}
                        onAdd={handleArrayInputChange}
                        onRemove={removeArrayItem}
                        required={field.required}
                      />
                    )}
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
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{isEditMode ? renderFormView() : renderDetailView()}</div>

        {/* Footer */}
        <div className="flex flex-shrink-0 justify-end gap-3 border-t p-6">
          <DialogFooter>
            <div className="flex w-full items-center justify-between">
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    handleDelete();
                  }}
                  disabled={false}
                  className="rounded-full bg-[#D39393] text-base font-semibold"
                  size="lg"
                >
                  삭제
                </Button>

                <Button
                  onClick={() => (isEditMode ? handleUpdate() : setIsEditMode(true))}
                  disabled={false}
                  className="rounded-full bg-[#848484] text-base font-semibold"
                  size="lg"
                >
                  {isEditMode ? '완료' : '수정'}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </div>
      </div>
    </Modal>
  );
};

export default TransitionRuleDetailModal;
