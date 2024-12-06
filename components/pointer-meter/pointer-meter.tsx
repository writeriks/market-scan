import React from 'react';
import { cn } from '@/lib/utils';

export enum HeatColor {
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Lime = 'lime',
  Green = 'green',
}

interface PointerMeterProps {
  value: number;
  heatColor: HeatColor;
  label?: string;
  className?: string;
}

const PointerMeter: React.FC<PointerMeterProps> = ({ value, heatColor, label, className }) => {
  const clampedValue = Math.max(0, Math.min(100, value));
  const angle = (clampedValue / 100) * 180;

  const getColor = (): string => {
    if (heatColor === HeatColor.Red) return 'text-red-500 dark:text-red-400';
    if (heatColor === HeatColor.Orange) return 'text-orange-500 dark:text-orange-400';
    if (heatColor === HeatColor.Yellow) return 'text-yellow-500 dark:text-yellow-400';
    if (heatColor === HeatColor.Lime) return 'text-lime-500 dark:text-lime-400';
    return 'text-green-500 dark:text-green-400';
  };

  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number
  ): { x: number; y: number } => {
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number
  ): string => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  return (
    <div className={cn('w-full max-w-sm mx-auto', className)}>
      <div className='relative'>
        <svg viewBox='0 0 200 120' className='w-full' aria-hidden='true'>
          {/* Gauge background */}
          <path
            d='M20 100 A 80 80 0 0 1 180 100'
            fill='none'
            stroke='currentColor'
            className='stroke-muted'
            strokeWidth='20'
            strokeLinecap='round'
          />
          {/* Colored gauge based on value */}
          <path
            d={describeArc(100, 100, 80, 0, angle)}
            fill='none'
            stroke='currentColor'
            strokeWidth='20'
            strokeLinecap='round'
            className={getColor()}
          />
          {/* Pointer */}
          <g transform={`rotate(${angle}, 100, 100)`}>
            <line
              x1='50'
              y1='100'
              x2='100'
              y2='100'
              stroke='currentColor'
              strokeWidth='5'
              strokeLinecap='round'
              className={getColor()}
            />
          </g>
          {/* Pointer pivot */}
          <circle cx='100' cy='100' r='5' fill='currentColor' className={getColor()} />
        </svg>
        {/* Value and label */}
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span className={`text-lg font-bold ${getColor()}`} aria-hidden='true'>
            {clampedValue}
          </span>
        </div>
        {label && (
          <div className=' flex flex-col  items-center justify-end'>
            <span className={`text-sm font-medium ${getColor()}`} aria-hidden='true'>
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PointerMeter;
