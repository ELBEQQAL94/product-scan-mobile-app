import { Severity } from "@/enums/scan-result-with-ai";

export interface Recommendations {
  recommendation: string;
  severity: Severity;
  explanation: string;
}

export interface ScanResultResponse {
  score: number;
  recommendations: Recommendations[];
}
