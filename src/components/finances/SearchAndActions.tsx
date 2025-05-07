
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, FileText } from "lucide-react";

interface SearchAndActionsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchAndActions: React.FC<SearchAndActionsProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
      <div className="flex items-center w-full md:w-auto relative">
        <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Rechercher..." 
          className="pl-10 w-full md:w-80" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2">
          <FileText size={18} />
          <span>Exporter</span>
        </Button>
        <Button className="gap-2">
          <PlusCircle size={18} />
          <span>Nouvelle transaction</span>
        </Button>
      </div>
    </div>
  );
};

export default SearchAndActions;
