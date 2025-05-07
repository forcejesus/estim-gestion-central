
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import SearchBar from "@/components/library/SearchBar";
import BooksTable from "@/components/library/BooksTable";
import LoansTable from "@/components/library/LoansTable";
import AddBookButton from "@/components/library/AddBookButton";
import { MOCK_BOOKS, MOCK_LOANS } from "@/components/library/LibraryData";
import type { Book } from "@/components/library/BooksTable";
import type { Loan } from "@/components/library/LoansTable";

const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on search term
  const filteredBooks: Book[] = MOCK_BOOKS.filter(book => 
    book.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter loans based on search term
  const filteredLoans: Loan[] = MOCK_LOANS.filter(loan => 
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
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex gap-2">
            <AddBookButton />
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
                <BooksTable books={filteredBooks} />
              </CardContent>
            </TabsContent>

            <TabsContent value="loans">
              <CardContent className="p-2 sm:p-4">
                <LoansTable loans={filteredLoans} />
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default LibraryPage;
