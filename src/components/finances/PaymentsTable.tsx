
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface Payment {
  id: string;
  student: string;
  type: string;
  amount: number;
  date: string;
  status: string;
}

interface PaymentsTableProps {
  payments: Payment[];
}

const PaymentsTable: React.FC<PaymentsTableProps> = ({ payments }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Étudiant</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.student}</TableCell>
                <TableCell className="hidden md:table-cell">{payment.type}</TableCell>
                <TableCell>{payment.amount.toLocaleString()} FCFA</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    payment.status === "Payé" 
                      ? "bg-green-100 text-green-800" 
                      : payment.status === "Partiel"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {payment.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucun paiement trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PaymentsTable;
