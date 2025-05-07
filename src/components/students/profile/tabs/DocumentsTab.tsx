
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DocumentsTabProps {
  documents: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    uploadDate: string;
  }>;
  getStatusColor: (status: string) => string;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ documents, getStatusColor }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Documents administratifs</CardTitle>
        <Button variant="outline" size="sm" className="gap-1">
          <FileText size={16} />
          Ajouter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="divide-y">
          {documents.map((doc) => (
            <div key={doc.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{doc.name}</div>
                <div className="text-sm text-muted-foreground">
                  Ajouté le {doc.uploadDate} • {doc.type}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Download size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsTab;
