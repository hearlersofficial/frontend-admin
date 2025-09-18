import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { usePromptStore } from '~/store/usePromptStore';
import { queries } from '~/queries';
import { CounselTechniqueResponseDto, CounselTechniqueTransitionRuleResponseDto } from '~/__generated__/data-contracts';
import { useTechniqueManagement } from './useTechniqueManagement';

export const useTransitionRules = () => {
  const temporaryVersion = usePromptStore((s) => s.temporaryVersion);
  const { techniques } = useTechniqueManagement();

  const promptVersionId = temporaryVersion?.id;

  const { data: transitionRules, isLoading } = useQuery({
    enabled: !!promptVersionId,
    ...queries.v1.getCounselTechniqueTransitionRules({
      promptVersionId: promptVersionId!,
    }),
  });

  const { connectedNodes, unconnectedNodes } = useMemo(() => {
    if (!transitionRules || !techniques.length) {
      return { connectedNodes: techniques, unconnectedNodes: [] };
    }

    const connectedNodeIds = new Set<string>();

    transitionRules.forEach((rule) => {
      if (rule.fromCounselTechniqueId) {
        connectedNodeIds.add(rule.fromCounselTechniqueId);
      }
      if (rule.toCounselTechniqueId) {
        connectedNodeIds.add(rule.toCounselTechniqueId);
      }
    });

    const connected: CounselTechniqueResponseDto[] = [];
    const unconnected: CounselTechniqueResponseDto[] = [];

    techniques.forEach((technique) => {
      if (connectedNodeIds.has(technique.id!)) {
        connected.push(technique);
      } else {
        unconnected.push(technique);
      }
    });

    return { connectedNodes: connected, unconnectedNodes: unconnected };
  }, [techniques, transitionRules]);

  const graphData = useMemo(() => {
    const nodes = connectedNodes.map((technique) => ({
      id: technique.id || '',
      name: technique.name || 'Unknown',
      technique,
    }));

    const edges: Array<{
      id: string;
      from: string;
      to: string;
      priority: number;
      rule: CounselTechniqueTransitionRuleResponseDto;
    }> = [];

    if (transitionRules) {
      transitionRules.forEach((rule) => {
        if (rule.fromCounselTechniqueId && rule.toCounselTechniqueId) {
          edges.push({
            id: rule.id || '',
            from: rule.fromCounselTechniqueId,
            to: rule.toCounselTechniqueId,
            priority: rule.priority || 0,
            rule,
          });
        }
      });
    }

    return { nodes, edges };
  }, [connectedNodes, transitionRules]);

  return {
    transitionRules: transitionRules || [],
    graphData,
    connectedNodes,
    unconnectedNodes,
    isLoading,
  };
};
