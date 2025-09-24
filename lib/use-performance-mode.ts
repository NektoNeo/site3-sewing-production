"use client"

import { useEffect, useState } from 'react'
import { useMediaQuery } from './use-media-query'

export type PerformanceMode = 'high' | 'balanced' | 'low'

interface BatteryManager {
  charging: boolean
  level: number
  addEventListener?: (type: string, listener: EventListener) => void
  removeEventListener?: (type: string, listener: EventListener) => void
}

export function usePerformanceMode(): PerformanceMode {
  const [mode, setMode] = useState<PerformanceMode>('balanced')
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    let batteryPromise: Promise<BatteryManager> | undefined

    const checkPerformance = async () => {
      // Check device capabilities
      const cores = navigator.hardwareConcurrency || 4
      const memory = (navigator as any).deviceMemory || 4

      // Check battery status if available
      let isLowBattery = false
      let isCharging = true

      if ('getBattery' in navigator) {
        try {
          batteryPromise = (navigator as any).getBattery()
          const battery = await batteryPromise
          if (battery) {
            isLowBattery = battery.level < 0.2
            isCharging = battery.charging

            // Listen for battery changes
            if (battery.addEventListener) {
              battery.addEventListener('levelchange', () => {
                isLowBattery = battery.level < 0.2
                updateMode()
              })

              battery.addEventListener('chargingchange', () => {
                isCharging = battery.charging
                updateMode()
              })
            }
          }
        } catch (e) {
          // Battery API not available or failed
        }
      }

      // Check network speed
      const connection = (navigator as any).connection
      const isSlow = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g'

      // Determine performance mode
      const updateMode = () => {
        if (isMobile && (isLowBattery || isSlow)) {
          setMode('low')
        } else if (isMobile || cores < 4 || memory < 4 || (isLowBattery && !isCharging)) {
          setMode('balanced')
        } else {
          setMode('high')
        }
      }

      updateMode()

      // Listen for network changes
      if (connection) {
        connection.addEventListener('change', updateMode)
      }
    }

    checkPerformance()
  }, [isMobile])

  return mode
}