export interface KeyMetrics {
  totalStudents: number;
  averageCompletionRate: number;
  averageAttendanceRate: number;
  totalRevenue: number;
  amountOutstanding: number;
  paymentCollectionRate: number;
}

export interface Recommendation {
  priority: "CRITICAL" | "IMPORTANT" | "NICE_TO_HAVE";
  action: string;
  timeline: string;
  expectedImpact: string;
  affectedStudents: string[];
}

export interface AtRiskStudent {
  studentId: string;
  studentName: string;
  riskFactors: string[];
  recommendedAction: string;
}

export interface Forecasts {
  projectedRevenue: number;
  expectedCompletions: number;
  churnRisk: string;
}

export interface AnalysisData {
  executiveSummary: string;
  keyMetrics: KeyMetrics;
  insights: string[];
  riskFactors: string[];
  recommendations: Recommendation[];
  atRiskStudents: AtRiskStudent[];
  forecasts: Forecasts;
}