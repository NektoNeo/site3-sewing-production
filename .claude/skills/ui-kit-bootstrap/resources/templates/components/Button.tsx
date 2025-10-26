import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { asChild?: boolean }
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className='', asChild=false, ...props}, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp ref={ref} className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors
    bg-[var(--color-brand-primary)] text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`} {...props} />
  )
})
Button.displayName='Button'
