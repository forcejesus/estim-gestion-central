
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";

interface AcademicInfoTabProps {
  form: UseFormReturn<any>;
}

const AcademicInfoTab: React.FC<AcademicInfoTabProps> = ({ form }) => {
  const [selectedFiliere, setSelectedFiliere] = useState<string>(form.getValues("filiere") || "");
  const [selectedNiveau, setSelectedNiveau] = useState<string>(form.getValues("niveau") || "");
  
  // Prix des formations en FCFA
  const prixFormations = {
    "informatique": {
      "l1": "950 000 FCFA",
      "l2": "1 050 000 FCFA",
      "l3": "1 150 000 FCFA",
      "estim_online": "750 000 FCFA",
    },
    "gestion": {
      "l1": "900 000 FCFA",
      "l2": "1 000 000 FCFA",
      "l3": "1 100 000 FCFA",
      "estim_online": "700 000 FCFA",
    },
    "marketing": {
      "l1": "900 000 FCFA",
      "l2": "1 000 000 FCFA",
      "l3": "1 100 000 FCFA",
      "estim_online": "700 000 FCFA",
    },
    "commerce": {
      "l1": "900 000 FCFA",
      "l2": "1 000 000 FCFA",
      "l3": "1 100 000 FCFA",
      "estim_online": "700 000 FCFA",
    },
    "finance": {
      "l1": "950 000 FCFA",
      "l2": "1 050 000 FCFA",
      "l3": "1 150 000 FCFA",
      "estim_online": "750 000 FCFA",
    },
    "communication": {
      "l1": "900 000 FCFA",
      "l2": "1 000 000 FCFA",
      "l3": "1 100 000 FCFA",
      "estim_online": "700 000 FCFA",
    },
    "rh": {
      "l1": "900 000 FCFA",
      "l2": "1 000 000 FCFA",
      "l3": "1 100 000 FCFA",
      "estim_online": "700 000 FCFA",
    }
  };

  const getFraisScolarite = () => {
    if (selectedFiliere && selectedNiveau && prixFormations[selectedFiliere]?.[selectedNiveau]) {
      return prixFormations[selectedFiliere][selectedNiveau];
    }
    return "-";
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="filiere"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Filière</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedFiliere(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-11">
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
              <FormLabel className="text-base font-medium">Niveau</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedNiveau(value);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Sélectionnez un niveau" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="l1">Licence 1</SelectItem>
                  <SelectItem value="l2">Licence 2</SelectItem>
                  <SelectItem value="l3">Licence 3</SelectItem>
                  <SelectItem value="estim_online">ESTIM ONLINE</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <FormLabel htmlFor="matricule" className="text-base font-medium">Matricule</FormLabel>
          <Input id="matricule" placeholder="Généré automatiquement" className="h-11 bg-muted/50" disabled />
          <p className="text-xs text-muted-foreground mt-1">
            Le matricule sera généré automatiquement lors de la validation
          </p>
        </div>
      </div>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-lg mb-2">Frais de scolarité</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Formation sélectionnée:</p>
            <p className="font-medium">
              {selectedFiliere ? selectedFiliere.charAt(0).toUpperCase() + selectedFiliere.slice(1) : "-"} {" "}
              {selectedNiveau === "l1" ? "Licence 1" : 
               selectedNiveau === "l2" ? "Licence 2" : 
               selectedNiveau === "l3" ? "Licence 3" : 
               selectedNiveau === "estim_online" ? "ESTIM ONLINE" : "-"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Frais annuels:</p>
            <p className="font-bold text-lg text-primary">
              {getFraisScolarite()}
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-end mt-6">
        <Button type="submit" className="gap-2 h-11 px-6">
          <Save size={18} />
          <span>Enregistrer l'inscription</span>
        </Button>
      </div>
    </div>
  );
};

export default AcademicInfoTab;
