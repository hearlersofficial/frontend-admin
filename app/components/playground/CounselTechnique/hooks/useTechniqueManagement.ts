import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';
import { useSaveCounselTechniqueSequence, useUpdateCounselTechnique } from '~/hooks/mutations';
import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

export const useTechniqueManagement = () => {
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const setTemporaryVersion = usePromptStore((s) => s.setTemporaryVersion);
  const setSelectedCounselTechnique = usePromptStore((s) => s.setSelectedCounselTechnique);

  const toneId = selectedCounselor?.toneId;
  const toneScopedPrompts = temporaryVersion?.toneScopedPrompts ?? [];
  const firstCounselTechniqueId = toneScopedPrompts.find((p) => p.toneId === toneId)?.firstCounselTechniqueId;

  const { data: counselTechniques = [] } = useQuery({
    enabled: !!firstCounselTechniqueId,
    ...queries.v1.getOrderedCounselTechniques({ 'first-counsel-technique-id': firstCounselTechniqueId! }),
  });

  const [mode, setMode] = useState<'ADDANDDELETE' | 'EDIT' | 'SELECT'>('SELECT');
  const [techniques, setTechniques] = useState<CounselTechniqueResponseDto[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (counselTechniques.length) {
      setTechniques(counselTechniques);
      setSelectedCounselTechnique(counselTechniques[0]);
    }
  }, [counselTechniques, setSelectedCounselTechnique]);

  const { mutate: updateCounselTechniqueSequence } = useSaveCounselTechniqueSequence({
    onSuccess: (res) => {
      const newTechniques = res.data?.data?.counselTechniques ?? [];
      if (!newTechniques.length || !temporaryVersion) return;

      setTechniques(newTechniques);
      setSelectedCounselTechnique(newTechniques[0]);

      const newToneScopedPrompts = (temporaryVersion.toneScopedPrompts ?? []).map((prompt) =>
        prompt.toneId === toneId ? { ...prompt, firstCounselTechniqueId: newTechniques[0].id } : prompt
      );

      setTemporaryVersion({
        ...temporaryVersion,
        toneScopedPrompts: newToneScopedPrompts,
      });

      queryClient.invalidateQueries({
        queryKey: ['v1', 'getOrderedCounselTechniques'],
      });
    },
  });

  const { mutate: updateCounselTechnique } = useUpdateCounselTechnique({
    onSuccess: (res) => {
      const updatedTechniques = res.data?.data?.counselTechnique;
      if (!updatedTechniques || updatedTechniques.length === 0) return;

      setTechniques(updatedTechniques);
      setSelectedCounselTechnique(updatedTechniques[0]);

      queryClient.invalidateQueries({
        queryKey: ['v1', 'getOrderedCounselTechniques'],
      });
    },
  });

  const saveTechniqueSequence = () => {
    const counselTechniqueIds = techniques.map((t) => t.id).filter(Boolean) as string[];
    if (toneId && counselTechniqueIds.length) {
      updateCounselTechniqueSequence({
        toneId,
        counselTechniqueIds: counselTechniqueIds,
      });
    }
  };

  const handleEditTechnique = () => {
    if (mode === 'EDIT') {
      saveTechniqueSequence();
      setMode('SELECT');
    } else {
      setMode('EDIT');
    }
  };

  const handleAddAndDeleteTechnique = () => {
    if (mode === 'ADDANDDELETE') {
      saveTechniqueSequence();
      setMode('SELECT');
    } else {
      setMode('ADDANDDELETE');
    }
  };

  const handleSaveTechnique = (techniqueId: string, newName: string, newMessageThreshold: number) => {
    const updatedTechniques = techniques.map((tech) =>
      tech.id === techniqueId ? { ...tech, name: newName, messageThreshold: newMessageThreshold } : tech
    );
    setTechniques(updatedTechniques);

    updateCounselTechnique({
      counselTechniqueId: techniqueId,
      data: {
        name: newName,
        messageThreshold: newMessageThreshold,
      },
    });
  };

  return {
    techniques,
    mode,
    toneId,

    setTechniques,
    setMode,

    handleEditTechnique,
    handleAddAndDeleteTechnique,
    handleSaveTechnique,
  };
};
