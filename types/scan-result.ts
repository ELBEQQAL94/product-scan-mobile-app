export enum Severity {
  LOW = "low",
  MODERATE = "moderate",
  HIGH = "high",
  CRITICAL = "critical",
}

export interface Recommendations {
  recommendation: string;
  severity: "low" | "moderate" | "high" | "critical";
  explanation: string;
}

export interface ScanResultResponse {
  score: number;
  recommendations: Recommendations[];
}
