
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
    <div className="flex justify-end mt-8">
      <Button 
        type="button" 
        onClick={onClick}
        className="bg-primary hover:bg-primary/90 text-white px-6 h-11 text-base"
      >
        Suivant <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

export default NextButton;
