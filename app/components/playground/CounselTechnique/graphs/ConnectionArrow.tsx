import React from 'react';

interface ConnectionArrowProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  description: string;
  isForward: boolean;
  onClick: () => void;
}

const ConnectionArrow: React.FC<ConnectionArrowProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  description,
  isForward,
  onClick,
}) => {
  const strokeColor = isForward ? '#736A84' : '#FF6B6B';
  const strokeWidth = isForward ? 3 : 2;
  const strokeDasharray = isForward ? '8,8' : '4,4';

  const angle = Math.atan2(toY - fromY, toX - fromX);
  const arrowLength = 10;
  const arrowAngle = Math.PI / 6;

  // 화살표 시작점 (선이 끝나는 지점)
  const arrowStart = {
    x: toX - arrowLength * Math.cos(angle),
    y: toY - arrowLength * Math.sin(angle),
  };

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

  const handleClick = () => {
    onClick();
  };

  return (
    <g>
      {/* 클릭 가능한 투명한 선 (화살표와 동일한 궤적, 패딩 포함) */}
      <line
        x1={fromX}
        y1={fromY}
        x2={arrowStart.x}
        y2={arrowStart.y}
        stroke="transparent"
        strokeWidth="20"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      />

      {/* 화살표 머리 부분 클릭 영역 (투명한 원) */}
      <circle cx={toX} cy={toY} r="15" fill="transparent" style={{ cursor: 'pointer' }} onClick={handleClick} />

      {/* 실제 화살표 선 */}
      <line
        x1={fromX}
        y1={fromY}
        x2={arrowStart.x}
        y2={arrowStart.y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        style={{ pointerEvents: 'none' }}
      />

      {/* 화살표 머리 */}
      <polygon
        points={`${arrowEnd.x},${arrowEnd.y} ${arrowLeft.x},${arrowLeft.y} ${arrowRight.x},${arrowRight.y}`}
        fill={strokeColor}
        style={{ pointerEvents: 'none' }}
      />

      {/* 우선순위 텍스트 */}
      <text
        x={(fromX + toX) / 2}
        y={(fromY + toY) / 2 - 8}
        textAnchor="middle"
        fontSize="12"
        fill={strokeColor}
        fontWeight="bold"
        style={{ pointerEvents: 'none' }}
      >
        {description}
      </text>
    </g>
  );
};

export default ConnectionArrow;
