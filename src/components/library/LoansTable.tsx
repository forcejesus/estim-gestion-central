
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

export interface Loan {
  id: string;
  book: string;
  student: string;
  borrowDate: string;
  returnDate: string;
  status: string;
}

interface LoansTableProps {
  loans: Loan[];
}

const LoansTable: React.FC<LoansTableProps> = ({ loans }) => {
  const isTablet = useIsTablet();

  return (
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
          {loans.length > 0 ? (
            loans.map((loan) => (
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
  );
};

export default LoansTable;
