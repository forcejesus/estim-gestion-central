
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Users, 
  BookOpen, 
  BookText, 
  Library,
  LayoutDashboard, 
  LogOut, 
  ChevronDown,
  User
} from "lucide-react";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-normal",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        )}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="h-screen w-64 bg-sidebar border-r flex flex-col">
      <div className="p-5">
        <h1 className="text-2xl font-bold text-primary">ESTIM GESTION</h1>
        <p className="text-sm text-muted-foreground">Portail administratif</p>
      </div>
      
      <Separator />
      
      <div className="flex items-center gap-3 p-4">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <User size={16} />
        </div>
        <div>
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex-1 p-3 space-y-1 overflow-auto">
        <NavItem 
          to="/" 
          icon={<LayoutDashboard size={18} />} 
          label="Tableau de bord" 
          isActive={isActive("/")} 
        />
        <NavItem 
          to="/students" 
          icon={<Users size={18} />} 
          label="Étudiants" 
          isActive={isActive("/students")} 
        />
        <NavItem 
          to="/finances" 
          icon={<BookText size={18} />} 
          label="Finances" 
          isActive={isActive("/finances")} 
        />
        <NavItem 
          to="/examinations" 
          icon={<BookOpen size={18} />} 
          label="Examens" 
          isActive={isActive("/examinations")} 
        />
        <NavItem 
          to="/library" 
          icon={<Library size={18} />} 
          label="Bibliothèque" 
          isActive={isActive("/library")} 
        />
      </div>

      <Separator />
      
      <div className="p-3">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent/50" 
          onClick={logout}
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
