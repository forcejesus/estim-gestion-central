
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, BookText, BookOpen, Library, Calendar as CalendarIcon,
  TrendingUp, PieChart, BarChart, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from "recharts";

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample data for statistics
  const statCards = [
    {
      title: "Étudiants",
      value: "324",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      details: "L1: 120 | L2: 85 | L3: 60 | ESTIM ONLINE: 59"
    },
    {
      title: "Bibliothèque",
      value: "1,256",
      change: "+8 nouveaux",
      trend: "up",
      icon: <Library className="h-5 w-5 text-purple-600" />,
      details: "Livres disponibles"
    },
    {
      title: "Finances",
      value: "18,400 €",
      change: "+5,200 € aujourd'hui",
      trend: "up",
      icon: <BookText className="h-5 w-5 text-green-600" />,
      details: "Entrées journalières"
    },
    {
      title: "Examens",
      value: "53",
      change: "Session en cours",
      trend: "neutral",
      icon: <BookOpen className="h-5 w-5 text-amber-600" />,
      details: "Planning disponible"
    },
  ];
  
  // Improved data for level distribution
  const barChartData = [
    { name: 'L1', etudiants: 120 },
    { name: 'L2', etudiants: 85 },
    { name: 'L3', etudiants: 60 },
    { name: 'ESTIM ONLINE', etudiants: 59 },
  ];

  // Expanded data for program distribution
  const pieChartData = [
    { name: 'Informatique', value: 75, color: '#4CAF50' },
    { name: 'Gestion', value: 65, color: '#FFEB3B' },
    { name: 'Marketing', value: 55, color: '#2196F3' },
    { name: 'Communication', value: 35, color: '#FF9800' },
    { name: 'Commerce', value: 40, color: '#9C27B0' },
    { name: 'Finance', value: 30, color: '#E91E63' },
    { name: 'Comptabilité', value: 25, color: '#607D8B' },
    { name: 'RH', value: 20, color: '#795548' },
    { name: 'Management', value: 18, color: '#009688' },
    { name: 'Logistique', value: 15, color: '#3F51B5' },
    { name: 'Droit', value: 12, color: '#FF5722' },
  ];

  // Sample class schedule data
  const todayClasses = [
    { id: 1, course: "Algorithmes et structures de données", level: "L2 Informatique", time: "08:00 - 10:00", room: "Salle 201", teacher: "Dr. Amal Ben Ahmed" },
    { id: 2, course: "Marketing Digital", level: "L3 Marketing", time: "10:15 - 12:15", room: "Salle 105", teacher: "Pr. Mohamed Saddik" },
    { id: 3, course: "Comptabilité Générale", level: "L1 Gestion", time: "13:00 - 15:00", room: "Amphithéâtre A", teacher: "Dr. Sarah Khnissi" },
    { id: 4, course: "Introduction à la Programmation", level: "L1 Informatique", time: "15:15 - 17:15", room: "Labo Info 2", teacher: "Dr. Ahmed Tebaï" },
  ];

  // Sample schedule data
  const scheduleEvents = [
    { id: 1, date: new Date(2025, 4, 8), title: 'Réunion pédagogique', type: 'meeting' },
    { id: 2, date: new Date(2025, 4, 10), title: 'Examen L2 Informatique', type: 'exam' },
    { id: 3, date: new Date(2025, 4, 12), title: 'Soutenance L3', type: 'defense' },
    { id: 4, date: new Date(2025, 4, 15), title: 'Conseil scientifique', type: 'meeting' },
    { id: 5, date: new Date(2025, 4, 20), title: 'Examens de rattrapage', type: 'exam' },
  ];

  // Function to get current day events
  const getCurrentDayEvents = () => {
    if (!date) return [];
    return scheduleEvents.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  // Highlight dates with events
  const highlightedDates = scheduleEvents.map(event => event.date);
  
  return (
    <>
      <Header title="Tableau de bord" />
      <div className="flex-1 overflow-auto p-6 bg-zinc-50 dark:bg-zinc-900">
        {/* 1. Statistics Cards - Student, Library, Finance */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <Card key={index} className="border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p 
                  className={`text-xs flex items-center ${
                    stat.trend === "up" 
                      ? "text-green-600" 
                      : stat.trend === "down" 
                      ? "text-red-600" 
                      : "text-gray-500"
                  }`}
                >
                  {stat.trend === "up" && <TrendingUp size={14} className="mr-1" />}
                  {stat.change}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{stat.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* 2. Charts - Distribution by Level and Program */}
          <Card className="col-span-12 md:col-span-6 border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Répartition par niveau</CardTitle>
                <p className="text-sm text-muted-foreground">Nombre d'étudiants</p>
              </div>
              <BarChart size={20} className="text-estim-green" />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart
                  data={barChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Bar dataKey="etudiants" fill="#4CAF50" name="Étudiants" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-12 md:col-span-6 border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Répartition par filière</CardTitle>
                <p className="text-sm text-muted-foreground">Nombre d'étudiants</p>
              </div>
              <PieChart size={20} className="text-estim-green" />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} étudiants`, 'Effectif']} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 3. Class Schedule Table */}
          <Card className="col-span-12 border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Emploi du temps du jour</CardTitle>
                <p className="text-sm text-muted-foreground">Cours programmés pour aujourd'hui</p>
              </div>
              <Button variant="outline" size="sm" className="text-xs font-medium text-estim-green border-estim-green/30 hover:bg-estim-green/10">
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

          {/* 4. Full-width Calendar */}
          <Card className="col-span-12 border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon size={20} className="text-estim-green" />
                Calendrier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
                    modifiers={{
                      highlighted: (day) => {
                        return highlightedDates.some(date => 
                          date.getDate() === day.getDate() && 
                          date.getMonth() === day.getMonth() && 
                          date.getFullYear() === day.getFullYear()
                        );
                      }
                    }}
                    modifiersStyles={{
                      highlighted: { 
                        backgroundColor: '#4caf5020',
                        borderRadius: '100%',
                        color: '#4CAF50',
                        fontWeight: 'bold'
                      }
                    }}
                  />
                </div>
                <div className="md:w-72 flex-shrink-0">
                  <h3 className="font-medium text-sm mb-3">Évènements du {date?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</h3>
                  <div className="space-y-2 mt-4">
                    {getCurrentDayEvents().length > 0 ? (
                      getCurrentDayEvents().map(event => (
                        <div key={event.id} className="flex items-center gap-3 p-3 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                          <div className={`h-3 w-3 rounded-full ${
                            event.type === 'meeting' ? 'bg-blue-500' :
                            event.type === 'exam' ? 'bg-red-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md">
                        Aucun événement programmé pour ce jour
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
