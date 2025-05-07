
import React, { useState } from "react";
import { UserPlus, Upload } from "lucide-react";

interface StudentPhotoUploadProps {
  photoPreview: string | null;
  onPhotoChange: (files: FileList | null) => void;
}

const StudentPhotoUpload: React.FC<StudentPhotoUploadProps> = ({ photoPreview, onPhotoChange }) => {
  return (
    <div className="md:col-span-2 flex justify-center mb-4">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20">
        {photoPreview ? (
          <img src={photoPreview} alt="Aperçu" className="object-cover w-full h-full" />
        ) : (
          <div className="bg-muted w-full h-full flex items-center justify-center text-muted-foreground">
            <UserPlus size={40} />
          </div>
        )}
        <input 
          type="file" 
          id="photo" 
          accept="image/*"
          className="sr-only"
          onChange={(e) => onPhotoChange(e.target.files)}
        />
        <label 
          htmlFor="photo"
          className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer"
        >
          <Upload size={16} />
        </label>
      </div>
    </div>
  );
};

export default StudentPhotoUpload;
