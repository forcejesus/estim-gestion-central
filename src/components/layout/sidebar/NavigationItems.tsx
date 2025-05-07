
import React, { useState } from "react";
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
  FileSearch,
  CheckSquare
} from "lucide-react";
import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import CollapsedNavItem from "../CollapsedNavItem";

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
      <div className="flex flex-col items-center space-y-4 py-4">
        <CollapsedNavItem to="/" icon={<LayoutDashboard size={20} />} isActive={isActive("/")} label="Tableau de bord" />
        <CollapsedNavItem to="/students" icon={<Users size={20} />} isActive={isActive("/students")} label="Étudiants" />
        <CollapsedNavItem to="/examinations" icon={<FileSearch size={20} />} isActive={isActive("/examinations")} label="Examens" />
        <CollapsedNavItem to="/finances" icon={<CreditCard size={20} />} isActive={isActive("/finances")} label="Finances" />
        <CollapsedNavItem to="/library" icon={<Library size={20} />} isActive={isActive("/library")} label="Bibliothèque" />
        <CollapsedNavItem to="/academic" icon={<GraduationCap size={20} />} isActive={isActive("/academic")} label="Scolarité" />
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
      
      <div className="relative w-full mb-1">
        <NavItem 
          to="/students" 
          icon={<Users size={18} />} 
          label="Étudiants" 
          isActive={isActive("/students")}
          expanded={false}
        />
        <div className="pl-9 pt-1 pb-1 space-y-0.5">
          <NavItem to="/students/new" label="Nouvelle inscription" icon={<FilePlus size={16} />} isActive={isActive("/students/new")} isSubmenuItem={true} />
          <NavItem to="/students/directory" label="Annuaire" icon={<Users size={16} />} isActive={isActive("/students/directory")} isSubmenuItem={true} />
          <NavItem to="/students/files" label="Dossiers étudiants" icon={<FileText size={16} />} isActive={isActive("/students/files")} isSubmenuItem={true} />
          <NavItem to="/students/grades" label="Relevés de notes" icon={<ClipboardList size={16} />} isActive={isActive("/students/grades")} isSubmenuItem={true} />
          <NavItem to="/students/certificates" label="Attestations" icon={<Award size={16} />} isActive={isActive("/students/certificates")} isSubmenuItem={true} />
        </div>
      </div>
      
      <div className="relative w-full mb-1">
        <NavItem 
          to="/examinations" 
          icon={<FileSearch size={18} />} 
          label="Examens" 
          isActive={isActive("/examinations")}
          expanded={false}
        />
        <div className="pl-9 pt-1 pb-1 space-y-0.5">
          <NavItem to="/examinations/sessions" label="Sessions d'examen" icon={<Calendar size={16} />} isActive={isActive("/examinations/sessions")} isSubmenuItem={true} />
          <NavItem to="/examinations/grades" label="Saisie des notes" icon={<ClipboardList size={16} />} isActive={isActive("/examinations/grades")} isSubmenuItem={true} />
          <NavItem to="/examinations/results" label="Résultats" icon={<CheckSquare size={16} />} isActive={isActive("/examinations/results")} isSubmenuItem={true} />
          <NavItem to="/examinations/reports" label="Rapports" icon={<FileText size={16} />} isActive={isActive("/examinations/reports")} isSubmenuItem={true} />
        </div>
      </div>
      
      <div className="relative w-full mb-1">
        <NavItem 
          to="/finances" 
          icon={<CreditCard size={18} />} 
          label="Finances" 
          isActive={isActive("/finances")}
          expanded={false}
        />
        <div className="pl-9 pt-1 pb-1 space-y-0.5">
          <NavItem to="/finances/tuition" label="Frais de scolarité" icon={<CreditCard size={16} />} isActive={isActive("/finances/tuition")} isSubmenuItem={true} />
          <NavItem to="/finances/payments" label="Paiements" icon={<Receipt size={16} />} isActive={isActive("/finances/payments")} isSubmenuItem={true} />
          <NavItem to="/finances/expenses" label="Dépenses" icon={<BookText size={16} />} isActive={isActive("/finances/expenses")} isSubmenuItem={true} />
          <NavItem to="/finances/reports" label="Rapports" icon={<PieChart size={16} />} isActive={isActive("/finances/reports")} isSubmenuItem={true} />
        </div>
      </div>
      
      <div className="relative w-full mb-1">
        <NavItem 
          to="/library" 
          icon={<Library size={18} />} 
          label="Bibliothèque" 
          isActive={isActive("/library")}
          expanded={false}
        />
        <div className="pl-9 pt-1 pb-1 space-y-0.5">
          <NavItem to="/library/catalog" label="Catalogue" icon={<BookMarked size={16} />} isActive={isActive("/library/catalog")} isSubmenuItem={true} />
          <NavItem to="/library/new-book" label="Nouvel ouvrage" icon={<BookPlus size={16} />} isActive={isActive("/library/new-book")} isSubmenuItem={true} />
          <NavItem to="/library/loans" label="Emprunts" icon={<BookOpen size={16} />} isActive={isActive("/library/loans")} isSubmenuItem={true} />
        </div>
      </div>
      
      <div className="relative w-full mb-1">
        <NavItem 
          to="/academic" 
          icon={<GraduationCap size={18} />} 
          label="Scolarité" 
          isActive={isActive("/academic")}
          expanded={false}
        />
        <div className="pl-9 pt-1 pb-1 space-y-0.5">
          <NavItem to="/academic/programs" label="Filières" icon={<BookOpen size={16} />} isActive={isActive("/academic/programs")} isSubmenuItem={true} />
          <NavItem to="/academic/levels" label="Niveaux" icon={<BookMarked size={16} />} isActive={isActive("/academic/levels")} isSubmenuItem={true} />
          <NavItem to="/academic/classes" label="Classes" icon={<Users size={16} />} isActive={isActive("/academic/classes")} isSubmenuItem={true} />
          <NavItem to="/academic/subjects" label="Matières" icon={<BookText size={16} />} isActive={isActive("/academic/subjects")} isSubmenuItem={true} />
          <NavItem to="/academic/courses" label="Cours en ligne" icon={<BookMarked size={16} />} isActive={isActive("/academic/courses")} isSubmenuItem={true} />
        </div>
      </div>
    </>
  );
};

export default NavigationItems;
