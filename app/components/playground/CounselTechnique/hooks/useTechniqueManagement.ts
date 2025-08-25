import { useEffect, useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';
import { useUpdateCounselTechnique } from '~/hooks/mutations';
import { CounselTechniqueResponseDto } from '~/__generated__/data-contracts';

export const useTechniqueManagement = () => {
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const setSelectedCounselTechnique = usePromptStore((s) => s.setSelectedCounselTechnique);

  const toneId = selectedCounselor?.toneId;
  const promptVersionId = temporaryVersion?.id;

  const { data: counselTechniquesResponse } = useQuery({
    enabled: !!promptVersionId && !!toneId,
    ...queries.v1.getCounselTechniques({ promptVersionId: promptVersionId!, toneId }),
  });

  const counselTechniques = useMemo(
    () => counselTechniquesResponse?.data?.data?.counselTechniques ?? [],
    [counselTechniquesResponse]
  );

  const [mode, setMode] = useState<'ADDANDDELETE' | 'EDIT' | 'SELECT'>('SELECT');
  const [techniques, setTechniques] = useState<CounselTechniqueResponseDto[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (Array.isArray(counselTechniques) && counselTechniques.length > 0) {
      setTechniques(counselTechniques);
      setSelectedCounselTechnique(counselTechniques[0]);
    }
  }, [counselTechniques, setSelectedCounselTechnique]);

  const { mutate: updateCounselTechnique } = useUpdateCounselTechnique({
    onSuccess: (res) => {
      const updatedTechniques = res.data?.data?.counselTechnique;
      if (!updatedTechniques || !Array.isArray(updatedTechniques) || updatedTechniques.length === 0) return;

      setTechniques(updatedTechniques);
      setSelectedCounselTechnique(updatedTechniques[0]);

      // Refresh the techniques query
      if (promptVersionId && toneId) {
        queryClient.invalidateQueries({
          queryKey: queries.v1.getCounselTechniques({ promptVersionId, toneId }).queryKey,
        });
      }
    },
  });

  const handleEditTechnique = () => {
    if (mode === 'EDIT') {
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

  const handleSaveTechnique = (
    techniqueId: string,
    newName: string,
    newMessageThreshold: number,
    newTemperature: number
  ) => {
    const updatedTechniques = techniques.map((tech) =>
      tech.id === techniqueId
        ? { ...tech, name: newName, messageThreshold: newMessageThreshold, temperature: newTemperature }
        : tech
    );
    setTechniques(updatedTechniques);

    updateCounselTechnique({
      counselTechniqueId: techniqueId,
      data: {
        name: newName,
        messageThreshold: newMessageThreshold,
        temperature: newTemperature,
      },
    });
  };

  return {
    techniques,
    mode,
    toneId,
    promptVersionId,

    setTechniques,
    setMode,

    handleEditTechnique,
    handleAddAndDeleteTechnique,
    handleSaveTechnique,
  };
};
