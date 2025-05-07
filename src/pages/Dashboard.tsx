
import React, { useState, Suspense, lazy } from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, BookText, Library,
  TrendingUp, ChevronRight, Loader2,
  LineChart, ArrowUpRight, ArrowDownRight, Ban, CheckCircle2,
  Clock, Bell, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Lazy loaded chart components
const StatsCards = lazy(() => import('@/components/dashboard/StatsCards'));
const ClassScheduleTable = lazy(() => import('@/components/dashboard/ClassScheduleTable'));

const Dashboard: React.FC = () => {
  // Sample data for statistics with improved metrics
  const statCards = [
    {
      title: "Étudiants",
      value: "324",
      change: "+12%",
      trend: "up" as const,
      icon: <Users className="h-5 w-5 text-blue-600" />,
      details: "L1: 120 | L2: 85 | L3: 60 | ESTIM ONLINE: 59",
      description: "Nombre total d'étudiants actifs"
    },
    {
      title: "Bibliothèque",
      value: "1,256",
      change: "+8 nouveaux",
      trend: "up" as const,
      icon: <Library className="h-5 w-5 text-purple-600" />,
      details: "Livres disponibles",
      description: "Ouvrages en inventaire actif"
    },
    {
      title: "Finances",
      value: "18,400 €",
      change: "+5,200 € aujourd'hui",
      trend: "up" as const,
      icon: <BookText className="h-5 w-5 text-green-600" />,
      details: "Entrées journalières",
      description: "Total des paiements reçus aujourd'hui"
    },
    {
      title: "Présence",
      value: "92%",
      change: "+3% cette semaine",
      trend: "up" as const,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
      details: "Taux de présence globale",
      description: "Présence moyenne des étudiants"
    }
  ];
  
  return (
    <>
      <Header title="Tableau de bord" />
      <div className="flex-1 overflow-auto p-6 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        {/* Welcome section with summary */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-2">
            Bienvenue dans votre espace administratif
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
              Année universitaire 2024-2025
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800">
              Semestre en cours
            </Badge>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Plus d'informations</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px] text-xs">
                  Aperçu général de l'activité de l'établissement. Toutes les métriques sont mises à jour en temps réel.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {/* Loading placeholder for stats cards */}
        <Suspense fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
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
          {/* Class Schedule Table - Full Width */}
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
            <Card className="col-span-12 win11-card win11-reveal" style={{animationDelay: "0.4s"}}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold">Planning des cours</CardTitle>
                  <CardDescription>Cours programmés pour cette semaine</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ClassScheduleTable className="" />
              </CardContent>
            </Card>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
