
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  hasSubmenu?: boolean;
  submenuItems?: Array<{
    to: string;
    label: string;
    icon?: React.ReactNode;
  }>;
};

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon, 
  label, 
  isActive, 
  hasSubmenu = false,
  submenuItems = [] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // If it has submenu, we'll render a custom dropdown
  if (hasSubmenu) {
    return (
      <div className="relative w-full mb-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between gap-2 font-medium rounded-md",
            isActive ? "bg-sidebar-accent/90 text-sidebar-accent-foreground hover:bg-sidebar-accent" : 
              "text-sidebar-foreground hover:bg-sidebar-accent/30"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-1 rounded mr-1",
              isActive ? "text-white" : "text-slate-400"
            )}>
              {icon}
            </div>
            <span>{label}</span>
          </div>
          <ChevronDown size={16} className={cn("transition-transform", isOpen ? "rotate-180" : "")} />
        </Button>
        
        {isOpen && (
          <div className="pl-9 pt-1 pb-1 space-y-0.5">
            {submenuItems.map((item, index) => (
              <Link to={item.to} key={index} className="block">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start gap-2 font-normal text-sm rounded-md",
                    location.pathname === item.to ? 
                      "bg-sidebar-accent/70 text-sidebar-accent-foreground" : 
                      "text-sidebar-foreground hover:bg-sidebar-accent/20"
                  )}
                >
                  {item.icon && <span className="text-sm">{item.icon}</span>}
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  // Standard nav item without submenu
  return (
    <Link to={to} className="block mb-1">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-medium rounded-md",
          isActive ? "bg-sidebar-accent/90 text-sidebar-accent-foreground hover:bg-sidebar-accent" : "text-sidebar-foreground hover:bg-sidebar-accent/30"
        )}
      >
        <div className={cn(
          "p-1 rounded mr-1",
          isActive ? "text-white" : "text-slate-400"
        )}>
          {icon}
        </div>
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export default NavItem;
