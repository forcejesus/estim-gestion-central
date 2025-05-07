import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import ContactInfoTab from "./tabs/ContactInfoTab";
import AcademicInfoTab from "./tabs/AcademicInfoTab";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from "lucide-react";

const studentSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  date_naissance: z.string().min(1, "La date de naissance est requise").refine((date) => {
    // Basic date validation (YYYY-MM-DD format)
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
    
    const parsedDate = new Date(date);
    const today = new Date();
    
    // Check if date is valid and not in the future
    return !isNaN(parsedDate.getTime()) && 
           parsedDate < today && 
           parsedDate > new Date('1940-01-01');
  }, "La date de naissance doit être valide et comprise entre 1940 et aujourd'hui"),
  lieu_naissance: z.string().min(1, "Le lieu de naissance est requis"),
  sexe: z.string().min(1, "Le genre est requis"),
  nationalite: z.string().min(1, "La nationalité est requise"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(1, "Le numéro de téléphone est requis"),
  adresse: z.string().min(1, "L'adresse est requise"),
  filiere: z.string().min(1, "Filière requise"),
  niveau: z.string().min(1, "Niveau requis"),
  photo: z.instanceof(FileList).optional().transform(val => val && val.length > 0 ? val : undefined),
});

type StudentFormValues = z.infer<typeof studentSchema>;

const StudentForm: React.FC = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("personal");
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      date_naissance: "",
      lieu_naissance: "",
      sexe: "",
      nationalite: "",
      email: "",
      telephone: "",
      adresse: "",
      filiere: "",
      niveau: "",
    },
    mode: "onChange",
  });

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

  // Validation before the navigation between the tabs
  const validateTabNavigation = (targetTabId: string) => {
    let fieldsToValidate: (keyof StudentFormValues)[] = [];
    const errors: string[] = [];
    
    // Determine which fields to validate based on the current tab
    if (activeTab === "personal") {
      fieldsToValidate = ["prenom", "nom", "date_naissance", "lieu_naissance", "sexe", "nationalite"];
      
      // Also validate the photo which is a special case
      if (!form.getValues("photo")) {
        errors.push("La photo est requise");
      }
      
      // Additional validation for date_naissance
      const birthDate = form.getValues("date_naissance");
      if (birthDate) {
        try {
          const parsedDate = new Date(birthDate);
          const today = new Date();
          
          if (isNaN(parsedDate.getTime())) {
            errors.push("La date de naissance n'est pas valide");
          } else if (parsedDate > today) {
            errors.push("La date de naissance ne peut pas être dans le futur");
          } else if (parsedDate < new Date('1940-01-01')) {
            errors.push("La date de naissance doit être postérieure à 1940");
          }
        } catch (e) {
          errors.push("Format de date invalide");
        }
      }
    } 
    else if (activeTab === "contact") {
      fieldsToValidate = ["email", "telephone", "adresse"];
    }
    
    // Valider les champs spécifiés
    fieldsToValidate.forEach(field => {
      if (!form.getValues(field)) {
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ');
        errors.push(`${fieldName} est requis`);
      }
    });

    // Vérifier s'il y a des erreurs de validation déjà détectées par React Hook Form
    fieldsToValidate.forEach(field => {
      const fieldError = form.formState.errors[field]?.message;
      if (fieldError) {
        errors.push(fieldError as string);
      }
    });

    if (errors.length > 0) {
      setValidationErrors(errors);
      setValidationDialogOpen(true);
      return false;
    }
    
    setActiveTab(targetTabId);
    return true;
  };

  // Navigation between the tabs
  const navigateToNextTab = (tabId: string) => {
    validateTabNavigation(tabId);
  };

  return (
    <div className="bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-xl p-8 shadow-md">
      <Tabs value={activeTab} onValueChange={(value) => validateTabNavigation(value)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/30 rounded-lg p-1.5">
          <TabsTrigger 
            value="personal" 
            id="personal-tab"
            className="py-3 rounded-md text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Informations personnelles
          </TabsTrigger>
          <TabsTrigger 
            value="contact" 
            id="contact-tab"
            className="py-3 rounded-md text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Coordonnées
          </TabsTrigger>
          <TabsTrigger 
            value="academic" 
            id="academic-tab"
            className="py-3 rounded-md text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Informations académiques
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="personal" className="mt-0 animate-fade-in">
              <PersonalInfoTab 
                form={form} 
                photoPreview={photoPreview} 
                handlePhotoChange={handlePhotoChange} 
                navigateToNextTab={navigateToNextTab}
              />
            </TabsContent>

            <TabsContent value="contact" className="mt-0 animate-fade-in">
              <ContactInfoTab 
                form={form} 
                navigateToNextTab={navigateToNextTab}
              />
            </TabsContent>

            <TabsContent value="academic" className="mt-0 animate-fade-in">
              <AcademicInfoTab form={form} />
            </TabsContent>
          </form>
        </Form>
      </Tabs>

      <AlertDialog open={validationDialogOpen} onOpenChange={setValidationDialogOpen}>
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
    </div>
  );
};

export default StudentForm;
