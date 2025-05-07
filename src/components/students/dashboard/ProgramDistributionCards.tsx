
import React from "react";
import { ChartBarBig } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProgramData {
  name: string;
  count: number;
}

interface ProgramDistributionCardsProps {
  programData: ProgramData[];
  totalStudents: number;
}

const ProgramDistributionCards: React.FC<ProgramDistributionCardsProps> = ({ programData, totalStudents }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <ChartBarBig size={20} className="text-primary" />
        <h2 className="text-lg font-semibold">Répartition par filière</h2>
        <Badge variant="outline" className="ml-2">
          {totalStudents} étudiants
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {programData.map((program) => (
          <div 
            key={program.name} 
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">{program.name}</span>
              <span className="font-bold">{program.count}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full" 
                style={{ width: `${Math.round((program.count / totalStudents) * 100)}%` }}
              >
              </div>
            </div>
            <p className="text-xs text-right text-muted-foreground mt-1">
              {Math.round((program.count / totalStudents) * 100)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramDistributionCards;
