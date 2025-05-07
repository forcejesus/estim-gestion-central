import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PDFExportDialog from "@/components/students/pdf/PDFExportDialog";

// Import refactored components
import StudentNotFound from "@/components/students/profile/StudentNotFound";
import StudentProfileHeader from "@/components/students/profile/StudentProfileHeader";
import ProfileActionButtons from "@/components/students/profile/ProfileActionButtons";
import PersonalInfoTab from "@/components/students/profile/tabs/PersonalInfoTab";
import DocumentsTab from "@/components/students/profile/tabs/DocumentsTab";
import AcademicTab from "@/components/students/profile/tabs/AcademicTab";
import FinancialTab from "@/components/students/profile/tabs/FinancialTab";
import { getStatusColor, getInitials } from "@/components/students/profile/utils";

// Mock data for student profiles
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

  if (!student) {
    return (
      <>
        <Header title="Fiche étudiant" />
        <div className="flex-1 p-6">
          <StudentNotFound id={id} />
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
          <ProfileActionButtons 
            onExportClick={() => setIsPdfDialogOpen(true)}
            onPrintClick={() => setIsPdfDialogOpen(true)}
          />
          
          {/* Student profile header */}
          <StudentProfileHeader 
            student={student} 
            getStatusColor={getStatusColor} 
            getInitials={getInitials} 
          />
          
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
              <PersonalInfoTab student={student} />
            </TabsContent>
            
            {/* Documents Tab */}
            <TabsContent value="documents" className="animate-fade-in">
              <DocumentsTab documents={student.documents} getStatusColor={getStatusColor} />
            </TabsContent>
            
            {/* Academic Tab */}
            <TabsContent value="academic" className="animate-fade-in">
              <AcademicTab student={student} getStatusColor={getStatusColor} />
            </TabsContent>
            
            {/* Financial Tab */}
            <TabsContent value="financial" className="animate-fade-in">
              <FinancialTab payments={student.payments} getStatusColor={getStatusColor} />
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
