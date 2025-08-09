import { Send } from 'lucide-react';

interface MessageInputProps {
  value: string;
  setValue: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

const MessageInput = ({ value, setValue, onSend, disabled }: MessageInputProps) => {
  return (
    <div className="mt-auto px-5 pb-5">
      <div className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          placeholder="내용을 입력해 주세요"
          className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
          disabled={disabled}
        />
        <button
          onClick={onSend}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white shadow disabled:opacity-50"
          disabled={disabled || !value.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
