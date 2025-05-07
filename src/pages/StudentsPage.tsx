
import React from "react";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/students/dashboard/PageHeader";
import FeatureCards from "@/components/students/dashboard/FeatureCards";
import StatCards from "@/components/students/dashboard/StatCards";
import ProgramDistributionCards from "@/components/students/dashboard/ProgramDistributionCards";
import LevelDistributionCards from "@/components/students/dashboard/LevelDistributionCards";

const StudentsPage: React.FC = () => {
  // Données statistiques pour la démonstration
  const stats = {
    totalStudents: 854,
    newRegistrations: 42,
    pendingFiles: 18
  };

  // Données pour la répartition par niveau
  const levelData = [
    { name: 'Licence 1', count: 320 },
    { name: 'Licence 2', count: 275 },
    { name: 'Licence 3', count: 185 },
    { name: 'Master 1', count: 45 },
    { name: 'Master 2', count: 29 }
  ];

  // Données pour la répartition par filière
  const programData = [
    { name: 'Informatique', count: 198 },
    { name: 'Gestion', count: 165 },
    { name: 'Marketing', count: 143 },
    { name: 'Commerce', count: 120 },
    { name: 'Finance', count: 95 },
    { name: 'Communication', count: 87 },
    { name: 'RH', count: 46 }
  ];

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

          {/* Section Répartition par niveau */}
          <LevelDistributionCards
            levelData={levelData}
            totalStudents={stats.totalStudents}
          />

          {/* Section Répartition par filière */}
          <ProgramDistributionCards 
            programData={programData}
            totalStudents={stats.totalStudents}
          />
        </div>
      </div>
    </>
  );
};

export default StudentsPage;
