
import React, { useState, Suspense, lazy } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, BookText, Library, Calendar as CalendarIcon,
  TrendingUp, PieChart, BarChart, ChevronRight, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy loaded chart components
const StatsCards = lazy(() => import('@/components/dashboard/StatsCards'));
const LevelDistributionChart = lazy(() => import('@/components/dashboard/LevelDistributionChart'));
const ProgramDistributionChart = lazy(() => import('@/components/dashboard/ProgramDistributionChart'));
const ClassScheduleTable = lazy(() => import('@/components/dashboard/ClassScheduleTable'));
const CalendarWidget = lazy(() => import('@/components/dashboard/CalendarWidget'));

const Dashboard: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample data for statistics with corrected trend values
  const statCards = [
    {
      title: "Étudiants",
      value: "324",
      change: "+12%",
      trend: "up" as const,
      icon: <Users className="h-5 w-5 text-blue-600" />,
      details: "L1: 120 | L2: 85 | L3: 60 | ESTIM ONLINE: 59"
    },
    {
      title: "Bibliothèque",
      value: "1,256",
      change: "+8 nouveaux",
      trend: "up" as const,
      icon: <Library className="h-5 w-5 text-purple-600" />,
      details: "Livres disponibles"
    },
    {
      title: "Finances",
      value: "18,400 €",
      change: "+5,200 € aujourd'hui",
      trend: "up" as const,
      icon: <BookText className="h-5 w-5 text-green-600" />,
      details: "Entrées journalières"
    }
  ];
  
  return (
    <>
      <Header title="Tableau de bord" />
      <div className="flex-1 overflow-auto p-6 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        {/* Loading placeholder for stats cards */}
        <Suspense fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="win11-card animate-pulse">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-20 mb-1" />
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        }>
          <StatsCards statCards={statCards} />
        </Suspense>

        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Charts section with Suspense for lazy loading */}
          <Suspense fallback={
            <Card className="col-span-12 md:col-span-6 win11-card animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-8 w-8 rounded" />
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[250px]">
                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          }>
            <Card className="col-span-12 md:col-span-6 win11-card win11-enter">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">Répartition par niveau</CardTitle>
                  <p className="text-sm text-muted-foreground">Distribution des étudiants</p>
                </div>
                <PieChart className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <LevelDistributionChart className="" />
              </CardContent>
            </Card>
          </Suspense>

          <Suspense fallback={
            <Card className="col-span-12 md:col-span-6 win11-card animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-8 w-8 rounded" />
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[250px]">
                <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          }>
            <Card className="col-span-12 md:col-span-6 win11-card win11-enter" style={{animationDelay: "0.1s"}}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">Répartition par filière</CardTitle>
                  <p className="text-sm text-muted-foreground">Distribution des programmes</p>
                </div>
                <BarChart className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ProgramDistributionChart className="" />
              </CardContent>
            </Card>
          </Suspense>

          {/* Class Schedule Table */}
          <Suspense fallback={
            <Card className="col-span-12 win11-card animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-9 w-24 rounded" />
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          }>
            <Card className="col-span-12 win11-card win11-reveal" style={{animationDelay: "0.2s"}}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">Planning des cours</CardTitle>
                  <p className="text-sm text-muted-foreground">Cours programmés pour cette semaine</p>
                </div>
                <Button variant="outline" size="sm" className="win11-button">
                  Voir tout
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ClassScheduleTable className="" />
              </CardContent>
            </Card>
          </Suspense>

          {/* Calendar */}
          <Suspense fallback={
            <Card className="col-span-12 win11-card animate-pulse">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="min-h-[400px] flex items-center justify-center">
                  <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          }>
            <Card className="col-span-12 win11-card win11-reveal" style={{animationDelay: "0.3s"}}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Calendrier des événements</CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarWidget className="" date={date} setDate={setDate} />
              </CardContent>
            </Card>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
