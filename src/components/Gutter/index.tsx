import React, { forwardRef } from "react";

import classes from "./index.module.scss";

type Props = {
  left?: boolean;
  right?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Gutter: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    const { left = true, right = true, className, children } = props;

    return (
      <div
        ref={ref}
        className={[
          classes.gutter,
          left && classes.gutterLeft,
          right && classes.gutterRight,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    );
  }
);

Gutter.displayName = "Gutter";
