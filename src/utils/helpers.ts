export class Helpers {
  static isDevEnvironment(): boolean {
    return typeof import.meta.env !== 'undefined' && import.meta.env.DEV;
  }

  static isProdEnvironment(): boolean {
    return typeof import.meta.env !== 'undefined' && import.meta.env.PROD;
  }

  static debounce<T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: number | null = null;
    
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout);
      timeout = window.setTimeout(() => func.apply(null, args), wait);
    };
  }

  static throttle<T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static formatDateTime(dateString: string): string {
    if (dateString.includes('Presente')) {
      const year = dateString.split(' - ')[0];
      return `${year}-01-01/Present`;
    }
    if (dateString.includes(' - ')) {
      const [start, end] = dateString.split(' - ');
      return `${start}-01-01/${end}-12-31`;
    }
    return dateString;
  }

  static showErrorNotification(message: string): void {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
      <div class="error-content">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
        <button class="error-close" aria-label="Fechar notificação">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
    
    notification.querySelector('.error-close')?.addEventListener('click', () => {
      notification.remove();
    });
  }
}