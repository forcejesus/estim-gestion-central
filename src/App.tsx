
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/contexts/AuthContext";

import MainLayout from "@/components/layout/MainLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import StudentsPage from "@/pages/StudentsPage";
import FinancesPage from "@/pages/FinancesPage";
import ExaminationsPage from "@/pages/ExaminationsPage";
import LibraryPage from "@/pages/LibraryPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/finances" element={<FinancesPage />} />
              <Route path="/examinations" element={<ExaminationsPage />} />
              <Route path="/library" element={<LibraryPage />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
