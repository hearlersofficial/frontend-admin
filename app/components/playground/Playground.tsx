import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Technique from './CounselTechnique/Technique';
import Prompt from './Prompt';
import Sidebar from './Sidebar';

import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';
import MobilePreview from '~/components/playground/MobilePreview';

const Playground = () => {
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const setTemporaryVersion = usePromptStore((s) => s.setTemporaryVersion);

  const { data: temporaryVersionData } = useQuery({
    ...queries.v1.getTemporaryVersion,
  });

  useEffect(() => {
    if (temporaryVersionData?.data?.data?.promptVersion) {
      setTemporaryVersion(temporaryVersionData.data.data.promptVersion);
    }
  }, [temporaryVersionData, setTemporaryVersion]);

  return (
    <div className="flex pr-6">
      <Sidebar />

      <div className="flex flex-1 rounded-xl rounded-tl-none bg-white px-8 py-6">
        <div className="flex flex-1 flex-col gap-6">
          <Technique key={`technique-${temporaryVersion?.id}`} />
          <Prompt key={`prompt-${temporaryVersion?.id}`} />
        </div>
      </div>
      <div className="ml-6">
        <MobilePreview />
      </div>
    </div>
  );
};
export default Playground;
