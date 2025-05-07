
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Types
export type ExamSession = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
};

interface ExamSessionsTableProps {
  sessions: ExamSession[];
}

const ExamSessionsTable: React.FC<ExamSessionsTableProps> = ({ sessions }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Titre</TableHead>
            <TableHead className="hidden md:table-cell">Date début</TableHead>
            <TableHead className="hidden md:table-cell">Date fin</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.length > 0 ? (
            sessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell className="font-medium">{session.id}</TableCell>
                <TableCell>{session.title}</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(session.startDate).toLocaleDateString()}</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(session.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    session.status === "En cours" 
                      ? "bg-blue-100 text-blue-800" 
                      : session.status === "Terminé"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {session.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">Détails</Button>
                    <Button variant="ghost" size="sm">Notes</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucune session trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamSessionsTable;
