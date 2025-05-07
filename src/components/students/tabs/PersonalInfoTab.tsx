
import React from "react";
import { UseFormReturn } from "react-hook-form";
import PhotoUploadSection from "./components/PhotoUploadSection";
import PersonalInfoFields from "./components/PersonalInfoFields";
import NextButton from "./components/NextButton";

interface PersonalInfoTabProps {
  form: UseFormReturn<any>;
  photoPreview: string | null;
  handlePhotoChange: (files: FileList | null) => void;
  navigateToNextTab: (tabId: string) => void;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ 
  form, 
  photoPreview, 
  handlePhotoChange,
  navigateToNextTab
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-primary/5 px-6 py-4 -mx-6 mb-8 border-l-4 border-primary rounded-r-md">
        <h3 className="font-medium text-lg text-primary">Informations personnelles</h3>
        <p className="text-muted-foreground">Saisissez les informations d'identité de l'étudiant.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <PhotoUploadSection 
            photoPreview={photoPreview} 
            handlePhotoChange={handlePhotoChange} 
          />
        </div>
        
        <div className="md:col-span-2">
          <PersonalInfoFields form={form} />
        </div>
      </div>

      <NextButton 
        onClick={() => navigateToNextTab("contact")}
      />
    </div>
  );
};

export default PersonalInfoTab;
