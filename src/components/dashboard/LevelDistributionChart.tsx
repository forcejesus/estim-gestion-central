
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
    { name: 'L1', etudiants: 120, fill: '#4CAF50' },
    { name: 'L2', etudiants: 85, fill: '#2196F3' },
    { name: 'L3', etudiants: 60, fill: '#9C27B0' },
    { name: 'ESTIM ONLINE', etudiants: 59, fill: '#FF9800' },
  ];

  return (
    <div className={className}>
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
            formatter={(value) => [`${value} étudiants`, 'Effectif']}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar 
            dataKey="etudiants" 
            name="Étudiants"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LevelDistributionChart;
