import * as Yup from "yup";

export const conversionValidationSchema = Yup.object({
  youPay: Yup.string()
    .required("Amount is required")
    .test("is-positive", "Amount must be greater than 0", (value) => {
      const num = parseFloat(value?.replace(/,/g, "") || "0");
      return num > 0;
    }),
  youPayCurrency: Yup.string().required("Currency is required"),
  youReceive: Yup.string()
    .required("Amount is required")
    .test("is-positive", "Amount must be greater than 0", (value) => {
      const num = parseFloat(value?.replace(/,/g, "") || "0");
      return num > 0;
    }),
  youReceiveCurrency: Yup.string().required("Currency is required"),
  payFrom: Yup.string().required("Please select an option"),
  payTo: Yup.string().required("Please select an option"),
});

export const emailValidationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email address"),
});

