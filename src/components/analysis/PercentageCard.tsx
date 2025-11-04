"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Assuming shadcn/ui Progress component

interface PercentageCardProps {
  title: string;
  value: number; // Expected to be between 0 and 100
  description?: string;
}

const PercentageCard: React.FC<PercentageCardProps> = ({ title, value, description }) => {
  const displayValue = Math.round(value); // Round for display

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{displayValue}%</div>
        <Progress value={displayValue} className="h-2" />
        {description && <p className="text-xs text-muted-foreground mt-2">{description}</p>}
      </CardContent>
    </Card>
  );
};

export default PercentageCard;