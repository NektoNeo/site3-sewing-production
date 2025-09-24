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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Имя должно содержать минимум 2 символа",
  }),
  phone: z.string().min(10, {
    message: "Введите корректный номер телефона",
  }).regex(/^[\d\s\-\+\(\)]+$/, {
    message: "Телефон может содержать только цифры и символы +, -, (, )"
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      agreement: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    // For now just console.log and show toast
    console.log("Form submitted:", data)

    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время",
    })

    // Reset form after successful submission
    reset()
  }

  const agreementValue = watch("agreement")

  return (
    <section id="contacts" className="section scroll-mt-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#202528] to-[#1A1C1E]" />
      <div className="container-default max-w-2xl relative">
        <div className="text-center">
          <motion.span
            className="tag"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeRise}
          >
            Контакты
          </motion.span>
          <div className="mb-12" />
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="glass rounded-2xl p-8 md:p-10 border border-[rgba(165,171,175,.22)] shadow-[0_10px_40px_rgba(0,0,0,.35)] max-w-3xl mx-auto space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}>
          <motion.div variants={fadeRise} className="space-y-2">
            <Label htmlFor="name" className="text-white">Имя *</Label>
            <Input
              id="name"
              placeholder="Ваше имя"
              className="bg-black/40 border-[rgba(165,171,175,.24)] text-white placeholder:text-mist-400 focus:ring-2 focus:ring-[#D64218] focus:border-[#D64218] backdrop-blur-sm"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeRise} className="space-y-2">
            <Label htmlFor="phone" className="text-white">Телефон *</Label>
            <Input
              id="phone"
              placeholder="+7 (999) 123-45-67"
              className="bg-black/40 border-[rgba(165,171,175,.24)] text-white placeholder:text-mist-400 focus:ring-2 focus:ring-[#D64218] focus:border-[#D64218] backdrop-blur-sm"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeRise} className="space-y-2">
            <Label htmlFor="email" className="text-white">Email (необязательно)</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="bg-black/40 border-[rgba(165,171,175,.24)] text-white placeholder:text-mist-400 focus:ring-2 focus:ring-[#D64218] focus:border-[#D64218] backdrop-blur-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeRise} className="space-y-2">
            <Label htmlFor="message" className="text-white">Сообщение *</Label>
            <Textarea
              id="message"
              placeholder="Опишите вашу задачу..."
              className="bg-black/40 border-[rgba(165,171,175,.24)] text-white placeholder:text-mist-400 focus:ring-2 focus:ring-[#D64218] focus:border-[#D64218] backdrop-blur-sm min-h-[120px]"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeRise} className="space-y-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreement"
                checked={agreementValue}
                onCheckedChange={(checked) => setValue("agreement", checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="agreement"
                  className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Я согласен на обработку персональных данных *
                </label>
              </div>
            </div>
            {errors.agreement && (
              <p className="text-red-500 text-sm">{errors.agreement.message}</p>
            )}
          </motion.div>

          <motion.div variants={fadeRise}>
            <Button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-[#D64218] to-[#FF6B47] text-white hover:from-[#FF6B47] hover:to-[#D64218] hover:shadow-lg hover:shadow-[#D64218]/30 transition-all duration-300 py-6 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}