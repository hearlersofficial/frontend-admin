import React, { useRef, useEffect, useState } from 'react';

interface ConnectionArrowProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  description: string;
  relation: 'forward' | 'backward' | 'same';
  onClick: () => void;
}

const ConnectionArrow: React.FC<ConnectionArrowProps> = ({
  fromX,
  fromY,
  toX,
  toY,
  description,
  relation,
  onClick,
}) => {
  const textRef = useRef<SVGTextElement>(null);
  const [textMetrics, setTextMetrics] = useState({ width: 0, height: 0 });

  const strokeColor = relation === 'forward' ? '#736A84' : relation === 'backward' ? '#A99FAA' : '#A39AA7';
  const strokeWidth = 3;
  const strokeDasharray = relation === 'forward' ? '8,8' : '4,4';

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

  // 텍스트 메트릭스 계산
  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setTextMetrics({
        width: bbox.width,
        height: bbox.height,
      });
    }
  }, [description]);

  // 라인 중앙점 계산
  const lineCenterX = (fromX + toX) / 2;
  const lineCenterY = (fromY + toY) / 2;

  // 텍스트 주변 여백
  const textPadding = 6;

  // 첫 번째 라인 끝점: 텍스트 시작 전까지 (각도 유지)
  const line1End = {
    x: lineCenterX - (textMetrics.width / 2 + textPadding) * Math.cos(angle),
    y: lineCenterY - (textMetrics.width / 2 + textPadding) * Math.sin(angle),
  };

  // 두 번째 라인 시작점: 텍스트 끝 후부터 (각도 유지)
  const line2Start = {
    x: lineCenterX + (textMetrics.width / 2 + textPadding) * Math.cos(angle),
    y: lineCenterY + (textMetrics.width / 2 + textPadding) * Math.sin(angle),
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

      {/* 첫 번째 라인: 시작점부터 텍스트 시작 전까지 (각도 유지) */}
      <line
        x1={fromX}
        y1={fromY}
        x2={line1End.x}
        y2={line1End.y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        style={{ pointerEvents: 'none' }}
      />

      {/* 두 번째 라인: 텍스트 끝부터 화살표 시작점까지 (각도 유지) */}
      <line
        x1={line2Start.x}
        y1={line2Start.y}
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
        ref={textRef}
        x={lineCenterX}
        y={lineCenterY}
        textAnchor="middle"
        dominantBaseline="middle"
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
