
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, CalendarDays, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StudentProfileHeaderProps {
  student: {
    name: string;
    matricule: string;
    status: string;
    level: string;
    department: string;
    email: string;
    phone: string;
    registration: string;
    photo?: string;
  };
  getStatusColor: (status: string) => string;
  getInitials: (name: string) => string;
}

const StudentProfileHeader: React.FC<StudentProfileHeaderProps> = ({
  student,
  getStatusColor,
  getInitials,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarFallback className="text-2xl">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{student.matricule}</span>
                  <span>•</span>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <GraduationCap className="text-muted-foreground" size={18} />
                <span className="font-medium">{student.level} - {student.department}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="text-muted-foreground" size={16} />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="text-muted-foreground" size={16} />
                <span>{student.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="text-muted-foreground" size={16} />
                <span>Inscrit le {student.registration}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentProfileHeader;
