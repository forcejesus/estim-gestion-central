
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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Search, 
  Filter, 
  Download, 
  FilePlus, 
  Eye, 
  Mail, 
  MoreVertical, 
  Printer, 
  RefreshCw,
  Calendar,
  FileText,
  Award
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Mock data for certificates
const MOCK_CERTIFICATES = [
  { 
    id: "CERT001", 
    studentId: "ST001", 
    studentName: "Ahmed Ben Ali", 
    type: "Attestation de scolarité", 
    requestDate: "2023-04-15", 
    issueDate: "2023-04-18", 
    status: "Délivré", 
    year: "2022-2023" 
  },
  { 
    id: "CERT002", 
    studentId: "ST002", 
    studentName: "Samia Oueslati", 
    type: "Attestation de réussite", 
    requestDate: "2023-04-20", 
    issueDate: "2023-04-22", 
    status: "Délivré", 
    year: "2022-2023" 
  },
  { 
    id: "CERT003", 
    studentId: "ST003", 
    studentName: "Karim Mansour", 
    type: "Attestation de stage", 
    requestDate: "2023-04-25", 
    issueDate: null, 
    status: "En cours", 
    year: "2022-2023" 
  },
  { 
    id: "CERT004", 
    studentId: "ST004", 
    studentName: "Leila Trabelsi", 
    type: "Attestation de diplôme", 
    requestDate: "2023-04-10", 
    issueDate: "2023-04-15", 
    status: "Délivré", 
    year: "2022-2023" 
  },
  { 
    id: "CERT005", 
    studentId: "ST005", 
    studentName: "Mehdi Khelifi", 
    type: "Attestation de scolarité", 
    requestDate: "2023-04-28", 
    issueDate: null, 
    status: "En attente", 
    year: "2022-2023" 
  },
  { 
    id: "CERT006", 
    studentId: "ST006", 
    studentName: "Nour Sassi", 
    type: "Attestation de scolarité", 
    requestDate: "2023-04-05", 
    issueDate: "2023-04-08", 
    status: "Délivré", 
    year: "2022-2023" 
  },
  { 
    id: "CERT007", 
    studentId: "ST007", 
    studentName: "Yassine Ben Hassan", 
    type: "Attestation de réussite", 
    requestDate: "2023-04-18", 
    issueDate: "2023-04-21", 
    status: "Délivré", 
    year: "2022-2023" 
  },
  { 
    id: "CERT008", 
    studentId: "ST008", 
    studentName: "Rania Meddeb", 
    type: "Attestation de stage", 
    requestDate: "2023-04-22", 
    issueDate: null, 
    status: "Refusé", 
    year: "2022-2023" 
  }
];

// Certificate details
const CERTIFICATE_DETAILS = {
  id: "CERT001",
  student: {
    id: "ST001",
    name: "Ahmed Ben Ali",
    birthDate: "1998-05-15",
    birthPlace: "Tunis",
    nationality: "Tunisienne",
    program: "Informatique",
    level: "Licence 2"
  },
  certificate: {
    type: "Attestation de scolarité",
    requestDate: "2023-04-15",
    issueDate: "2023-04-18",
    academicYear: "2022-2023",
    status: "Délivré",
    reference: "REF-2023-001",
    validUntil: "2023-10-18"
  }
};

const CertificatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);
  const [certificateDialogOpen, setCertificateDialogOpen] = useState(false);

  const filteredCertificates = MOCK_CERTIFICATES.filter(certificate => {
    const matchesSearch = 
      certificate.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      certificate.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = typeFilter === "" || certificate.type === typeFilter;
    const matchesStatus = statusFilter === "" || certificate.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewCertificate = (id: string) => {
    setSelectedCertificate(id);
    setCertificateDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Délivré":
        return "bg-green-100 text-green-800";
      case "En cours":
        return "bg-blue-100 text-blue-800";
      case "En attente":
        return "bg-amber-100 text-amber-800";
      case "Refusé":
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return format(new Date(dateString), "dd MMM yyyy", { locale: fr });
  };

  return (
    <>
      <Header title="Attestations" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-auto relative">
            <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Rechercher une attestation..." 
              className="pl-10 w-full md:w-80" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type d'attestation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="type-all">Tous les types</SelectItem>
                <SelectItem value="Attestation de scolarité">Attestation de scolarité</SelectItem>
                <SelectItem value="Attestation de réussite">Attestation de réussite</SelectItem>
                <SelectItem value="Attestation de stage">Attestation de stage</SelectItem>
                <SelectItem value="Attestation de diplôme">Attestation de diplôme</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status-all">Tous les statuts</SelectItem>
                <SelectItem value="Délivré">Délivré</SelectItem>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Refusé">Refusé</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="gap-2">
              <FilePlus size={18} />
              <span>Nouvelle demande</span>
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
                  <TableHead className="hidden lg:table-cell">Date de demande</TableHead>
                  <TableHead className="hidden lg:table-cell">Date d'émission</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertificates.length > 0 ? (
                  filteredCertificates.map((certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell className="font-medium">{certificate.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {getInitials(certificate.studentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{certificate.studentName}</p>
                            <p className="text-xs text-muted-foreground">{certificate.studentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{certificate.type}</TableCell>
                      <TableCell className="hidden lg:table-cell">{formatDate(certificate.requestDate)}</TableCell>
                      <TableCell className="hidden lg:table-cell">{formatDate(certificate.issueDate)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(certificate.status)}>
                          {certificate.status}
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
                            <DropdownMenuItem onClick={() => handleViewCertificate(certificate.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Consulter
                            </DropdownMenuItem>
                            {certificate.status === "Délivré" && (
                              <>
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
                              </>
                            )}
                            {["En attente", "En cours"].includes(certificate.status) && (
                              <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Mise à jour du statut
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Aucune attestation trouvée
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={certificateDialogOpen} onOpenChange={setCertificateDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Détails de l'attestation</DialogTitle>
              <DialogDescription>
                {CERTIFICATE_DETAILS.certificate.type} - {CERTIFICATE_DETAILS.certificate.reference}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="border rounded-md p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24">
                  <div className="absolute transform rotate-45 bg-green-100 text-green-800 text-xs font-semibold py-1 right-[-40px] top-[32px] w-[170px] text-center">
                    {CERTIFICATE_DETAILS.certificate.status}
                  </div>
                </div>
                
                <div className="text-center mb-6 relative">
                  <Award className="mx-auto h-12 w-12 text-primary mb-2" />
                  <h2 className="text-xl font-bold">{CERTIFICATE_DETAILS.certificate.type}</h2>
                  <p className="text-sm text-muted-foreground">Année académique {CERTIFICATE_DETAILS.certificate.academicYear}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Informations de l'étudiant</h3>
                      <dl className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Nom:</dt>
                          <dd>{CERTIFICATE_DETAILS.student.name}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Né(e) le:</dt>
                          <dd>{formatDate(CERTIFICATE_DETAILS.student.birthDate)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Lieu de naissance:</dt>
                          <dd>{CERTIFICATE_DETAILS.student.birthPlace}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Nationalité:</dt>
                          <dd>{CERTIFICATE_DETAILS.student.nationality}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Filière:</dt>
                          <dd>{CERTIFICATE_DETAILS.student.program}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Niveau:</dt>
                          <dd>{CERTIFICATE_DETAILS.student.level}</dd>
                        </div>
                      </dl>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Informations de l'attestation</h3>
                      <dl className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Référence:</dt>
                          <dd>{CERTIFICATE_DETAILS.certificate.reference}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Date de demande:</dt>
                          <dd>{formatDate(CERTIFICATE_DETAILS.certificate.requestDate)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Date d'émission:</dt>
                          <dd>{formatDate(CERTIFICATE_DETAILS.certificate.issueDate)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Valable jusqu'au:</dt>
                          <dd>{formatDate(CERTIFICATE_DETAILS.certificate.validUntil)}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Statut:</dt>
                          <dd>
                            <Badge className={getStatusColor(CERTIFICATE_DETAILS.certificate.status)}>
                              {CERTIFICATE_DETAILS.certificate.status}
                            </Badge>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="text-center pt-4">
                    <p className="text-sm text-muted-foreground">Cette attestation est délivrée à l'intéressé(e) pour servir et valoir ce que de droit.</p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setCertificateDialogOpen(false)}>
                Fermer
              </Button>
              {CERTIFICATE_DETAILS.certificate.status === "Délivré" && (
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
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CertificatesPage;
