
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell } from "lucide-react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user } = useAuth();
  
  return (
    <header className="bg-background border-b border-estim-green/10 py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-estim-green">{title}</h1>

      <div className="flex items-center gap-4">
        <Button 
          size="icon" 
          variant="ghost"
          className="relative hover:bg-estim-green/10"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-estim-yellow rounded-full"></span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
