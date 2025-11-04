"use client";

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnalysisData } from "@/types/analysis";
import { showError } from "@/utils/toast";
import KeyMetricsDisplay from "@/components/analysis/KeyMetricsDisplay";
import InsightsSection from "@/components/analysis/InsightsSection";
import AtRiskStudentsTable from "@/components/analysis/AtRiskStudentsTable";
import CompletionRateChart from "@/components/analysis/CompletionRateChart";
import PercentageCard from "@/components/analysis/PercentageCard"; // Import the new component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MadeWithDyad } from "@/components/made-with-dyad";

const AnalysisResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysisData = location.state?.analysisData as AnalysisData | undefined;

  useEffect(() => {
    if (!analysisData) {
      showError("No analysis data found. Please upload a CSV file first.");
      navigate("/");
    }
  }, [analysisData, navigate]);

  if (!analysisData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <p>Loading analysis data or redirecting...</p>
      </div>
    );
  }

  // Extract the 40% figure from the insights for the chart
  const lowCompletionInsight = analysisData.insights.find(insight =>
    insight.includes("completion rates below 50%")
  );
  const lowCompletionPercentage = lowCompletionInsight
    ? parseInt(lowCompletionInsight.match(/(\d+)%/)?.[1] || "0")
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Marketing Analysis Results</h1>
          <p className="text-xl text-muted-foreground">
            Detailed insights and visualizations from your student data.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{analysisData.executiveSummary}</p>
          </CardContent>
        </Card>

        <KeyMetricsDisplay metrics={analysisData.keyMetrics} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InsightsSection title="Key Insights" items={analysisData.insights} type="list" />
          <InsightsSection title="Risk Factors" items={analysisData.riskFactors} type="list" />
        </div>

        <InsightsSection title="Recommendations" items={analysisData.recommendations} type="recommendations" />

        <AtRiskStudentsTable students={analysisData.atRiskStudents} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Adjusted grid for more charts */}
          <CompletionRateChart lowCompletionPercentage={lowCompletionPercentage} />
          <PercentageCard
            title="Average Attendance Rate"
            value={analysisData.keyMetrics.averageAttendanceRate}
            description="Overall student attendance across all programs."
          />
          <PercentageCard
            title="Payment Collection Rate"
            value={analysisData.keyMetrics.paymentCollectionRate}
            description="Percentage of total revenue successfully collected."
          />
          <Card className="lg:col-span-3"> {/* Forecasts card spans full width on large screens */}
            <CardHeader>
              <CardTitle>Forecasts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p><span className="font-medium text-foreground">Projected Revenue:</span> ¥{analysisData.forecasts.projectedRevenue.toLocaleString()}</p>
              <p><span className="font-medium text-foreground">Expected Completions:</span> {analysisData.forecasts.expectedCompletions}</p>
              <p><span className="font-medium text-foreground">Churn Risk:</span> <Badge className="ml-1">{analysisData.forecasts.churnRisk}</Badge></p>
            </CardContent>
          </Card>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default AnalysisResults;