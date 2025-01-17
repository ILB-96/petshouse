"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
interface FilterToggleButtonProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  filterState: Set<unknown>;
  companyState: Set<unknown>;
}
const FilterToggleButton = ({
  isSidebarOpen,
  setSidebarOpen,
  filterState,
  companyState,
}: FilterToggleButtonProps) => {
  return (
    <>
      <Button
        variant="outline"
        className="z-40"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        Filter
        {isSidebarOpen ? (
          <Icons.exit />
        ) : filterState.size || companyState.size ? (
          <Icons.filterx />
        ) : (
          <Icons.filter />
        )}
      </Button>

      {isSidebarOpen && (
        <div
          className="inset-0 bg-black/20 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default FilterToggleButton;
