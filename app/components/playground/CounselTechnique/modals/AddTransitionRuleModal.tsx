import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { SectionKor, TRANSITION_RULE_FIELDS } from '~/components/playground/CounselTechnique/constants/transitionRule';
import { Modal } from '~/components/Modal';
import { useTransitionRuleManagement } from '~/components/playground/CounselTechnique/hooks/useTransitionRuleManagement';
import TransitionRuleFormField from './fields/TransitionRuleFormField';
import TransitionRuleArrayField from './fields/TransitionRuleArrayField';
import { CreateCounselTechniqueTransitionRuleRequest } from '~/api/v1';

interface AddTransitionRuleModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  fromTechniqueId?: string;
  toTechniqueId?: string;
  fromTechniqueName?: string;
  toTechniqueName?: string;
  onSuccess?: () => void;
}

const AddTransitionRuleModal: React.FC<AddTransitionRuleModalProps> = ({
  isOpen,
  setIsOpen,
  fromTechniqueId,
  toTechniqueId,
  fromTechniqueName,
  toTechniqueName,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleCreateTransitionRule } = useTransitionRuleManagement();

  // 폼 상태
  const [formData, setFormData] = useState({
    priority: 1,
    minCurrentTechniqueMessageCount: null,
    maxCurrentTechniqueMessageCount: null,
    requiredEmotionPrimaries: [],
    requiredValences: [],
    requiredArousalLevels: [],
    minEmotionIntensity: null,
    maxEmotionIntensity: null,
    requiredImpactDomains: [],
    requiredTimeframes: [],
    requiredPerceivedControls: [],
    requiredMotivationStages: [],
    requiredSocialSupportLevels: [],
    requiredRiskKinds: [],
    requiredSleepQualities: [],
    requiredCognitiveLoads: [],
    requiredAllianceStrengths: [],
    minSelfEfficacy: null,
    maxSelfEfficacy: null,
    minRiskSeverity: null,
    maxRiskSeverity: null,
    requiredConsentToDepth: null,
    requiredPhysicalSymptomsPresent: null,
  });

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
    setIsLoading(true);
    try {
      const createData: CreateCounselTechniqueTransitionRuleRequest = {
        fromCounselTechniqueId: fromTechniqueId ?? '',
        toCounselTechniqueId: toTechniqueId ?? '',
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

      await handleCreateTransitionRule(createData);
      onSuccess?.();
      setIsOpen(false);

      // 폼 초기화
      setFormData({
        priority: 1,
        minCurrentTechniqueMessageCount: null,
        maxCurrentTechniqueMessageCount: null,
        requiredEmotionPrimaries: [],
        requiredValences: [],
        requiredArousalLevels: [],
        minEmotionIntensity: null,
        maxEmotionIntensity: null,
        requiredImpactDomains: [],
        requiredTimeframes: [],
        requiredPerceivedControls: [],
        requiredMotivationStages: [],
        requiredSocialSupportLevels: [],
        requiredRiskKinds: [],
        requiredSleepQualities: [],
        requiredCognitiveLoads: [],
        requiredAllianceStrengths: [],
        minSelfEfficacy: null,
        maxSelfEfficacy: null,
        minRiskSeverity: null,
        maxRiskSeverity: null,
        requiredConsentToDepth: null,
        requiredPhysicalSymptomsPresent: null,
      });
    } catch (error) {
      console.error('Error creating transition rule:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormView = () => {
    const sections = Object.keys(SectionKor);

    return (
      <div className="space-y-6">
        {sections.map((sectionKey) => {
          const sectionKor = SectionKor[sectionKey as keyof typeof SectionKor];
          const sectionFields = TRANSITION_RULE_FIELDS.filter((field) => sectionKey.includes(field.section));

          if (sectionFields.length === 0) return null;

          return (
            <div key={sectionKey}>
              <h3 className="mb-3 text-lg font-medium">{sectionKor}</h3>
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

  if (!isOpen) return null;

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
        <div className="flex-1 overflow-y-auto p-6">{renderFormView()}</div>

        {/* Footer */}
        <div className="flex flex-shrink-0 justify-end gap-3 border-t p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full border-2 border-[#848484] bg-white px-4 py-2 text-sm font-semibold text-[#848484] hover:bg-gray-50"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-full bg-[#736A84] px-4 py-2 text-white hover:bg-[#736A84]/80 disabled:opacity-50"
          >
            {isLoading ? (
              '생성 중...'
            ) : (
              <>
                <Save className="h-4 w-4" />
                생성
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTransitionRuleModal;
