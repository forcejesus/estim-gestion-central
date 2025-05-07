
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

interface ExpensesTableProps {
  expenses: Expense[];
}

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="hidden md:table-cell">Catégorie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.id}</TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.amount.toLocaleString()} FCFA</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(expense.date).toLocaleDateString()}</TableCell>
                <TableCell className="hidden md:table-cell">{expense.category}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Aucune dépense trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpensesTable;
