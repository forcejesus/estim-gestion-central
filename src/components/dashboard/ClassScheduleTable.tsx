
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClassScheduleTableProps {
  className?: string;
}

const ClassScheduleTable: React.FC<ClassScheduleTableProps> = ({ className }) => {
  // Sample class schedule data with additional fields
  const todayClasses = [
    { 
      id: 1, 
      course: "Algorithmes et structures de données", 
      level: "L2 Informatique", 
      time: "08:00 - 10:00", 
      room: "Salle 201", 
      teacher: "Dr. Amal Ben Ahmed",
      status: "en-cours" // en-cours, terminé, annulé
    },
    { 
      id: 2, 
      course: "Marketing Digital", 
      level: "L3 Marketing", 
      time: "10:15 - 12:15", 
      room: "Salle 105", 
      teacher: "Pr. Mohamed Saddik",
      status: "à-venir"
    },
    { 
      id: 3, 
      course: "Comptabilité Générale", 
      level: "L1 Gestion", 
      time: "13:00 - 15:00", 
      room: "Amphithéâtre A", 
      teacher: "Dr. Sarah Khnissi",
      status: "à-venir"
    },
    { 
      id: 4, 
      course: "Introduction à la Programmation", 
      level: "L1 Informatique", 
      time: "15:15 - 17:15", 
      room: "Labo Info 2", 
      teacher: "Dr. Ahmed Tebaï",
      status: "à-venir"
    },
  ];

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
      <div className="mt-3 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
        >
          Exporter le planning
        </Button>
      </div>
    </div>
  );
};

export default ClassScheduleTable;
