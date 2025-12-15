import * as React from "react";
import type { FormikProps } from "formik";

export type ConversionType = "crypto-to-cash" | "cash-to-crypto" | "crypto-to-fiat-loan";

export interface CurrencyOption {
  label: string;
  value: string;
  icon?: string | React.ReactNode;
}

export interface DropdownOption {
  label: string;
  value: string;
  icon?: string | React.ReactNode;
}

export interface ConversionFormValues {
  youPay: string;
  youPayCurrency: string;
  youReceive: string;
  youReceiveCurrency: string;
  payFrom: string;
  payTo: string;
}

export interface EmailFormValues {
  email: string;
}

export type ConversionFormikProps = FormikProps<ConversionFormValues>;
export type FormikPropsGeneric<T = Record<string, unknown>> = FormikProps<T>;

