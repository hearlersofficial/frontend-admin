import React, { useState } from 'react';
import { Plus } from 'lucide-react';

import TechniqueCard from './TechniqueCard';
import TransitionRuleDetailModal from './modals/TransitionRuleDetailModal';
import { useGraphLayout } from './hooks/useGraphLayout';
import { useTransitionRules } from './hooks/useTransitionRules';
import { usePromptStore } from '~/store/usePromptStore';
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
  const [isTransitionModalOpen, setIsTransitionModalOpen] = useState(false);

  const { transitionRules, connectedNodes, unconnectedNodes } = useTransitionRules();

  const { nodes, edges, width, height } = useGraphLayout(connectedNodes, transitionRules);

  const handleTransitionRuleClick = (rule: CounselTechniqueTransitionRuleResponseDto) => {
    setSelectedTransitionRule(rule);
    setIsTransitionModalOpen(true);
  };

  const renderConnectionLines = () => {
    if (mode === 'EDIT' || mode === 'ADDANDDELETE') return null;

    return edges.map((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);

      if (!fromNode || !toNode) return null;

      const fromX = fromNode.x + 40;
      const fromY = fromNode.y;
      const toX = toNode.x - 40;
      const toY = toNode.y;

      const isForward = fromNode.level < toNode.level;
      const strokeColor = isForward ? '#736A84' : '#FF6B6B';
      const strokeWidth = isForward ? 3 : 2;

      const angle = Math.atan2(toY - fromY, toX - fromX);
      const arrowLength = 10;
      const arrowAngle = Math.PI / 6;

      const arrowEnd = {
        x: toX,
        y: toY,
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
          <line
            x1={fromX}
            y1={fromY}
            x2={toX}
            y2={toY}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={isForward ? '8,8' : '4,4'}
            style={{ cursor: 'pointer' }}
            onClick={() => handleTransitionRuleClick(edge.rule)}
          />
          <polygon
            points={`${arrowEnd.x},${arrowEnd.y} ${arrowLeft.x},${arrowLeft.y} ${arrowRight.x},${arrowRight.y}`}
            fill={strokeColor}
            style={{ cursor: 'pointer' }}
            onClick={() => handleTransitionRuleClick(edge.rule)}
          />
          <text
            x={(fromX + toX) / 2}
            y={(fromY + toY) / 2 - 8}
            textAnchor="middle"
            fontSize="12"
            fill={strokeColor}
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

  return (
    <div className="relative w-full overflow-auto">
      <div
        className="relative rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          minWidth: '100%',
          minHeight: '400px',
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

          <div className="relative h-full w-full overflow-scroll">
            <svg className="pointer-events-none absolute inset-0" style={{ zIndex: 1 }} width={width} height={height}>
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <TransitionRuleDetailModal
        isOpen={isTransitionModalOpen}
        setIsOpen={setIsTransitionModalOpen}
        transitionRule={selectedTransitionRule}
        fromTechniqueName={techniques.find((t) => t.id === selectedTransitionRule?.fromCounselTechniqueId)?.name}
        toTechniqueName={techniques.find((t) => t.id === selectedTransitionRule?.toCounselTechniqueId)?.name}
      />
    </div>
  );
};

export default GraphLayout;
