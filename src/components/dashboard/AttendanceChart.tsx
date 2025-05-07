
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

interface AttendanceChartProps {
  data: Array<{
    date: string;
    présence: number;
    absence: number;
  }>;
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ data }) => {
  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="date" stroke="#888" />
          <YAxis stroke="#888" domain={[0, 100]} />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px',
              border: '1px solid #ddd',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              padding: '10px' 
            }}
            formatter={(value) => [`${value}%`, '']}
          />
          <Legend />
          <ReferenceLine y={90} stroke="#388e3c" strokeDasharray="3 3">
            <ReferenceLine y={90} label={{ position: 'top', value: 'Objectif', fill: '#388e3c', fontSize: 12 }} stroke="#388e3c" strokeDasharray="3 3" />
          </ReferenceLine>
          <Line 
            type="monotone" 
            dataKey="présence" 
            stroke="#4CAF50" 
            strokeWidth={2}
            activeDot={{ r: 6 }}
            animationDuration={1500}
            name="Présence"
          />
          <Line 
            type="monotone" 
            dataKey="absence" 
            stroke="#F44336" 
            strokeWidth={2}
            animationDuration={1500}
            name="Absence"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
