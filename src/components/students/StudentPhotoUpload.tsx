
import React, { useState } from "react";
import { UserPlus, Upload } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface StudentPhotoUploadProps {
  photoPreview: string | null;
  onPhotoChange: (files: FileList | null) => void;
}

const StudentPhotoUpload: React.FC<StudentPhotoUploadProps> = ({ photoPreview, onPhotoChange }) => {
  return (
    <div className="md:col-span-2 flex flex-col items-center mb-4 space-y-2">
      <div className="relative">
        <Avatar className="w-32 h-32 border-2 border-primary/20">
          {photoPreview ? (
            <AvatarImage src={photoPreview} alt="Photo d'étudiant" />
          ) : (
            <AvatarFallback className="bg-muted flex items-center justify-center text-muted-foreground">
              <div className="flex flex-col items-center justify-center">
                <UserPlus size={40} className="opacity-70" />
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
        <label 
          htmlFor="photo"
          className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
        >
          <Upload size={16} />
        </label>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="link" size="sm" className="text-xs text-muted-foreground">
            Normes pour la photo
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="center">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Exigences pour la photo d'identité</h4>
            <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
              <li>Format d'image: JPEG ou PNG</li>
              <li>Fond uni de couleur claire</li>
              <li>Visage centré et bien éclairé</li>
              <li>Expression neutre, visage dégagé</li>
              <li>Photo récente (moins de 6 mois)</li>
              <li>Taille recommandée: 35mm x 45mm</li>
              <li>L'application mobile ESTIM Photo sera disponible prochainement pour prendre des photos conformes</li>
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StudentPhotoUpload;
