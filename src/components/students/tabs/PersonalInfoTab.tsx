
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
import { format, isValid, parse } from "date-fns";

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
  // Generate arrays for days, months, and years for the date picker
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1940 + 1 }, (_, i) => (currentYear - i).toString());
  
  const months = [
    { value: "01", label: "Janvier" },
    { value: "02", label: "Février" },
    { value: "03", label: "Mars" },
    { value: "04", label: "Avril" },
    { value: "05", label: "Mai" },
    { value: "06", label: "Juin" },
    { value: "07", label: "Juillet" },
    { value: "08", label: "Août" },
    { value: "09", label: "Septembre" },
    { value: "10", label: "Octobre" },
    { value: "11", label: "Novembre" },
    { value: "12", label: "Décembre" }
  ];
  
  // State to store temporary date parts
  const [selectedYear, setSelectedYear] = React.useState<string>("");
  const [selectedMonth, setSelectedMonth] = React.useState<string>("");
  const [selectedDay, setSelectedDay] = React.useState<string>("");
  
  // Calculate days based on selected month and year
  const getDaysInMonth = (year: string, month: string) => {
    if (!year || !month) return Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString().padStart(2, '0'));
  };
  
  const days = getDaysInMonth(selectedYear, selectedMonth);
  
  // Update the date_naissance field when year, month, or day changes
  React.useEffect(() => {
    if (selectedYear && selectedMonth && selectedDay) {
      const dateStr = `${selectedYear}-${selectedMonth}-${selectedDay}`;
      const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date());
      
      if (isValid(parsedDate)) {
        form.setValue('date_naissance', dateStr);
      }
    }
  }, [selectedYear, selectedMonth, selectedDay, form]);
  
  // Initialize selects from existing form value if any
  React.useEffect(() => {
    const currentDate = form.getValues('date_naissance');
    if (currentDate) {
      try {
        const parsedDate = new Date(currentDate);
        if (isValid(parsedDate)) {
          setSelectedYear(format(parsedDate, 'yyyy'));
          setSelectedMonth(format(parsedDate, 'MM'));
          setSelectedDay(format(parsedDate, 'dd'));
        }
      } catch (e) {
        // Handle invalid date
      }
    }
  }, [form]);

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

            <FormField
              control={form.control}
              name="date_naissance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Date de naissance*</FormLabel>
                  <div className="flex space-x-2">
                    <Select 
                      value={selectedDay} 
                      onValueChange={(value) => {
                        setSelectedDay(value);
                      }}
                    >
                      <SelectTrigger className="h-11 bg-background text-base flex-1">
                        <SelectValue placeholder="Jour" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {days.map((day) => (
                          <SelectItem key={day} value={day} className="text-base">
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={selectedMonth} 
                      onValueChange={(value) => {
                        setSelectedMonth(value);
                        // Reset day if the new month has fewer days
                        if (selectedDay && parseInt(selectedDay) > getDaysInMonth(selectedYear, value).length) {
                          setSelectedDay("01");
                        }
                      }}
                    >
                      <SelectTrigger className="h-11 bg-background text-base flex-1">
                        <SelectValue placeholder="Mois" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value} className="text-base">
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={selectedYear} 
                      onValueChange={(value) => {
                        setSelectedYear(value);
                        // Check if it's February in a leap year
                        if (selectedMonth === "02") {
                          const maxDays = getDaysInMonth(value, selectedMonth).length;
                          if (selectedDay && parseInt(selectedDay) > maxDays) {
                            setSelectedDay("01");
                          }
                        }
                      }}
                    >
                      <SelectTrigger className="h-11 bg-background text-base flex-1">
                        <SelectValue placeholder="Année" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {years.map((year) => (
                          <SelectItem key={year} value={year} className="text-base">
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <input type="hidden" {...field} />
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
