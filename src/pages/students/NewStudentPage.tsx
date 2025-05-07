
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Check, GraduationCap } from "lucide-react";
import StudentForm from "@/components/students/StudentForm";
import CsvImportDialog from "@/components/students/CsvImportDialog";
import { useToast } from "@/hooks/use-toast";

const NewStudentPage: React.FC = () => {
  const [importSuccess, setImportSuccess] = useState(false);
  const { toast } = useToast();

  const handleImportSuccess = (studentsCount: number) => {
    setImportSuccess(true);
    
    toast({
      title: "Inscription multiple réussie",
      description: `${studentsCount} étudiants ont été inscrits avec succès.`,
      duration: 5000,
    });
    
    setTimeout(() => {
      setImportSuccess(false);
    }, 3000);
  };

  return (
    <>
      <Header title="Nouvelle inscription" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-center">
            <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Inscription d'un nouvel étudiant</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Remplissez les informations ci-dessous pour inscrire un nouvel étudiant à ESTIM ou utilisez l'option d'importation CSV pour inscrire plusieurs étudiants à la fois.
            </p>
          </div>
          
          <Card className="border-t-4 border-t-primary shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-6 w-6 text-primary" />
                  <CardTitle>Formulaire d'inscription</CardTitle>
                </div>
                <CsvImportDialog onSuccess={handleImportSuccess} />
              </div>
            </CardHeader>
            <CardContent>
              {importSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 bg-primary/5 rounded-lg">
                  <div className="bg-primary/15 rounded-full p-5 mb-4 animate-pulse">
                    <Check className="h-14 w-14 text-primary" />
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
      </div>
    </>
  );
};

export default NewStudentPage;
