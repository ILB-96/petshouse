import React from "react";
import { Button } from "../ui/button";
import { NavLink } from "@/styles/style";

interface CTAButtonProps {
  href: string;
  name: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ href, name }) => {
  return (
    <Button
      asChild
      className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
    >
      <NavLink href={href}>{name}</NavLink>
    </Button>
  );
};

export default CTAButton;
