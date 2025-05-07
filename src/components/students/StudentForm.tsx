
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

const studentSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  date_naissance: z.string().min(1, "La date de naissance est requise"),
  lieu_naissance: z.string().optional(),
  sexe: z.string().min(1, "Le genre est requis"),
  nationalite: z.string().optional(),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  adresse: z.string().optional(),
  filiere: z.string().min(1, "Filière requise"),
  niveau: z.string().min(1, "Niveau requis"),
  photo: z.instanceof(FileList).optional().transform(val => val && val.length > 0 ? val : undefined),
});

type StudentFormValues = z.infer<typeof studentSchema>;

const StudentForm: React.FC = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("personal");
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

  // Navigation entre les tabs
  const navigateToNextTab = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 p-1 mb-6 bg-muted/50">
          <TabsTrigger 
            value="personal" 
            id="personal-tab"
            className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Informations personnelles
          </TabsTrigger>
          <TabsTrigger 
            value="contact" 
            id="contact-tab"
            className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Coordonnées
          </TabsTrigger>
          <TabsTrigger 
            value="academic" 
            id="academic-tab"
            className="py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Informations académiques
          </TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="personal" className="mt-0">
              <PersonalInfoTab 
                form={form} 
                photoPreview={photoPreview} 
                handlePhotoChange={handlePhotoChange} 
                navigateToNextTab={navigateToNextTab}
              />
            </TabsContent>

            <TabsContent value="contact" className="mt-0">
              <ContactInfoTab 
                form={form} 
                navigateToNextTab={navigateToNextTab}
              />
            </TabsContent>

            <TabsContent value="academic" className="mt-0">
              <AcademicInfoTab form={form} />
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default StudentForm;
