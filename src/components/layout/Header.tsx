
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Search, User, Settings, Moon, Sun, UserSearch } from "lucide-react";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Recherche: ${searchQuery}`);
    setSearchQuery("");
  };
  
  return (
    <header className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 py-3 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">{title}</h1>
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
        
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              size="icon" 
              variant="ghost"
              className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 h-9 w-9"
            >
              <UserSearch size={18} />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="w-full sm:max-w-md mx-auto">
            <DrawerHeader>
              <DrawerTitle>Rechercher un étudiant</DrawerTitle>
              <DrawerDescription>
                Recherchez un étudiant par matricule ou filtrez par classe, filière et année académique.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <Tabs defaultValue="matricule" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="matricule">Par Matricule</TabsTrigger>
                  <TabsTrigger value="filtre">Par Filtre</TabsTrigger>
                </TabsList>
                <TabsContent value="matricule" className="space-y-4">
                  <form onSubmit={handleSearch}>
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Entrez le matricule de l'étudiant" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit">Rechercher</Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="filtre" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="class">Classe</Label>
                      <Select>
                        <SelectTrigger id="class">
                          <SelectValue placeholder="Sélectionner une classe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="licence1">Licence 1</SelectItem>
                          <SelectItem value="licence2">Licence 2</SelectItem>
                          <SelectItem value="licence3">Licence 3</SelectItem>
                          <SelectItem value="master1">Master 1</SelectItem>
                          <SelectItem value="master2">Master 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="program">Filière</Label>
                      <Select>
                        <SelectTrigger id="program">
                          <SelectValue placeholder="Sélectionner une filière" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="informatique">Informatique</SelectItem>
                          <SelectItem value="gestion">Gestion</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="year">Année académique</Label>
                      <Select>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Sélectionner une année" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-2025">2024-2025</SelectItem>
                          <SelectItem value="2023-2024">2023-2024</SelectItem>
                          <SelectItem value="2022-2023">2022-2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Rechercher</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Fermer</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

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
      </div>
    </header>
  );
};

export default Header;
