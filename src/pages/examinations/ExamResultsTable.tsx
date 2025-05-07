
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Types
export type ExamResult = {
  id: string;
  student: string;
  course: string;
  examDate: string;
  score: number;
  status: string;
};

interface ExamResultsTableProps {
  results: ExamResult[];
}

const ExamResultsTable: React.FC<ExamResultsTableProps> = ({ results }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Étudiant</TableHead>
            <TableHead className="hidden md:table-cell">Matière</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length > 0 ? (
            results.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="font-medium">{result.id}</TableCell>
                <TableCell>{result.student}</TableCell>
                <TableCell className="hidden md:table-cell">{result.course}</TableCell>
                <TableCell className="hidden md:table-cell">{new Date(result.examDate).toLocaleDateString()}</TableCell>
                <TableCell>{result.score}/20</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.status === "Validé" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {result.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucun résultat trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExamResultsTable;
