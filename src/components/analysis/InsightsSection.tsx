"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Recommendation } from "@/types/analysis";
import { Badge } from "@/components/ui/badge";

interface InsightsSectionProps {
  title: string;
  items: string[] | Recommendation[];
  type: "list" | "recommendations";
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ title, items, type }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "list" && (
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            {(items as string[]).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        {type === "recommendations" && (
          <div className="space-y-4">
            {(items as Recommendation[]).map((rec, index) => (
              <div key={index} className="border-l-4 border-primary-foreground pl-4 py-2 rounded-md bg-muted/20">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-foreground">{rec.action}</p>
                  <Badge
                    className={
                      rec.priority === "CRITICAL"
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : rec.priority === "IMPORTANT"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }
                  >
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Timeline:</span> {rec.timeline}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Expected Impact:</span> {rec.expectedImpact}
                </p>
                {rec.affectedStudents.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Affected Students:</span> {rec.affectedStudents.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsightsSection;