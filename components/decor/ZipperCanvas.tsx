'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useMediaQuery } from '@/lib/use-media-query'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { limitCanvasFrameRate, createVisibilityController } from '@/lib/micro-motion'

interface ZipperCanvasProps {
  height?: number
  initialOpen?: number
  accentColor?: string
  tapeColor?: string
  metalColor?: string
}

/**
 * ZipperCanvas — высокопроизводительная Canvas анимация молнии
 * - 60fps анимация с requestAnimationFrame
 * - OffscreenCanvas для оптимизации
 * - Плавная интерполяция при скролле
 * - Graceful fallback для prefers-reduced-motion
 */
export default function ZipperCanvas({
  height = 80,
  initialOpen = 0.15,
  accentColor = '#F36A32',
  tapeColor = 'rgba(50, 55, 61, 0.35)', // Стеклянный эффект как у навигации
  metalColor = '#8E949A'
}: ZipperCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const offscreenCanvasRef = useRef<OffscreenCanvas | null>(null)
  const animationFrameRef = useRef<number>(0)
  const scrollProgressRef = useRef<number>(0)
  const currentProgressRef = useRef<number>(initialOpen)
  const isInViewRef = useRef<boolean>(false)
  const frameRateControllerRef = useRef<ReturnType<typeof limitCanvasFrameRate> | null>(null)
  const visibilityControllerRef = useRef<ReturnType<typeof createVisibilityController> | null>(null)

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')

  // Создаем градиенты для металлических частей
  const createGradients = useCallback((ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) => {
    // Градиент для ленты молнии - стеклянный эффект как у навигационной панели
    const tapeGradient = ctx.createLinearGradient(0, 0, 0, height)
    tapeGradient.addColorStop(0, 'rgba(55, 60, 66, 0.45)') // Чуть светлее
    tapeGradient.addColorStop(1, 'rgba(50, 55, 61, 0.35)') // Как у навигации

    // Градиент для металлических зубцов
    const metalGradient = ctx.createLinearGradient(0, 0, 0, height)
    metalGradient.addColorStop(0, '#DFE3E6')
    metalGradient.addColorStop(0.5, '#B5BAC0')
    metalGradient.addColorStop(1, '#7E848A')

    // Градиент для бегунка
    const sliderGradient = ctx.createLinearGradient(0, 0, 0, height)
    sliderGradient.addColorStop(0, '#B5BAC0')
    sliderGradient.addColorStop(0.5, accentColor)
    sliderGradient.addColorStop(1, '#6A7075')

    return { tapeGradient, metalGradient, sliderGradient }
  }, [height, accentColor])

  // Функция отрисовки зубцов молнии
  const drawZipperTeeth = useCallback((
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    width: number,
    progress: number
  ) => {
    const teethWidth = 12
    const teethHeight = 8
    const teethSpacing = 16
    const centerY = height / 2
    const closedWidth = width * progress

    ctx.save()

    // Создаем маску для застегнутой части
    ctx.beginPath()
    ctx.rect(0, 0, closedWidth, height)
    ctx.clip()

    // Рисуем зубцы
    const gradients = createGradients(ctx)
    ctx.fillStyle = gradients.metalGradient

    for (let x = 0; x < width; x += teethSpacing) {
      // Верхний ряд зубцов
      ctx.fillRect(
        x + (teethSpacing - teethWidth) / 2,
        centerY - teethHeight - 2,
        teethWidth,
        teethHeight
      )

      // Нижний ряд зубцов (смещенный)
      ctx.fillRect(
        x + teethSpacing / 2 - teethWidth / 2,
        centerY + 2,
        teethWidth,
        teethHeight
      )
    }

    // Центральная линия соединения
    ctx.fillStyle = 'rgba(90, 96, 102, 0.8)'
    ctx.fillRect(0, centerY - 1, closedWidth, 2)

    ctx.restore()
  }, [height, createGradients])

  // Функция отрисовки бегунка
  const drawSlider = useCallback((
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    x: number
  ) => {
    const sliderWidth = 30
    const sliderHeight = 40
    const centerY = height / 2

    ctx.save()

    // Тень бегунка
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)'
    ctx.shadowBlur = 8
    ctx.shadowOffsetY = 3

    // Основа бегунка
    const gradients = createGradients(ctx)
    ctx.fillStyle = gradients.sliderGradient
    ctx.fillRect(
      x - sliderWidth / 2,
      centerY - sliderHeight / 2,
      sliderWidth,
      sliderHeight
    )

    // Центральная часть бегунка
    ctx.fillStyle = accentColor
    ctx.fillRect(
      x - sliderWidth / 2 + 3,
      centerY - sliderHeight / 2 + 4,
      sliderWidth - 6,
      sliderHeight - 8
    )

    // Декоративный элемент
    ctx.fillStyle = metalColor
    ctx.fillRect(
      x - 2,
      centerY - 8,
      4,
      16
    )

    // Язычок бегунка
    ctx.beginPath()
    ctx.arc(x, centerY + sliderHeight / 2 + 8, 4, 0, Math.PI * 2)
    ctx.fillStyle = metalColor
    ctx.fill()

    ctx.restore()
  }, [height, accentColor, metalColor, createGradients])

  // Основная функция отрисовки
  const draw = useCallback((progress: number) => {
    const canvas = canvasRef.current
    const offscreenCanvas = offscreenCanvasRef.current

    if (!canvas) return

    const ctx = offscreenCanvas
      ? offscreenCanvas.getContext('2d')
      : canvas.getContext('2d')

    if (!ctx) return

    const { width, height: canvasHeight } = dimensions

    // Очищаем канвас
    ctx.clearRect(0, 0, width, canvasHeight)

    // Рисуем ленту молнии (верх и низ)
    const gradients = createGradients(ctx)
    ctx.fillStyle = gradients.tapeGradient

    // Верхняя лента
    ctx.fillRect(0, 0, width, canvasHeight * 0.375)

    // Нижняя лента
    ctx.fillRect(0, canvasHeight * 0.625, width, canvasHeight * 0.375)

    // Декоративные строчки
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.2)'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 8])

    ctx.beginPath()
    ctx.moveTo(0, canvasHeight * 0.35)
    ctx.lineTo(width, canvasHeight * 0.35)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, canvasHeight * 0.65)
    ctx.lineTo(width, canvasHeight * 0.65)
    ctx.stroke()

    ctx.setLineDash([])

    // Рисуем зубцы молнии
    drawZipperTeeth(ctx, width, progress)

    // Рисуем бегунок
    const sliderX = width * progress
    drawSlider(ctx, sliderX)

    // Если используем offscreen canvas, копируем на основной
    if (offscreenCanvas && canvas) {
      const mainCtx = canvas.getContext('2d')
      if (mainCtx) {
        mainCtx.clearRect(0, 0, width, canvasHeight)
        mainCtx.drawImage(offscreenCanvas, 0, 0)
      }
    }
  }, [dimensions, drawZipperTeeth, drawSlider, createGradients])

  // Анимационный цикл с ограничением FPS
  const animate = useCallback(() => {
    if (!isInViewRef.current || prefersReducedMotion) return

    // Плавная интерполяция к целевому значению
    const diff = scrollProgressRef.current - currentProgressRef.current
    currentProgressRef.current += diff * 0.1 // Фактор сглаживания

    draw(currentProgressRef.current)
  }, [draw, prefersReducedMotion])

  // Обработчик скролла
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const windowHeight = window.innerHeight

    // Вычисляем прогресс на основе позиции элемента
    const scrollProgress = Math.max(0, Math.min(1,
      1 - (rect.top / (windowHeight * 0.7))
    ))

    // Интерполируем от initialOpen до 1
    scrollProgressRef.current = initialOpen + (1 - initialOpen) * scrollProgress
  }, [initialOpen])

  // Обработчик Intersection Observer
  useEffect(() => {
    // Создаем контроллер для 30fps анимации
    frameRateControllerRef.current = limitCanvasFrameRate(animate, 30)

    // Создаем контроллер видимости страницы
    visibilityControllerRef.current = createVisibilityController(
      () => {
        if (isInViewRef.current && !prefersReducedMotion) {
          frameRateControllerRef.current?.start()
        }
      },
      () => {
        frameRateControllerRef.current?.stop()
      }
    )

    visibilityControllerRef.current.start()

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting
        if (entry.isIntersecting && !prefersReducedMotion && !document.hidden) {
          frameRateControllerRef.current?.start()
        } else {
          frameRateControllerRef.current?.stop()
        }
      },
      { threshold: 0.1, rootMargin: '-10% 0px' }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      frameRateControllerRef.current?.stop()
      visibilityControllerRef.current?.stop()
    }
  }, [animate, prefersReducedMotion])

  // Обработчик изменения размеров
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height })

        // Создаем OffscreenCanvas если поддерживается
        if (typeof OffscreenCanvas !== 'undefined' && !isMobile) {
          offscreenCanvasRef.current = new OffscreenCanvas(rect.width, height)
        }
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('scroll', handleScroll)
      frameRateControllerRef.current?.stop()
    }
  }, [height, isMobile, handleScroll])

  // Начальная отрисовка
  useEffect(() => {
    if (dimensions.width > 0) {
      draw(currentProgressRef.current)
    }
  }, [dimensions, draw])

  // Fallback для reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className="zipper-canvas-fallback relative"
        style={{ height }}
      >
        <div
          className="absolute inset-0 border-t-2 border-b-2 border-dashed border-gray-300"
          style={{
            borderImage: 'repeating-linear-gradient(90deg, #ccc 0, #ccc 4px, transparent 4px, transparent 12px) 1',
            boxShadow: '0 3px 6px rgba(0,0,0,0.1)'
          }}
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="zipper-canvas-container relative"
      style={{
        height,
        willChange: 'contents',
        contentVisibility: 'auto'
      }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        style={{
          imageRendering: 'crisp-edges'
        }}
      />
    </div>
  )
}