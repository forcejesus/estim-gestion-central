
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type SidebarHeaderProps = {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
};

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, setCollapsed }) => {
  return (
    <>
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-estim-green rounded-md flex items-center justify-center">
              <span className="text-white font-bold">E</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">ESTIM</h1>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 bg-estim-green rounded-md flex items-center justify-center mx-auto">
            <span className="text-white font-bold">E</span>
          </div>
        )}
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCollapsed(true)} 
            className="h-8 w-8 p-0 rounded-full hover:bg-sidebar-accent/20"
          >
            <ChevronRight size={16} />
          </Button>
        )}
        {collapsed && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCollapsed(false)} 
            className="h-8 w-8 p-0 rounded-full mx-auto hover:bg-sidebar-accent/20"
          >
            <Menu size={16} />
          </Button>
        )}
      </div>
      <Separator />
    </>
  );
};

export default SidebarHeader;
