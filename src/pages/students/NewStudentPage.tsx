
import React from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import StudentForm from "@/components/students/StudentForm";

const NewStudentPage: React.FC = () => {
  return (
    <>
      <Header title="Nouvelle inscription" />
      <div className="flex-1 overflow-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserPlus className="h-6 w-6 text-primary" />
              <CardTitle>Inscription d'un nouvel étudiant</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <StudentForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NewStudentPage;
