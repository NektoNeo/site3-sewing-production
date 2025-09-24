import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 min-h-[44px] min-w-[44px]",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--accent)] text-[color:var(--accent-foreground)] hover:opacity-90",
        primary: "bg-gradient-to-tr from-[#D64218] to-[#C23A14] text-white hover:opacity-90 shadow-lg shadow-[#FF6B35]/20",
        outline: "border border-neutral-200 bg-white hover:bg-neutral-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline min-h-0 min-w-0",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-11 px-4",
        lg: "h-12 px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      return React.cloneElement(props.children as React.ReactElement, {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
      })
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }