
import React from "react";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface ContactInfoTabProps {
  form: UseFormReturn<any>;
  navigateToNextTab: (tabId: string) => void;
}

const ContactInfoTab: React.FC<ContactInfoTabProps> = ({ form, navigateToNextTab }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-800/50 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-primary">Coordonnées de contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input placeholder="exemple@email.com" className="h-10 bg-background" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="+216 XX XXX XXX" className="h-10 bg-background" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adresse"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-sm font-medium">Adresse</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Adresse complète" 
                    className="min-h-[120px] bg-background resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button 
          type="button" 
          onClick={() => navigateToNextTab('academic-tab')}
          className="bg-primary hover:bg-primary/90 text-white px-6"
        >
          Suivant <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ContactInfoTab;
