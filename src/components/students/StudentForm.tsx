
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import StudentFormProvider from "./form/StudentFormProvider";
import StudentFormTabs from "./form/StudentFormTabs";
import { StudentFormValues } from "./form/validationSchema";

const StudentForm: React.FC = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const onSubmit = (data: StudentFormValues) => {
    console.log("Form submitted:", data);
    
    // Simulation de la génération du matricule (serait normalement fait côté serveur)
    const prefix = data.filiere.substring(0, 2).toUpperCase();
    const year = new Date().getFullYear().toString().substring(2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const matricule = `${prefix}${year}-${random}`;
    
    toast({
      title: "Inscription réussie",
      description: `L'étudiant ${data.prenom} ${data.nom} a été inscrit avec le matricule ${matricule}.`,
      duration: 5000,
    });
  };

  // Gestion de l'aperçu de la photo
  const handlePhotoChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-xl p-8 shadow-md">
      <StudentFormProvider onSubmit={onSubmit}>
        <StudentFormTabs 
          photoPreview={photoPreview}
          handlePhotoChange={handlePhotoChange}
        />
      </StudentFormProvider>
    </div>
  );
};

export default StudentForm;
