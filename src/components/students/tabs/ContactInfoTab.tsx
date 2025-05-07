
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import NextButton from "./components/NextButton";

interface ContactInfoTabProps {
  form: UseFormReturn<any>;
  navigateToNextTab: (tabId: string) => void;
}

const ContactInfoTab: React.FC<ContactInfoTabProps> = ({ form, navigateToNextTab }) => {
  const handleBackClick = () => {
    navigateToNextTab("personal");
  };

  return (
    <div className="space-y-8">
      <div className="bg-primary/5 px-6 py-4 -mx-6 mb-8 border-l-4 border-primary rounded-r-md">
        <h3 className="font-medium text-lg text-primary">Coordonnées</h3>
        <p className="text-muted-foreground">Saisissez les informations de contact de l'étudiant.</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Email*</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="Adresse email" 
                  className="h-11 bg-background text-base"
                  required 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Téléphone*</FormLabel>
              <FormControl>
                <Input 
                  type="tel" 
                  placeholder="Numéro de téléphone" 
                  className="h-11 bg-background text-base"
                  required 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="adresse"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Adresse*</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Adresse complète" 
                  className="h-11 bg-background text-base" 
                  required 
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
      </div>

      <NextButton 
        onClick={() => navigateToNextTab("academic")}
        onBack={handleBackClick}
        showBack={true}
      />
    </div>
  );
};

export default ContactInfoTab;
