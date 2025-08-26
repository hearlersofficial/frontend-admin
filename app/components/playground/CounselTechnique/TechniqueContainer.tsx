import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useState, useEffect, useRef } from 'react';

import TechniqueCard from './TechniqueCard';
import TransitionRuleDetailModal from './modals/TransitionRuleDetailModal';
import { Plus } from 'lucide-react';

import { usePromptStore } from '~/store/usePromptStore';
import { CounselTechniqueResponseDto, CounselTechniqueTransitionRuleResponseDto } from '~/__generated__/data-contracts';
import { useTransitionRules } from './hooks/useTransitionRules';
import { useTechniqueManagement } from './hooks/useTechniqueManagement';

interface TechniqueContainerProps {
  mode: 'ADDANDDELETE' | 'EDIT' | 'SELECT';
  techniques: CounselTechniqueResponseDto[];
  setTechniques: (techniques: CounselTechniqueResponseDto[]) => void;
  onAddTechnique?: () => void;
  onEditName?: (technique: CounselTechniqueResponseDto) => void;
}

const TechniqueContainer = ({
  mode,
  techniques,
  setTechniques,
  onAddTechnique,
  onEditName,
}: TechniqueContainerProps) => {
  const selectedCounselTechnique = usePromptStore((s) => s.selectedCounselTechnique) || techniques[0];
  const setSelectedCounselTechnique = usePromptStore((s) => s.setSelectedCounselTechnique);
  const { graphData } = useTransitionRules();
  const { techniques: techniqueManagementTechniques } = useTechniqueManagement();

  const [selectedTransitionRule, setSelectedTransitionRule] =
    useState<CounselTechniqueTransitionRuleResponseDto | null>(null);
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false);
  const [svgKey, setSvgKey] = useState(0); // SVG 리렌더링을 위한 key

  // 실제 사용할 techniques (props vs management에서 가져온 것)
  const actualTechniques = techniques.length > 0 ? techniques : techniqueManagementTechniques;

  // 카드 위치 계산을 위한 refs
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = actualTechniques.findIndex((technique) => technique.id === active.id);
      const newIndex = actualTechniques.findIndex((technique) => technique.id === over?.id);
      const updatedTechniques = [...actualTechniques];
      const movedItem = updatedTechniques.splice(oldIndex, 1)[0];
      updatedTechniques.splice(newIndex, 0, movedItem);
      setTechniques(updatedTechniques);
    }
  };

  const handleTransitionRuleClick = (rule: CounselTechniqueTransitionRuleResponseDto) => {
    setSelectedTransitionRule(rule);
    setIsTransitionModalOpen(true);
  };

  // 카드 위치가 변경될 때마다 SVG 리렌더링
  useEffect(() => {
    const timer = setTimeout(() => {
      setSvgKey((prev) => prev + 1);
    }, 100);
    return () => clearTimeout(timer);
  }, [actualTechniques, mode]);

  // 전환 규칙이 있을 때만 SVG 업데이트
  useEffect(() => {
    if (graphData.edges.length > 0) {
      const timer = setTimeout(() => {
        setSvgKey((prev) => prev + 1);
      }, 500); // 카드 렌더링을 기다리기 위해 더 긴 시간
      return () => clearTimeout(timer);
    }
  }, [graphData.edges.length]); // edges.length만 의존성으로 사용

  const renderConnectionLines = () => {
    if (mode === 'EDIT' || mode === 'ADDANDDELETE') {
      return null;
    }

    return graphData.edges.map((edge) => {
      const fromCard = cardRefs.current[edge.from];
      const toCard = cardRefs.current[edge.to];

      if (!fromCard || !toCard) {
        return null;
      }

      const fromRect = fromCard.getBoundingClientRect();
      const toRect = toCard.getBoundingClientRect();
      const containerRect = fromCard.parentElement?.getBoundingClientRect();

      if (!containerRect) {
        return null;
      }

      // 카드 중심점 계산
      const fromCenter = {
        x: fromRect.left + fromRect.width / 2 - containerRect.left,
        y: fromRect.top + fromRect.height / 2 - containerRect.top,
      };
      const toCenter = {
        x: toRect.left + toRect.width / 2 - containerRect.left,
        y: toRect.top + toRect.height / 2 - containerRect.top,
      };

      // 화살표 그리기
      const angle = Math.atan2(toCenter.y - fromCenter.y, toCenter.x - fromCenter.x);
      const arrowLength = 10;
      const arrowAngle = Math.PI / 6;

      const arrowEnd = {
        x: toCenter.x - arrowLength * Math.cos(angle),
        y: toCenter.y - arrowLength * Math.sin(angle),
      };

      const arrowLeft = {
        x: arrowEnd.x - arrowLength * Math.cos(angle + arrowAngle),
        y: arrowEnd.y - arrowLength * Math.sin(angle + arrowAngle),
      };

      const arrowRight = {
        x: arrowEnd.x - arrowLength * Math.cos(angle - arrowAngle),
        y: arrowEnd.y - arrowLength * Math.sin(angle - arrowAngle),
      };

      return (
        <g key={edge.id}>
          {/* 연결선 */}
          <line
            x1={fromCenter.x}
            y1={fromCenter.y}
            x2={toCenter.x}
            y2={toCenter.y}
            stroke="#736A84"
            strokeWidth="2"
            strokeDasharray="5,5"
            style={{ cursor: 'pointer' }}
            onClick={() => handleTransitionRuleClick(edge.rule)}
          />
          {/* 화살표 */}
          <polygon
            points={`${arrowEnd.x},${arrowEnd.y} ${arrowLeft.x},${arrowLeft.y} ${arrowRight.x},${arrowRight.y}`}
            fill="#736A84"
            style={{ cursor: 'pointer' }}
            onClick={() => handleTransitionRuleClick(edge.rule)}
          />
          {/* 우선순위 라벨 */}
          <text
            x={(fromCenter.x + toCenter.x) / 2}
            y={(fromCenter.y + toCenter.y) / 2 - 10}
            textAnchor="middle"
            fontSize="12"
            fill="#736A84"
            fontWeight="bold"
            style={{ cursor: 'pointer' }}
            onClick={() => handleTransitionRuleClick(edge.rule)}
          >
            {edge.priority}
          </text>
        </g>
      );
    });
  };

  const renderTechniqueCards = () => {
    return actualTechniques.map((technique) => {
      return (
        <div
          key={technique.id}
          ref={(el) => {
            cardRefs.current[technique.id!] = el;
          }}
        >
          <TechniqueCard
            mode={mode}
            technique={technique}
            selectedCounselTechnique={selectedCounselTechnique}
            setSelectedCounselTechnique={setSelectedCounselTechnique}
            setTechniques={setTechniques}
            techniques={actualTechniques}
            onEditName={onEditName}
          />
        </div>
      );
    });
  };

  if (mode !== 'EDIT') {
    return (
      <div className="relative">
        <div className="flex flex-wrap gap-3">
          {renderTechniqueCards()}

          {mode === 'ADDANDDELETE' && onAddTechnique && (
            <p className="flex h-14 items-center">
              <button
                onClick={onAddTechnique}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#A99FAA] text-[#A99FAA]"
              >
                <Plus className="h-6 w-6" />
              </button>
            </p>
          )}
        </div>

        {/* SVG 오버레이로 연결선 그리기 */}
        <svg key={svgKey} className="absolute inset-0" style={{ zIndex: 1, pointerEvents: 'none' }}>
          <g style={{ pointerEvents: 'all' }}>{renderConnectionLines()}</g>
        </svg>

        <TransitionRuleDetailModal
          isOpen={isTransitionModalOpen}
          setIsOpen={setIsTransitionModalOpen}
          transitionRule={selectedTransitionRule}
          fromTechniqueName={
            actualTechniques.find((t) => t.id === selectedTransitionRule?.fromCounselTechniqueId)?.name
          }
          toTechniqueName={actualTechniques.find((t) => t.id === selectedTransitionRule?.toCounselTechniqueId)?.name}
        />
      </div>
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={actualTechniques.map((technique) => technique.id!)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="relative">
          <div className="flex flex-wrap gap-3">{renderTechniqueCards()}</div>

          {/* SVG 오버레이로 연결선 그리기 */}
          <svg key={svgKey} className="absolute inset-0" style={{ zIndex: 1, pointerEvents: 'none' }}>
            <g style={{ pointerEvents: 'all' }}>{renderConnectionLines()}</g>
          </svg>

          <TransitionRuleDetailModal
            isOpen={isTransitionModalOpen}
            setIsOpen={setIsTransitionModalOpen}
            transitionRule={selectedTransitionRule}
            fromTechniqueName={
              actualTechniques.find((t) => t.id === selectedTransitionRule?.fromCounselTechniqueId)?.name
            }
            toTechniqueName={actualTechniques.find((t) => t.id === selectedTransitionRule?.toCounselTechniqueId)?.name}
          />
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TechniqueContainer;
