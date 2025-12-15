import { DefaultButton } from "@/components/input/DefaultButton";
import { DefaultDropdown } from "@/components/input/DefaultDropdown";
import { CryptoCurrencyInput } from "@/components/input/CryptoCurrencyInput";
import { FiatCurrencyInput } from "@/components/input/FiatCurrencyInput";
import {
  cryptoOptions,
  fiatOptions,
  payFromOptions,
  payToOptions,
} from "@/utils/constant/conversionConstants";
import type { ConversionFormikProps } from "@/type/conversionTypes";

interface ConversionFormProps {
  formik: ConversionFormikProps;
  isSubmitting: boolean;
  handleAmountChange: (field: "youPay" | "youReceive", value: string) => void;
}

export const ConversionForm = ({
  formik,
  isSubmitting,
  handleAmountChange,
}: ConversionFormProps) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <CryptoCurrencyInput
        label="You pay"
        name="youPay"
        currencyName="youPayCurrency"
        formik={formik}
        currencyOptions={cryptoOptions}
        placeholder="0.00"
        onChange={(value) => handleAmountChange("youPay", value)}
      />

      <FiatCurrencyInput
        label="You receive"
        name="youReceive"
        currencyName="youReceiveCurrency"
        formik={formik}
        currencyOptions={fiatOptions}
        placeholder="0.00"
        onChange={(value) => handleAmountChange("youReceive", value)}
      />

      <DefaultDropdown
        label="Pay from"
        name="payFrom"
        formik={formik}
        options={payFromOptions}
        placeholder="Select an option"
      />

      <DefaultDropdown
        label="Pay to"
        name="payTo"
        formik={formik}
        options={payToOptions}
        placeholder="Select an option"
      />

      <div className="mt-6">
        <DefaultButton
          type="submit"
          label="Convert now"
          loading={isSubmitting}
          loadingText="Converting..."
          disabled={!formik.isValid || isSubmitting}
          extraClassName="rounded-lg bg-[#0D9488] hover:bg-[#0b7d72]"
        />
      </div>
    </form>
  );
};

