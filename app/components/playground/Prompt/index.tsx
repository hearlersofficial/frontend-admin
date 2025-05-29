import PromptActions from './actions';
import PromptEditor from './editor';
import PromptLoader from './loader';

const Prompt = () => {
  return (
    <div className="flex flex-col gap-6">
      <PromptEditor />
      <PromptActions />
      <PromptLoader />
    </div>
  );
};
export default Prompt;
