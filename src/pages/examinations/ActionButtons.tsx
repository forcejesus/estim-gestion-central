
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle } from "lucide-react";

const ActionButtons: React.FC = () => {
  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      <Button variant="outline" className="gap-2">
        <FileText size={18} />
        <span>Exporter</span>
      </Button>
      <Button className="gap-2">
        <PlusCircle size={18} />
        <span>Nouvelle session</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
