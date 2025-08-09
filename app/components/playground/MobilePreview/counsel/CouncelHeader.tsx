interface CouncelHeaderProps {
  promptVersionName?: string;
  latestTechniqueName?: string;
  onBack: () => void;
  onOpenPromptInfo: () => void;
  onOpenTechniqueInfo: () => void;
}

const CouncelHeader = ({
  promptVersionName,
  latestTechniqueName,
  onBack,
  onOpenPromptInfo,
  onOpenTechniqueInfo,
}: CouncelHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <button className="text-sm text-white/80" onClick={onBack}>
        ← 목록으로
      </button>
      <div className="flex items-center gap-2">
        {promptVersionName && (
          <button className="rounded-full bg-purpleGrad px-2 py-1 text-xs text-white" onClick={onOpenPromptInfo}>
            {promptVersionName}
          </button>
        )}
        {latestTechniqueName && (
          <button className="rounded-full bg-redGrad px-2 py-1 text-xs text-white" onClick={onOpenTechniqueInfo}>
            {latestTechniqueName}
          </button>
        )}
      </div>
    </div>
  );
};

export default CouncelHeader;
