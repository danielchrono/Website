import { CONFIG } from '../core/config';
import { Helpers } from './helpers';

export class ScrollManager {
  private lastScrollY: number = 0;
  private scrollDirection: 'up' | 'down' = 'down';
  private scrollThreshold: number = 50;
  private resizeTimeout: number | null = null;
  private isScrolling: boolean = false;
  private headerHeight: number = 0;

  constructor(private config: { scrollThreshold?: number } = {}) {
    this.scrollThreshold = config.scrollThreshold || CONFIG.scrollThreshold;
    this.getHeaderHeight();
  }

  setupScrollEvents(): void {
    let ticking = false;

    const updateOnScroll = () => {
      this.handleScroll();
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  setupScrollDirection(): void {
    this.lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > this.lastScrollY ? 'down' : 'up';
      
      if (direction !== this.scrollDirection && Math.abs(scrollY - this.lastScrollY) > this.scrollThreshold) {
        this.scrollDirection = direction;
        this.handleScrollDirectionChange(direction);
      }
      
      this.lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection, { passive: true });
  }

  setupResizeHandler(callback: () => void, debounceDelay: number = CONFIG.resizeDebounce): void {
    const debouncedCallback = Helpers.debounce(callback, debounceDelay);
    
    window.addEventListener('resize', () => {
      this.getHeaderHeight();
      debouncedCallback();
    });
  }

  private handleScroll(): void {
    const currentScroll = window.pageYOffset;
    this.isScrolling = true;
    
    // Disparar evento customizado
    const event = new CustomEvent('scrollUpdate', { 
      detail: { scrollY: currentScroll, direction: this.scrollDirection }
    });
    document.dispatchEvent(event);
    
    setTimeout(() => {
      this.isScrolling = false;
    }, 100);
  }

  private handleScrollDirectionChange(direction: 'up' | 'down'): void {
    const event = new CustomEvent('scrollDirectionChange', { 
      detail: { direction }
    });
    document.dispatchEvent(event);
  }

  public getHeaderHeight(): void {
    const header = document.getElementById('header');
    this.headerHeight = header ? header.offsetHeight : 70;
  }

  smoothScrollToElement(element: HTMLElement, offset: number = this.headerHeight): void {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
    });
  }

  public smoothScrollTo(selector: string, customOffset?: number): void {
    const targetEl = document.querySelector(selector) as HTMLElement | null;
    if (targetEl) {
      this.smoothScrollToElement(targetEl, customOffset);
    }
  }

  getScrollDirection(): 'up' | 'down' {
    return this.scrollDirection;
  }

  isUserScrolling(): boolean {
    return this.isScrolling;
  }

  destroy(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }
}

// Instância global para uso em toda a aplicação
export const scrollManager = new ScrollManager();