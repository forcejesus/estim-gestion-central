
import React from "react";
import { 
  Users, 
  BookOpen, 
  BookText, 
  Library,
  LayoutDashboard, 
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
  ChevronRight
} from "lucide-react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import CollapsedNavItem from "./CollapsedNavItem";

type NavigationItemsProps = {
  collapsed: boolean;
};

const NavigationItems: React.FC<NavigationItemsProps> = ({ collapsed }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  if (collapsed) {
    return (
      <div className="flex flex-col items-center space-y-4 py-2">
        <CollapsedNavItem to="/" icon={<LayoutDashboard size={20} />} isActive={isActive("/")} />
        <CollapsedNavItem to="/students" icon={<Users size={20} />} isActive={isActive("/students")} />
        <CollapsedNavItem to="/finances" icon={<CreditCard size={20} />} isActive={isActive("/finances")} />
        <CollapsedNavItem to="/library" icon={<Library size={20} />} isActive={isActive("/library")} />
        <CollapsedNavItem to="/academic" icon={<GraduationCap size={20} />} isActive={isActive("/academic")} />
      </div>
    );
  }

  return (
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
  );
};

export default NavigationItems;
