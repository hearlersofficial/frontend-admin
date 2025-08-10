import CounselorList from './CounselorList';
import DeploymentHistoryButton from './DeploymentHistoryButton';

const Sidebar = () => {
  return (
    <div className="flex w-[100px] flex-col justify-between">
      <CounselorList />
      <DeploymentHistoryButton />
    </div>
  );
};
export default Sidebar;
