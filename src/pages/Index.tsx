"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import MarketingAnalysisForm from "@/components/MarketingAnalysisForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="bg-card text-card-foreground p-8 rounded-lg shadow-xl max-w-3xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Your Language Training App
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload student data to get marketing analysis insights.
          </p>
        </div>
        <MarketingAnalysisForm />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;