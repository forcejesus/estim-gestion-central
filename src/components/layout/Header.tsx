
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, LogOut, Search, User, Settings } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    toast.success("Déconnexion réussie");
  };
  
  return (
    <header className="bg-background border-b border-estim-green/10 py-3 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-estim-green">{title}</h1>
        
        <div className="relative hidden md:block max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher..." 
            className="pl-10 w-full max-w-xs h-9 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          size="icon" 
          variant="ghost"
          className="relative hover:bg-estim-green/10 h-9 w-9"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-estim-yellow rounded-full"></span>
        </Button>
        
        <Button 
          size="icon" 
          variant="ghost"
          className="hover:bg-estim-green/10 h-9 w-9"
        >
          <Settings size={18} />
        </Button>
        
        {user && (
          <Button
            variant="outline"
            size="sm"
            className="border-estim-green/20 text-estim-green hover:bg-estim-green/10 ml-2"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            Déconnexion
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
