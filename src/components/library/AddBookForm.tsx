
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BookPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form schema with validation
const formSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères."),
  author: z.string().min(2, "L'auteur doit contenir au moins 2 caractères."),
  category: z.string().min(1, "Veuillez sélectionner une catégorie."),
  copies: z.string().refine((val) => {
    const number = parseInt(val);
    return !isNaN(number) && number > 0;
  }, "Le nombre d'exemplaires doit être un nombre positif."),
});

// Categories for the selection dropdown
const bookCategories = [
  "Informatique",
  "Marketing",
  "Gestion",
  "Droit",
  "Économie",
  "Sciences",
  "Littérature",
];

interface AddBookFormProps {
  onSuccess?: () => void; 
  onCancel?: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onSuccess, onCancel }) => {
  const { toast } = useToast();

  // Form initialization
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "",
      copies: "1",
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create a new book object with a generated ID
    const newBook = {
      id: `B${Math.floor(1000 + Math.random() * 9000)}`, // Generate a random ID
      title: values.title,
      author: values.author,
      category: values.category,
      status: "Disponible",
      copies: parseInt(values.copies),
    };

    // In a real application, you would save this to your database here
    console.log("Nouveau livre à ajouter:", newBook);
    
    // Show success toast
    toast({
      title: "Livre ajouté avec succès",
      description: `${values.title} a été ajouté à la bibliothèque.`,
    });
    
    // Reset form and call onSuccess callback
    form.reset();
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Titre du livre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Auteur</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'auteur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {bookCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre d'exemplaires</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
          )}
          <Button type="submit">
            <BookPlus className="mr-2 h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddBookForm;
