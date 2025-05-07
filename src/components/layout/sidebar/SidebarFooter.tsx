
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut, HelpCircle, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type SidebarFooterProps = {
  collapsed: boolean;
  onLogout: () => void;
};

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed, onLogout }) => {
  return (
    <>
      <Separator className="my-2" />
      <div className="p-3 flex flex-col gap-2">
        {!collapsed && (
          <>
            <Button 
              variant="ghost" 
              className={cn(
                "text-sidebar-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 justify-start gap-2 rounded-lg",
                collapsed ? "w-10 h-10 p-0 mx-auto" : "w-full"
              )} 
            >
              <HelpCircle size={18} />
              <span>Aide</span>
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "text-sidebar-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800 justify-start gap-2 rounded-lg",
                collapsed ? "w-10 h-10 p-0 mx-auto" : "w-full"
              )} 
            >
              <Settings size={18} />
              <span>Paramètres</span>
            </Button>
          </>
        )}
        <Button 
          variant="outline" 
          className={cn(
            "border-zinc-200 dark:border-zinc-700 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-300 hover:border-red-200 dark:hover:border-red-800 rounded-lg",
            collapsed ? "w-10 h-10 p-0 mx-auto" : "w-full justify-start gap-2"
          )} 
          onClick={onLogout}
        >
          <LogOut size={18} />
          {!collapsed && <span>Déconnexion</span>}
        </Button>
      </div>
    </>
  );
};

export default SidebarFooter;
