"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const MarketingAnalysisForm: React.FC = () => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get n8n webhook URL from environment variable
  const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCsvFile(event.target.files[0]);
      setError(null);
      setAnalysisResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!csvFile) {
      showError("Please select a CSV file.");
      return;
    }
    if (!n8nWebhookUrl) {
      showError("n8n Webhook URL is not configured. Please set the VITE_N8N_WEBHOOK_URL environment variable.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      Papa.parse(csvFile, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          const data = results.data;

          try {
            const response = await fetch(n8nWebhookUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const result = await response.json();
            setAnalysisResult(JSON.stringify(result, null, 2));
            showSuccess("Analysis received successfully!");
          } catch (fetchError: any) {
            console.error("Error sending data to webhook:", fetchError);
            setError(`Failed to get analysis from n8n: ${fetchError.message}`);
            showError(`Failed to get analysis: ${fetchError.message}`);
          } finally {
            setLoading(false);
          }
        },
        error: (parseError: any) => {
          console.error("Error parsing CSV:", parseError);
          setError(`Failed to parse CSV file: ${parseError.message}`);
          showError(`Failed to parse CSV: ${parseError.message}`);
          setLoading(false);
        },
      });
    } catch (err: any) {
      console.error("Unexpected error during CSV parsing setup:", err);
      setError(`An unexpected error occurred: ${err.message}`);
      showError(`An unexpected error occurred: ${err.message}`);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Marketing Analysis Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="csv-file">Upload Student Data (CSV)</Label>
          <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading || !csvFile || !n8nWebhookUrl}
          className="w-full"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Analyzing..." : "Get Analysis Insights"}
        </Button>

        {error && (
          <div className="text-red-500 text-sm text-center p-2 border border-red-300 rounded-md bg-red-50">
            {error}
          </div>
        )}

        {analysisResult && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Analysis Results:</h3>
            <Textarea
              readOnly
              value={analysisResult}
              className="min-h-[200px] font-mono text-sm bg-muted/20 dark:bg-muted/20"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketingAnalysisForm;