import {Input} from "@/components/ui/input.tsx";
import * as React from "react";
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";
import type { FormikPropsGeneric } from "@/type/conversionTypes";

interface DefaultInputProps extends React.ComponentProps<"input">{
    label?: string;
    mask?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    leftIconSpace?: number
    rightIconSpace?: number
    formik?: FormikPropsGeneric;
    minClassName?: string;
}

export const DefaultInput = ({
    label,
    minClassName,
    mask=false,
    formik,
    rightIconSpace=8,
    leftIconSpace=20,
    leftIcon,
    rightIcon,
    className,
    onChange,
    onBlur,
    value,
    name,
    type,
    ...rest
}: DefaultInputProps) => {
    const [toggleEye, setToggleEye] = useState<boolean>(true)
    const [inputId] = useState(() => String(new Date().getTime() * Math.random()))

    const isError = formik?.touched?.[name ?? ""] && formik?.errors?.[name ?? ""]

    const security = mask ? (toggleEye ? 'password' : 'text') : type
    const shouldShowEyeIcon = mask && type === "password"

    const resolvedOnChange = formik?.handleChange ?? onChange
    const resolvedOnBlur = formik?.handleBlur ?? onBlur
    const resolvedValue = formik ? formik?.values?.[name ?? ""] : value

    const rightPadding = shouldShowEyeIcon ? 8 : (rightIcon ? rightIconSpace : 0)

    return (
      <div className={`grid gap-1 ${minClassName ?? ""}`}>
          <Label htmlFor={inputId} className={'text-[14px] font-medium text-[#013941] pl-0.5 pb-3'}>{label}</Label>
          <div className="relative">
              {
                  leftIcon && (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          {leftIcon}
                      </div>
                  )
              }
              <Input
                  id={inputId}
                  name={name}
                  type={security}
                  onChange={resolvedOnChange}
                  onBlur={resolvedOnBlur}
                  {...(resolvedValue !== undefined ? {value: resolvedValue} : {})}
                  className={`${leftIcon ? `pl-${leftIconSpace}` : ''} ${rightPadding ? `pr-${rightPadding}` : ''} ${className ?? ''} 
                  border-[#D4D4D4] rounded-full h-[44px]
                  focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#678346]`}
                  {...rest}
              />

              {
                  rightIcon && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          {rightIcon}
                      </div>
                  )
              }
              {
                  shouldShowEyeIcon && (
                      <div className="absolute right-3 top-1/2 transform  -translate-y-1/2 z-50 text-muted-foreground">
                          <button
                              type="button"
                              onClick={() => setToggleEye(!toggleEye)}
                              className="cursor-pointer"
                          >
                              {toggleEye ? '👁️' : '👁️‍🗨️'}
                          </button>
                      </div>
                  )
              }
          </div>
          <p className={'text-red-500! text-[12px] '}>{isError ? formik?.errors?.[name ?? ""] : ''}</p>
      </div>
  )
};
