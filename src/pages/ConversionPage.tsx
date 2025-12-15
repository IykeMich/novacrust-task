import { useState } from "react";
import { useConversionForm } from "@/hooks/useConversionForm";
import { ConversionTabs } from "@/components/tabs/ConversionTabs";
import { CryptoToCashContent } from "@/components/conversion/CryptoToCashContent";
import type { ConversionType } from "@/type/conversionTypes";

const ConversionPage = () => {
  const [conversionType, setConversionType] = useState<ConversionType>("crypto-to-cash");
  const { formik, isSubmitting, handleAmountChange } = useConversionForm();

  return (
    <div className="min-h-screen w-full bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[24px] p-6 w-full max-w-xl shadow-lg mx-auto px-6 lg:px-12">

        <ConversionTabs
          conversionType={conversionType}
          onTypeChange={setConversionType}
        />

        <CryptoToCashContent
          conversionType={conversionType}
          formik={formik}
          isSubmitting={isSubmitting}
          handleAmountChange={handleAmountChange}
        />
      </div>
    </div>
  );
};

export default ConversionPage;
