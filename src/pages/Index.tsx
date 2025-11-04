"use client";

import { MadeWithDyad } from "@/components/made-with-dyad";
import MarketingAnalysisForm from "@/components/MarketingAnalysisForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-50">
          Welcome to Your Language Training App
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Upload student data to get marketing analysis insights.
        </p>
      </div>
      <MarketingAnalysisForm />
      <MadeWithDyad />
    </div>
  );
};

export default Index;