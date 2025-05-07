
import React from "react";
import { CardContent } from "@/components/ui/card";
import ExamSessionsTable from "./ExamSessionsTable";
import { ExamSession } from "./ExamSessionsTable";

interface ExamSessionsTabProps {
  filteredSessions: ExamSession[];
}

const ExamSessionsTab: React.FC<ExamSessionsTabProps> = ({ filteredSessions }) => {
  return (
    <CardContent>
      <ExamSessionsTable sessions={filteredSessions} />
    </CardContent>
  );
};

export default ExamSessionsTab;
