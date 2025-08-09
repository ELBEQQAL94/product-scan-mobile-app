import { HalalCheckStatus, Severity } from "@/enums/scan-result-with-ai";

export interface Recommendations {
  recommendation: string;
  severity: Severity;
  explanation: string;
}

export interface ScanResultResponse {
  score: number;
  recommendations: Recommendations[];
}

export interface HalalScanResultResponse {
  status: HalalCheckStatus;
  summary: string;
}
