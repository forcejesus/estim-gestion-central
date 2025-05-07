
import { z } from "zod";

export const studentSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  date_naissance: z.string().min(1, "La date de naissance est requise").refine((date) => {
    // Basic date validation (YYYY-MM-DD format)
    if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
    
    const parsedDate = new Date(date);
    const today = new Date();
    
    // Check if date is valid and not in the future
    return !isNaN(parsedDate.getTime()) && 
           parsedDate < today && 
           parsedDate > new Date('1940-01-01');
  }, "La date de naissance doit être valide et comprise entre 1940 et aujourd'hui"),
  lieu_naissance: z.string().min(1, "Le lieu de naissance est requis"),
  sexe: z.string().min(1, "Le genre est requis"),
  nationalite: z.string().min(1, "La nationalité est requise"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(1, "Le numéro de téléphone est requis"),
  adresse: z.string().min(1, "L'adresse est requise"),
  filiere: z.string().min(1, "Filière requise"),
  niveau: z.string().min(1, "Niveau requis"),
  photo: z.instanceof(FileList).optional().transform(val => val && val.length > 0 ? val : undefined),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
