
import React, { useState, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
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
  BookPlus,
  Settings,
  Bell,
  Menu
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
                    useLocation().pathname === item.to ? 
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

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className={cn("h-screen bg-sidebar border-r flex flex-col transition-all duration-200", 
      collapsed ? "w-16" : "w-64"
    )}>
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
      
      {!collapsed && (
        <div className="flex items-center gap-3 p-4">
          <div className="h-10 w-10 rounded-full bg-estim-green flex items-center justify-center text-white">
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
      )}
      
      {collapsed && (
        <div className="flex items-center justify-center p-4">
          <div className="h-10 w-10 rounded-full bg-estim-green flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
      )}
      
      <Separator />
      
      <div className="flex-1 p-2 overflow-auto custom-scrollbar">
        {!collapsed ? (
          <>
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
              hasSubmenu={true}
              submenuItems={[
                { to: "/students/new", label: "Nouvelle inscription", icon: <FilePlus size={16} /> },
                { to: "/students/directory", label: "Annuaire", icon: <Users size={16} /> },
                { to: "/students/files", label: "Dossiers étudiants", icon: <FileText size={16} /> },
                { to: "/students/grades", label: "Relevés de notes", icon: <ClipboardList size={16} /> },
                { to: "/students/certificates", label: "Attestations", icon: <Award size={16} /> },
              ]}
            />
            
            <NavItem 
              to="/finances" 
              icon={<CreditCard size={18} />} 
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
          </>
        ) : (
          // Collapsed view with only icons
          <>
            <div className="flex flex-col items-center space-y-4 py-2">
              <Link to="/">
                <Button
                  variant="ghost"
                  className={cn(
                    "h-10 w-10 p-0 rounded-lg",
                    isActive("/") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                  )}
                >
                  <LayoutDashboard size={20} />
                </Button>
              </Link>
              
              <Link to="/students">
                <Button
                  variant="ghost"
                  className={cn(
                    "h-10 w-10 p-0 rounded-lg",
                    isActive("/students") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                  )}
                >
                  <Users size={20} />
                </Button>
              </Link>
              
              <Link to="/finances">
                <Button
                  variant="ghost"
                  className={cn(
                    "h-10 w-10 p-0 rounded-lg",
                    isActive("/finances") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                  )}
                >
                  <CreditCard size={20} />
                </Button>
              </Link>
              
              <Link to="/library">
                <Button
                  variant="ghost"
                  className={cn(
                    "h-10 w-10 p-0 rounded-lg",
                    isActive("/library") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                  )}
                >
                  <Library size={20} />
                </Button>
              </Link>
              
              <Link to="/academic">
                <Button
                  variant="ghost"
                  className={cn(
                    "h-10 w-10 p-0 rounded-lg",
                    isActive("/academic") ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                  )}
                >
                  <GraduationCap size={20} />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>

      <Separator />
      
      <div className="p-3">
        <Button 
          variant="ghost" 
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent/50",
            collapsed ? "w-10 h-10 p-0 mx-auto" : "w-full justify-start gap-2"
          )} 
          onClick={logout}
        >
          {!collapsed && <LogOut size={18} />}
          {collapsed ? <LogOut size={18} /> : <span>Déconnexion</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
