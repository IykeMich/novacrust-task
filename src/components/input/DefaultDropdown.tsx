import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import * as React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { StringUtil } from "@/utils/StringUtil";
import type { FormikPropsGeneric } from "@/type/conversionTypes";

interface DropdownOption {
  label: string;
  value: string;
  icon?: string | React.ReactNode;
}

interface DefaultDropdownProps {
  label?: string;
  name?: string;
  options: DropdownOption[];
  placeholder?: string;
  formik?: FormikPropsGeneric;
  minClassName?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  leftIconSpace?: number;
  onValueChange?: (value: string) => void;
  value?: string;
  loading?: boolean;
  loadingText?: string;
}

export const DefaultDropdown = ({
  label,
  minClassName,
  formik,
  options,
  placeholder,
  leftIcon,
  leftIconSpace = 20,
  className,
  name,
  onValueChange,
  value,
  loading = false,
  loadingText = "options",
}: DefaultDropdownProps) => {
  const [inputId] = useState(() => String(new Date().getTime() * Math.random()));

  const isError = formik?.touched?.[name ?? ""] && formik?.errors?.[name ?? ""];

  const resolvedValue: string | undefined = formik && name
    ? (typeof formik.values[name] === 'string' ? formik.values[name] : undefined)
    : (value || undefined);
  const resolvedOnValueChange = (selectedValue: string) => {
    if (formik && name) {
      formik.setFieldValue(name, selectedValue, true);
      formik.setFieldTouched(name, true, false);
      formik.validateField(name);
    }
    onValueChange?.(selectedValue);
  };

  const selectedOption = options.find(opt => opt.value === resolvedValue);

  return (
    <div className={cn("grid gap-1", minClassName)}>
      {label && (
        <Label htmlFor={inputId} className={"text-[14px] font-medium pl-0.5 text-[#013941]"}>
          {label}
        </Label>
      )}
      <div className="relative w-full max-w-full overflow-hidden">
        {leftIcon && (
          <div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0D9488] z-10 pointer-events-none"
          >
            {leftIcon}
          </div>
        )}
        <Select
          value={resolvedValue}
          onValueChange={resolvedOnValueChange}
        >
          <SelectTrigger
            id={inputId}
            className={cn(
              "w-full! bg-transparent! border border-[#E0E0E0]! rounded-full! h-[44px]! ring-0! outline-none! focus-visible:ring-0! focus-visible:ring-offset-0! focus-visible:!border-none!",
              "data-placeholder:text-[#013941]! text-[#013941]!",
              "[&_svg]:text-[#013941]! [&_svg]:opacity-100!",
              "overflow-hidden! max-w-full!",
              isError && "border-red-500!",
              loading && "cursor-not-allowed opacity-70",
              className
            )}
            style={leftIcon ? { paddingLeft: `${leftIconSpace}px` } : undefined}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-[#013941]" />
                <span className="text-sm text-[#013941]">Loading...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 w-full min-w-0 overflow-hidden">
                {selectedOption?.icon && (
                  <span className="flex items-center justify-center w-5 h-5 shrink-0">
                    {typeof selectedOption.icon === 'string' ? (
                      <img src={selectedOption.icon} alt={selectedOption.label} className="w-full h-full object-contain" />
                    ) : (
                      selectedOption.icon
                    )}
                  </span>
                )}
                <SelectValue 
                  placeholder={placeholder} 
                  className="text-[#013941]! data-placeholder:text-[#013941]! flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                    {StringUtil.truncateText(selectedOption?.label ?? "", 30)}
                </SelectValue>
              </div>
            )}
          </SelectTrigger>
          <SelectContent className="rounded-lg shadow-lg border border-[#E0E0E0] bg-white max-sm:w-[300px]">
            {loading ? (
              <div className="px-2 py-1.5 text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading {loadingText}...</span>
              </div>
            ) : options.length > 0 ? (
              options.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  textValue={option.label}
                  className="cursor-pointer hover:bg-[#F5F5F5] focus:bg-[#F5F5F5] data-highlighted:bg-[#F5F5F5] py-2.5 px-3"
                >
                  <div className="flex items-center gap-3">
                    {option.icon && (
                      <span className="dropdown-item-icon flex items-center justify-center w-6 h-6 shrink-0">
                        {typeof option.icon === 'string' ? (
                          <img src={option.icon} alt={option.label} className="w-full h-full object-contain" />
                        ) : (
                          option.icon
                        )}
                      </span>
                    )}
                    <span className="text-[#013941] text-sm">{option.label}</span>
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                No {loadingText} available
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
      <p className={cn("pl-2 text-[12px]", isError ? "text-red-500" : "text-[#525252]")}>
        {isError && name && formik?.errors?.[name] ? String(formik.errors[name]) : ''}
      </p>
    </div>
  );
};
