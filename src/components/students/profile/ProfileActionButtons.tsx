
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FilePdf, Printer } from "lucide-react";

interface ProfileActionButtonsProps {
  onExportClick: () => void;
  onPrintClick: () => void;
}

const ProfileActionButtons: React.FC<ProfileActionButtonsProps> = ({
  onExportClick,
  onPrintClick
}) => {
  return (
    <div className="flex justify-between">
      <Link to="/students/directory">
        <Button variant="outline" className="gap-2">
          <ChevronLeft size={16} />
          Retour à l'annuaire
        </Button>
      </Link>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={onExportClick}
        >
          <FilePdf size={16} />
          Exporter le dossier
        </Button>
        
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={onPrintClick}
        >
          <Printer size={16} />
          Imprimer
        </Button>
      </div>
    </div>
  );
};

export default ProfileActionButtons;
