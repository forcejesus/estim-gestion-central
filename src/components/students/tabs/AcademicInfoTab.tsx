
import React from "react";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface AcademicInfoTabProps {
  form: UseFormReturn<any>;
}

const AcademicInfoTab: React.FC<AcademicInfoTabProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="filiere"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Filière</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une filière" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="informatique">Informatique</SelectItem>
                  <SelectItem value="gestion">Gestion</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="rh">Ressources Humaines</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="niveau"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveau</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un niveau" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="l1">Licence 1</SelectItem>
                  <SelectItem value="l2">Licence 2</SelectItem>
                  <SelectItem value="l3">Licence 3</SelectItem>
                  <SelectItem value="m1">Master 1</SelectItem>
                  <SelectItem value="m2">Master 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel htmlFor="matricule">Matricule</FormLabel>
          <Input id="matricule" placeholder="Généré automatiquement" disabled />
          <p className="text-xs text-muted-foreground mt-1">
            Le matricule sera généré automatiquement lors de la validation
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit" className="gap-2">
          <Save size={18} />
          <span>Enregistrer l'inscription</span>
        </Button>
      </div>
    </div>
  );
};

export default AcademicInfoTab;
