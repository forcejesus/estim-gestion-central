
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center w-full lg:w-auto relative">
      <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
      <Input 
        placeholder="Rechercher..." 
        className="pl-10 w-full lg:w-80" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
