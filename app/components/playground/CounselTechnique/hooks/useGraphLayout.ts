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
      const visited = new Set<string>();
      const levels = new Map<string, number>();

      const dfs = (nodeId: string, currentLevel: number) => {
        if (visited.has(nodeId)) {
          return levels.get(nodeId) || 0;
        }

        visited.add(nodeId);
        let maxLevel = currentLevel;

        const outgoingEdges = edges.filter((edge) => edge.from === nodeId);

        for (const edge of outgoingEdges) {
          const childLevel = dfs(edge.to, currentLevel + 1);
          maxLevel = Math.max(maxLevel, childLevel);
        }

        levels.set(nodeId, maxLevel);
        return maxLevel;
      };

      nodes.forEach((node) => {
        if (!visited.has(node.id!)) {
          dfs(node.id!, 0);
        }
      });

      nodes.forEach((node) => {
        node.level = levels.get(node.id!) || 0;
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
    const PADDING = 50;

    let maxLevel = 0;
    let maxNodesInLevel = 0;

    levelGroups.forEach((levelNodes, level) => {
      maxLevel = Math.max(maxLevel, level);
      maxNodesInLevel = Math.max(maxNodesInLevel, levelNodes.length);
    });

    levelGroups.forEach((levelNodes, level) => {
      const levelWidth = levelNodes.length * NODE_SPACING;
      const startX = PADDING + (maxNodesInLevel * NODE_SPACING - levelWidth) / 2;
      const y = PADDING + level * LEVEL_SPACING;

      levelNodes.forEach((node, index) => {
        node.x = startX + index * NODE_SPACING;
        node.y = y;
      });
    });

    const width = PADDING * 2 + maxNodesInLevel * NODE_SPACING;
    const height = PADDING * 2 + (maxLevel + 1) * LEVEL_SPACING;

    return {
      nodes,
      edges,
      width,
      height,
    };
  }, [techniques, transitionRules]);
};
