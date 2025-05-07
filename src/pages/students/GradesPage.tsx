
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  MoreVertical, 
  FileText, 
  Eye, 
  Printer
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Données simulées pour les relevés de notes
const MOCK_GRADES = [
  { id: "RN001", studentId: "ST001", studentName: "Ahmed Ben Ali", level: "Licence 2", program: "Informatique", semester: "Semestre 3", year: "2022-2023", status: "Validé", gpa: "14.5/20" },
  { id: "RN002", studentId: "ST001", studentName: "Ahmed Ben Ali", level: "Licence 2", program: "Informatique", semester: "Semestre 4", year: "2022-2023", status: "En cours", gpa: "13.8/20" },
  { id: "RN003", studentId: "ST002", studentName: "Samia Oueslati", level: "Master 1", program: "Gestion", semester: "Semestre 1", year: "2022-2023", status: "Validé", gpa: "15.2/20" },
  { id: "RN004", studentId: "ST002", studentName: "Samia Oueslati", level: "Master 1", program: "Gestion", semester: "Semestre 2", year: "2022-2023", status: "Validé", gpa: "16.5/20" },
  { id: "RN005", studentId: "ST003", studentName: "Karim Mansour", level: "Licence 3", program: "Informatique", semester: "Semestre 5", year: "2022-2023", status: "Validé", gpa: "12.9/20" },
  { id: "RN006", studentId: "ST003", studentName: "Karim Mansour", level: "Licence 3", program: "Informatique", semester: "Semestre 6", year: "2022-2023", status: "En cours", gpa: "13.2/20" },
  { id: "RN007", studentId: "ST004", studentName: "Leila Trabelsi", level: "Master 2", program: "Marketing", semester: "Semestre 3", year: "2022-2023", status: "Validé", gpa: "14.8/20" },
  { id: "RN008", studentId: "ST004", studentName: "Leila Trabelsi", level: "Master 2", program: "Marketing", semester: "Semestre 4", year: "2022-2023", status: "En cours", gpa: "15.5/20" }
];

// Détails d'un relevé de notes spécifique
const GRADE_DETAILS = {
  id: "RN001",
  student: {
    id: "ST001",
    name: "Ahmed Ben Ali",
    level: "Licence 2",
    program: "Informatique"
  },
  info: {
    year: "2022-2023",
    semester: "Semestre 3",
    status: "Validé",
    gpa: "14.5/20",
    credits: "30/30",
    ranking: "5/35"
  },
  subjects: [
    { code: "INF201", name: "Algorithmes avancés", credits: 4, midterm: 15, final: 16, tp: 14, grade: "15.2/20", status: "Validé" },
    { code: "INF202", name: "Bases de données", credits: 4, midterm: 14, final: 15, tp: 16, grade: "15.0/20", status: "Validé" },
    { code: "INF203", name: "Programmation orientée objet", credits: 5, midterm: 13, final: 14, tp: 15, grade: "14.1/20", status: "Validé" },
    { code: "INF204", name: "Réseaux informatiques", credits: 4, midterm: 12, final: 13, tp: 14, grade: "13.0/20", status: "Validé" },
    { code: "MAT201", name: "Mathématiques discrètes", credits: 3, midterm: 16, final: 15, tp: 0, grade: "15.5/20", status: "Validé" },
    { code: "LAN201", name: "Anglais technique", credits: 2, midterm: 14, final: 15, tp: 0, grade: "14.5/20", status: "Validé" },
    { code: "MGT201", name: "Gestion de projet", credits: 3, midterm: 13, final: 15, tp: 0, grade: "14.0/20", status: "Validé" },
    { code: "STA201", name: "Statistiques", credits: 3, midterm: 12, final: 14, tp: 0, grade: "13.0/20", status: "Validé" },
    { code: "PRJ201", name: "Projet semestriel", credits: 2, midterm: 0, final: 16, tp: 0, grade: "16.0/20", status: "Validé" }
  ]
};

const GradesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [yearFilter, setYearFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  
  const filteredGrades = MOCK_GRADES.filter(grade => {
    const matchesSearch = 
      grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      grade.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grade.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesYear = yearFilter === "" || grade.year === yearFilter;
    const matchesSemester = semesterFilter === "" || grade.semester === semesterFilter;
    
    return matchesSearch && matchesYear && matchesSemester;
  });

  const handleViewGrade = (id: string) => {
    setSelectedGrade(id);
    setGradeDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Validé":
        return "bg-green-100 text-green-800";
      case "En cours":
        return "bg-blue-100 text-blue-800";
      case "Non validé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <Header title="Relevés de notes" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-auto relative">
            <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Rechercher un relevé..." 
              className="pl-10 w-full md:w-80" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Année académique" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les années</SelectItem>
                <SelectItem value="2022-2023">2022-2023</SelectItem>
                <SelectItem value="2021-2022">2021-2022</SelectItem>
                <SelectItem value="2020-2021">2020-2021</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={semesterFilter} onValueChange={setSemesterFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les semestres</SelectItem>
                <SelectItem value="Semestre 1">Semestre 1</SelectItem>
                <SelectItem value="Semestre 2">Semestre 2</SelectItem>
                <SelectItem value="Semestre 3">Semestre 3</SelectItem>
                <SelectItem value="Semestre 4">Semestre 4</SelectItem>
                <SelectItem value="Semestre 5">Semestre 5</SelectItem>
                <SelectItem value="Semestre 6">Semestre 6</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Étudiant</TableHead>
                  <TableHead className="hidden md:table-cell">Programme</TableHead>
                  <TableHead className="hidden md:table-cell">Semestre</TableHead>
                  <TableHead>Moyenne</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.length > 0 ? (
                  filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell className="font-medium">{grade.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {getInitials(grade.studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{grade.studentName}</p>
                            <p className="text-xs text-muted-foreground">{grade.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>
                          <p>{grade.program}</p>
                          <p className="text-xs text-muted-foreground">{grade.level}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>
                          <p>{grade.semester}</p>
                          <p className="text-xs text-muted-foreground">{grade.year}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{grade.gpa}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(grade.status)}>
                          {grade.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewGrade(grade.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Consulter
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Imprimer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Envoyer par email
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Aucun relevé de notes trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Relevé de notes</DialogTitle>
              <DialogDescription>
                Détails du relevé {selectedGrade}
              </DialogDescription>
            </DialogHeader>
            
            <div className="px-4 py-3 bg-muted/30 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-base">Informations de l'étudiant</h3>
                  <dl className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Nom:</dt>
                      <dd>{GRADE_DETAILS.student.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">ID:</dt>
                      <dd>{GRADE_DETAILS.student.id}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Programme:</dt>
                      <dd>{GRADE_DETAILS.student.program}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Niveau:</dt>
                      <dd>{GRADE_DETAILS.student.level}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold text-base">Informations académiques</h3>
                  <dl className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Année:</dt>
                      <dd>{GRADE_DETAILS.info.year}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Semestre:</dt>
                      <dd>{GRADE_DETAILS.info.semester}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Moyenne générale:</dt>
                      <dd className="font-medium">{GRADE_DETAILS.info.gpa}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Crédits:</dt>
                      <dd>{GRADE_DETAILS.info.credits}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Classement:</dt>
                      <dd>{GRADE_DETAILS.info.ranking}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Statut:</dt>
                      <dd>
                        <Badge className={getStatusColor(GRADE_DETAILS.info.status)}>
                          {GRADE_DETAILS.info.status}
                        </Badge>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Notes détaillées</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Matière</TableHead>
                      <TableHead className="text-center">Crédits</TableHead>
                      <TableHead className="text-center hidden md:table-cell">CC</TableHead>
                      <TableHead className="text-center hidden md:table-cell">Examen</TableHead>
                      <TableHead className="text-center hidden md:table-cell">TP</TableHead>
                      <TableHead className="text-center">Note</TableHead>
                      <TableHead className="text-center">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {GRADE_DETAILS.subjects.map((subject) => (
                      <TableRow key={subject.code}>
                        <TableCell className="font-medium">{subject.code}</TableCell>
                        <TableCell>{subject.name}</TableCell>
                        <TableCell className="text-center">{subject.credits}</TableCell>
                        <TableCell className="text-center hidden md:table-cell">{subject.midterm}/20</TableCell>
                        <TableCell className="text-center hidden md:table-cell">{subject.final}/20</TableCell>
                        <TableCell className="text-center hidden md:table-cell">{subject.tp > 0 ? `${subject.tp}/20` : "-"}</TableCell>
                        <TableCell className="text-center font-medium">{subject.grade}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={getStatusColor(subject.status)}>
                            {subject.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setGradeDialogOpen(false)}>
                Fermer
              </Button>
              <div className="flex gap-2">
                <Button variant="secondary" className="gap-2">
                  <Printer size={16} />
                  Imprimer
                </Button>
                <Button className="gap-2">
                  <Download size={16} />
                  Télécharger
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default GradesPage;
