
import React from "react";
import StudentPhotoUpload from "../../StudentPhotoUpload";
import { UseFormReturn } from "react-hook-form";

interface PhotoUploadSectionProps {
  photoPreview: string | null;
  handlePhotoChange: (files: FileList | null) => void;
  form: UseFormReturn<any>;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ 
  photoPreview, 
  handlePhotoChange,
  form 
}) => {
  return (
    <div className="md:col-span-1 bg-muted/30 rounded-lg p-6 flex flex-col items-center justify-center">
      <StudentPhotoUpload 
        photoPreview={photoPreview} 
        onPhotoChange={(files) => {
          handlePhotoChange(files);
          form.setValue('photo', files as unknown as FileList);
        }} 
      />
    </div>
  );
};

export default PhotoUploadSection;
