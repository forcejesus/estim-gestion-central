
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ClassScheduleTableProps {
  className?: string;
}

const ClassScheduleTable: React.FC<ClassScheduleTableProps> = ({ className }) => {
  // Empty class schedule data
  const todayClasses: any[] = [];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'en-cours':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">En cours</Badge>;
      case 'terminé':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800">Terminé</Badge>;
      case 'annulé':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Annulé</Badge>;
      case 'à-venir':
      default:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">À venir</Badge>;
    }
  };

  return (
    <div className={className}>
      {todayClasses.length > 0 ? (
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-700">
                  <th className="py-3 px-4 text-left font-medium text-zinc-600 dark:text-zinc-300">Cours</th>
                  <th className="py-3 px-4 text-left font-medium text-zinc-600 dark:text-zinc-300">Classe</th>
                  <th className="py-3 px-4 text-left font-medium text-zinc-600 dark:text-zinc-300">Horaire</th>
                  <th className="py-3 px-4 text-left font-medium text-zinc-600 dark:text-zinc-300">Salle</th>
                  <th className="py-3 px-4 text-left font-medium text-zinc-600 dark:text-zinc-300">Enseignant</th>
                  <th className="py-3 px-4 text-left font-medium text-zinc-600 dark:text-zinc-300">Statut</th>
                </tr>
              </thead>
              <tbody>
                {todayClasses.map((cls) => (
                  <tr 
                    key={cls.id} 
                    className={`
                      border-t border-zinc-200 dark:border-zinc-700 
                      hover:bg-zinc-50 dark:hover:bg-zinc-800/70
                      ${cls.status === 'en-cours' ? 'bg-green-50/30 dark:bg-green-900/5' : ''}
                    `}
                  >
                    <td className="py-3 px-4 font-medium">{cls.course}</td>
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{cls.level}</td>
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{cls.time}</td>
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{cls.room}</td>
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{cls.teacher}</td>
                    <td className="py-3 px-4">
                      {getStatusBadge(cls.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-md border p-10 flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-2">Aucun cours programmé</p>
          <p className="text-zinc-400 dark:text-zinc-500 text-sm">Les données du planning des cours seront disponibles prochainement.</p>
        </div>
      )}
    </div>
  );
};

export default ClassScheduleTable;
