
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EstimLogo from "@/components/EstimLogo";

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
            <EstimLogo size={32} />
            <div>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-white">ESTIM</h1>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <EstimLogo size={32} />
          </div>
        )}
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCollapsed(true)} 
            className="h-8 w-8 p-0 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
          >
            <ChevronRight size={16} />
          </Button>
        )}
        {collapsed && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCollapsed(false)} 
            className="h-8 w-8 p-0 rounded-full mx-auto hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
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
