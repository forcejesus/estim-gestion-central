import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  CalendarDays,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  FileText,
  Download,
  ChevronLeft,
  BookOpen,
  CreditCard,
  FilePdf,
  Printer
} from "lucide-react";
import PDFExportDialog from "@/components/students/pdf/PDFExportDialog";

// Mock data for student profile
const MOCK_STUDENTS = {
  "ST001": {
    id: "ST001",
    matricule: "INF21-5432",
    name: "Ahmed Ben Ali",
    email: "ahmed@example.com",
    phone: "+216 55 123 456",
    address: "123 Rue de Carthage, Tunis",
    birthDate: "15/04/2000",
    birthPlace: "Tunis",
    nationality: "Tunisienne",
    photo: null,
    level: "Licence 2",
    department: "Informatique",
    status: "Actif",
    registration: "15/09/2021",
    lastLogin: "2023-05-01",
    payments: [
      { id: "PMT001", date: "15/09/2022", amount: "1200", status: "Payé", type: "Frais d'inscription" },
      { id: "PMT002", date: "15/10/2022", amount: "800", status: "Payé", type: "1ère tranche" },
      { id: "PMT003", date: "15/01/2023", amount: "800", status: "Payé", type: "2ème tranche" },
      { id: "PMT004", date: "15/03/2023", amount: "800", status: "En attente", type: "3ème tranche" }
    ],
    documents: [
      { id: "DOC001", name: "Carte d'identité", type: "PDF", status: "Validé", uploadDate: "2023-03-15" },
      { id: "DOC002", name: "Relevé de notes du bac", type: "PDF", status: "Validé", uploadDate: "2023-03-15" },
      { id: "DOC003", name: "Diplôme du bac", type: "PDF", status: "Validé", uploadDate: "2023-03-16" }
    ],
    grades: [
      { course: "Algorithmes et Structures de Données", grade: "16/20", status: "Validé" },
      { course: "Programmation Orientée Objet", grade: "14/20", status: "Validé" },
      { course: "Base de Données", grade: "18/20", status: "Validé" },
      { course: "Réseaux Informatiques", grade: "12/20", status: "Validé" }
    ],
    attendance: 92
  },
  "ST002": {
    id: "ST002",
    matricule: "GES21-3245",
    name: "Samia Oueslati",
    email: "samia@example.com",
    phone: "+216 55 789 012",
    address: "45 Avenue Habib Bourguiba, Sousse",
    birthDate: "23/11/1999",
    birthPlace: "Sousse",
    nationality: "Tunisienne",
    photo: null,
    level: "Master 1",
    department: "Gestion",
    status: "Actif",
    registration: "10/09/2022",
    lastLogin: "2023-05-02",
    payments: [
      { id: "PMT101", date: "10/09/2022", amount: "1500", status: "Payé", type: "Frais d'inscription" },
      { id: "PMT102", date: "10/10/2022", amount: "1000", status: "Payé", type: "1ère tranche" },
      { id: "PMT103", date: "10/01/2023", amount: "1000", status: "Payé", type: "2ème tranche" },
      { id: "PMT104", date: "10/03/2023", amount: "1000", status: "Payé", type: "3ème tranche" }
    ],
    documents: [
      { id: "DOC101", name: "Carte d'identité", type: "PDF", status: "Validé", uploadDate: "2022-09-01" },
      { id: "DOC102", name: "Diplôme de licence", type: "PDF", status: "Validé", uploadDate: "2022-09-01" },
      { id: "DOC103", name: "Certificat médical", type: "JPG", status: "En attente", uploadDate: "2022-09-05" }
    ],
    grades: [
      { course: "Management stratégique", grade: "15/20", status: "Validé" },
      { course: "Gestion financière", grade: "17/20", status: "Validé" },
      { course: "Ressources humaines", grade: "14/20", status: "Validé" },
      { course: "Marketing international", grade: "16/20", status: "Validé" }
    ],
    attendance: 88
  },
  "ST003": {
    id: "ST003",
    matricule: "INF21-7890",
    name: "Karim Mansour",
    email: "karim@example.com",
    phone: "+216 55 345 678",
    address: "78 Rue Ibn Khaldoun, Sfax",
    birthDate: "05/06/2001",
    birthPlace: "Sfax",
    nationality: "Tunisienne",
    photo: null,
    level: "Licence 3",
    department: "Informatique",
    status: "En attente",
    registration: "20/09/2021",
    lastLogin: "2023-04-28",
    payments: [
      { id: "PMT201", date: "20/09/2022", amount: "1200", status: "Payé", type: "Frais d'inscription" },
      { id: "PMT202", date: "20/10/2022", amount: "800", status: "Payé", type: "1ère tranche" },
      { id: "PMT203", date: "20/01/2023", amount: "800", status: "En attente", type: "2ème tranche" },
      { id: "PMT204", date: "20/03/2023", amount: "800", status: "Non payé", type: "3ème tranche" }
    ],
    documents: [
      { id: "DOC201", name: "Carte d'identité", type: "PDF", status: "Validé", uploadDate: "2021-09-15" },
      { id: "DOC202", name: "Relevé de notes L2", type: "PDF", status: "En attente", uploadDate: "2022-07-10" }
    ],
    grades: [
      { course: "Développement Web", grade: "13/20", status: "Validé" },
      { course: "Intelligence artificielle", grade: "11/20", status: "Validé" },
      { course: "Sécurité informatique", grade: "15/20", status: "Validé" },
      { course: "Bases de données avancées", grade: "12/20", status: "Validé" }
    ],
    attendance: 75
  }
};

const StudentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const student = id ? MOCK_STUDENTS[id as keyof typeof MOCK_STUDENTS] : null;
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Actif":
        return "bg-green-100 text-green-800";
      case "En attente":
        return "bg-amber-100 text-amber-800";
      case "Inactif":
        return "bg-gray-100 text-gray-800";
      case "Validé":
        return "bg-green-100 text-green-800";
      case "Payé":
        return "bg-green-100 text-green-800";
      case "En attente":
        return "bg-amber-100 text-amber-800";
      case "Non payé":
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

  if (!student) {
    return (
      <>
        <Header title="Fiche étudiant" />
        <div className="flex-1 p-6">
          <Card className="p-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Étudiant non trouvé</h2>
              <p className="text-muted-foreground mb-6">L'étudiant avec l'identifiant {id} n'existe pas.</p>
              <Link to="/students/directory">
                <Button>Retour à l'annuaire</Button>
              </Link>
            </div>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Fiche étudiant" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-6">
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Link to="/students/directory">
              <Button variant="outline" className="gap-2">
                <ChevronLeft size={16} />
                Retour à l'annuaire
              </Button>
            </Link>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsPdfDialogOpen(true)}
              >
                <FilePdf size={16} />
                Exporter le dossier
              </Button>
              
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsPdfDialogOpen(true)}
              >
                <Printer size={16} />
                Imprimer
              </Button>
            </div>
          </div>
          
          {/* Student profile header */}
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
          
          {/* Tabs for different information */}
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/30 rounded-lg p-1.5">
              <TabsTrigger 
                value="personal" 
                className="py-3 rounded-md text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Informations
              </TabsTrigger>
              <TabsTrigger 
                value="documents" 
                className="py-3 rounded-md text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Documents
              </TabsTrigger>
              <TabsTrigger 
                value="academic" 
                className="py-3 rounded-md text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Scolarité
              </TabsTrigger>
              <TabsTrigger 
                value="financial" 
                className="py-3 rounded-md text-base font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Finance
              </TabsTrigger>
            </TabsList>
            
            {/* Personal Information Tab */}
            <TabsContent value="personal" className="animate-fade-in">
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
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="animate-fade-in">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl">Documents administratifs</CardTitle>
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText size={16} />
                    Ajouter
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="divide-y">
                    {student.documents.map((doc) => (
                      <div key={doc.id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Ajouté le {doc.uploadDate} • {doc.type}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Academic Tab */}
            <TabsContent value="academic" className="animate-fade-in">
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
            </TabsContent>
            
            {/* Financial Tab */}
            <TabsContent value="financial" className="animate-fade-in">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Paiements</CardTitle>
                    <CardDescription>Historique des paiements</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <CreditCard size={16} />
                    Enregistrer un paiement
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="divide-y">
                    {student.payments.map((payment) => (
                      <div key={payment.id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{payment.type}</div>
                          <div className="text-sm text-muted-foreground">
                            {payment.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                          <span className="font-medium">{payment.amount} DT</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* PDF Export Dialog */}
      <PDFExportDialog 
        open={isPdfDialogOpen} 
        onOpenChange={setIsPdfDialogOpen}
        student={student}
      />
    </>
  );
};

export default StudentProfilePage;
