interface PromptTextareaProps {
  value: string;
  onChange: (value: string) => void;
}

const PromptTextarea = ({ value, onChange }: PromptTextareaProps) => {
  return (
    <textarea
      placeholder="내용을 입력하세요"
      className="w-full rounded-2xl bg-[#F2F2F7] p-4 text-sm focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
export default PromptTextarea;
