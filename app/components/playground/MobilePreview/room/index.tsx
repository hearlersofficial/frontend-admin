import RoomHeader from './RoomHeader';
import RoomList from './RoomList';
import { Counsel } from '~/__generated__/data-contracts';

interface RoomProps {
  canCreate: boolean;
  onCreate: () => void;
  counselList: Counsel[];
  onSelect: (counselId: string) => void;
  onOpenPromptInfo: (promptVersionId?: string) => void;
  promptVersionNameMap?: Record<string, string>;
}

const Room = ({ canCreate, onCreate, counselList, onSelect, onOpenPromptInfo, promptVersionNameMap }: RoomProps) => {
  return (
    <>
      <RoomHeader canCreate={canCreate} onCreate={onCreate} />
      <div className="mx-4 h-px bg-slate-200" />
      <RoomList
        counselList={counselList}
        onSelect={onSelect}
        onOpenPromptInfo={onOpenPromptInfo}
        promptVersionNameMap={promptVersionNameMap}
      />
    </>
  );
};

export default Room;
