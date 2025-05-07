
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the refactored components
import SearchBar from "./examinations/SearchBar";
import ActionButtons from "./examinations/ActionButtons";
import ExamSessionsTab from "./examinations/ExamSessionsTab";
import ExamResultsTab from "./examinations/ExamResultsTab";

// Import mock data
import { MOCK_EXAM_SESSIONS, MOCK_EXAM_RESULTS } from "./examinations/MockData";

const ExaminationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  // Filter exam sessions based on search term
  const filteredSessions = MOCK_EXAM_SESSIONS.filter(session => 
    session.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter exam results based on search term and selected session
  const filteredResults = MOCK_EXAM_RESULTS.filter(result => 
    (result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedSession === "" || selectedSession === "all")
  );

  return (
    <>
      <Header title="Gestion des examens" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <ActionButtons />
        </div>

        <Card>
          <Tabs defaultValue="sessions" className="w-full">
            <div className="p-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sessions">Sessions d'examen</TabsTrigger>
                <TabsTrigger value="results">Résultats</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="sessions">
              <ExamSessionsTab filteredSessions={filteredSessions} />
            </TabsContent>

            <TabsContent value="results">
              <ExamResultsTab 
                filteredResults={filteredResults}
                selectedSession={selectedSession}
                setSelectedSession={setSelectedSession}
                examSessions={MOCK_EXAM_SESSIONS}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default ExaminationsPage;
