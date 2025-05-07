
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter,
  UserPlus, 
  FileText, 
  Mail,
  Download,
  MoreHorizontal,
  Phone,
  User,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Mock data for students
const MOCK_STUDENTS = [
  { id: "ST001", name: "Ahmed Ben Ali", email: "ahmed@example.com", phone: "+216 55 123 456", level: "Licence 2", department: "Informatique", status: "Actif", lastLogin: "2023-05-01" },
  { id: "ST002", name: "Samia Oueslati", email: "samia@example.com", phone: "+216 55 789 012", level: "Master 1", department: "Gestion", status: "Actif", lastLogin: "2023-05-02" },
  { id: "ST003", name: "Karim Mansour", email: "karim@example.com", phone: "+216 55 345 678", level: "Licence 3", department: "Informatique", status: "En attente", lastLogin: "2023-04-28" },
  { id: "ST004", name: "Leila Trabelsi", email: "leila@example.com", phone: "+216 55 901 234", level: "Master 2", department: "Marketing", status: "Actif", lastLogin: "2023-05-03" },
  { id: "ST005", name: "Mehdi Khelifi", email: "mehdi@example.com", phone: "+216 55 567 890", level: "Licence 1", department: "Informatique", status: "Actif", lastLogin: "2023-05-01" },
  { id: "ST006", name: "Nour Sassi", email: "nour@example.com", phone: "+216 55 234 567", level: "Licence 3", department: "Langues", status: "Inactif", lastLogin: "2023-04-15" },
  { id: "ST007", name: "Yassine Ben Hassan", email: "yassine@example.com", phone: "+216 55 890 123", level: "Master 1", department: "Informatique", status: "Actif", lastLogin: "2023-05-02" },
  { id: "ST008", name: "Rania Meddeb", email: "rania@example.com", phone: "+216 55 456 789", level: "Licence 2", department: "Gestion", status: "Actif", lastLogin: "2023-05-03" },
  { id: "ST009", name: "Omar Jendoubi", email: "omar@example.com", phone: "+216 55 012 345", level: "Licence 1", department: "Marketing", status: "Actif", lastLogin: "2023-05-01" },
  { id: "ST010", name: "Ines Gharbi", email: "ines@example.com", phone: "+216 55 678 901", level: "Master 2", department: "Langues", status: "Inactif", lastLogin: "2023-04-20" },
  { id: "ST011", name: "Selim Bouazizi", email: "selim@example.com", phone: "+216 55 234 567", level: "Licence 2", department: "Informatique", status: "En attente", lastLogin: "2023-04-25" },
  { id: "ST012", name: "Amira Laabidi", email: "amira@example.com", phone: "+216 55 890 123", level: "Master 1", department: "Gestion", status: "Actif", lastLogin: "2023-05-03" },
];

const DirectoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesDepartment = departmentFilter === "" || student.department === departmentFilter;
    const matchesStatus = statusFilter === "" || student.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleViewFile = (id: string) => {
    navigate(`/students/files/${id}`);
  };
  
  const handleViewProfile = (id: string) => {
    navigate(`/students/profile/${id}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800";
      case "En attente":
        return "bg-amber-100 text-amber-800";
      case "Inactif":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Header title="Annuaire des étudiants" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-6">
          {/* Search and filters section */}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center w-full md:w-auto relative">
              <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Rechercher un étudiant..." 
                className="pl-10 w-full md:w-80" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex gap-2 flex-1">
                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Département" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les départements</SelectItem>
                    <SelectItem value="Informatique">Informatique</SelectItem>
                    <SelectItem value="Gestion">Gestion</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Langues">Langues</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="Actif">Actif</SelectItem>
                    <SelectItem value="En attente">En attente</SelectItem>
                    <SelectItem value="Inactif">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="gap-2" onClick={() => navigate("/students/new")}>
                <UserPlus size={18} />
                <span>Ajouter</span>
              </Button>
            </div>
          </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <Card key={student.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-14 w-14 cursor-pointer" onClick={() => handleViewProfile(student.id)}>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-base cursor-pointer hover:text-primary" onClick={() => handleViewProfile(student.id)}>
                          {student.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{student.id}</p>
                        <Badge className={`mt-1 ${getStatusColor(student.status)}`}>
                          {student.status}
                        </Badge>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewProfile(student.id)}>
                          <Eye className="mr-2 h-4 w-4" /> Voir la fiche
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewFile(student.id)}>
                          <FileText className="mr-2 h-4 w-4" /> Voir le dossier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" /> Envoyer un email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" /> Exporter les données
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <Separator className="my-3" />
                  
                  <div className="grid gap-1.5 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{student.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{student.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{student.level} - {student.department}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full mt-3 text-primary justify-center items-center gap-1"
                    onClick={() => handleViewProfile(student.id)}
                  >
                    <Eye size={16} />
                    Consulter la fiche
                  </Button>
                </Card>
              ))
            ) : (
              <div className="col-span-full p-8 text-center">
                <p className="text-muted-foreground">Aucun étudiant trouvé</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectoryPage;
