import type { ConversionType, ConversionFormikProps } from "@/type/conversionTypes";
import { CashToCryptoContent } from "./CashToCryptoContent";
import { ConversionForm } from "@/components/form/ConversionForm";

interface CryptoToCashContentProps {
  conversionType: ConversionType;
  formik: ConversionFormikProps;
  isSubmitting: boolean;
  handleAmountChange: (field: "youPay" | "youReceive", value: string) => void;
}

export const CryptoToCashContent = ({
  conversionType,
  formik,
  isSubmitting,
  handleAmountChange,
}: CryptoToCashContentProps) => {
  if (conversionType === "cash-to-crypto") {
    return (
      <CashToCryptoContent
        title="Coming Soon!"
        description={[
          "Cash to Crypto is almost here.",
          "Enter your email and we'll let you know the moment it's live.",
        ]}
      />
    );
  }

  return (
    <div className="mt-6 md:mt-10 lg:mt-16! mb-8">
      <ConversionForm
        formik={formik}
        isSubmitting={isSubmitting}
        handleAmountChange={handleAmountChange}
      />
    </div>
  );
};

