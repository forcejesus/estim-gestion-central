
import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./Sidebar";

const MainLayout: React.FC = () => {
  const { user, isLoading } = useAuth();

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
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
