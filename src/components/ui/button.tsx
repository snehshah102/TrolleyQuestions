import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = {
  primary: "bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800",
  secondary: "bg-secondary-100 text-secondary-900 hover:bg-secondary-200",
  outline: "border-2 border-primary-200 text-primary-700 hover:bg-primary-50",
  ghost: "text-secondary-700 hover:bg-secondary-100",
}

const buttonSizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-6",
  lg: "h-14 px-8 text-lg",
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
  isLoading?: boolean
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary", 
    size = "md", 
    isLoading = false,
    fullWidth = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          // Variant styles
          buttonVariants[variant],
          // Size styles
          buttonSizes[size],
          // Width styles
          fullWidth ? "w-full" : "",
          // Custom styles
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={cn(isLoading ? "opacity-0" : "opacity-100")}>
          {children}
        </span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants } 