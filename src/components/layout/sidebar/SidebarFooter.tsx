
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type SidebarFooterProps = {
  collapsed: boolean;
  onLogout: () => void;
};

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed, onLogout }) => {
  return (
    <>
      <Separator />
      <div className="p-3">
        <Button 
          variant="ghost" 
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent/50",
            collapsed ? "w-10 h-10 p-0 mx-auto" : "w-full justify-start gap-2"
          )} 
          onClick={onLogout}
        >
          {!collapsed && <LogOut size={18} />}
          {collapsed ? <LogOut size={18} /> : <span>Déconnexion</span>}
        </Button>
      </div>
    </>
  );
};

export default SidebarFooter;
