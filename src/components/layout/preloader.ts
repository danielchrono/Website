import { Component } from '../base/component';
import { CONFIG } from '../../core/config';

export class Preloader extends Component {
  constructor() {
    super({ name: 'Preloader', elementId: 'preloader' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    this.handlePreloader();
  }

  private handlePreloader(): void {
    const preloader = this.element;
    if (!preloader) return;

    const hidePreloader = () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        
        setTimeout(() => {
          // Disparar evento para inicializar typewriter
          const event = new CustomEvent('preloaderHidden');
          document.dispatchEvent(event);
        }, 300);
        
        setTimeout(() => {
          preloader.remove();
        }, 600);
      }, CONFIG.preloaderDuration);
    };

    const loadPromise = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve(), { once: true });
      }
    });

    loadPromise.then(() => {
      hidePreloader();
    }).catch(() => {
      hidePreloader();
    });

    // Timeout de fallback
    setTimeout(() => {
      if (preloader && !preloader.classList.contains('hidden')) {
        hidePreloader();
      }
    }, CONFIG.preloaderDuration + 3000);
  }
}