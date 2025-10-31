import { useMemo } from 'react';

import { CounselTechnique, CounselTechniqueTransitionRule } from '~/api/v1';
interface GraphNode extends CounselTechnique {
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
  rule: CounselTechniqueTransitionRule;
}

interface GraphLayout {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width: number;
  height: number;
}

export const useGraphLayout = (
  connectedNodes: CounselTechnique[],
  unconnectedNodes: CounselTechnique[],
  transitionRules: CounselTechniqueTransitionRule[]
): GraphLayout => {
  return useMemo(() => {
    const nodes: GraphNode[] = connectedNodes.map((technique) => ({
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
      console.log('=== calculateDepthBasedLevels 시작 ===');
      console.log(
        'nodes:',
        nodes.map((n) => ({ id: n.id, name: n.name, isStartTechnique: n.isStartTechnique }))
      );

      // 시작 노드 찾기 (isStartTechnique이 true인 노드)
      const startNode = nodes.find((node) => node.isStartTechnique);
      console.log('startNode:', startNode);

      if (!startNode) {
        return;
      }

      // 시작 노드는 레벨 0
      startNode.level = 0;

      // 다익스트라 알고리즘을 사용하여 각 노드의 최단거리 계산
      const distances = new Map<string, number>();
      const visited = new Set<string>();
      const priorityQueue: { nodeId: string; distance: number }[] = [];

      // 모든 노드의 거리를 무한대로 초기화
      nodes.forEach((node) => {
        distances.set(node.id!, Infinity);
      });

      // 시작 노드의 거리는 0으로 설정
      distances.set(startNode.id!, 0);
      priorityQueue.push({ nodeId: startNode.id!, distance: 0 });

      while (priorityQueue.length > 0) {
        // 거리가 가장 짧은 노드 선택
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { nodeId, distance } = priorityQueue.shift()!;

        if (visited.has(nodeId)) continue;
        visited.add(nodeId);

        console.log(`Processing node ${nodeId} with distance ${distance}`);

        // 현재 노드에서 나가는 엣지들을 찾아서 인접 노드들 처리
        const outgoingEdges = edges.filter((edge) => edge.from === nodeId);
        console.log(
          `Outgoing edges from ${nodeId}:`,
          outgoingEdges.map((e) => `${e.from}->${e.to}`)
        );

        outgoingEdges.forEach((edge) => {
          const nextNode = nodes.find((n) => n.id === edge.to);
          if (nextNode) {
            const newDistance = distance + 1;
            const currentDistance = distances.get(nextNode.id!) || Infinity;

            console.log(`Checking ${nextNode.id}: newDistance=${newDistance}, currentDistance=${currentDistance}`);

            if (newDistance < currentDistance) {
              distances.set(nextNode.id!, newDistance);
              console.log(`Updated distance for ${nextNode.id} to ${newDistance}`);
              if (!visited.has(nextNode.id!)) {
                priorityQueue.push({ nodeId: nextNode.id!, distance: newDistance });
                console.log(`Added ${nextNode.id} to queue with distance ${newDistance}`);
              }
            }
          }
        });
      }

      // 계산된 거리를 각 노드의 level로 설정
      nodes.forEach((node) => {
        const distance = distances.get(node.id!);
        if (distance !== undefined && distance !== Infinity) {
          node.level = distance;
          console.log(`Node ${node.name}: distance=${distance}, level=${node.level}`);
        } else {
          // 시작 노드와 연결되지 않은 노드들은 가장 높은 레벨 + 1로 설정
          const maxLevel = Math.max(...nodes.map((n) => n.level));
          node.level = maxLevel + 1;
          console.log(`Unconnected Node ${node.name}: level=${node.level}`);
        }
      });
    };

    console.log('calculateDepthBasedLevels 호출 전');
    calculateDepthBasedLevels();
    console.log('calculateDepthBasedLevels 호출 후');

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
      const startX = 50 + level * LEVEL_SPACING;
      const startY = 50;
      console.log('levelNodes', levelNodes);

      levelNodes.forEach((node, index) => {
        node.x = startX;
        node.y = startY + index * NODE_SPACING;
      });
    });

    const graphWidth = 2 + maxLevel * LEVEL_SPACING;
    const graphHeight = 50 * 2 + maxNodesInLevel * NODE_SPACING + 48;
    // 노드 길이 * (노드 가로 길이 + 노드 간 간격) + (컨테이너 패딩 + 부모 컨테이너 패딩) * 2(좌우)
    const unvisitedNodesWidth = unconnectedNodes.length * (80 + 16) + (16 + 24) * 2;
    const MIN_HEIGHT = (92 + 24) * 2;
    const width = Math.max(graphWidth, unvisitedNodesWidth);
    const height = Math.max(graphHeight, MIN_HEIGHT);

    return {
      nodes,
      edges,
      width,
      height,
    };
  }, [connectedNodes, transitionRules, unconnectedNodes.length]);
};
