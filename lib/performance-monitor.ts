// P11: Web Vitals Monitoring
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

export interface PerformanceMetrics {
  LCP: number | null;
  INP: number | null;
  CLS: number | null;
  FCP: number | null;
  TTFB: number | null;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    LCP: null,
    INP: null,
    CLS: null,
    FCP: null,
    TTFB: null,
  };

  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    onCLS((metric) => {
      this.metrics.CLS = metric.value;
      this.notifyCallbacks();
    });

    onINP((metric) => {
      this.metrics.INP = metric.value;
      this.notifyCallbacks();
    });

    onLCP((metric) => {
      this.metrics.LCP = metric.value;
      this.notifyCallbacks();
    });

    onFCP((metric) => {
      this.metrics.FCP = metric.value;
      this.notifyCallbacks();
    });

    onTTFB((metric) => {
      this.metrics.TTFB = metric.value;
      this.notifyCallbacks();
    });
  }

  private notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.metrics));
  }

  public subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public sendToAnalytics(endpoint?: string) {
    const url = endpoint || '/api/analytics/performance';

    if (this.hasMetrics()) {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics: this.metrics,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        }),
      }).catch(console.error);
    }
  }

  private hasMetrics(): boolean {
    return Object.values(this.metrics).some(value => value !== null);
  }
}

export const performanceMonitor = new PerformanceMonitor();