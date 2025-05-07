
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";

const StudentsPage: React.FC = () => {
  return (
    <>
      <Header title="Gestion des étudiants" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Module Étudiants</h1>
          <p className="text-muted-foreground">
            Bienvenue dans le module de gestion des étudiants. Utilisez le menu de navigation pour accéder aux différentes fonctionnalités.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-lg font-semibold mb-2">Annuaire</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Consultez la liste de tous les étudiants inscrits.
              </p>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-lg font-semibold mb-2">Nouvelle inscription</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Inscrivez un nouvel étudiant dans l'établissement.
              </p>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-lg font-semibold mb-2">Dossiers étudiants</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Gérez les dossiers administratifs des étudiants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsPage;
