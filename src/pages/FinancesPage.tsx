
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import FinancialStatCards from "@/components/finances/FinancialStatCards";
import SearchAndActions from "@/components/finances/SearchAndActions";
import FinancialTabs from "@/components/finances/FinancialTabs";
import { MOCK_PAYMENTS, MOCK_EXPENSES } from "@/data/financesData";

const FinancesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter payments based on search term
  const filteredPayments = MOCK_PAYMENTS.filter(payment => 
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter expenses based on search term
  const filteredExpenses = MOCK_EXPENSES.filter(expense => 
    expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate financial summary
  const totalPayments = MOCK_PAYMENTS.filter(p => p.status === "Payé").reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = MOCK_PAYMENTS.filter(p => p.status === "En attente").reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = MOCK_EXPENSES.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalPayments - totalExpenses;

  return (
    <>
      <Header title="Gestion des finances" />
      <div className="flex-1 overflow-auto p-6">
        <FinancialStatCards 
          totalPayments={totalPayments}
          pendingPayments={pendingPayments}
          totalExpenses={totalExpenses}
          balance={balance}
        />
        
        <SearchAndActions 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FinancialTabs 
          filteredPayments={filteredPayments}
          filteredExpenses={filteredExpenses}
        />
      </div>
    </>
  );
};

export default FinancesPage;
