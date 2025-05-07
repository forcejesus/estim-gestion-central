
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, PlusCircle, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for exam sessions
const MOCK_EXAM_SESSIONS = [
  { id: "EX001", title: "Session Ordinaire 1er Semestre", startDate: "2025-01-15", endDate: "2025-01-25", status: "Terminé" },
  { id: "EX002", title: "Session Ordinaire 2ème Semestre", startDate: "2025-05-15", endDate: "2025-05-25", status: "Planifié" },
  { id: "EX003", title: "Session Rattrapage 1er Semestre", startDate: "2025-02-10", endDate: "2025-02-15", status: "Terminé" },
  { id: "EX004", title: "Session Rattrapage 2ème Semestre", startDate: "2025-06-10", endDate: "2025-06-15", status: "Planifié" },
  { id: "EX005", title: "Examens de mi-parcours", startDate: "2025-03-20", endDate: "2025-03-22", status: "En cours" },
];

// Mock data for exam results
const MOCK_EXAM_RESULTS = [
  { id: "RES001", student: "Ahmed Ben Ali", course: "Algorithmes et structures de données", examDate: "2025-01-15", score: 16, status: "Validé" },
  { id: "RES002", student: "Samia Oueslati", course: "Marketing stratégique", examDate: "2025-01-16", score: 14.5, status: "Validé" },
  { id: "RES003", student: "Karim Mansour", course: "Programmation orientée objet", examDate: "2025-01-17", score: 9, status: "Non validé" },
  { id: "RES004", student: "Leila Trabelsi", course: "Stratégie de communication", examDate: "2025-01-18", score: 18, status: "Validé" },
  { id: "RES005", student: "Mehdi Khelifi", course: "Bases de données", examDate: "2025-01-19", score: 12, status: "Validé" },
  { id: "RES006", student: "Nour Sassi", course: "Anglais technique", examDate: "2025-01-20", score: 8, status: "Non validé" },
];

const ExaminationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  // Filter exam sessions based on search term
  const filteredSessions = MOCK_EXAM_SESSIONS.filter(session => 
    session.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter exam results based on search term and selected session
  const filteredResults = MOCK_EXAM_RESULTS.filter(result => 
    (result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSession === "" || selectedSession === "all")
  );

  return (
    <>
      <Header title="Gestion des examens" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-auto relative">
            <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Rechercher..." 
              className="pl-10 w-full md:w-80" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-col sm:flex-row">
            <Button variant="outline" className="gap-2">
              <FileText size={18} />
              <span>Exporter</span>
            </Button>
            <Button className="gap-2">
              <PlusCircle size={18} />
              <span>Nouvelle session</span>
            </Button>
          </div>
        </div>

        <Card>
          <Tabs defaultValue="sessions" className="w-full">
            <div className="p-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sessions">Sessions d'examen</TabsTrigger>
                <TabsTrigger value="results">Résultats</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="sessions">
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead className="hidden md:table-cell">Date début</TableHead>
                        <TableHead className="hidden md:table-cell">Date fin</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSessions.length > 0 ? (
                        filteredSessions.map((session) => (
                          <TableRow key={session.id}>
                            <TableCell className="font-medium">{session.id}</TableCell>
                            <TableCell>{session.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{new Date(session.startDate).toLocaleDateString()}</TableCell>
                            <TableCell className="hidden md:table-cell">{new Date(session.endDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                session.status === "En cours" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : session.status === "Terminé"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {session.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm">Détails</Button>
                                <Button variant="ghost" size="sm">Notes</Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            Aucune session trouvée
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="results">
              <CardContent>
                <div className="mb-4 flex justify-between items-center">
                  <div className="w-64">
                    <Select value={selectedSession} onValueChange={setSelectedSession}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrer par session" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Toutes les sessions</SelectItem>
                        {MOCK_EXAM_SESSIONS.map((session) => (
                          <SelectItem key={session.id} value={session.id}>
                            {session.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button size="sm" variant="outline" className="gap-2">
                    <PlusCircle size={16} />
                    Ajouter des notes
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Étudiant</TableHead>
                        <TableHead className="hidden md:table-cell">Matière</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResults.length > 0 ? (
                        filteredResults.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell className="font-medium">{result.id}</TableCell>
                            <TableCell>{result.student}</TableCell>
                            <TableCell className="hidden md:table-cell">{result.course}</TableCell>
                            <TableCell className="hidden md:table-cell">{new Date(result.examDate).toLocaleDateString()}</TableCell>
                            <TableCell>{result.score}/20</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                result.status === "Validé" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {result.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            Aucun résultat trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default ExaminationsPage;
