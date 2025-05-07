
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, PlusCircle, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for payments
const MOCK_PAYMENTS = [
  { id: "PAY001", student: "Ahmed Ben Ali", type: "Frais de scolarité", amount: 2500, date: "2025-04-15", status: "Payé" },
  { id: "PAY002", student: "Samia Oueslati", type: "Frais d'inscription", amount: 500, date: "2025-04-12", status: "Payé" },
  { id: "PAY003", student: "Karim Mansour", type: "Frais de scolarité", amount: 2500, date: "2025-04-10", status: "Partiel" },
  { id: "PAY004", student: "Leila Trabelsi", type: "Frais d'examen", amount: 150, date: "2025-04-05", status: "Payé" },
  { id: "PAY005", student: "Mehdi Khelifi", type: "Frais de scolarité", amount: 2500, date: "2025-03-28", status: "En attente" },
  { id: "PAY006", student: "Nour Sassi", type: "Frais de scolarité", amount: 2500, date: "2025-03-25", status: "Payé" },
  { id: "PAY007", student: "Yassine Ben Hassan", type: "Frais d'examen", amount: 150, date: "2025-03-20", status: "Payé" },
  { id: "PAY008", student: "Rania Meddeb", type: "Frais de scolarité", amount: 2500, date: "2025-03-15", status: "Partiel" },
];

// Mock data for expenses
const MOCK_EXPENSES = [
  { id: "EXP001", description: "Salaires personnel", amount: 15000, date: "2025-04-30", category: "Personnel" },
  { id: "EXP002", description: "Fournitures de bureau", amount: 850, date: "2025-04-22", category: "Matériel" },
  { id: "EXP003", description: "Facture électricité", amount: 1200, date: "2025-04-15", category: "Services" },
  { id: "EXP004", description: "Maintenance informatique", amount: 750, date: "2025-04-10", category: "Services" },
  { id: "EXP005", description: "Achat livres bibliothèque", amount: 3500, date: "2025-04-05", category: "Académique" },
];

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Total encaissé</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalPayments.toLocaleString()} €</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{pendingPayments.toLocaleString()} €</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Dépenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{totalExpenses.toLocaleString()} €</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Solde</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {balance.toLocaleString()} €
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center w-full md:w-auto relative">
            <Search className="absolute left-3 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Rechercher..." 
              className="pl-10 w-full md:w-80" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FileText size={18} />
              <span>Exporter</span>
            </Button>
            <Button className="gap-2">
              <PlusCircle size={18} />
              <span>Nouvelle transaction</span>
            </Button>
          </div>
        </div>

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
                      {filteredPayments.length > 0 ? (
                        filteredPayments.map((payment) => (
                          <TableRow key={payment.id}>
                            <TableCell className="font-medium">{payment.id}</TableCell>
                            <TableCell>{payment.student}</TableCell>
                            <TableCell className="hidden md:table-cell">{payment.type}</TableCell>
                            <TableCell>{payment.amount} €</TableCell>
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
              </CardContent>
            </TabsContent>

            <TabsContent value="expenses">
              <CardContent>
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
                      {filteredExpenses.length > 0 ? (
                        filteredExpenses.map((expense) => (
                          <TableRow key={expense.id}>
                            <TableCell className="font-medium">{expense.id}</TableCell>
                            <TableCell>{expense.description}</TableCell>
                            <TableCell>{expense.amount} €</TableCell>
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
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default FinancesPage;
