
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
      
      // Vérifier que niveau est une valeur valide
      const validNiveaux = ['l1', 'l2', 'l3', 'estim_online'];
      if (!validNiveaux.includes(student.niveau.toLowerCase())) {
        throw new Error(`Ligne ${i + 1}: niveau "${student.niveau}" n'est pas valide. Utilisez l1, l2, l3, ou estim_online`);
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

  const downloadTemplate = () => {
    // Créer le contenu du modèle CSV
    const csvContent = [
      'prenom,nom,date_naissance,sexe,email,filiere,niveau,lieu_naissance,nationalite,telephone,adresse',
      'Jean,Dupont,1995-05-12,M,jean.dupont@example.com,informatique,l1,Paris,Française,770000000,Dakar',
      'Marie,Diop,1998-09-24,F,marie.diop@example.com,gestion,l2,Dakar,Sénégalaise,770000001,Dakar',
      'Ahmed,Sall,1997-03-15,M,ahmed.sall@example.com,marketing,l3,Thiès,Sénégalaise,770000002,Thiès',
      'Fatou,Ndiaye,1999-11-30,F,fatou.ndiaye@example.com,finance,estim_online,Saint-Louis,Sénégalaise,770000003,Saint-Louis'
    ].join('\n');
    
    // Créer un objet Blob pour le téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Créer un lien temporaire pour le téléchargement
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'modele_etudiants.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-primary/10 hover:bg-primary/20 border-primary/20">
          <Upload className="h-4 w-4" />
          Importer depuis un CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Importer des étudiants</DialogTitle>
          <DialogDescription>
            Importez plusieurs étudiants à la fois à partir d'un fichier CSV.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-4">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 justify-center w-full border border-dashed border-primary/30 hover:bg-primary/5 py-6"
              onClick={downloadTemplate}
            >
              <FileText className="h-5 w-5 text-primary" />
              <span>Télécharger le modèle CSV</span>
            </Button>
          
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
                <li>filiere (informatique, gestion, marketing, commerce, finance, communication, rh)</li>
                <li>niveau (l1, l2, l3, estim_online)</li>
              </ul>
              <p className="text-xs mt-2 text-muted-foreground">
                Colonnes optionnelles: lieu_naissance, nationalite, telephone, adresse
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <label 
                htmlFor="csvFile" 
                className="cursor-pointer py-8 border-2 border-dashed border-primary/20 rounded-md flex flex-col items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                <Upload className="h-8 w-8 text-primary mb-2" />
                <span className="font-medium">Cliquez pour sélectionner un fichier CSV</span>
                <span className="text-sm text-muted-foreground mt-1">ou glissez-déposez le fichier ici</span>
                <Input
                  id="csvFile"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              
              {file && (
                <div className="text-sm flex items-center gap-2 p-3 bg-primary/10 rounded-md">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="font-medium">{file.name}</span>
                  <span className="text-muted-foreground ml-auto">
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
        
        <DialogFooter className="sm:justify-between flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={downloadTemplate}
            className="order-1 sm:order-none"
          >
            Télécharger le modèle
          </Button>
          
          <Button
            variant="default"
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full sm:w-auto"
          >
            {isUploading ? "Importation..." : "Importer les étudiants"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CsvImportDialog;
