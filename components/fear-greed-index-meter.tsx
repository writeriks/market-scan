import React from "react";
import PointerMeter, { HeatColor } from "./pointer-meter/pointer-meter";

interface FearGreedIndexMeterProps {
  value: number;
  className?: string;
}

const FearGreedIndexMeter: React.FC<FearGreedIndexMeterProps> = ({
  value,
  className,
}) => {
  const getLabel = (labelValue: number): string => {
    if (labelValue <= 25) return "Extreme Fear";
    if (labelValue <= 45) return "Fear";
    if (labelValue <= 55) return "Neutral";
    if (labelValue <= 75) return "Greed";
    return "Extreme Greed";
  };

  const getColor = (indicatorValue: number): HeatColor => {
    if (indicatorValue <= 25) return HeatColor.Red;
    if (indicatorValue <= 45) return HeatColor.Orange;
    if (indicatorValue <= 55) return HeatColor.Yellow;
    if (indicatorValue <= 75) return HeatColor.Lime;
    return HeatColor.Green;
  };

  return (
    <>
      <PointerMeter
        value={value}
        label={getLabel(value)}
        heatColor={getColor(value)}
        className={className}
      />
    </>
  );
};

export default FearGreedIndexMeter;
