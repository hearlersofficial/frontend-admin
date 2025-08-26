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

      const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
      const arrowLength = 15;
      const arrowAngle = Math.PI / 6;

      const arrowEnd = {
        x: toNode.x - arrowLength * Math.cos(angle),
        y: toNode.y - arrowLength * Math.sin(angle),
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
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="#736A84"
            strokeWidth="3"
            strokeDasharray="8,8"
            style={{ cursor: 'pointer' }}
            onClick={() => handleTransitionRuleClick(edge.rule)}
          />
          <polygon
            points={`${arrowEnd.x},${arrowEnd.y} ${arrowLeft.x},${arrowLeft.y} ${arrowRight.x},${arrowRight.y}`}
            fill="#736A84"
            style={{ cursor: 'pointer' }}
            onClick={() => handleTransitionRuleClick(edge.rule)}
          />
          <text
            x={(fromNode.x + toNode.x) / 2}
            y={(fromNode.y + toNode.y) / 2 - 15}
            textAnchor="middle"
            fontSize="14"
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

        <div className="absolute left-4 right-4 top-4 z-10">
          <div className="flex items-center space-x-4 overflow-x-auto rounded-lg bg-[#F2F2F7] p-4">
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
