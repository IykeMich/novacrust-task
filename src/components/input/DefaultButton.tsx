import {Button, buttonVariants} from "@/components/ui/button.tsx";
import * as React from "react";
import type {VariantProps} from "class-variance-authority";
import { Loader2 } from "lucide-react";

interface DefaultButtonProps extends React.ComponentProps<"button">{
    label?: string
    children?: React.ReactNode
    loading?: boolean
    loadingText?: string
    extraClassName?: string
}

export const DefaultButton = ({
    label, 
    children, 
    loading = false,
    loadingText,
    disabled,
    extraClassName,
    ...props
}: DefaultButtonProps & VariantProps<typeof buttonVariants>) => {
  const isDisabled = disabled || loading;
  
  const defaultClasses = "cursor-pointer text-[#E6FBF2]! bg-[#013941]! rounded-full! py-6!";

  const baseClasses = extraClassName || defaultClasses;
  
  return (
      <Button 
          type={props.type || "button"}
          className={`w-full rounded-full! font-light transition-all duration-200 bg-[#013941]! text-[#E6FBF2]! py-6! text-sm! font-family-instrument! border-none! outline-0! ring-0! ${props.className || ""} ${baseClasses} ${isDisabled ? "cursor-not-allowed bg-[#EFEFEB]! text-[#737373]! hover:bg-[#EFEFEB]!" : ""}`}
          disabled={isDisabled}
          {...props}
      >
          {loading ? (
              <div className="flex items-center justify-center gap-3 opacity-90">
                  <Loader2 className="h-4 w-4 animate-spin text-current" />
                  <span className="font-medium">{loadingText || label || children}</span>
              </div>
          ) : (
              label || children
          )}
      </Button>
  )
}
