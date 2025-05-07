
import React from "react";
import { Users, FilePlus, FileText } from "lucide-react";

interface StatCardsProps {
  totalStudents: number;
  newRegistrations: number;
  pendingFiles: number;
}

const StatCards: React.FC<StatCardsProps> = ({ totalStudents, newRegistrations, pendingFiles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
            <Users size={24} className="text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total étudiants</p>
            <p className="text-4xl font-bold">{totalStudents}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
            <FilePlus size={24} className="text-green-600 dark:text-green-300" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Nouvelles inscriptions (30j)</p>
            <p className="text-4xl font-bold">{newRegistrations}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-2">
            <FileText size={24} className="text-amber-600 dark:text-amber-300" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Dossiers en attente</p>
            <p className="text-4xl font-bold">{pendingFiles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
