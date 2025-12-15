import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import type { FormikPropsGeneric } from "@/type/conversionTypes";

interface CurrencyOption {
  label: string;
  value: string;
  icon?: string | React.ReactNode;
}

interface FiatCurrencyInputProps {
  label?: string;
  name: string;
  currencyName: string;
  value?: string;
  currencyValue?: string;
  onChange?: (value: string) => void;
  onCurrencyChange?: (value: string) => void;
  formik?: FormikPropsGeneric;
  currencyOptions: CurrencyOption[];
  placeholder?: string;
  className?: string;
}

export const FiatCurrencyInput = ({
  label,
  name,
  currencyName,
  value,
  currencyValue,
  onChange,
  onCurrencyChange,
  formik,
  currencyOptions,
  placeholder,
  className,
}: FiatCurrencyInputProps) => {
  const [inputId] = useState(() => String(new Date().getTime() * Math.random()));
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isError = formik?.touched?.[name ?? ""] && formik?.errors?.[name ?? ""];
  const isCurrencyError = formik?.touched?.[currencyName ?? ""] && formik?.errors?.[currencyName ?? ""];

  const resolvedValue = formik ? (formik?.values?.[name ?? ""] as string | undefined) ?? "" : (value ?? "");
  const resolvedCurrencyValue = formik ? (formik?.values?.[currencyName ?? ""] as string | undefined) : currencyValue;

  const resolvedOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (formik && name) {
      formik.setFieldValue(name, newValue, true);
    }
    onChange?.(newValue);
  };

  const resolvedOnCurrencyChange = (selectedValue: string) => {
    if (formik && currencyName) {
      formik.setFieldValue(currencyName, selectedValue, true);
      formik.setFieldTouched(currencyName, true, false);
      formik.validateField(currencyName);
    }
    onCurrencyChange?.(selectedValue);
    setSearchQuery("");
  };

  const selectedCurrency = currencyOptions.find(opt => opt.value === resolvedCurrencyValue);
  
  const filteredOptions = currencyOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const renderIcon = (icon?: string | React.ReactNode) => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <img src={icon} alt="" className="w-full h-full object-cover" />;
    }
    return icon;
  };

  return (
    <div className={cn("grid gap-1", className)}>
      <div className="relative bg-white rounded-[24px] border border-[#E0E0E0] overflow-hidden py-2 px-1">
        {label && (
          <div className="px-4 pt-3 pb-1">
            <Label htmlFor={inputId} className={"text-[14px] font-medium text-[#828282]"}>
              {label}
            </Label>
          </div>
        )}
        <div className="flex items-center -mt-4 bg-transparent!">
          <Input
            id={inputId}
            name={name}
            type="text"
            inputMode="decimal"
            onChange={resolvedOnChange}
            onBlur={formik?.handleBlur}
            value={resolvedValue}
            placeholder={placeholder}
            className={cn(
              "border-0 rounded-none h-[60px] pr-2 flex-1 text-xl! font-semibold! text-[#000E10]! bg-transparent! shadow-none!",
              "focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:border-0!",
              "placeholder:text-[#013941]/50",
              label ? "pl-4" : "pl-4",
              isError && "border-red-500!"
            )}
          />
        <div className="flex items-center h-full pr-2">
          <Select
            value={resolvedCurrencyValue ?? ""}
            onValueChange={resolvedOnCurrencyChange}
            open={isOpen}
            onOpenChange={(open) => {
              setIsOpen(open);
              if (!open) {
                setSearchQuery("");
              }
            }}
          >
            <SelectTrigger
              className={cn(
                "h-[44px] shadow-none focus:ring-0 focus:ring-offset-0 px-3 py-0 rounded-full! text-xs! bg-[#f7f7f7]! border border-[#E0E0E0]! ring-0! outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:!border-none!",
                "hover:bg-[#f7f7f7]",
                "flex items-center gap-2 min-w-[80px] justify-between",
                isCurrencyError && "border-red-500"
              )}
            >
              <div className="flex items-center gap-2">
                {selectedCurrency?.icon && (
                  <div className="rounded-full overflow-hidden size-4 flex items-center justify-center shrink-0 bg-white">
                    {renderIcon(selectedCurrency.icon)}
                  </div>
                )}
                <SelectValue 
                  placeholder="Select currency"
                  className="text-[#013941] font-medium text-xs"
                >
                  {selectedCurrency?.label || ""}
                </SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent 
              className="w-(--radix-select-trigger-width) rounded-lg shadow-lg border border-[#E0E0E0] bg-white p-0 min-w-[200px]"
              align="end"
            >
              <div className="p-2 border-b border-[#E0E0E0] sticky top-0 bg-white z-10" onPointerDown={(e) => e.stopPropagation()}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#013941]/50 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(event) => {
                      setSearchQuery(event.target.value);
                    }}
                    onMouseDown={(event) => event.stopPropagation()}
                    onPointerDown={(event) => event.stopPropagation()}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-[#E0E0E0] rounded-md focus:outline-none focus:ring-1 focus:ring-[#0D9488] focus:border-[#0D9488] bg-white"
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') {
                        setIsOpen(false);
                        setSearchQuery("");
                      }
                    }}
                  />
                </div>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      textValue={option.label}
                      className="cursor-pointer hover:bg-[#F5F5F5] focus:bg-[#F5F5F5] py-2.5 px-3 data-highlighted:bg-[#F5F5F5]"
                    >
                      <div className="flex items-center gap-2">
                        {option.icon && (
                          <div className="rounded-full overflow-hidden size-5 flex items-center justify-center shrink-0 bg-white">
                            {renderIcon(option.icon)}
                          </div>
                        )}
                        <span className="text-[#013941] text-sm">{option.label}</span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-[#013941]/50 text-center">
                    No options found
                  </div>
                )}
              </div>
            </SelectContent>
          </Select>
        </div>
        </div>
      </div>
      <p className={"text-[#525252] text-[12px]"}>
        {isError ? (() => {
          const error = formik?.errors?.[name ?? ""];
          if (typeof error === 'string') return error;
          if (Array.isArray(error)) return error.join(', ');
          return '';
        })() : ""}
      </p>
    </div>
  );
};
