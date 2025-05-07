
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, BookText, BookOpen, Library, Calendar as CalendarIcon,
  TrendingUp, PieChart, BarChart
} from "lucide-react";
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
  
  // Sample data for charts
  const lineChartData = [
    { name: 'Jan', inscriptions: 5, diplomes: 0 },
    { name: 'Fév', inscriptions: 8, diplomes: 0 },
    { name: 'Mar', inscriptions: 12, diplomes: 0 },
    { name: 'Avr', inscriptions: 6, diplomes: 0 },
    { name: 'Mai', inscriptions: 9, diplomes: 0 },
    { name: 'Juin', inscriptions: 4, diplomes: 12 },
    { name: 'Juil', inscriptions: 3, diplomes: 8 },
    { name: 'Août', inscriptions: 7, diplomes: 0 },
    { name: 'Sep', inscriptions: 20, diplomes: 0 },
    { name: 'Oct', inscriptions: 15, diplomes: 0 },
    { name: 'Nov', inscriptions: 10, diplomes: 0 },
    { name: 'Déc', inscriptions: 5, diplomes: 15 },
  ];

  const barChartData = [
    { name: 'L1', etudiants: 85 },
    { name: 'L2', etudiants: 65 },
    { name: 'L3', etudiants: 60 },
    { name: 'M1', etudiants: 50 },
    { name: 'M2', etudiants: 45 },
    { name: 'D', etudiants: 20 },
  ];

  const pieChartData = [
    { name: 'Informatique', value: 120, color: '#4CAF50' },
    { name: 'Gestion', value: 100, color: '#FFEB3B' },
    { name: 'Marketing', value: 80, color: '#2196F3' },
    { name: 'Communication', value: 40, color: '#FF9800' },
  ];

  // Sample schedule data
  const scheduleEvents = [
    { id: 1, date: new Date(2025, 4, 8), title: 'Réunion pédagogique', type: 'meeting' },
    { id: 2, date: new Date(2025, 4, 10), title: 'Examen L2 Informatique', type: 'exam' },
    { id: 3, date: new Date(2025, 4, 12), title: 'Soutenance M2', type: 'defense' },
    { id: 4, date: new Date(2025, 4, 15), title: 'Conseil scientifique', type: 'meeting' },
    { id: 5, date: new Date(2025, 4, 20), title: 'Examens de rattrapage', type: 'exam' },
  ];

  const statCards = [
    {
      title: "Étudiants",
      value: "324",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Finances",
      value: "175,400 €",
      change: "+5%",
      trend: "up",
      icon: <BookText className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Examens",
      value: "53",
      change: "Session en cours",
      trend: "neutral",
      icon: <BookOpen className="h-5 w-5 text-amber-600" />,
    },
    {
      title: "Bibliothèque",
      value: "1,256",
      change: "+8 nouveaux",
      trend: "up",
      icon: <Library className="h-5 w-5 text-purple-600" />,
    },
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <Card key={index} className="border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
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
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Line Chart */}
          <Card className="col-span-12 lg:col-span-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Inscriptions & Diplômés</CardTitle>
                <p className="text-sm text-muted-foreground">Statistiques annuelles</p>
              </div>
              <TrendingUp size={20} className="text-estim-green" />
            </CardHeader>
            <CardContent className="pl-0">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={lineChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="inscriptions" stroke="#4CAF50" activeDot={{ r: 8 }} name="Inscriptions" />
                  <Line type="monotone" dataKey="diplomes" stroke="#FFEB3B" name="Diplômés" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Calendar Card */}
          <Card className="col-span-12 lg:col-span-4 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon size={18} className="text-estim-green" />
                Calendrier
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
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
              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-sm">Évènements du jour</h3>
                <div className="space-y-2">
                  {getCurrentDayEvents().length > 0 ? (
                    getCurrentDayEvents().map(event => (
                      <div key={event.id} className="flex items-center gap-2 p-2 rounded-md bg-zinc-100 dark:bg-zinc-800">
                        <div className={`h-2 w-2 rounded-full ${
                          event.type === 'meeting' ? 'bg-blue-500' :
                          event.type === 'exam' ? 'bg-red-500' : 'bg-green-500'
                        }`}></div>
                        <span className="text-sm">{event.title}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Aucun événement aujourd'hui</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart */}
          <Card className="col-span-12 md:col-span-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
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

          {/* Pie Chart */}
          <Card className="col-span-12 md:col-span-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
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
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
