
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AcademicTabProps {
  student: {
    level: string;
    department: string;
    registration: string;
    attendance: number;
    grades: Array<{
      course: string;
      grade: string;
      status: string;
    }>;
  };
  getStatusColor: (status: string) => string;
}

const AcademicTab: React.FC<AcademicTabProps> = ({ student, getStatusColor }) => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Informations académiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Niveau</span>
              <span>{student.level}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Filière</span>
              <span>{student.department}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Date d'inscription</span>
              <span>{student.registration}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-muted-foreground">Taux de présence</span>
              <span className="flex items-center">
                {student.attendance}%
                <span className={`ml-2 w-2 h-2 rounded-full ${student.attendance > 85 ? 'bg-green-500' : student.attendance > 70 ? 'bg-amber-500' : 'bg-red-500'}`}></span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl">Notes et résultats</CardTitle>
            <CardDescription>Résultats du semestre en cours</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <BookOpen size={16} />
            Voir tous les résultats
          </Button>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {student.grades.map((grade, index) => (
              <div key={index} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{grade.course}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(grade.status)}>{grade.status}</Badge>
                  <span className="font-medium">{grade.grade}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicTab;
