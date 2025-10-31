import { useEffect, useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { usePromptStore } from '~/stores/usePromptStore';
import { queries } from '~/queries';
import { useUpdateCounselTechnique } from '~/hooks/mutations';
import { CounselTechnique } from '~/api/v1';

export const useTechniqueManagement = () => {
  const selectedCounselor = usePromptStore((s) => s.selectedCounselor);
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const selectedCounselTechnique = usePromptStore((s) => s.selectedCounselTechnique);
  const setSelectedCounselTechnique = usePromptStore((s) => s.setSelectedCounselTechnique);

  const toneId = selectedCounselor?.toneId ?? null;
  const promptVersionId = temporaryVersion?.id;

  const { data: counselTechniquesData } = useQuery({
    enabled: !!promptVersionId && !!toneId,
    ...queries.v1.getCounselTechniques({ promptVersionId: promptVersionId!, toneId: toneId }),
  });

  const counselTechniques = useMemo(
    () => counselTechniquesData ?? [],
    [counselTechniquesData]
  );

  const [mode, setMode] = useState<'ADDANDDELETE' | 'EDIT' | 'SELECT'>('SELECT');
  const [techniques, setTechniques] = useState<CounselTechnique[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (Array.isArray(counselTechniques) && counselTechniques.length > 0) {
      setTechniques(counselTechniques);

      if (selectedCounselTechnique?.id) {
        const sameTechnique = counselTechniques.find((tech) => tech.id === selectedCounselTechnique.id);
        if (sameTechnique) {
          setSelectedCounselTechnique(sameTechnique);
        } else {
          setSelectedCounselTechnique(counselTechniques[0]);
        }
      } else {
        setSelectedCounselTechnique(counselTechniques[0]);
      }
    }
  }, [counselTechniques, setSelectedCounselTechnique, selectedCounselTechnique?.id]);

  const { mutate: updateCounselTechnique } = useUpdateCounselTechnique({
    onSuccess: (res) => {
      const updatedTechniques = res;
      if (!updatedTechniques || !Array.isArray(updatedTechniques) || updatedTechniques.length === 0) return;

      setTechniques(updatedTechniques);
      setSelectedCounselTechnique(updatedTechniques[0]);

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
    newIsStartTechnique: boolean,
    newTemperature: number
  ) => {
    const updatedTechnique = techniques.find((tech) => tech.id === techniqueId);
    if (!updatedTechnique) return;

    updatedTechnique.name = newName;
    updatedTechnique.isStartTechnique = newIsStartTechnique;
    updatedTechnique.temperature = newTemperature;

    setTechniques([...techniques]);

    updateCounselTechnique({
      counselTechniqueId: techniqueId,
      data: {
        name: updatedTechnique.name,
        context: updatedTechnique.context,
        instruction: updatedTechnique.instruction,
        temperature: updatedTechnique.temperature,
        isStartTechnique: updatedTechnique.isStartTechnique,
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
