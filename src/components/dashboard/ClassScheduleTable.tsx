
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ClassScheduleTableProps {
  className?: string;
}

const ClassScheduleTable: React.FC<ClassScheduleTableProps> = ({ className }) => {
  // Sample class schedule data
  const todayClasses = [
    { id: 1, course: "Algorithmes et structures de données", level: "L2 Informatique", time: "08:00 - 10:00", room: "Salle 201", teacher: "Dr. Amal Ben Ahmed" },
    { id: 2, course: "Marketing Digital", level: "L3 Marketing", time: "10:15 - 12:15", room: "Salle 105", teacher: "Pr. Mohamed Saddik" },
    { id: 3, course: "Comptabilité Générale", level: "L1 Gestion", time: "13:00 - 15:00", room: "Amphithéâtre A", teacher: "Dr. Sarah Khnissi" },
    { id: 4, course: "Introduction à la Programmation", level: "L1 Informatique", time: "15:15 - 17:15", room: "Labo Info 2", teacher: "Dr. Ahmed Tebaï" },
  ];

  return (
    <Card className={className + " border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-800"}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Emploi du temps du jour</CardTitle>
          <p className="text-sm text-muted-foreground">Cours programmés pour aujourd'hui</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs font-medium text-estim-green border-estim-green/30 hover:bg-estim-green/10"
        >
          Voir plus
          <ChevronRight size={14} className="ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
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
                </tr>
              </thead>
              <tbody>
                {todayClasses.map((cls) => (
                  <tr 
                    key={cls.id} 
                    className="border-t border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/70"
                  >
                    <td className="py-3 px-4 font-medium">{cls.course}</td>
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{cls.level}</td>
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{cls.time}</td>
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{cls.room}</td>
                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">{cls.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassScheduleTable;
