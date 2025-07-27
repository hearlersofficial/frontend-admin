import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';
import TechniqueContainer from './TechniqueContainer';

import { usePromptStore } from '~/store/usePromptStore';
import { useQuery } from '@tanstack/react-query';
import { queries } from '~/queries';
import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';
import { useSaveCounselTechniqueSequence } from '~/hooks/mutations';
import { Plus } from 'lucide-react';
import { useModal } from '~/hooks/useModal';
import AddTechniqueModal from './modals/AddTechniqueModal';

const Technique = () => {
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const setSelectedCounselTechnique = usePromptStore((s) => s.setSelectedCounselTechnique);

  const toneId = selectedCounselor?.toneId;
  const toneScopedPrompts = temporaryVersion?.toneScopedPrompts ?? [];
  const firstCounselTechniqueId = toneScopedPrompts.find((p) => p.toneId === toneId)?.firstCounselTechniqueId;

  const { data: counselTechniques = [] } = useQuery({
    enabled: !!firstCounselTechniqueId,
    ...queries.v1.getOrderedCounselTechniques({ 'first-counsel-technique-id': firstCounselTechniqueId! }),
  });

  const [selected, setSelected] = useState<string>('');
  const [mode, setMode] = useState<'ADDANDDELETE' | 'EDIT' | 'SELECT'>('SELECT');
  const [techniques, setTechniques] = useState<CounselTechniqueResponseDto[]>([]);

  const { isOpen, setIsOpen, openModal } = useModal(false);

  useEffect(() => {
    if (counselTechniques.length) {
      setTechniques(counselTechniques);
      setSelected(counselTechniques[0].id ?? '');
      setSelectedCounselTechnique(counselTechniques[0]);
    }
  }, [counselTechniques, setSelectedCounselTechnique]);

  const { mutate: updateCounselTechniqueSequence } = useSaveCounselTechniqueSequence();

  const handleEditTechnique = () => {
    if (mode === 'EDIT') {
      const counselTechniqueIds = techniques.map((t) => t.id).filter(Boolean) as string[];
      if (toneId && counselTechniqueIds.length) {
        updateCounselTechniqueSequence({
          toneId,
          counselTechniqueIds: counselTechniqueIds,
        });
      }

      setMode('SELECT');
    } else {
      setMode('EDIT');
    }
  };

  const handleAddAndDeleteTechnique = () => {
    if (mode === 'ADDANDDELETE') {
      setMode('SELECT');
    } else {
      setMode('ADDANDDELETE');
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#68676A]">상담기법</h3>
        <div className="space-x-2">
          <Button
            className="rounded-full bg-[#736A84]"
            onClick={handleAddAndDeleteTechnique}
            disabled={mode === 'EDIT'}
            size="sm"
          >
            {mode === 'ADDANDDELETE' ? '완료' : '추가/삭제'}
          </Button>
          <Button
            className="rounded-full bg-[#736A84]"
            onClick={handleEditTechnique}
            disabled={mode === 'ADDANDDELETE'}
            size="sm"
          >
            {mode === 'EDIT' ? '완료' : '수정'}
          </Button>
        </div>
      </div>

      <div className="mb-4 mt-2 h-[1px] bg-[#ECE9F1]" />

      <div className="flex gap-3">
        <TechniqueContainer
          mode={mode}
          techniques={techniques}
          selected={selected}
          setSelected={setSelected}
          setTechniques={setTechniques}
        />

        {mode === 'ADDANDDELETE' && (
          <p className="flex h-14 items-center">
            <button
              onClick={openModal}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#A99FAA] text-[#A99FAA]"
            >
              <Plus className="h-6 w-6" />
            </button>
          </p>
        )}
        <AddTechniqueModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};
export default Technique;
