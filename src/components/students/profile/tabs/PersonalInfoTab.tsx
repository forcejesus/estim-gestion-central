
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PersonalInfoTabProps {
  student: {
    name: string;
    birthDate: string;
    birthPlace: string;
    nationality: string;
    email: string;
    phone: string;
    address: string;
  };
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ student }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Informations personnelles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-muted-foreground mb-3">Identité</h3>
              <div className="grid gap-3">
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Nom complet</span>
                  <span>{student.name}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Date de naissance</span>
                  <span>{student.birthDate}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Lieu de naissance</span>
                  <span>{student.birthPlace}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Nationalité</span>
                  <span>{student.nationality}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-muted-foreground mb-3">Coordonnées</h3>
              <div className="grid gap-3">
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Email</span>
                  <span>{student.email}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Téléphone</span>
                  <span>{student.phone}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="text-muted-foreground">Adresse</span>
                  <span>{student.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
