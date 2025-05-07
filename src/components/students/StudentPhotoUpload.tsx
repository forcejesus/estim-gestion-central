
import React from "react";
import { Camera, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface StudentPhotoUploadProps {
  photoPreview: string | null;
  onPhotoChange: (files: FileList | null) => void;
}

const StudentPhotoUpload: React.FC<StudentPhotoUploadProps> = ({ photoPreview, onPhotoChange }) => {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
        <Avatar className="w-36 h-36 border-2 border-primary/20 shadow-md">
          {photoPreview ? (
            <AvatarImage src={photoPreview} alt="Photo d'étudiant" />
          ) : (
            <AvatarFallback className="bg-muted/70 flex items-center justify-center text-muted-foreground">
              <div className="flex flex-col items-center justify-center">
                <Camera size={42} className="opacity-70" />
                <span className="text-xs mt-1">Photo</span>
              </div>
            </AvatarFallback>
          )}
        </Avatar>
        <input 
          type="file" 
          id="photo" 
          accept="image/*"
          className="sr-only"
          required
          onChange={(e) => onPhotoChange(e.target.files)}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <label 
                htmlFor="photo"
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
              >
                <Upload size={18} />
              </label>
            </TooltipTrigger>
            <TooltipContent>
              Télécharger une photo
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="text-center mt-2 bg-muted/30 p-2 rounded-md w-full">
        <p className="text-xs text-muted-foreground font-medium">
          Utiliser l'application mobile ESTIM Photo pour photographier l'étudiant et avoir une image conforme
        </p>
      </div>
    </div>
  );
};

export default StudentPhotoUpload;
