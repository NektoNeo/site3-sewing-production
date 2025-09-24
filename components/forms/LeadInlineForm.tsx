"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import InputMask from "react-input-mask"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"

const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/

const formSchema = z.object({
  serviceSelect: z.string({
    required_error: "Пожалуйста, выберите услугу",
  }),
  phone: z.string()
    .min(1, "Телефон обязателен для заполнения")
    .regex(phoneRegex, "Введите корректный номер телефона"),
  comment: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Необходимо согласие на обработку персональных данных",
  }),
})

type FormData = z.infer<typeof formSchema>

const services = [
  { value: "pattern", label: "Разработка лекал" },
  { value: "sample", label: "Пошив образца" },
  { value: "grading", label: "Градация лекал" },
  { value: "production", label: "Массовый пошив" },
  { value: "merch", label: "Корпоративный мерч" },
  { value: "consultation", label: "Консультация технолога" },
]

interface LeadInlineFormProps {
  onSubmit?: (data: FormData) => void
  className?: string
}

export function LeadInlineForm({ onSubmit, className }: LeadInlineFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceSelect: "",
      phone: "",
      comment: "",
      consent: false,
    },
  })

  const handleSubmit = async (data: FormData) => {
    try {
      if (onSubmit) {
        await onSubmit(data)
      }

      console.log("Form submitted:", data)

      toast.success("Заявка успешно отправлена!", {
        description: "Мы свяжемся с вами в ближайшее время",
      })

      form.reset()
    } catch (error) {
      toast.error("Ошибка при отправке заявки", {
        description: "Пожалуйста, попробуйте еще раз",
      })
    }
  }

  const isConsentChecked = form.watch("consent")

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`space-y-6 ${className || ""}`}
      >
        <FormField
          control={form.control}
          name="serviceSelect"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Выберите услугу</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger aria-label="Выберите услугу">
                    <SelectValue placeholder="Выберите из списка" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <InputMask
                  mask="+7 (999) 999-99-99"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  {(inputProps: any) => (
                    <Input
                      {...inputProps}
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      aria-label="Номер телефона"
                    />
                  )}
                </InputMask>
              </FormControl>
              <FormDescription>
                Мы позвоним вам для уточнения деталей
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Расскажите подробнее о вашем проекте"
                  className="resize-none"
                  rows={3}
                  aria-label="Комментарий к заявке"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Необязательное поле
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label="Согласие на обработку персональных данных"
                  aria-required="true"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal">
                  Я согласен на обработку персональных данных
                </FormLabel>
                <FormDescription>
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a
                    href="/privacy"
                    className="underline hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    политикой конфиденциальности
                  </a>
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!isConsentChecked || form.formState.isSubmitting}
          aria-label="Отправить заявку"
        >
          {form.formState.isSubmitting ? "Отправка..." : "Отправить заявку"}
        </Button>
      </form>
    </Form>
  )
}