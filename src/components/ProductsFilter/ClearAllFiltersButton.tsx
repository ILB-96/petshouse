import React from "react";
import { Button } from "@/components/ui/button";
const ClearAllFiltersButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="m-4">
      <Button
        variant="destructive"
        size="sm"
        className="w-full"
        onClick={onClick}
      >
        Clear All
      </Button>
    </div>
  );
};

export default ClearAllFiltersButton;
