
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { 
  Users, 
  BookOpen, 
  BookText, 
  Library,
  LayoutDashboard, 
  LogOut, 
  ChevronDown,
  ChevronRight,
  User,
  GraduationCap,
  FilePlus,
  FileText,
  Calendar,
  CreditCard,
  Receipt,
  PieChart,
  ClipboardList,
  Award,
  BookMarked,
  BookPlus
} from "lucide-react";

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
  
  // If it has submenu, we'll render a custom dropdown
  if (hasSubmenu) {
    return (
      <div className="relative group w-full">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between gap-2 font-normal",
            isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : 
              "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span>{label}</span>
          </div>
          <ChevronDown size={16} className={cn("transition-transform", isOpen ? "rotate-180" : "")} />
        </Button>
        
        {isOpen && (
          <div className="pl-8 pt-1 pb-1 space-y-1">
            {submenuItems.map((item, index) => (
              <Link to={item.to} key={index} className="block">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "w-full justify-start gap-2 font-normal text-sm",
                    useLocation().pathname === item.to ? 
                      "bg-sidebar-accent text-sidebar-accent-foreground" : 
                      "text-sidebar-foreground hover:bg-sidebar-accent/30"
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
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-estim-green rounded-md flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary">ESTIM GESTION</h1>
            <p className="text-xs text-muted-foreground">v1.0.0</p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="flex items-center gap-3 p-4">
        <div className="h-10 w-10 rounded-md bg-estim-green flex items-center justify-center text-white">
          <User size={16} />
        </div>
        <div>
          <p className="text-sm font-medium">{user?.name}</p>
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            <span className="ml-2 h-2 w-2 rounded-full bg-green-500"></span>
          </div>
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
        
        {/* Étudiants avec sous-menu */}
        <NavItem 
          to="/students" 
          icon={<Users size={18} />} 
          label="Étudiants" 
          isActive={isActive("/students")}
          hasSubmenu={true}
          submenuItems={[
            { to: "/students/new", label: "Nouvelle inscription", icon: <FilePlus size={16} /> },
            { to: "/students/directory", label: "Annuaire", icon: <Users size={16} /> },
            { to: "/students/files", label: "Dossiers étudiants", icon: <FileText size={16} /> },
            { to: "/students/grades", label: "Relevés de notes", icon: <ClipboardList size={16} /> },
            { to: "/students/certificates", label: "Attestations", icon: <Award size={16} /> },
          ]}
        />
        
        {/* Finances avec sous-menu */}
        <NavItem 
          to="/finances" 
          icon={<BookText size={18} />} 
          label="Finances" 
          isActive={isActive("/finances")}
          hasSubmenu={true}
          submenuItems={[
            { to: "/finances/tuition", label: "Frais de scolarité", icon: <CreditCard size={16} /> },
            { to: "/finances/payments", label: "Paiements", icon: <Receipt size={16} /> },
            { to: "/finances/expenses", label: "Dépenses", icon: <BookText size={16} /> },
            { to: "/finances/reports", label: "Rapports", icon: <PieChart size={16} /> },
          ]}
        />
        
        {/* Examens avec sous-menu */}
        <NavItem 
          to="/examinations" 
          icon={<BookOpen size={18} />} 
          label="Examens" 
          isActive={isActive("/examinations")}
          hasSubmenu={true}
          submenuItems={[
            { to: "/examinations/schedule", label: "Planification", icon: <Calendar size={16} /> },
            { to: "/examinations/grades", label: "Saisie des notes", icon: <ClipboardList size={16} /> },
            { to: "/examinations/results", label: "Résultats", icon: <Award size={16} /> },
            { to: "/examinations/reports", label: "Rapports", icon: <FileText size={16} /> },
          ]}
        />
        
        {/* Bibliothèque avec sous-menu */}
        <NavItem 
          to="/library" 
          icon={<Library size={18} />} 
          label="Bibliothèque" 
          isActive={isActive("/library")}
          hasSubmenu={true}
          submenuItems={[
            { to: "/library/catalog", label: "Catalogue", icon: <BookMarked size={16} /> },
            { to: "/library/new-book", label: "Nouvel ouvrage", icon: <BookPlus size={16} /> },
            { to: "/library/loans", label: "Emprunts", icon: <BookOpen size={16} /> },
          ]}
        />
        
        {/* Scolarité avec sous-menu */}
        <NavItem 
          to="/academic" 
          icon={<GraduationCap size={18} />} 
          label="Scolarité" 
          isActive={isActive("/academic")}
          hasSubmenu={true}
          submenuItems={[
            { to: "/academic/programs", label: "Filières", icon: <BookOpen size={16} /> },
            { to: "/academic/levels", label: "Niveaux", icon: <ChevronRight size={16} /> },
            { to: "/academic/classes", label: "Classes", icon: <Users size={16} /> },
            { to: "/academic/subjects", label: "Matières", icon: <BookText size={16} /> },
            { to: "/academic/courses", label: "Cours en ligne", icon: <BookMarked size={16} /> },
          ]}
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
