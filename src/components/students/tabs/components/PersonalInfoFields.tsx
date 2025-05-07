
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import DateOfBirthField from "./DateOfBirthField";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<any>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <FormField
        control={form.control}
        name="prenom"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Prénom*</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le prénom" className="h-11 bg-background text-base" required {...field} />
            </FormControl>
            <FormMessage className="text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nom"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Nom de famille*</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le nom de famille" className="h-11 bg-background text-base" required {...field} />
            </FormControl>
            <FormMessage className="text-sm" />
          </FormItem>
        )}
      />

      <DateOfBirthField form={form} />

      <FormField
        control={form.control}
        name="lieu_naissance"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Lieu de naissance*</FormLabel>
            <FormControl>
              <Input placeholder="Lieu de naissance" className="h-11 bg-background text-base" required {...field} />
            </FormControl>
            <FormMessage className="text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="sexe"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Genre*</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              required
            >
              <FormControl>
                <SelectTrigger className="h-11 bg-background text-base">
                  <SelectValue placeholder="Sélectionnez un genre" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="M" className="text-base">Masculin</SelectItem>
                <SelectItem value="F" className="text-base">Féminin</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-sm" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nationalite"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Nationalité*</FormLabel>
            <FormControl>
              <Input placeholder="Nationalité" className="h-11 bg-background text-base" required {...field} />
            </FormControl>
            <FormMessage className="text-sm" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoFields;
