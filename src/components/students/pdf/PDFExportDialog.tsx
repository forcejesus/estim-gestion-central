
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import StudentProfilePDF from "./StudentProfilePDF";

interface PDFExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: any; // Using any here but in a real app we would define a proper type
}

const PDFExportDialog: React.FC<PDFExportDialogProps> = ({ 
  open, 
  onOpenChange,
  student
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Aperçu du dossier de {student.name}</DialogTitle>
          <DialogDescription>
            Vous pouvez imprimer ce document ou l'enregistrer en PDF
          </DialogDescription>
        </DialogHeader>
        <div className="pt-4">
          <StudentProfilePDF student={student} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFExportDialog;
