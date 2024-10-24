"use client";
import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

import { cn } from "@/lib/utils";
type MotionWrapProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};
const MotionWrap: React.FC<MotionWrapProps> = ({ children, className }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div
      ref={ref}
      className={cn(
        `transition-all duration-500 ${
          inView ? "translate-y-0 opacity-100" : "translate-y-32 opacity-0"
        }`,
        className
      )}
    >
      {children}
    </div>
  );
};
export default MotionWrap;
