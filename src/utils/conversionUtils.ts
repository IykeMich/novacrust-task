import { CONVERSION_RATE } from "@/utils/constant/conversionConstants";

export const calculateConversion = (
  amount: number,
  fromField: "youPay" | "youReceive"
): number => {
  if (isNaN(amount) || !isFinite(amount) || amount < 0) {
    return 0;
  }
  if (fromField === "youPay") {
    return amount * CONVERSION_RATE;
  }
  const result = amount / CONVERSION_RATE;
  return isNaN(result) || !isFinite(result) ? 0 : result;
};

export const sanitizeNumericInput = (value: string): string => {
  return value.replace(/[^\d.]/g, "");
};

