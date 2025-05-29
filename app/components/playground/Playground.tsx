import Technique from './CounselTechnique/Technique';
import Prompt from './Prompt';
import Sidebar from './Sidebar';

const Playground = () => {
  return (
    <div className="flex pr-20">
      <Sidebar />

      <div className="flex flex-1 rounded-xl rounded-tl-none bg-white px-8 py-6">
        <div className="flex flex-1 flex-col gap-6">
          <Technique />
          <Prompt />
        </div>
      </div>
    </div>
  );
};
export default Playground;
