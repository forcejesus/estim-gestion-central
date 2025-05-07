
import React from "react";
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

const COLORS = [
  '#4CAF50', '#FFEB3B', '#2196F3', '#FF9800', 
  '#9C27B0', '#E91E63', '#607D8B', '#795548', 
  '#009688', '#3F51B5', '#FF5722'
];

const ProgramDistributionChart: React.FC<ProgramDistributionChartProps> = ({ className }) => {
  // Expanded data for program distribution
  const pieChartData = [
    { name: 'Informatique', value: 75 },
    { name: 'Gestion', value: 65 },
    { name: 'Marketing', value: 55 },
    { name: 'Communication', value: 35 },
    { name: 'Commerce', value: 40 },
    { name: 'Finance', value: 30 },
    { name: 'Comptabilité', value: 25 },
    { name: 'RH', value: 20 },
    { name: 'Management', value: 18 },
    { name: 'Logistique', value: 15 },
    { name: 'Droit', value: 12 },
  ];

  const CustomLabel = ({ name, percent }: { name: string, percent: number }) => {
    return `${Math.round(percent * 100)}%`;
  };

  return (
    <div className={className}>
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} étudiants`, 'Effectif']}
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
    </div>
  );
};

export default ProgramDistributionChart;
