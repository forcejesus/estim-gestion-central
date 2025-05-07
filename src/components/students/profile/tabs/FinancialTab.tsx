
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FinancialTabProps {
  payments: Array<{
    id: string;
    date: string;
    amount: string;
    status: string;
    type: string;
  }>;
  getStatusColor: (status: string) => string;
}

const FinancialTab: React.FC<FinancialTabProps> = ({ payments, getStatusColor }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Paiements</CardTitle>
          <CardDescription>Historique des paiements</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <CreditCard size={16} />
          Enregistrer un paiement
        </Button>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {payments.map((payment) => (
            <div key={payment.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{payment.type}</div>
                <div className="text-sm text-muted-foreground">
                  {payment.date}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                <span className="font-medium">{payment.amount} FCFA</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialTab;
