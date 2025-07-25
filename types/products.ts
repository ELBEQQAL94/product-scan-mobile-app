import { ProductScanResult } from "@/constants/responses";

export interface Product {
  user_id: string;
  product_scan_result: ProductScanResult;
}

export interface ScanedProduct {
  user_id: string;
}
