
import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tablet, Laptop, ShieldAlert } from "lucide-react";

const MobileAccessRestriction = () => {
  return (
    <div className="fixed inset-0 bg-zinc-900 text-white flex flex-col items-center justify-center p-6 z-50">
      <ShieldAlert className="h-16 w-16 text-red-400 mb-6 animate-pulse" />
      <h1 className="text-2xl font-bold text-center mb-2">Accès restreint</h1>
      <p className="text-center mb-8 max-w-md">
        Cette application administrative nécessite un écran plus large pour une expérience optimale.
      </p>
      <div className="flex flex-col items-center gap-4">
        <div className="bg-zinc-800 p-4 rounded-lg flex flex-col items-center">
          <Laptop className="h-8 w-8 text-green-400 mb-2" />
          <span className="text-sm text-zinc-300">Ordinateur</span>
          <span className="text-xs text-green-400">Recommandé</span>
        </div>
        <div className="bg-zinc-800 p-4 rounded-lg flex flex-col items-center">
          <Tablet className="h-8 w-8 text-amber-400 mb-2" />
          <span className="text-sm text-zinc-300">Tablette</span>
          <span className="text-xs text-amber-400">Compatible</span>
        </div>
      </div>
      <div className="mt-8 p-4 bg-zinc-800/50 rounded-lg">
        <p className="text-xs text-center text-zinc-400">
          Veuillez utiliser un appareil avec une résolution minimale de 768px de largeur.
        </p>
      </div>
    </div>
  );
};

const MainLayout: React.FC = () => {
  const { user, isLoading } = useAuth();
  const isMobile = useIsMobile();

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  // Wait until we check for the user session
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <div className="animate-pulse text-center">
          <p className="text-lg font-medium text-zinc-600 dark:text-zinc-300">Chargement...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {isMobile && <MobileAccessRestriction />}
      <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
