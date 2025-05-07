
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Search, 
  Filter,
  UserPlus, 
  FileText, 
  FilePlus,
  MoreVertical,
  Download,
  Eye,
  Trash2,
  User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for student files
const MOCK_FILES = [
  { id: "SF001", studentId: "ST001", studentName: "Ahmed Ben Ali", type: "Dossier administratif", status: "Complet", lastUpdate: "2023-05-01" },
  { id: "SF002", studentId: "ST002", studentName: "Samia Oueslati", type: "Dossier administratif", status: "Incomplet", lastUpdate: "2023-05-02" },
  { id: "SF003", studentId: "ST003", studentName: "Karim Mansour", type: "Dossier pédagogique", status: "En attente", lastUpdate: "2023-04-28" },
  { id: "SF004", studentId: "ST004", studentName: "Leila Trabelsi", type: "Dossier administratif", status: "Complet", lastUpdate: "2023-05-03" },
  { id: "SF005", studentId: "ST005", studentName: "Mehdi Khelifi", type: "Dossier pédagogique", status: "Complet", lastUpdate: "2023-05-01" },
  { id: "SF006", studentId: "ST006", studentName: "Nour Sassi", type: "Dossier administratif", status: "Incomplet", lastUpdate: "2023-04-15" },
  { id: "SF007", studentId: "ST007", studentName: "Yassine Ben Hassan", type: "Dossier pédagogique", status: "Complet", lastUpdate: "2023-05-02" },
  { id: "SF008", studentId: "ST008", studentName: "Rania Meddeb", type: "Dossier administratif", status: "Complet", lastUpdate: "2023-05-03" }
];

// Mock file details
const FILE_DETAILS = {
  student: {
    id: "ST001",
    name: "Ahmed Ben Ali",
    program: "Informatique",
    level: "Licence 2",
    status: "Actif"
  },
  documents: [
    { id: "DOC001", name: "Carte d'identité", type: "PDF", status: "Validé", uploadDate: "2023-03-15" },
    { id: "DOC002", name: "Relevé de notes du bac", type: "PDF", status: "Validé", uploadDate: "2023-03-15" },
    { id: "DOC003", name: "Diplôme du bac", type: "PDF", status: "Validé", uploadDate: "2023-03-16" },
    { id: "DOC004", name: "Certificat médical", type: "JPG", status: "En attente", uploadDate: "2023-03-20" },
    { id: "DOC005", name: "Justificatif de domicile", type: "PDF", status: "Validé", uploadDate: "2023-03-22" }
  ],
  notes: [
    { id: "NOTE001", content: "Document manquant : photo d'identité", date: "2023-04-01", author: "Admin" },
    { id: "NOTE002", content: "Relance par email pour certificat médical", date: "2023-04-10", author: "Admin" }
  ]
};

const StudentFilesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const navigate = useNavigate();

  const filteredFiles = MOCK_FILES.filter(file => {
    const matchesSearch = 
      file.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      file.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesSearch;
  });

  const handleViewFile = (id: string) => {
    setSelectedFile(id);
    setFileDialogOpen(true);
  };
  
  const handleViewProfile = (studentId: string) => {
    navigate(`/students/profile/${studentId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complet":
        return "bg-green-100 text-green-800";
      case "Incomplet":
        return "bg-red-100 text-red-800";
      case "En attente":
        return "bg-amber-100 text-amber-800";
      case "Validé":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Header title="Dossiers étudiants" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-auto relative">
            <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Rechercher un dossier..." 
              className="pl-10 w-full md:w-80" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter size={18} />
              <span>Filtres</span>
            </Button>
            <Button className="gap-2">
              <FilePlus size={18} />
              <span>Nouveau dossier</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Étudiant</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden md:table-cell">Dernière mise à jour</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFiles.length > 0 ? (
                  filteredFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.id}</TableCell>
                      <TableCell>
                        <div>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 font-medium" 
                            onClick={() => handleViewProfile(file.studentId)}
                          >
                            {file.studentName}
                          </Button>
                          <p className="text-xs text-muted-foreground">{file.studentId}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{file.type}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(file.status)}>
                          {file.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{file.lastUpdate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProfile(file.studentId)}>
                              <User className="mr-2 h-4 w-4" />
                              Voir la fiche
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewFile(file.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Consulter le dossier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Aucun dossier trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={fileDialogOpen} onOpenChange={setFileDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Dossier étudiant</DialogTitle>
              <DialogDescription>
                Détails du dossier {selectedFile}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-base">Informations étudiant</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Nom</dt>
                      <dd>
                        <Button 
                          variant="link" 
                          className="h-auto p-0 font-medium" 
                          onClick={() => {
                            setFileDialogOpen(false);
                            handleViewProfile(FILE_DETAILS.student.id);
                          }}
                        >
                          {FILE_DETAILS.student.name}
                        </Button>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">ID</dt>
                      <dd>{FILE_DETAILS.student.id}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Filière</dt>
                      <dd>{FILE_DETAILS.student.program}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Niveau</dt>
                      <dd>{FILE_DETAILS.student.level}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Statut</dt>
                      <dd>
                        <Badge className={getStatusColor("Complet")}>
                          {FILE_DETAILS.student.status}
                        </Badge>
                      </dd>
                    </div>
                  </dl>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4 gap-2"
                    onClick={() => {
                      setFileDialogOpen(false);
                      handleViewProfile(FILE_DETAILS.student.id);
                    }}
                  >
                    <User size={14} />
                    Voir la fiche complète
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Documents</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {FILE_DETAILS.documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(doc.status)}>
                              {doc.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="text-base">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[150px]">
                    <div className="space-y-4">
                      {FILE_DETAILS.notes.map((note) => (
                        <div key={note.id} className="border-l-2 border-muted pl-4">
                          <p className="text-sm">{note.content}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {note.author} - {note.date}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFileDialogOpen(false)}>Fermer</Button>
              <Button className="gap-2">
                <Download size={16} />
                Télécharger le dossier complet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default StudentFilesPage;
