import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import TechniqueCard from '../TechniqueCard';
import TransitionRuleDetailModal from '../modals/TransitionRuleDetailModal';
import ConnectionArrow from './ConnectionArrow';
import { useGraphLayout } from '../hooks/useGraphLayout';
import { useTransitionRules } from '../hooks/useTransitionRules';
import { usePromptStore } from '~/store/usePromptStore';

import AddTransitionRuleModal from '~/components/playground/CounselTechnique/modals/AddTransitionRuleModal';
import { useModal } from '~/hooks/useModal';
import { CounselTechniqueResponseDto, CounselTechniqueTransitionRuleResponseDto } from '~/__generated__/data-contracts';

interface GraphLayoutProps {
  mode: 'ADDANDDELETE' | 'EDIT' | 'SELECT';
  techniques: CounselTechniqueResponseDto[];
  setTechniques: (techniques: CounselTechniqueResponseDto[]) => void;
  onEditName?: (technique: CounselTechniqueResponseDto) => void;
  onAddTechnique?: () => void;
}

const GraphLayout: React.FC<GraphLayoutProps> = ({ mode, techniques, setTechniques, onEditName, onAddTechnique }) => {
  const selectedCounselTechnique = usePromptStore((s) => s.selectedCounselTechnique) || techniques[0];
  const setSelectedCounselTechnique = usePromptStore((s) => s.setSelectedCounselTechnique);

  const [selectedTransitionRule, setSelectedTransitionRule] =
    useState<CounselTechniqueTransitionRuleResponseDto | null>(null);
  const {
    isOpen: isAddTransitionRuleModalOpen,
    setIsOpen: setIsAddTransitionRuleModalOpen,
    openModal: openAddTransitionRuleModal,
  } = useModal(false);
  const {
    isOpen: isTransitionRuleDetailModalOpen,
    setIsOpen: setIsTransitionRuleDetailModalOpen,
    openModal: openTransitionRuleDetailModal,
  } = useModal(false);
  const [mutationModeSelectedTechnique, setMutationModeSelectedTechnique] =
    useState<CounselTechniqueResponseDto | null>(null);

  const { transitionRules, connectedNodes, unconnectedNodes } = useTransitionRules();

  const { nodes, edges, width, height } = useGraphLayout(connectedNodes, unconnectedNodes, transitionRules);

  const getTechniquesPointingTo = (techniqueId: string) => {
    return transitionRules
      .filter((rule) => rule.toCounselTechniqueId === techniqueId && rule.fromCounselTechniqueId)
      .map((rule) => rule.fromCounselTechniqueId!);
  };

  const handleTransitionRuleClick = (rule: CounselTechniqueTransitionRuleResponseDto) => {
    setSelectedTransitionRule(rule);
    openTransitionRuleDetailModal();
  };

  const handleCardClick = (technique: CounselTechniqueResponseDto) => {
    if (mode === 'ADDANDDELETE') {
      // 생성 시
      if (mutationModeSelectedTechnique && mutationModeSelectedTechnique.id !== technique.id) {
        setSelectedTransitionRule({
          id: '',
          fromCounselTechniqueId: mutationModeSelectedTechnique.id,
          toCounselTechniqueId: technique.id,
          priority: 0,
        } as CounselTechniqueTransitionRuleResponseDto);
        openAddTransitionRuleModal();
        setMutationModeSelectedTechnique(null);
      } else {
        setMutationModeSelectedTechnique(technique);
      }
    }
  };

  const renderConnectionLines = () => {
    // 각 간선 쌍별로 오프셋 계산을 위한 맵
    const edgeOffsets = new Map<string, number>();

    // A↔B 양방향 간선들을 모두 포함해서 그룹화
    const edgeGroups = new Map<string, typeof edges>();

    edges.forEach((edge) => {
      // A→B와 B→A를 같은 그룹으로 묶기 위해 정렬된 키 사용
      const sortedKey = [edge.from, edge.to].sort().join('-');
      if (!edgeGroups.has(sortedKey)) {
        edgeGroups.set(sortedKey, []);
      }
      edgeGroups.get(sortedKey)!.push(edge);
    });

    // 각 그룹의 간선들에 오프셋 할당
    edgeGroups.forEach((groupEdges) => {
      // A→B와 B→A 모든 간선들을 하나의 그룹으로 보고 통합 배치
      groupEdges.forEach((edge, index) => {
        const totalEdges = groupEdges.length;
        const offsetIndex = totalEdges === 1 ? 0 : index - (totalEdges - 1) / 2;
        edgeOffsets.set(edge.id, offsetIndex);
      });
    });

    return edges.map((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);

      if (!fromNode || !toNode) return null;

      // 노드 크기 상수
      const NODE_WIDTH = 80;
      const NODE_HEIGHT = 56;
      const NODE_HALF_WIDTH = NODE_WIDTH / 2;
      const NODE_HALF_HEIGHT = NODE_HEIGHT / 2;

      // 두 노드 사이의 벡터 계산
      const deltaX = toNode.x - fromNode.x;
      const deltaY = toNode.y - fromNode.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance === 0) return null; // 같은 위치의 노드는 건너뛰기

      // 정규화된 방향 벡터
      const directionX = deltaX / distance;
      const directionY = deltaY / distance;

      // 수직 오프셋 벡터 (원래 방향과 수직)
      const perpendicularX = -directionY;
      const perpendicularY = directionX;

      // 오프셋 거리 (간선이 겹치지 않을 정도로)
      const offsetDistance = 18;

      // 이 간선의 오프셋 인덱스 가져오기
      const offsetIndex = edgeOffsets.get(edge.id) || 0;

      // B→A 간선인지 확인 (from > to)
      const isReverseEdge = edge.from > edge.to;

      // B→A 간선이면 오프셋 방향을 반대로
      const finalOffsetIndex = isReverseEdge ? -offsetIndex : offsetIndex;
      const offsetX = perpendicularX * offsetDistance * finalOffsetIndex;
      const offsetY = perpendicularY * offsetDistance * finalOffsetIndex;

      // 노드 경계에 정확히 닿도록 계산
      // x와 y 중 더 큰 비율을 가진 방향을 기준으로 반지름만큼 정확히 이동
      const absDirectionX = Math.abs(directionX);
      const absDirectionY = Math.abs(directionY);

      let fromX, fromY, toX, toY;

      if (absDirectionX > absDirectionY) {
        // x 방향이 더 큰 경우: x는 반지름만큼 정확히, y는 비례적으로
        const xOffset = NODE_HALF_WIDTH;
        fromX = fromNode.x + (directionX > 0 ? xOffset : -xOffset) + offsetX;
        fromY = fromNode.y + (directionY / absDirectionX) * xOffset + offsetY;

        toX = toNode.x - (directionX > 0 ? xOffset : -xOffset) + offsetX;
        toY = toNode.y - (directionY / absDirectionX) * xOffset + offsetY;
      } else {
        // y 방향이 더 큰 경우: y는 반지름만큼 정확히, x는 비례적으로
        const yOffset = NODE_HALF_HEIGHT;
        fromX = fromNode.x + (directionX / absDirectionY) * yOffset + offsetX;
        fromY = fromNode.y + (directionY > 0 ? yOffset : -yOffset) + offsetY;

        toX = toNode.x - (directionX / absDirectionY) * yOffset + offsetX;
        toY = toNode.y - (directionY > 0 ? yOffset : -yOffset) + offsetY;
      }

      const relation: 'forward' | 'backward' | 'same' =
        fromNode.level < toNode.level ? 'forward' : fromNode.level > toNode.level ? 'backward' : 'same';

      return (
        <ConnectionArrow
          key={edge.id}
          fromX={fromX}
          fromY={fromY}
          toX={toX}
          toY={toY}
          description={`${edge.priority}`}
          relation={relation}
          onClick={() => handleTransitionRuleClick(edge.rule)}
        />
      );
    });
  };

  return (
    <div className="relative h-auto w-full">
      <div
        className="relative rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
        style={{
          minHeight: `${height}px`,
          minWidth: `${width}px`,
        }}
      >
        <div className="absolute inset-0 flex flex-col space-y-6 p-6">
          <div className="h-24 w-full rounded-lg border-2 border-dashed border-gray-300 bg-[#F2F2F7] p-4">
            <div className="flex items-center space-x-4 overflow-x-visible overflow-y-visible">
              {unconnectedNodes.map((technique) => (
                <div key={technique.id} className="flex-shrink-0">
                  <TechniqueCard
                    mode={mode}
                    technique={technique}
                    selectedCounselTechnique={selectedCounselTechnique}
                    setSelectedCounselTechnique={setSelectedCounselTechnique}
                    setTechniques={setTechniques}
                    techniques={techniques}
                    onEditName={onEditName}
                    onCardClick={handleCardClick}
                    mutationModeSelectedTechnique={mutationModeSelectedTechnique}
                    techniquesPointingTo={getTechniquesPointingTo(technique.id!)}
                  />
                </div>
              ))}

              {mode === 'ADDANDDELETE' && onAddTechnique && (
                <button
                  onClick={onAddTechnique}
                  className="flex h-14 w-20 flex-shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-white text-gray-500 transition-colors hover:border-gray-600 hover:bg-gray-50 hover:text-gray-700"
                >
                  <Plus className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>

          <div className="relative h-full w-full">
            <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
              <g style={{ pointerEvents: 'all' }}>{renderConnectionLines()}</g>
            </svg>

            {nodes.map((node) => (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 transform"
                style={{
                  left: node.x,
                  top: node.y,
                  zIndex: 2,
                }}
              >
                <TechniqueCard
                  mode={mode}
                  technique={node}
                  selectedCounselTechnique={selectedCounselTechnique}
                  setSelectedCounselTechnique={setSelectedCounselTechnique}
                  setTechniques={setTechniques}
                  techniques={techniques}
                  onEditName={onEditName}
                  onCardClick={handleCardClick}
                  mutationModeSelectedTechnique={mutationModeSelectedTechnique}
                  techniquesPointingTo={getTechniquesPointingTo(node.id!)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddTransitionRuleModal
        isOpen={isAddTransitionRuleModalOpen}
        setIsOpen={setIsAddTransitionRuleModalOpen}
        fromTechniqueId={selectedTransitionRule?.fromCounselTechniqueId}
        toTechniqueId={selectedTransitionRule?.toCounselTechniqueId}
        fromTechniqueName={techniques.find((t) => t.id === selectedTransitionRule?.fromCounselTechniqueId)?.name}
        toTechniqueName={techniques.find((t) => t.id === selectedTransitionRule?.toCounselTechniqueId)?.name}
      />
      <TransitionRuleDetailModal
        isOpen={isTransitionRuleDetailModalOpen}
        setIsOpen={setIsTransitionRuleDetailModalOpen}
        transitionRule={selectedTransitionRule}
        fromTechniqueName={techniques.find((t) => t.id === selectedTransitionRule?.fromCounselTechniqueId)?.name}
        toTechniqueName={techniques.find((t) => t.id === selectedTransitionRule?.toCounselTechniqueId)?.name}
      />
    </div>
  );
};

export default GraphLayout;
