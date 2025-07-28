import { ProductScanResult } from "@/constants/responses";

export interface ProductTypeFromDB {
  user_id: string;
  product_scan_result: ProductScanResult;
  bar_code: string;
}

export interface ScanedProduct {
  user_id: string;
}
