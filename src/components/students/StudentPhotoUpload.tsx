
import React, { useState } from "react";
import { UserPlus, Upload, Camera } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface StudentPhotoUploadProps {
  photoPreview: string | null;
  onPhotoChange: (files: FileList | null) => void;
}

const StudentPhotoUpload: React.FC<StudentPhotoUploadProps> = ({ photoPreview, onPhotoChange }) => {
  return (
    <div className="flex flex-col items-center mb-6 space-y-2">
      <div className="relative">
        <Avatar className="w-32 h-32 border-2 border-primary/20">
          {photoPreview ? (
            <AvatarImage src={photoPreview} alt="Photo d'étudiant" />
          ) : (
            <AvatarFallback className="bg-muted flex items-center justify-center text-muted-foreground">
              <div className="flex flex-col items-center justify-center">
                <Camera size={40} className="opacity-70" />
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
          onChange={(e) => onPhotoChange(e.target.files)}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <label 
                htmlFor="photo"
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
              >
                <Upload size={16} />
              </label>
            </TooltipTrigger>
            <TooltipContent>
              Télécharger une photo
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="link" size="sm" className="text-xs text-muted-foreground">
            Normes pour la photo
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="center">
          <div className="space-y-2 text-center">
            <h4 className="font-medium text-sm">Photo d'identité</h4>
            <p className="text-xs text-muted-foreground">
              Utiliser l'application mobile ESTIM Photo pour photographier l'étudiant et avoir une image conforme.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StudentPhotoUpload;
