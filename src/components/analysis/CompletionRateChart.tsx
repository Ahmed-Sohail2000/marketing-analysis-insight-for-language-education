"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CompletionRateChartProps {
  lowCompletionPercentage: number; // e.g., 40 for 40%
}

const COLORS = ["hsl(var(--destructive))", "hsl(var(--primary))"]; // Red for low, Blue for high

const CompletionRateChart: React.FC<CompletionRateChartProps> = ({ lowCompletionPercentage }) => {
  const data = [
    { name: `<${50}% Completion`, value: lowCompletionPercentage },
    { name: `>=${50}% Completion`, value: 100 - lowCompletionPercentage },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Completion Rate Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionRateChart;