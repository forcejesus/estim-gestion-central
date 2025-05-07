
import React from "react";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LevelData {
  name: string;
  count: number;
}

interface LevelDistributionCardsProps {
  levelData: LevelData[];
  totalStudents: number;
}

const LevelDistributionCards: React.FC<LevelDistributionCardsProps> = ({ levelData, totalStudents }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap size={20} className="text-primary" />
        <h2 className="text-lg font-semibold">Répartition par niveau</h2>
        <Badge variant="outline" className="ml-2">
          {totalStudents} étudiants
        </Badge>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {levelData.map((level) => (
          <div key={level.name} className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4">
            <div className="flex flex-col items-center text-center">
              <p className="text-2xl font-bold mb-1">{level.count}</p>
              <div className="w-20 h-1 bg-indigo-500 rounded my-2"></div>
              <p className="text-muted-foreground text-sm">{level.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((level.count / totalStudents) * 100)}% des étudiants
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelDistributionCards;
