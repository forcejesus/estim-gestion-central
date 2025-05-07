
import React from "react";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/students/dashboard/PageHeader";
import FeatureCards from "@/components/students/dashboard/FeatureCards";
import StatCards from "@/components/students/dashboard/StatCards";

const StudentsPage: React.FC = () => {
  // Données statistiques pour la démonstration
  const stats = {
    totalStudents: 854,
    newRegistrations: 42,
    pendingFiles: 18
  };

  return (
    <>
      <Header title="Gestion des étudiants" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-6">
          <PageHeader />
          
          {/* Cartes des fonctionnalités */}
          <FeatureCards 
            totalStudents={stats.totalStudents}
            pendingFiles={stats.pendingFiles}
          />
          
          {/* Statistiques */}
          <StatCards 
            totalStudents={stats.totalStudents}
            newRegistrations={stats.newRegistrations}
            pendingFiles={stats.pendingFiles}
          />
        </div>
      </div>
    </>
  );
};

export default StudentsPage;
