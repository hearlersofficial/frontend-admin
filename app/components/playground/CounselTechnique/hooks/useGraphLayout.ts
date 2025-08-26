import { useMemo } from 'react';
import { CounselTechniqueResponseDto, CounselTechniqueTransitionRuleResponseDto } from '~/__generated__/data-contracts';

interface GraphNode extends CounselTechniqueResponseDto {
  x: number;
  y: number;
  inDegree: number;
  outDegree: number;
  level: number;
}

interface GraphEdge {
  id: string;
  from: string;
  to: string;
  priority: number;
  rule: CounselTechniqueTransitionRuleResponseDto;
}

interface GraphLayout {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width: number;
  height: number;
}

export const useGraphLayout = (
  techniques: CounselTechniqueResponseDto[],
  transitionRules: CounselTechniqueTransitionRuleResponseDto[]
): GraphLayout => {
  return useMemo(() => {
    if (!techniques.length) {
      return { nodes: [], edges: [], width: 0, height: 0 };
    }

    const nodes: GraphNode[] = techniques.map((technique) => ({
      ...technique,
      x: 0,
      y: 0,
      inDegree: 0,
      outDegree: 0,
      level: 0,
    }));

    const edges: GraphEdge[] = transitionRules
      .filter((rule) => rule.fromCounselTechniqueId && rule.toCounselTechniqueId)
      .map((rule) => ({
        id: rule.id || '',
        from: rule.fromCounselTechniqueId!,
        to: rule.toCounselTechniqueId!,
        priority: rule.priority || 0,
        rule,
      }));

    nodes.forEach((node) => {
      node.inDegree = edges.filter((edge) => edge.to === node.id).length;
      node.outDegree = edges.filter((edge) => edge.from === node.id).length;
    });

    const calculateLevels = () => {
      nodes.forEach((node) => {
        node.level = node.inDegree || 0;
      });
    };

    calculateLevels();

    const levelGroups = new Map<number, GraphNode[]>();
    nodes.forEach((node) => {
      if (!levelGroups.has(node.level)) {
        levelGroups.set(node.level, []);
      }
      levelGroups.get(node.level)!.push(node);
    });

    const LEVEL_SPACING = 200;
    const NODE_SPACING = 120;

    let maxLevel = 0;
    let maxNodesInLevel = 0;

    levelGroups.forEach((levelNodes, level) => {
      maxLevel = Math.max(maxLevel, level);
      maxNodesInLevel = Math.max(maxNodesInLevel, levelNodes.length);
    });

    levelGroups.forEach((levelNodes, level) => {
      const startX = 50 + level * LEVEL_SPACING;
      const startY = 50;

      levelNodes.forEach((node, index) => {
        node.x = startX;
        node.y = startY + index * NODE_SPACING;
      });
    });

    const width = 50 * 2 + (maxLevel + 1) * LEVEL_SPACING;
    const height = 50 * 2 + maxNodesInLevel * NODE_SPACING;

    return {
      nodes,
      edges,
      width,
      height,
    };
  }, [techniques, transitionRules]);
};
