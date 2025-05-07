
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

interface ValidationErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  validationErrors: string[];
}

const ValidationErrorDialog: React.FC<ValidationErrorDialogProps> = ({
  open,
  onOpenChange,
  validationErrors
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <div className="flex items-center gap-3 mb-2 text-destructive">
          <AlertCircle className="h-6 w-6" />
          <AlertDialogTitle className="text-xl">Informations incomplètes</AlertDialogTitle>
        </div>
        <AlertDialogDescription className="mt-4 space-y-3 text-base">
          <p className="text-base text-muted-foreground">Veuillez compléter les informations suivantes avant de continuer :</p>
          <ul className="list-disc pl-5 mt-2 space-y-1.5">
            {validationErrors.map((error, index) => (
              <li key={index} className="text-base text-destructive">{error}</li>
            ))}
          </ul>
        </AlertDialogDescription>
        <AlertDialogFooter className="mt-6">
          <AlertDialogAction className="w-full sm:w-auto text-base h-11 px-6">Compris</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ValidationErrorDialog;
