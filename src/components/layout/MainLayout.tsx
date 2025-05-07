
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "./Sidebar";

const MainLayout: React.FC = () => {
  const { user, isLoading } = useAuth();

  // Wait until we check for the user session
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
