import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { RoutesConstant } from "@/utils/constant/RoutesConstant";
import { conversionValidationSchema } from "@/validation/conversionValidation";
import { calculateConversion, sanitizeNumericInput } from "@/utils/conversionUtils";
import type { ConversionFormValues } from "@/type/conversionTypes";

const INITIAL_VALUES: ConversionFormValues = {
  youPay: "1.00",
  youPayCurrency: "ETH",
  youReceive: "1.00",
  youReceiveCurrency: "NGN",
  payFrom: "",
  payTo: "",
};

export const useConversionForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik<ConversionFormValues>({
    initialValues: INITIAL_VALUES,
    validationSchema: conversionValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate(RoutesConstant.success.index, { state: { formData: values } });
      } catch (submitError) {
        setError("Failed to submit conversion. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleAmountChange = (field: "youPay" | "youReceive", value: string) => {
    try {
      const numericValue = sanitizeNumericInput(value);
      formik.setFieldValue(field, numericValue);

      const amount = parseFloat(numericValue || "0");
      if (isNaN(amount) || !isFinite(amount)) {
        return;
      }
      const converted = calculateConversion(amount, field);
      if (isNaN(converted) || !isFinite(converted)) {
        return;
      }
      const oppositeField = field === "youPay" ? "youReceive" : "youPay";
      formik.setFieldValue(oppositeField, converted.toFixed(2));
    } catch {
      setError("Failed to calculate conversion amount.");
    }
  };

  return {
    formik,
    isSubmitting,
    handleAmountChange,
    error,
  };
};

