
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CollapsedNavItemProps = {
  to: string;
  icon: React.ReactNode;
  isActive: boolean;
};

const CollapsedNavItem: React.FC<CollapsedNavItemProps> = ({ to, icon, isActive }) => {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "h-10 w-10 p-0 rounded-lg",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
        )}
      >
        {icon}
      </Button>
    </Link>
  );
};

export default CollapsedNavItem;
