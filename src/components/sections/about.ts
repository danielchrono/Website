import { Component } from '../base/component';

export class About extends Component {
  constructor() {
    super({ name: 'About', elementId: 'about' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    this.setupStatsAnimation();
  }

  private setupStatsAnimation(): void {
    const statNumbers = this.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.getAttribute('data-animated')) {
          this.animateCounter(entry.target as HTMLElement);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
  }

  private animateCounter(element: HTMLElement): void {
    const target = parseInt(element.getAttribute('data-count') || '0', 10);
    const duration = 1500; // CONFIG.counterDuration
    
    if (isNaN(target) || element.dataset.animated) return;
    
    element.dataset.animated = 'true';
    this.startCounterAnimation(element, 0, target, duration);
  }

  private startCounterAnimation(element: HTMLElement, start: number, end: number, duration: number): void {
    const startTime = performance.now();
    
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutBack = 1 + 2.70158 * Math.pow(progress - 1, 3) + 1.70158 * Math.pow(progress - 1, 2);
      const current = Math.floor(start + (end - start) * easeOutBack);
      
      element.textContent = current.toString();
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }
}