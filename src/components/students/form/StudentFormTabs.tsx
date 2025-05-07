
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoTab from "../tabs/PersonalInfoTab";
import ContactInfoTab from "../tabs/ContactInfoTab";
import AcademicInfoTab from "../tabs/AcademicInfoTab";
import ValidationErrorDialog from "./ValidationErrorDialog";
import { StudentFormValues } from "./validationSchema";
import { UseFormReturn, useFormContext } from "react-hook-form";

interface StudentFormTabsProps {
  photoPreview: string | null;
  handlePhotoChange: (files: FileList | null) => void;
}

const StudentFormTabs: React.FC<StudentFormTabsProps> = ({ 
  photoPreview, 
  handlePhotoChange 
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  // Get form from context instead of props
  const form = useFormContext() as UseFormReturn<StudentFormValues>;

  // Validation before the navigation between the tabs
  const validateTabNavigation = (targetTabId: string) => {
    let fieldsToValidate: (keyof StudentFormValues)[] = [];
    const errors: string[] = [];
    
    // Determine which fields to validate based on the current tab
    if (activeTab === "personal") {
      fieldsToValidate = ["prenom", "nom", "date_naissance", "lieu_naissance", "sexe", "nationalite"];
      
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
    <>
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
          <AcademicInfoTab 
            form={form} 
            navigateToBackTab={navigateToNextTab}
          />
        </TabsContent>
      </Tabs>
      
      <ValidationErrorDialog 
        open={validationDialogOpen} 
        onOpenChange={setValidationDialogOpen} 
        validationErrors={validationErrors} 
      />
    </>
  );
};

export default StudentFormTabs;
