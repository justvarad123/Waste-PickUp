/**
 * Core Web Vitals utility for measuring and monitoring:
 * - LCP (Largest Contentful Paint) - Loading performance (target < 2.5s)
 * - INP / FID (Interaction to Next Paint / First Input Delay) - Interactivity (target < 200ms)
 * - CLS (Cumulative Layout Shift) - Visual stability (target < 0.1)
 * - FCP (First Contentful Paint) - Perceived speed (target < 1.8s)
 */

export interface Metric {
  name: 'LCP' | 'CLS' | 'INP' | 'FCP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export type WebVitalsCallback = (metric: Metric) => void;

const listeners: WebVitalsCallback[] = [];

export function subscribeWebVitals(cb: WebVitalsCallback): () => void {
  listeners.push(cb);
  return () => {
    const idx = listeners.indexOf(cb);
    if (idx > -1) listeners.splice(idx, 1);
  };
}

function notify(metric: Metric) {
  listeners.forEach((fn) => {
    try {
      fn(metric);
    } catch (e) {
      console.warn('Web Vitals listener error', e);
    }
  });
}

export function initWebVitalsMonitoring(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    // 1. First Contentful Paint (FCP)
    const paintObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          const val = Math.round(entry.startTime);
          notify({
            name: 'FCP',
            value: val,
            rating: val <= 1800 ? 'good' : val <= 3000 ? 'needs-improvement' : 'poor',
          });
          paintObserver.disconnect();
        }
      }
    });
    paintObserver.observe({ type: 'paint', buffered: true });

    // 2. Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        const val = Math.round(lastEntry.startTime);
        notify({
          name: 'LCP',
          value: val,
          rating: val <= 2500 ? 'good' : val <= 4000 ? 'needs-improvement' : 'poor',
        });
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // 3. Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          notify({
            name: 'CLS',
            value: Number(clsValue.toFixed(3)),
            rating: clsValue <= 0.1 ? 'good' : clsValue <= 0.25 ? 'needs-improvement' : 'poor',
          });
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // 4. Interaction to Next Paint (INP)
    const inpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as any[]) {
        const val = Math.round(entry.duration || entry.processingEnd - entry.startTime);
        if (val > 0) {
          notify({
            name: 'INP',
            value: val,
            rating: val <= 200 ? 'good' : val <= 500 ? 'needs-improvement' : 'poor',
          });
        }
      }
    });
    inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 40 } as any);
  } catch (err) {
    // Non-blocking fallback
    console.debug('Web Vitals observer initialized with partial support:', err);
  }
}
