import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Technique from './CounselTechnique/Technique';
import Prompt from './Prompt';
import Sidebar from './Sidebar';

import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';

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
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar />
      <div className="flex w-full flex-1 overflow-hidden rounded-xl rounded-tl-none bg-white px-8 py-6">
        <div className="flex w-full flex-1 flex-col gap-6 overflow-hidden">
          <Technique key={`technique-${temporaryVersion?.id}`} />
          <Prompt key={`prompt-${temporaryVersion?.id}`} />
        </div>
      </div>
      <div className="ml-6 flex items-start overflow-hidden">{/* <MobilePreview /> */}</div>
    </div>
  );
};
export default Playground;
