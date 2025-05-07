
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PhotoUploadSection 
          photoPreview={photoPreview} 
          handlePhotoChange={handlePhotoChange} 
          form={form} 
        />
        
        <div className="md:col-span-2 bg-white dark:bg-zinc-800/50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-medium mb-4 text-primary">Informations personnelles</h3>
          <PersonalInfoFields form={form} />
        </div>
      </div>
      
      <NextButton onClick={() => navigateToNextTab('contact')} />
    </div>
  );
};

export default PersonalInfoTab;
