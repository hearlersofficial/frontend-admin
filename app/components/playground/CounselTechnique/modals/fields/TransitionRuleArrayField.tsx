import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TransitionRuleField } from '../../constants/transitionRule';
import { KOREAN_LABELS } from '../../constants/transitionRule';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

interface TransitionRuleArrayFieldProps {
  field: TransitionRuleField;
  value: string[];
  onAdd: (field: string, value: string) => void;
  onRemove: (field: string, index: number) => void;
}

const TransitionRuleArrayField: React.FC<TransitionRuleArrayFieldProps> = ({ field, value, onAdd, onRemove }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const currentArray = value || [];
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
              className="inline-flex items-center gap-2 rounded-full bg-primary px-2 py-1 text-sm text-primary-foreground"
            >
              {KOREAN_LABELS[item] || item}
              <button type="button" onClick={() => onRemove(field.key, index)} title="제거">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* 추가 선택 드롭다운 */}
      {availableOptions.length > 0 && (
        <div className="flex gap-2">
          <Select
            value={selectedValue}
            onValueChange={(value) => {
              if (value && value !== '') {
                onAdd(field.key, value);
                setSelectedValue(''); // 선택 후 초기화
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="추가할 항목 선택..." />
            </SelectTrigger>
            <SelectContent className="w-full">
              {availableOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {KOREAN_LABELS[option] || option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 모든 옵션이 선택된 경우 */}
      {availableOptions.length === 0 && currentArray.length > 0 && (
        <div className="text-sm italic text-gray-500">모든 항목이 선택되었습니다.</div>
      )}
    </div>
  );
};

export default TransitionRuleArrayField;
