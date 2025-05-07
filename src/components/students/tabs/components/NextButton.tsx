
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface NextButtonProps {
  onClick: () => void;
  onBack?: () => void;
  showBack?: boolean;
  backLabel?: string;
  nextLabel?: string;
}

const NextButton: React.FC<NextButtonProps> = ({ 
  onClick, 
  onBack, 
  showBack = false,
  backLabel = "Précédent",
  nextLabel = "Suivant" 
}) => {
  return (
    <div className="flex justify-between mt-8">
      {showBack && onBack && (
        <Button 
          type="button" 
          onClick={onBack}
          variant="outline"
          className="text-primary border-primary hover:bg-primary/10 px-6 h-11 text-base"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> {backLabel}
        </Button>
      )}
      <div className={showBack ? "" : "ml-auto"}>
        <Button 
          type="button" 
          onClick={onClick}
          className="bg-primary hover:bg-primary/90 text-white px-6 h-11 text-base"
        >
          {nextLabel} <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default NextButton;
