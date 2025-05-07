
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type NavItemProps = {
  to: string;
  icon?: React.ReactNode;
  label: string;
  isActive: boolean;
  expanded?: boolean;
  isSubmenuItem?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  label, 
  isActive, 
  expanded = false,
  isSubmenuItem = false
}) => {
  // Pour submenu items, render a smaller button
  if (isSubmenuItem) {
    return (
      <Link to={to} className="block">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full justify-start gap-2 font-normal text-sm rounded-md",
            isActive ? 
              "bg-sidebar-accent/70 text-sidebar-accent-foreground" : 
              "text-sidebar-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
          )}
        >
          {icon && <span className="text-sm">{icon}</span>}
          <span>{label}</span>
        </Button>
      </Link>
    );
  }
  
  // Standard nav item without submenu - improved section header style
  return (
    <Link to={to} className="block mb-1">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-medium rounded-lg transition-all",
          isActive 
            ? "bg-sidebar-accent/90 text-sidebar-accent-foreground hover:bg-sidebar-accent" 
            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        )}
      >
        <div className={cn(
          "p-1 rounded-md",
          isActive ? "text-white" : "text-zinc-500 dark:text-zinc-400"
        )}>
          {icon}
        </div>
        <span className="font-semibold">{label}</span>
      </Button>
    </Link>
  );
};

export default NavItem;
