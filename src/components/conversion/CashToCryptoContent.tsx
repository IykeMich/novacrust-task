import { useState } from "react";
import { useFormik } from "formik";
import { DefaultInput } from "@/components/input/DefaultInput";
import { DefaultButton } from "@/components/input/DefaultButton";
import StatusModal from "@/components/modals/StatusModal";
import { emailValidationSchema } from "@/validation/conversionValidation";
import type { EmailFormValues } from "@/type/conversionTypes";

interface CashToCryptoContentProps {
  title: string;
  description: string[];
}

export const CashToCryptoContent = ({ title, description }: CashToCryptoContentProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formik = useFormik<EmailFormValues>({
    initialValues: { email: "" },
    validationSchema: emailValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        formik.resetForm();
        setShowSuccessModal(true);
      } catch {
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await formik.submitForm();
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-6">
      <h2 className="text-[24px] lg:text-[32px] font-medium font-family-display! text-[#013941] mb-4 text-center">
        {title}
      </h2>
      
      <div className="mb-8 text-center">
        {description.map((descriptionLine, lineIndex) => (
          <p key={lineIndex} className="text-[#4F4F4F] text-[12px] lg:text-[15px] mb-1 font-normal lg:leading-[150%]!">
            {descriptionLine}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="w-full">
          <DefaultInput
            label="Email"
            name="email"
            type="email"
            formik={formik}
            placeholder="Enter your email"
            className="w-full"
          />
        </div>

        <DefaultButton
          type="submit"
          label="Update me"
          loading={isSubmitting}
          loadingText="Submitting..."
          disabled={!formik.isValid || isSubmitting}
          extraClassName="bg-[#013941] hover:bg-[#013941]/90 text-white rounded-full py-6 mt-6"
        />
      </form>

      <StatusModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Email submitted successfully!"
        subtitle="We'll notify you when Cash to Crypto is available."
        hasButton={true}
        buttonText="Close"
        onButtonClick={() => setShowSuccessModal(false)}
        modalType="success"
      />
    </div>
  );
};

