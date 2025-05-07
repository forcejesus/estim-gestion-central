
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  UserPlus, 
  FileText, 
  Download
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for students
const MOCK_STUDENTS = [
  { id: "ST001", name: "Ahmed Ben Ali", email: "ahmed@example.com", level: "Licence 2", department: "Informatique", status: "Actif" },
  { id: "ST002", name: "Samia Oueslati", email: "samia@example.com", level: "Master 1", department: "Gestion", status: "Actif" },
  { id: "ST003", name: "Karim Mansour", email: "karim@example.com", level: "Licence 3", department: "Informatique", status: "En attente" },
  { id: "ST004", name: "Leila Trabelsi", email: "leila@example.com", level: "Master 2", department: "Marketing", status: "Actif" },
  { id: "ST005", name: "Mehdi Khelifi", email: "mehdi@example.com", level: "Licence 1", department: "Informatique", status: "Actif" },
  { id: "ST006", name: "Nour Sassi", email: "nour@example.com", level: "Licence 3", department: "Langues", status: "Inactif" },
  { id: "ST007", name: "Yassine Ben Hassan", email: "yassine@example.com", level: "Master 1", department: "Informatique", status: "Actif" },
  { id: "ST008", name: "Rania Meddeb", email: "rania@example.com", level: "Licence 2", department: "Gestion", status: "Actif" },
];

const StudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredStudents = MOCK_STUDENTS.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && student.status === "Actif";
    if (activeTab === "pending") return matchesSearch && student.status === "En attente";
    if (activeTab === "inactive") return matchesSearch && student.status === "Inactif";
    return matchesSearch;
  });

  return (
    <>
      <Header title="Gestion des étudiants" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-auto relative">
            <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Rechercher un étudiant..." 
              className="pl-10 w-full md:w-80" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="gap-2">
            <UserPlus size={18} />
            <span>Ajouter un étudiant</span>
          </Button>
        </div>

        <Card>
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <div className="p-2">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="active">Actifs</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="inactive">Inactifs</TabsTrigger>
              </TabsList>
            </div>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">Niveau</TableHead>
                      <TableHead className="hidden lg:table-cell">Département</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                          <TableCell className="hidden md:table-cell">{student.level}</TableCell>
                          <TableCell className="hidden lg:table-cell">{student.department}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.status === "Actif" 
                                ? "bg-green-100 text-green-800" 
                                : student.status === "En attente"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {student.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon">
                                <FileText size={16} />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Download size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Aucun étudiant trouvé
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default StudentsPage;
