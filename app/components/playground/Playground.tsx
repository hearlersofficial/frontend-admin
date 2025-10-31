import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Technique from './CounselTechnique/Technique';
import Prompt from './Prompt';
import Sidebar from './Sidebar';

import { usePromptStore } from '~/stores/usePromptStore';
import { queries } from '~/queries';

const Playground = () => {
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const setTemporaryVersion = usePromptStore((s) => s.setTemporaryVersion);

  const { data: temporaryVersionData } = useQuery({
    ...queries.v1.getTemporaryVersion,
  });

  useEffect(() => {
    if (temporaryVersionData) {
      setTemporaryVersion(temporaryVersionData);
    }
  }, [temporaryVersionData, setTemporaryVersion]);

  return (
    <div className="relative flex h-full w-full overflow-hidden mb-12">
      <Sidebar />
      <div className="flex w-full flex-1 flex-col overflow-hidden rounded-xl rounded-tl-none bg-white px-8 py-6">
        <div className="flex w-full flex-1 flex-col gap-6 overflow-hidden">
          <Technique key={`technique-${temporaryVersion?.id}`} />
          <Prompt key={`prompt-${temporaryVersion?.id}`} />
        </div>
      </div>
    </div>
  );
};
export default Playground;
