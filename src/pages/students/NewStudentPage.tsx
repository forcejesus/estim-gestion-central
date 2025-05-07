
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Check } from "lucide-react";
import StudentForm from "@/components/students/StudentForm";
import CsvImportDialog from "@/components/students/CsvImportDialog";
import { useToast } from "@/hooks/use-toast";

const NewStudentPage: React.FC = () => {
  const [importSuccess, setImportSuccess] = useState(false);
  const { toast } = useToast();

  const handleImportSuccess = (studentsCount: number) => {
    setImportSuccess(true);
    
    // Afficher un toast de succès
    toast({
      title: "Inscription multiple réussie",
      description: `${studentsCount} étudiants ont été inscrits avec succès.`,
      duration: 5000,
    });
    
    // Réinitialiser le statut après 3 secondes
    setTimeout(() => {
      setImportSuccess(false);
    }, 3000);
  };

  return (
    <>
      <Header title="Nouvelle inscription" />
      <div className="flex-1 overflow-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-primary" />
                <CardTitle>Inscription d'un nouvel étudiant</CardTitle>
              </div>
              <CsvImportDialog onSuccess={handleImportSuccess} />
            </div>
          </CardHeader>
          <CardContent>
            {importSuccess ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Check className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-medium mb-2">Importation réussie!</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Les étudiants ont été enregistrés avec succès. Vous pouvez maintenant les consulter dans l'annuaire des étudiants.
                </p>
              </div>
            ) : (
              <StudentForm />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NewStudentPage;
