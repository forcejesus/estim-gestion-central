
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StudentNotFoundProps {
  id: string | undefined;
}

const StudentNotFound: React.FC<StudentNotFoundProps> = ({ id }) => {
  return (
    <Card className="p-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Étudiant non trouvé</h2>
        <p className="text-muted-foreground mb-6">L'étudiant avec l'identifiant {id} n'existe pas.</p>
        <Link to="/students/directory">
          <Button>Retour à l'annuaire</Button>
        </Link>
      </div>
    </Card>
  );
};

export default StudentNotFound;
