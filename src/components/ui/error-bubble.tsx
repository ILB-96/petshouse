import React from "react";
import { FieldError } from "react-hook-form";
interface ErrorBubbleProps {
  error: FieldError | undefined;
}
const ErrorBubble = ({ error }: ErrorBubbleProps) => {
  return (
    <div className="relative max-w-[22ch]">
      {error && (
        <div className="error-bubble shadow-muted bg-destructive rounded-2xl shadow-md">
          <div className="error-bubble-arrow" />
          {error.message}
        </div>
      )}
    </div>
  );
};
export default ErrorBubble;
