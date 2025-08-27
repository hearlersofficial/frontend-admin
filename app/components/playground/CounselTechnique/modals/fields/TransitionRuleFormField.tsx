import React from 'react';
import { TransitionRuleField } from '../../constants/transitionRule';

interface TransitionRuleFormFieldProps {
  field: TransitionRuleField;
  value: string | number | boolean | undefined;
  onChange: (field: string, value: string | number | boolean | undefined) => void;
}

const TransitionRuleFormField: React.FC<TransitionRuleFormFieldProps> = ({ field, value, onChange }) => {
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
            typeof value === 'boolean' && value === true
              ? 'true'
              : typeof value === 'boolean' && value === false
                ? 'false'
                : ''
          }
          onChange={(e) =>
            onChange(field.key, e.target.value === 'true' ? true : e.target.value === 'false' ? false : undefined)
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
          value={typeof value === 'number' ? value : ''}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue === '' || /^\d+$/.test(inputValue)) {
              const numValue = inputValue === '' ? undefined : parseInt(inputValue, 10);
              if (
                numValue === undefined ||
                ((field.min === undefined || numValue >= field.min) &&
                  (field.max === undefined || numValue <= field.max))
              ) {
                onChange(field.key, numValue);
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

export default TransitionRuleFormField;
