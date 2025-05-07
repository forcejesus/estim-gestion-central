
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

interface ProgramDistributionChartProps {
  className?: string;
}

const ProgramDistributionChart: React.FC<ProgramDistributionChartProps> = ({ className }) => {
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

  const CustomLabel = ({ name, percent }: { name: string, percent: number }) => {
    return name.length > 5 ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Card className={className + " border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-800"}>
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
              innerRadius={30}
              fill="#8884d8"
              dataKey="value"
              label={CustomLabel}
              animationDuration={1500}
              animationBegin={0}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} étudiants`, 'Effectif']}
              contentStyle={{ 
                borderRadius: '8px', 
                border: '1px solid #ddd',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                padding: '10px',
                fontSize: '12px' 
              }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: '12px', marginTop: '10px' }}
            />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProgramDistributionChart;
