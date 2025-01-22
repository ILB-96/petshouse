"use client";
import { useTimer } from "@/hooks/use-timer";
import React from "react";

interface TimerProps {
  endDate: Date;
}
const CardTimer: React.FC<TimerProps> = ({ endDate }) => {
  const timeLeft = useTimer(endDate as Date);
  if (!endDate || !timeLeft) return null;

  return (
    <div className="text-red-600 font-semibold text-sm">
      Time left: {timeLeft}
    </div>
  );
};

export default CardTimer;
