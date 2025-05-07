
import React from "react";
import { Link } from "react-router-dom";
import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const PageHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Module Étudiants</h1>
        <p className="text-muted-foreground">
          Bienvenue dans le module de gestion des étudiants.
        </p>
      </div>
      <Link to="/students/new">
        <Button className="flex items-center gap-1">
          <FilePlus size={16} />
          Nouvelle inscription
        </Button>
      </Link>
    </div>
  );
};

export default PageHeader;
