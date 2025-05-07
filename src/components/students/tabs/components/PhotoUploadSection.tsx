
import React from "react";
import { UseFormReturn } from "react-hook-form";
import StudentPhotoUpload from "@/components/students/StudentPhotoUpload";

export interface PhotoUploadSectionProps {
  photoPreview: string | null;
  handlePhotoChange: (files: FileList | null) => void;
  form: UseFormReturn<any>;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ photoPreview, handlePhotoChange, form }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Photo d'identité</h3>
      <StudentPhotoUpload 
        photoPreview={photoPreview} 
        onPhotoChange={handlePhotoChange} 
      />
      <div className="text-xs text-muted-foreground mt-4 bg-muted/30 p-3 rounded-md">
        <p>La photo d'identité permettra de générer la carte étudiant.</p>
        <p className="mt-1">Utilisez une photo claire avec un fond uni.</p>
      </div>
    </div>
  );
};

export default PhotoUploadSection;
