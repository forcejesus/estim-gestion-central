
import React from "react";
import { Link } from "react-router-dom";
import { Users, FilePlus, FileText, ArrowRight, GraduationCap, ChartBarBig } from "lucide-react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const StudentsPage: React.FC = () => {
  // Données statistiques pour la démonstration
  const stats = {
    totalStudents: 854,
    newRegistrations: 42,
    pendingFiles: 18
  };

  // Données pour la répartition par niveau
  const levelData = [
    { name: 'L1', count: 320 },
    { name: 'L2', count: 245 },
    { name: 'L3', count: 180 },
    { name: 'M1', count: 65 },
    { name: 'M2', count: 44 }
  ];

  // Données pour la répartition par filière
  const programData = [
    { name: 'Informatique', count: 198 },
    { name: 'Gestion', count: 165 },
    { name: 'Marketing', count: 143 },
    { name: 'Commerce', count: 120 },
    { name: 'Finance', count: 95 },
    { name: 'Communication', count: 87 },
    { name: 'RH', count: 46 }
  ];

  const chartConfig = {
    level: {
      label: "Niveau",
      theme: { light: "#4F46E5", dark: "#818CF8" }
    },
    program: {
      label: "Filière",
      theme: { light: "#10B981", dark: "#34D399" }
    }
  };

  return (
    <>
      <Header title="Gestion des étudiants" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Module Étudiants</h1>
              <p className="text-muted-foreground">
                Bienvenue dans le module de gestion des étudiants.
              </p>
            </div>
            <Link to="/students/new">
              <Button className="flex items-center gap-1">
                <FilePlus size={16} />
                Nouvelle inscription
              </Button>
            </Link>
          </div>
          
          {/* Section Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                  <Users size={24} className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Total étudiants</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                  <FilePlus size={24} className="text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Nouvelles inscriptions (30j)</p>
                  <p className="text-2xl font-bold">{stats.newRegistrations}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-2">
                  <FileText size={24} className="text-amber-600 dark:text-amber-300" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Dossiers en attente</p>
                  <p className="text-2xl font-bold">{stats.pendingFiles}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Graphiques Statistiques - Modifiée pour afficher verticalement */}
          <div className="grid grid-cols-1 gap-6">
            {/* Graphique par niveau */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap size={18} />
                    Répartition par niveau
                  </CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {stats.totalStudents} étudiants
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px] mt-4">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={levelData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip 
                          content={({ active, payload }) => (
                            <ChartTooltipContent 
                              active={active} 
                              payload={payload} 
                              formatter={(value) => [`${value} étudiants`, 'Effectif']}
                            />
                          )} 
                        />
                        <Bar 
                          dataKey="count" 
                          name="Étudiants" 
                          fill="var(--color-level)" 
                          radius={[4, 4, 0, 0]}
                          animationDuration={1000}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Graphique par filière */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ChartBarBig size={18} />
                    Répartition par filière
                  </CardTitle>
                  <Badge variant="outline" className="ml-2">
                    {stats.totalStudents} étudiants
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px] mt-4">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={programData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <ChartTooltip 
                          content={({ active, payload }) => (
                            <ChartTooltipContent 
                              active={active} 
                              payload={payload} 
                              formatter={(value) => [`${value} étudiants`, 'Effectif']}
                            />
                          )} 
                        />
                        <Bar 
                          dataKey="count" 
                          name="Filière" 
                          fill="var(--color-program)" 
                          radius={[4, 4, 0, 0]}
                          animationDuration={1000}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Cartes des fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users size={18} />
                  Annuaire
                </CardTitle>
                <CardDescription>
                  Consultez la liste de tous les étudiants inscrits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Accédez aux fiches détaillées des {stats.totalStudents} étudiants, consultez leurs informations personnelles, coordonnées et parcours académique.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/students/directory" className="w-full">
                  <Button variant="outline" className="w-full justify-between">
                    Accéder à l'annuaire
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FilePlus size={18} />
                  Nouvelle inscription
                </CardTitle>
                <CardDescription>
                  Inscrivez un nouvel étudiant dans l'établissement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Créez une nouvelle fiche étudiant, saisissez les informations personnelles, administratives et pédagogiques.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/students/new" className="w-full">
                  <Button variant="outline" className="w-full justify-between">
                    Créer une inscription
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={18} />
                  Dossiers étudiants
                </CardTitle>
                <CardDescription>
                  Gérez les dossiers administratifs des étudiants.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {stats.pendingFiles} dossiers en attente de traitement. Accédez aux documents administratifs, suivez les demandes et validez les pièces justificatives.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/students/files" className="w-full">
                  <Button variant="outline" className="w-full justify-between">
                    Gérer les dossiers
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsPage;
