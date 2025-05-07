
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar
} from "recharts";

interface LevelDistributionChartProps {
  className?: string;
}

const LevelDistributionChart: React.FC<LevelDistributionChartProps> = ({ className }) => {
  // Improved data for level distribution
  const barChartData = [
    { name: 'L1', etudiants: 120 },
    { name: 'L2', etudiants: 85 },
    { name: 'L3', etudiants: 60 },
    { name: 'ESTIM ONLINE', etudiants: 59 },
  ];

  return (
    <Card className={className + " border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-800"}>
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
            <Tooltip 
              cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                padding: '10px',
                fontSize: '12px'
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar 
              dataKey="etudiants" 
              name="Étudiants"
              fill="#4CAF50" 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LevelDistributionChart;
