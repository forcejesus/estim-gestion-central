
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PaymentsTable, { Payment } from "./PaymentsTable";
import ExpensesTable, { Expense } from "./ExpensesTable";

interface FinancialTabsProps {
  filteredPayments: Payment[];
  filteredExpenses: Expense[];
}

const FinancialTabs: React.FC<FinancialTabsProps> = ({ filteredPayments, filteredExpenses }) => {
  return (
    <Card>
      <Tabs defaultValue="payments" className="w-full">
        <div className="p-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="expenses">Dépenses</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="payments">
          <CardContent>
            <PaymentsTable payments={filteredPayments} />
          </CardContent>
        </TabsContent>

        <TabsContent value="expenses">
          <CardContent>
            <ExpensesTable expenses={filteredExpenses} />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default FinancialTabs;
