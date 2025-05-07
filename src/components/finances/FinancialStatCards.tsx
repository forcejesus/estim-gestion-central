
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FinancialStatCardsProps {
  totalPayments: number;
  pendingPayments: number;
  totalExpenses: number;
  balance: number;
}

const FinancialStatCards: React.FC<FinancialStatCardsProps> = ({
  totalPayments,
  pendingPayments,
  totalExpenses,
  balance,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Total encaissé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{totalPayments.toLocaleString()} FCFA</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">En attente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{pendingPayments.toLocaleString()} FCFA</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{totalExpenses.toLocaleString()} FCFA</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium">Solde</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {balance.toLocaleString()} FCFA
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialStatCards;
