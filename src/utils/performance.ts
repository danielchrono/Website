export class PerformanceMonitor {
  private metrics: any = {};
  private isMonitoring: boolean = false;

  startMonitoring(): void {
    if (!('performance' in window) || this.isMonitoring) return;

    this.isMonitoring = true;
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.capturePerformanceMetrics();
      }, 0);
    });
  }

  private capturePerformanceMetrics(): void {
    try {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationTiming) {
        this.metrics = {
          pageLoad: navigationTiming.loadEventEnd - navigationTiming.fetchStart,
          domReady: navigationTiming.domContentLoadedEventEnd - navigationTiming.fetchStart,
          firstPaint: this.getFirstPaintTime(),
          firstContentfulPaint: this.getFirstContentfulPaintTime(),
          largestContentfulPaint: this.getLargestContentfulPaintTime()
        };
        
        console.log('📊 Métricas de Performance:', this.metrics);
      }
    } catch (error) {
      console.log('⚠️ Monitoramento de performance não disponível:', error);
    }
  }

  private getFirstPaintTime(): number {
    const entry = performance.getEntriesByType('paint').find(entry => 
      entry.name === 'first-paint'
    );
    return entry ? Math.round(entry.startTime) : 0;
  }

  private getFirstContentfulPaintTime(): number {
    const entry = performance.getEntriesByType('paint').find(entry => 
      entry.name === 'first-contentful-paint'
    );
    return entry ? Math.round(entry.startTime) : 0;
  }

  private getLargestContentfulPaintTime(): number {
    const entries = performance.getEntriesByType('largest-contentful-paint');
    return entries.length > 0 ? Math.round(entries[entries.length - 1].startTime) : 0;
  }

  public getMetrics(): any {
    return this.metrics;
  }

  public stopMonitoring(): void {
    this.isMonitoring = false;
  }
}