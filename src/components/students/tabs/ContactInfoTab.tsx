
import React from "react";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";

interface ContactInfoTabProps {
  form: UseFormReturn<any>;
  navigateToNextTab: (tabId: string) => void;
}

const ContactInfoTab: React.FC<ContactInfoTabProps> = ({ form, navigateToNextTab }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-800/50 rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-medium mb-4 text-primary">Coordonnées de contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Email*</FormLabel>
                <FormControl>
                  <Input placeholder="exemple@email.com" className="h-11 bg-background text-base" required {...field} />
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
                  <PhoneInput 
                    value={field.value} 
                    onChange={field.onChange}
                    required
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
              <FormItem className="md:col-span-2">
                <FormLabel className="text-base font-medium">Adresse*</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Adresse complète" 
                    className="min-h-[120px] bg-background resize-none text-base" 
                    required
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button 
          type="button" 
          onClick={() => navigateToNextTab('academic')}
          className="bg-primary hover:bg-primary/90 text-white px-6 h-11 text-base"
        >
          Suivant <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ContactInfoTab;
