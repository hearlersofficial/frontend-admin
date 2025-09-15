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

    // isStartTechnique을 기준으로 깊이 기반 레벨 계산
    const calculateDepthBasedLevels = () => {
      // 시작 노드 찾기 (isStartTechnique이 true인 노드)
      const startNode = nodes.find((node) => node.isStartTechnique);
      if (!startNode) {
        // 시작 노드가 없으면 기존 로직 사용
        nodes.forEach((node) => {
          node.level = node.inDegree || 0;
        });
        return;
      }

      // 시작 노드는 레벨 1
      startNode.level = 1;

      // BFS를 사용하여 각 노드의 깊이 계산
      const visited = new Set<string>();
      const queue: { nodeId: string; level: number }[] = [{ nodeId: startNode.id!, level: 1 }];
      visited.add(startNode.id!);

      while (queue.length > 0) {
        const { nodeId, level } = queue.shift()!;

        // 현재 노드에서 나가는 엣지들을 찾아서 다음 레벨 노드들 처리
        const outgoingEdges = edges.filter((edge) => edge.from === nodeId);

        outgoingEdges.forEach((edge) => {
          const nextNode = nodes.find((n) => n.id === edge.to);
          if (nextNode && !visited.has(nextNode.id!)) {
            nextNode.level = level + 1;
            visited.add(nextNode.id!);
            queue.push({ nodeId: nextNode.id!, level: level + 1 });
          }
        });
      }

      // 방문되지 않은 노드들은 시작 노드와 연결되지 않은 노드들
      // 이들은 가장 높은 레벨 + 1로 설정
      const maxLevel = Math.max(...nodes.map((n) => n.level));
      nodes.forEach((node) => {
        if (node.level === 0) {
          node.level = maxLevel + 1;
        }
      });
    };

    calculateDepthBasedLevels();

    const levelGroups = new Map<number, GraphNode[]>();
    nodes.forEach((node) => {
      if (!levelGroups.has(node.level)) {
        levelGroups.set(node.level, []);
      }
      levelGroups.get(node.level)!.push(node);
    });

    const LEVEL_SPACING = 150;
    const NODE_SPACING = 120;

    let maxLevel = 0;
    let maxNodesInLevel = 0;

    levelGroups.forEach((levelNodes, level) => {
      maxLevel = Math.max(maxLevel, level);
      maxNodesInLevel = Math.max(maxNodesInLevel, levelNodes.length);
    });

    levelGroups.forEach((levelNodes, level) => {
      const startX = 50 + (level - 1) * LEVEL_SPACING;
      const startY = 50;

      levelNodes.forEach((node, index) => {
        node.x = startX;
        node.y = startY + index * NODE_SPACING;
      });
    });

    const width = 2 + maxLevel * LEVEL_SPACING;
    const height = 50 * 2 + maxNodesInLevel * NODE_SPACING;

    return {
      nodes,
      edges,
      width,
      height,
    };
  }, [techniques, transitionRules]);
};
