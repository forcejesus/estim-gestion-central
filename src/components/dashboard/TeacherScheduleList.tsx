
import React from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen, Clock } from "lucide-react";

interface TeacherScheduleProps {
  activeLevel: string;
  setActiveLevel: (level: string) => void;
}

type TeacherSchedule = {
  id: number;
  name: string;
  course: string;
  level: string;
  time: string;
  room: string;
  status: 'en-cours' | 'à-venir' | 'terminé';
};

const TeacherScheduleList: React.FC<TeacherScheduleProps> = ({ 
  activeLevel, 
  setActiveLevel 
}) => {
  // Sample data for teachers by level
  const teacherSchedules: TeacherSchedule[] = [
    // L1 Teachers
    { id: 1, name: 'Dr. Amal Ben Ahmed', course: 'Algorithmes fondamentaux', level: 'L1', time: '08:00 - 10:00', room: 'Salle 101', status: 'terminé' },
    { id: 2, name: 'Pr. Mohamed Saddik', course: 'Introduction au marketing', level: 'L1', time: '10:15 - 12:15', room: 'Salle 102', status: 'en-cours' },
    { id: 3, name: 'Dr. Sarah Khnissi', course: 'Mathématiques discrètes', level: 'L1', time: '13:00 - 15:00', room: 'Salle 103', status: 'à-venir' },
    
    // L2 Teachers
    { id: 4, name: 'Dr. Ahmed Tebaï', course: 'Structures de données avancées', level: 'L2', time: '08:00 - 10:00', room: 'Salle 201', status: 'terminé' },
    { id: 5, name: 'Pr. Leila Riahi', course: 'Analyse financière', level: 'L2', time: '10:15 - 12:15', room: 'Salle 202', status: 'en-cours' },
    { id: 6, name: 'Dr. Karim Belhadj', course: 'Réseaux informatiques', level: 'L2', time: '13:00 - 15:00', room: 'Salle 203', status: 'à-venir' },
    
    // L3 Teachers
    { id: 7, name: 'Dr. Nadia Cherif', course: 'Intelligence artificielle', level: 'L3', time: '08:00 - 10:00', room: 'Salle 301', status: 'terminé' },
    { id: 8, name: 'Pr. Hamza Khelifi', course: 'Gestion de projet', level: 'L3', time: '10:15 - 12:15', room: 'Salle 302', status: 'en-cours' },
    { id: 9, name: 'Dr. Rania Mejri', course: 'Sécurité informatique', level: 'L3', time: '13:00 - 15:00', room: 'Salle 303', status: 'à-venir' },
    
    // Masters Teachers
    { id: 10, name: 'Pr. Omar Triki', course: 'Big Data Analytics', level: 'M1', time: '08:00 - 10:00', room: 'Salle 401', status: 'terminé' },
    { id: 11, name: 'Dr. Amina Feki', course: 'Marketing stratégique', level: 'M1', time: '10:15 - 12:15', room: 'Salle 402', status: 'en-cours' },
    { id: 12, name: 'Dr. Tarek Brahimi', course: 'Systèmes distribués', level: 'M2', time: '13:00 - 15:00', room: 'Salle 403', status: 'à-venir' },
  ];

  // Get unique levels for tabs
  const levels = ['all', ...new Set(teacherSchedules.map(teacher => teacher.level))];

  // Filter teachers based on selected level
  const filteredTeachers = activeLevel === 'all' 
    ? teacherSchedules 
    : teacherSchedules.filter(teacher => teacher.level === activeLevel);

  const getStatusBadge = (status: TeacherSchedule['status']) => {
    switch(status) {
      case 'en-cours':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">En cours</Badge>;
      case 'terminé':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800">Terminé</Badge>;
      case 'à-venir':
      default:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">À venir</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue={activeLevel} onValueChange={setActiveLevel}>
        <TabsList className="mb-4 grid grid-cols-5 md:grid-cols-6">
          {levels.map((level) => (
            <TabsTrigger key={level} value={level} className="text-sm">
              {level === 'all' ? 'Tous' : level}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Enseignant</TableHead>
                <TableHead>Cours</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Horaire</TableHead>
                <TableHead>Salle</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id} className={
                  `hover:bg-zinc-50 dark:hover:bg-zinc-800/70
                  ${teacher.status === 'en-cours' ? 'bg-green-50/30 dark:bg-green-900/5' : ''}`
                }>
                  <TableCell className="flex items-center gap-2 font-medium">
                    <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
                      <User className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    {teacher.name}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-zinc-500" />
                    {teacher.course}
                  </TableCell>
                  <TableCell>{teacher.level}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-zinc-500" />
                    {teacher.time}
                  </TableCell>
                  <TableCell>{teacher.room}</TableCell>
                  <TableCell>{getStatusBadge(teacher.status)}</TableCell>
                </TableRow>
              ))}
              {filteredTeachers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Aucun enseignant pour ce niveau aujourd'hui.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Tabs>
    </div>
  );
};

export default TeacherScheduleList;
