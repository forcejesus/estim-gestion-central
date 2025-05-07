
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface AcademicInfoTabProps {
  form: UseFormReturn<any>;
  navigateToBackTab?: (tabId: string) => void;
}

const AcademicInfoTab: React.FC<AcademicInfoTabProps> = ({ form, navigateToBackTab }) => {
  const handleBackClick = () => {
    if (navigateToBackTab) {
      navigateToBackTab("contact");
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-primary/5 px-6 py-4 -mx-6 mb-8 border-l-4 border-primary rounded-r-md">
        <h3 className="font-medium text-lg text-primary">Informations académiques</h3>
        <p className="text-muted-foreground">Sélectionnez la filière et le niveau d'étude.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="filiere"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Filière*</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger className="h-11 bg-background text-base">
                    <SelectValue placeholder="Sélectionnez une filière" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="informatique" className="text-base">Informatique</SelectItem>
                  <SelectItem value="gestion" className="text-base">Gestion</SelectItem>
                  <SelectItem value="marketing" className="text-base">Marketing</SelectItem>
                  <SelectItem value="commerce" className="text-base">Commerce</SelectItem>
                  <SelectItem value="finance" className="text-base">Finance</SelectItem>
                  <SelectItem value="communication" className="text-base">Communication</SelectItem>
                  <SelectItem value="rh" className="text-base">RH</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="niveau"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Niveau*</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                required
              >
                <FormControl>
                  <SelectTrigger className="h-11 bg-background text-base">
                    <SelectValue placeholder="Sélectionnez un niveau" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="l1" className="text-base">Licence 1</SelectItem>
                  <SelectItem value="l2" className="text-base">Licence 2</SelectItem>
                  <SelectItem value="l3" className="text-base">Licence 3</SelectItem>
                  <SelectItem value="m1" className="text-base">Master 1</SelectItem>
                  <SelectItem value="m2" className="text-base">Master 2</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-between mt-10">
        {navigateToBackTab && (
          <Button 
            type="button" 
            onClick={handleBackClick}
            variant="outline"
            className="text-primary border-primary hover:bg-primary/10 px-6 h-11 text-base"
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Précédent
          </Button>
        )}
        <Button 
          type="submit"
          className="ml-auto bg-primary hover:bg-primary/90 text-white px-8 h-11 text-base"
        >
          Inscrire l'étudiant
        </Button>
      </div>
    </div>
  );
};

export default AcademicInfoTab;
