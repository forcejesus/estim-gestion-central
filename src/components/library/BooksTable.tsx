
import React from "react";
import { useIsTablet } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  copies: number;
}

interface BooksTableProps {
  books: Book[];
}

const BooksTable: React.FC<BooksTableProps> = ({ books }) => {
  const isTablet = useIsTablet();

  return (
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
          {books.length > 0 ? (
            books.map((book) => (
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
  );
};

export default BooksTable;
