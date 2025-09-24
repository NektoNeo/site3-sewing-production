"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { useEffect, useState } from "react"

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
}

export function MotionDiv({ children, ...props }: MotionWrapperProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  if (prefersReducedMotion) {
    return <div className={props.className}>{children}</div>
  }

  return <motion.div {...props}>{children}</motion.div>
}

interface MotionH2Props extends Omit<HTMLMotionProps<"h2">, 'children'> {
  children: React.ReactNode
}

export function MotionH2({ children, ...props }: MotionH2Props) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  if (prefersReducedMotion) {
    return <h2 className={props.className as string}>{children}</h2>
  }

  return <motion.h2 {...props}>{children}</motion.h2>
}

interface MotionFormProps extends Omit<HTMLMotionProps<"form">, 'children'> {
  children: React.ReactNode
}

export function MotionForm({ children, ...props }: MotionFormProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  if (prefersReducedMotion) {
    return <form className={props.className as string}>{children}</form>
  }

  return <motion.form {...props}>{children}</motion.form>
}