
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileText, Check, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface CsvImportDialogProps {
  onSuccess: (studentsCount: number) => void;
}

const CsvImportDialog: React.FC<CsvImportDialogProps> = ({ onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith('.csv')) {
      setError("Veuillez sélectionner un fichier CSV valide.");
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  };

  const processCSV = (text: string) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim());
    const headers = lines[0].split(',').map(header => header.trim());
    const requiredHeaders = [
      'prenom', 'nom', 'date_naissance', 'sexe', 'email', 'filiere', 'niveau'
    ];
    
    // Vérifier que les en-têtes requis sont présents
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    if (missingHeaders.length > 0) {
      throw new Error(`En-têtes manquants: ${missingHeaders.join(', ')}`);
    }
    
    const students = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(value => value.trim());
      if (values.length !== headers.length) {
        throw new Error(`Ligne ${i + 1}: nombre de valeurs incorrect`);
      }
      
      const student: Record<string, string> = {};
      headers.forEach((header, index) => {
        student[header] = values[index];
      });
      
      // Valider les données requises pour chaque étudiant
      for (const field of requiredHeaders) {
        if (!student[field]) {
          throw new Error(`Ligne ${i + 1}: champ ${field} manquant ou vide`);
        }
      }
      
      students.push(student);
    }
    
    return students;
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      const text = await file.text();
      const students = processCSV(text);
      
      // Simuler l'enregistrement des données
      console.log("Étudiants importés:", students);
      
      toast({
        title: "Importation réussie",
        description: `${students.length} étudiants ont été importés avec succès.`,
        duration: 5000,
      });
      
      onSuccess(students.length);
      setFile(null);
      
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Importer depuis un CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importer des étudiants</DialogTitle>
          <DialogDescription>
            Importez plusieurs étudiants à la fois à partir d'un fichier CSV.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="border rounded-md p-4 bg-muted/30">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Format requis du fichier CSV
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                Votre fichier CSV doit inclure ces colonnes obligatoires:
              </p>
              <ul className="text-xs list-disc list-inside text-muted-foreground pl-2 space-y-1">
                <li>prenom</li>
                <li>nom</li>
                <li>date_naissance (format YYYY-MM-DD)</li>
                <li>sexe (M ou F)</li>
                <li>email</li>
                <li>filiere</li>
                <li>niveau</li>
              </ul>
              <p className="text-xs mt-2 text-muted-foreground">
                Colonnes optionnelles: lieu_naissance, nationalite, telephone, adresse
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Input
                id="csvFile"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {file && (
                <div className="text-sm flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{file.name}</span>
                  <span className="text-muted-foreground">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
              )}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription className="flex items-center gap-2">
                  <X className="h-4 w-4" />
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        
        <DialogFooter className="sm:justify-end">
          <Button
            variant="default"
            onClick={handleUpload}
            disabled={!file || isUploading}
          >
            {isUploading ? "Importation..." : "Importer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CsvImportDialog;
