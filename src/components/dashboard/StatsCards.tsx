
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type StatCard = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  details: string;
  description: string;
};

interface StatsCardsProps {
  statCards: StatCard[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ statCards }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Card 
              className="border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-zinc-800 cursor-pointer overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 to-indigo-50/10 dark:from-blue-900/5 dark:to-indigo-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
                      ? "text-green-600 dark:text-green-500" 
                      : stat.trend === "down" 
                      ? "text-red-600 dark:text-red-500" 
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {stat.trend === "up" && <TrendingUp size={14} className="mr-1" />}
                  {stat.trend === "down" && <TrendingDown size={14} className="mr-1" />}
                  {stat.trend === "neutral" && <Minus size={14} className="mr-1" />}
                  {stat.change}
                </p>
                <CardDescription className="text-xs mt-1">{stat.details}</CardDescription>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="w-60 p-2 text-xs">
            {stat.description}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default StatsCards;
