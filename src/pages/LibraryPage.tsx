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
import { Search, BookOpen, ChevronDown, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsTablet } from "@/hooks/use-mobile";

// Mock data for books
const MOCK_BOOKS = [
  { id: "B001", title: "Introduction à l'algorithmique", author: "Thomas H. Cormen", category: "Informatique", status: "Disponible", copies: 3 },
  { id: "B002", title: "Réseaux informatiques", author: "Andrew S. Tanenbaum", category: "Informatique", status: "Disponible", copies: 2 },
  { id: "B003", title: "Marketing Management", author: "Philip Kotler", category: "Marketing", status: "Disponible", copies: 1 },
  { id: "B004", title: "Comptabilité de gestion", author: "Michel Gervais", category: "Gestion", status: "Emprunté", copies: 0 },
  { id: "B005", title: "Droit des sociétés", author: "Maurice Cozian", category: "Droit", status: "Disponible", copies: 4 },
  { id: "B006", title: "Économie internationale", author: "Paul Krugman", category: "Économie", status: "Emprunté", copies: 0 },
  { id: "B007", title: "Intelligence artificielle", author: "Stuart Russell", category: "Informatique", status: "Disponible", copies: 1 },
  { id: "B008", title: "Base de données", author: "C.J. Date", category: "Informatique", status: "Emprunté", copies: 0 },
];

// Mock data for loans
const MOCK_LOANS = [
  { id: "L001", book: "Introduction à l'algorithmique", student: "Ahmed Ben Ali", borrowDate: "2025-04-15", returnDate: "2025-05-15", status: "En cours" },
  { id: "L002", book: "Comptabilité de gestion", student: "Samia Oueslati", borrowDate: "2025-04-10", returnDate: "2025-05-10", status: "En cours" },
  { id: "L003", book: "Intelligence artificielle", student: "Karim Mansour", borrowDate: "2025-04-05", returnDate: "2025-05-05", status: "En retard" },
  { id: "L004", book: "Économie internationale", student: "Leila Trabelsi", borrowDate: "2025-04-01", returnDate: "2025-05-01", status: "En cours" },
  { id: "L005", book: "Base de données", student: "Mehdi Khelifi", borrowDate: "2025-03-25", returnDate: "2025-04-25", status: "En retard" },
  { id: "L006", book: "Réseaux informatiques", student: "Nour Sassi", borrowDate: "2025-03-20", returnDate: "2025-04-20", status: "Retourné" },
];

const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isTablet = useIsTablet();

  // Filter books based on search term
  const filteredBooks = MOCK_BOOKS.filter(book => 
    book.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter loans based on search term
  const filteredLoans = MOCK_LOANS.filter(loan => 
    loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.book.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header title="Gestion de la bibliothèque" />
      <div className="flex-1 overflow-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center w-full lg:w-auto relative">
            <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Rechercher..." 
              className="pl-10 w-full lg:w-80" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button className="gap-2 w-full lg:w-auto">
              <PlusCircle size={18} />
              <span>Ajouter un livre</span>
            </Button>
          </div>
        </div>

        <Card>
          <Tabs defaultValue="books" className="w-full">
            <div className="p-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="books">Catalogue</TabsTrigger>
                <TabsTrigger value="loans">Emprunts</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="books">
              <CardContent className="p-2 sm:p-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">ID</TableHead>
                        <TableHead className="whitespace-nowrap">Titre</TableHead>
                        <TableHead className="hidden md:table-cell whitespace-nowrap">Auteur</TableHead>
                        <TableHead className="hidden lg:table-cell whitespace-nowrap">Catégorie</TableHead>
                        <TableHead className="whitespace-nowrap">Statut</TableHead>
                        <TableHead className="whitespace-nowrap">Exemplaires</TableHead>
                        <TableHead className="whitespace-nowrap">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                          <TableRow key={book.id}>
                            <TableCell className="font-medium whitespace-nowrap">{book.id}</TableCell>
                            <TableCell className={isTablet ? "max-w-[150px] truncate" : ""}>{book.title}</TableCell>
                            <TableCell className="hidden md:table-cell whitespace-nowrap">{book.author}</TableCell>
                            <TableCell className="hidden lg:table-cell whitespace-nowrap">{book.category}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                book.status === "Disponible" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {book.status}
                              </span>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">{book.copies}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                disabled={book.status !== "Disponible"}
                              >
                                Emprunter
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            Aucun livre trouvé
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="loans">
              <CardContent className="p-2 sm:p-4">
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">ID</TableHead>
                        <TableHead className="whitespace-nowrap">Livre</TableHead>
                        <TableHead className="hidden md:table-cell whitespace-nowrap">Étudiant</TableHead>
                        <TableHead className="hidden lg:table-cell whitespace-nowrap">Date d'emprunt</TableHead>
                        <TableHead className="hidden lg:table-cell whitespace-nowrap">Date de retour</TableHead>
                        <TableHead className="whitespace-nowrap">Statut</TableHead>
                        <TableHead className="whitespace-nowrap">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLoans.length > 0 ? (
                        filteredLoans.map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium whitespace-nowrap">{loan.id}</TableCell>
                            <TableCell className={isTablet ? "max-w-[150px] truncate" : ""}>{loan.book}</TableCell>
                            <TableCell className="hidden md:table-cell whitespace-nowrap">{loan.student}</TableCell>
                            <TableCell className="hidden lg:table-cell whitespace-nowrap">{new Date(loan.borrowDate).toLocaleDateString()}</TableCell>
                            <TableCell className="hidden lg:table-cell whitespace-nowrap">{new Date(loan.returnDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                loan.status === "En cours" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : loan.status === "En retard"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {loan.status}
                              </span>
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                disabled={loan.status === "Retourné"}
                              >
                                Retourner
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            Aucun emprunt trouvé
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

export default LibraryPage;
