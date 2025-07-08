import CounselorList from './CounselorList';
import DeploymentHistoryButton from './DeploymentHistoryButton';
import GptVersionButton from './GptVersionButton';

const Sidebar = () => {
  return (
    <div className="flex w-[100px] flex-col justify-between">
      <CounselorList />

      <div className="flex flex-col gap-1 pr-2">
        <GptVersionButton />
        <DeploymentHistoryButton />
      </div>
    </div>
  );
};
export default Sidebar;
