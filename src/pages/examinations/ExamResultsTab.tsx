
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import ExamResultsTable from "./ExamResultsTable";
import { ExamResult } from "./ExamResultsTable";
import { ExamSession } from "./ExamSessionsTable";

interface ExamResultsTabProps {
  filteredResults: ExamResult[];
  selectedSession: string;
  setSelectedSession: (value: string) => void;
  examSessions: ExamSession[];
}

const ExamResultsTab: React.FC<ExamResultsTabProps> = ({ 
  filteredResults,
  selectedSession,
  setSelectedSession,
  examSessions
}) => {
  return (
    <CardContent>
      <div className="mb-4 flex justify-between items-center">
        <div className="w-64">
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les sessions</SelectItem>
              {examSessions.map((session) => (
                <SelectItem key={session.id} value={session.id}>
                  {session.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <PlusCircle size={16} />
          Ajouter des notes
        </Button>
      </div>
      
      <ExamResultsTable results={filteredResults} />
    </CardContent>
  );
};

export default ExamResultsTab;
