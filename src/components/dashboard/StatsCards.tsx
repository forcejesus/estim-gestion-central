
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

type StatCard = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  details: string;
};

interface StatsCardsProps {
  statCards: StatCard[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ statCards }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((stat, index) => (
        <Card 
          key={index} 
          className="border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-zinc-800"
        >
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
              {stat.trend === "down" && <TrendingDown size={14} className="mr-1" />}
              {stat.trend === "neutral" && <Minus size={14} className="mr-1" />}
              {stat.change}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{stat.details}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
