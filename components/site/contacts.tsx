"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"
import { fadeRise, stagger } from "@/lib/animations"
import InputMask from "react-input-mask"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  phone: z.string()
    .regex(/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, {
      message: "Введите полный номер телефона"
    }),
  email: z.string().email({
    message: "Введите корректный email адрес",
  }).optional().or(z.literal('')),
  message: z.string().min(10, {
    message: "Сообщение должно содержать минимум 10 символов",
  }),
  agreement: z.boolean().refine((val) => val === true, {
    message: "Необходимо согласие на обработку персональных данных",
  }),
})

type FormData = z.infer<typeof formSchema>

export default function Contacts() {
  const { toast } = useToast()
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      agreement: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log("Form submitted:", data)

      setIsSuccess(true)
      toast({
        title: "✓ Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
        className: "bg-green-600 text-white border-green-700",
      })

      // Reset form after successful submission
      reset()
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      toast({
        title: "✕ Ошибка отправки",
        description: "Пожалуйста, попробуйте позже или позвоните нам",
        className: "bg-red-600 text-white border-red-700",
        variant: "destructive",
      })
    }
  }

  const agreementValue = watch("agreement")

  return (
    <section id="contacts" data-surface="light" className="pt-[var(--space-3xl)] pb-[var(--space-3xl)] md:pt-[var(--space-3xl)] pb-[var(--space-3xl)] scroll-mt-16 relative surface-light">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCFCFD] to-[#F4F6F8]" />
      <div className="container max-w-3xl mx-auto px-[var(--space-md)] relative">
        <motion.div
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRise}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#101316] mb-4">
            Оставьте заявку
          </h2>
          <p className="text-[#6B7380] text-lg">
            Заполните форму, и мы свяжемся с вами в течение рабочего дня
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/90 backdrop-blur-md rounded-[28px] p-[var(--space-xl)] md:p-10 shadow-[0_10px_24px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.06)] space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          role="form"
          aria-label="Форма обратной связи">
          <motion.div variants={fadeRise} className="space-y-2">
            <Label htmlFor="name" className="text-[#101316] font-medium">Имя *</Label>
            <Input
              id="name"
              placeholder="Ваше имя"
              className="bg-white border-[rgba(0,0,0,0.12)] text-[#101316] placeholder:text-[#6B7380] focus:ring-2 focus:ring-[#FF7A45] focus:border-[#FF7A45] transition-all focus-visible:outline-none"
              aria-required="true"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className="text-red-600 text-sm" role="alert" aria-live="polite">
                {errors.name.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeRise} className="space-y-2">
            <Label htmlFor="phone" className="text-[#101316] font-medium">Телефон *</Label>
            <InputMask
              mask="+7 (999) 999-99-99"
              placeholder="+7 (999) 123-45-67"
              {...register("phone")}
            >
              {(inputProps: any) => (
                <Input
                  {...inputProps}
                  id="phone"
                  type="tel"
                  className="bg-white border-[rgba(0,0,0,0.12)] text-[#101316] placeholder:text-[#6B7380] focus:ring-2 focus:ring-[#FF7A45] focus:border-[#FF7A45] transition-all focus-visible:outline-none"
                  aria-required="true"
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
              )}
            </InputMask>
            {errors.phone && (
              <p id="phone-error" className="text-red-600 text-sm" role="alert" aria-live="polite">
                {errors.phone.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeRise} className="space-y-2">
            <Label htmlFor="email" className="text-[#101316] font-medium">Email (необязательно)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="bg-white border-[rgba(0,0,0,0.12)] text-[#101316] placeholder:text-[#6B7380] focus:ring-2 focus:ring-[#FF7A45] focus:border-[#FF7A45] transition-all focus-visible:outline-none"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 text-sm" role="alert" aria-live="polite">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeRise} className="space-y-2">
            <Label htmlFor="message" className="text-[#101316] font-medium">Сообщение *</Label>
            <Textarea
              id="message"
              placeholder="Опишите вашу задачу..."
              className="bg-white border-[rgba(0,0,0,0.12)] text-[#101316] placeholder:text-[#6B7380] focus:ring-2 focus:ring-[#FF7A45] focus:border-[#FF7A45] transition-all min-h-[120px] resize-y focus-visible:outline-none"
              aria-required="true"
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message")}
            />
            {errors.message && (
              <p id="message-error" className="text-red-600 text-sm" role="alert" aria-live="polite">
                {errors.message.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeRise} className="space-y-2">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreement"
                checked={agreementValue}
                onCheckedChange={(checked) => setValue("agreement", checked as boolean)}
                className="mt-1 border-[rgba(0,0,0,0.24)] data-[state=checked]:bg-[#FF7A45] data-[state=checked]:border-[#FF7A45]"
                aria-required="true"
                aria-invalid={errors.agreement ? "true" : "false"}
                aria-describedby="agreement-label agreement-error"
              />
              <div className="grid gap-1.5 leading-none flex-1">
                <label
                  id="agreement-label"
                  htmlFor="agreement"
                  className="text-sm font-medium text-[#101316] leading-relaxed cursor-pointer select-none"
                >
                  Я согласен на обработку персональных данных в соответствии с{" "}
                  <span className="underline hover:text-[#FF7A45] transition-colors">политикой конфиденциальности</span> *
                </label>
              </div>
            </div>
            {errors.agreement && (
              <p id="agreement-error" className="text-red-600 text-sm ml-7" role="alert" aria-live="polite">
                {errors.agreement.message}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeRise}>
            <Button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-[#FF7A45] to-[#D64218] text-white hover:from-[#D64218] hover:to-[#FF7A45] hover:shadow-lg hover:shadow-[#FF7A45]/20 transition-all duration-300 py-6 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A45] focus-visible:ring-offset-2"
              disabled={isSubmitting || !agreementValue}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Отправка...
                </span>
              ) : isSuccess ? (
                "✓ Отправлено!"
              ) : (
                "Отправить заявку"
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Success Message */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-[var(--space-xl)] p-4 bg-green-50 border border-green-200 rounded-xl text-center"
          >
            <p className="text-green-800 font-medium">
              Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
            </p>
          </motion.div>
        )}

        {/* Contact Info */}
        <motion.div
          className="mt-10 text-center text-[#6B7380]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeRise}
        >
          <p className="mb-2">Или свяжитесь с нами напрямую:</p>
          <a href="tel:+79991234567" className="text-[#FF7A45] hover:text-[#D64218] transition-colors font-medium">
            +7 (999) 123-45-67
          </a>
        </motion.div>
      </div>
    </section>
  )
}