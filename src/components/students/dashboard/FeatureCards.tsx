
import React from "react";
import { Link } from "react-router-dom";
import { Users, FilePlus, FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardsProps {
  totalStudents: number;
  pendingFiles: number;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ totalStudents, pendingFiles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users size={18} />
            Annuaire
          </CardTitle>
          <CardDescription>
            Consultez la liste de tous les étudiants inscrits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Accédez aux fiches détaillées des {totalStudents} étudiants, consultez leurs informations personnelles, coordonnées et parcours académique.
          </p>
        </CardContent>
        <CardFooter>
          <Link to="/students/directory" className="w-full">
            <Button variant="outline" className="w-full justify-between">
              Accéder à l'annuaire
              <ArrowRight size={16} />
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FilePlus size={18} />
            Nouvelle inscription
          </CardTitle>
          <CardDescription>
            Inscrivez un nouvel étudiant dans l'établissement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Créez une nouvelle fiche étudiant, saisissez les informations personnelles, administratives et pédagogiques.
          </p>
        </CardContent>
        <CardFooter>
          <Link to="/students/new" className="w-full">
            <Button variant="outline" className="w-full justify-between">
              Créer une inscription
              <ArrowRight size={16} />
            </Button>
          </Link>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText size={18} />
            Dossiers étudiants
          </CardTitle>
          <CardDescription>
            Gérez les dossiers administratifs des étudiants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {pendingFiles} dossiers en attente de traitement. Accédez aux documents administratifs, suivez les demandes et validez les pièces justificatives.
          </p>
        </CardContent>
        <CardFooter>
          <Link to="/students/files" className="w-full">
            <Button variant="outline" className="w-full justify-between">
              Gérer les dossiers
              <ArrowRight size={16} />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FeatureCards;
