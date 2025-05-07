
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type CollapsedNavItemProps = {
  to: string;
  icon: React.ReactNode;
  isActive: boolean;
  label: string;
};

const CollapsedNavItem: React.FC<CollapsedNavItemProps> = ({ to, icon, isActive, label }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={to} className="block mb-1">
          <Button
            variant="ghost"
            className={cn(
              "h-10 w-10 p-0 rounded-lg",
              isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            {icon}
          </Button>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-zinc-800 text-white border-none">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};

export default CollapsedNavItem;
