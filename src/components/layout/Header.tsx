
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, LogOut, Search, User, Settings, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  const handleLogout = () => {
    logout();
    toast.success("Déconnexion réussie");
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Initialize theme on component mount
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);
  
  return (
    <header className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 py-3 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">{title}</h1>
        
        <div className="relative hidden md:block max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher..." 
            className="pl-10 w-full max-w-xs h-9 bg-zinc-100/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-lg"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleDarkMode}
          className="rounded-full h-9 w-9 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        
        <Button 
          size="icon" 
          variant="ghost"
          className="relative rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 w-9"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <Button 
          size="icon" 
          variant="ghost"
          className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 w-9"
        >
          <Settings size={18} />
        </Button>
        
        {user && (
          <Button
            variant="outline"
            size="sm"
            className="ml-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
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
