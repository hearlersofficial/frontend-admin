interface RoomHeaderProps {
  canCreate: boolean;
  onCreate: () => void;
}

const RoomHeader = ({ canCreate, onCreate }: RoomHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div className="text-sm font-semibold text-white">상담방 목록</div>
      <button
        className="rounded-full bg-purpleGrad px-3 py-1 text-xs font-semibold text-white disabled:opacity-50"
        onClick={onCreate}
        disabled={!canCreate}
      >
        새 상담 시작
      </button>
    </div>
  );
};

export default RoomHeader;
