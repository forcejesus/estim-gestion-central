
import React from "react";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import StudentPhotoUpload from "../StudentPhotoUpload";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface PersonalInfoTabProps {
  form: UseFormReturn<any>;
  photoPreview: string | null;
  handlePhotoChange: (files: FileList | null) => void;
  navigateToNextTab: (tabId: string) => void;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ 
  form, 
  photoPreview, 
  handlePhotoChange, 
  navigateToNextTab 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-muted/30 rounded-lg p-6 flex flex-col items-center justify-center">
          <StudentPhotoUpload 
            photoPreview={photoPreview} 
            onPhotoChange={(files) => {
              handlePhotoChange(files);
              form.setValue('photo', files as unknown as FileList);
            }} 
          />
        </div>
        
        <div className="md:col-span-2 bg-white dark:bg-zinc-800/50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-medium mb-4 text-primary">Informations personnelles</h3>
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

            <div className="grid grid-cols-2 gap-4 sm:col-span-2">
              <FormField
                control={form.control}
                name="date_naissance"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-base font-medium">Date de naissance*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-11 pl-3 text-left font-normal bg-background flex justify-between items-center text-base",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "dd/MM/yyyy")
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <CalendarIcon className="ml-auto h-5 w-5 opacity-70" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(format(date, "yyyy-MM-dd"));
                            }
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1940-01-01")
                          }
                          initialFocus
                          className="p-3 pointer-events-auto border rounded-md"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

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
            </div>

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
        </div>
      </div>
      
      <div className="flex justify-end mt-8">
        <Button 
          type="button" 
          onClick={() => navigateToNextTab('contact')}
          className="bg-primary hover:bg-primary/90 text-white px-6 h-11 text-base"
        >
          Suivant <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
