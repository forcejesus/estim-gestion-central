
import React from "react";
import Header from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookText, BookOpen, Library } from "lucide-react";

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

const Dashboard: React.FC = () => {
  return (
    <>
      <Header title="Tableau de bord" />
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p 
                  className={`text-xs ${
                    stat.trend === "up" 
                      ? "text-green-600" 
                      : stat.trend === "down" 
                      ? "text-red-600" 
                      : "text-gray-500"
                  }`}
                >
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 border-b pb-3 last:border-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      i % 3 === 0 ? "bg-blue-100 text-blue-600" : 
                      i % 3 === 1 ? "bg-green-100 text-green-600" : 
                      "bg-amber-100 text-amber-600"
                    }`}>
                      {i % 3 === 0 ? <Users size={16} /> : 
                       i % 3 === 1 ? <BookText size={16} /> : 
                       <BookOpen size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {i % 3 === 0 ? "Nouvel étudiant inscrit" : 
                         i % 3 === 1 ? "Paiement enregistré" : 
                         "Notes d'examen ajoutées"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Il y a {i + 1} heure{i > 0 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tâches à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span className="text-sm font-medium">Examens de rattrapage</span>
                  </div>
                  <p className="text-xs text-muted-foreground">20 mai 2025 - 15 étudiants</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <span className="text-sm font-medium">Clôture financière mensuelle</span>
                  </div>
                  <p className="text-xs text-muted-foreground">31 mai 2025</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">Rendu des livres empruntés</span>
                  </div>
                  <p className="text-xs text-muted-foreground">2 juin 2025 - 42 emprunts</p>
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
