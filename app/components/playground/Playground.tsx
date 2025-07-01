import { useEffect } from 'react';
import { useFetcher } from '@remix-run/react';

import Technique from './CounselTechnique/Technique';
import Prompt from './Prompt';
import Sidebar from './Sidebar';

import { usePromptStore } from '~/store/usePromptStore';

const Playground = () => {
  const fetcher = useFetcher<typeof import('~/routes/resources.playground').loader>();

  useEffect(() => {
    fetcher.load('/resources/playground');
  }, []);

  useEffect(() => {
    if (fetcher.data?.temporaryVersion) {
      usePromptStore.getState().setTemporaryVersion(fetcher.data.temporaryVersion);
    }
  }, [fetcher.data]);

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
