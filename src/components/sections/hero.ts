import { Component } from '../base/component';
import { scrollManager, ScrollManager } from '../../utils/scroll-manager';

export class Hero extends Component {
  private typewriterInstances: Map<HTMLElement, number> = new Map();

  constructor() {
    super({ name: 'Hero', elementId: 'hero' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    this.hideHeroContent();
    this.setupHeroScrollFix();
  }

  public hideHeroContent(): void {
    const heroElements = this.querySelectorAll('#hero .hero-greeting, #hero .hero-title, #hero .hero-subtitle, #hero .hero-description, #hero .hero-cta');
    heroElements.forEach(el => {
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
    });
  }

  public showHeroContent(): void {
    const heroElements = this.querySelectorAll('#hero .hero-greeting, #hero .hero-title, #hero .hero-subtitle, #hero .hero-description, #hero .hero-cta');
    heroElements.forEach(el => {
      el.style.visibility = 'visible';
    });
  }

  private setupHeroScrollFix(): void {
    const heroSection = this.element;
    if (!heroSection) return;

    const updateHeroHeight = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = scrollManager.getHeaderHeight();
      heroSection.style.minHeight = `${windowHeight}px`;
      heroSection.style.paddingTop = `${headerHeight}px`;
    };

    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);

    const handleTopScroll = () => {
      if (window.pageYOffset < 10) {
        updateHeroHeight();
      }
    };

    window.addEventListener('scroll', handleTopScroll);
  }

  public initializeTypewriter(): void {
    this.showHeroContent();
    
    const typewriterElements = this.querySelectorAll('[data-typewriter]');
    
    this.typewriterInstances.clear();
    
    typewriterElements.forEach(element => {
      element.textContent = '';
    });
    
    setTimeout(() => {
      typewriterElements.forEach((element, index) => {
        setTimeout(() => {
          this.startTypewriter(element);
        }, index * 600);
      });
    }, 800);

    setTimeout(() => {
      const heroDescription = this.querySelector('.hero-description') as HTMLElement;
      const heroCta = this.querySelector('.hero-cta') as HTMLElement;
      
      if (heroDescription) {
        heroDescription.style.animation = 'fadeInUp 0.8s ease-out forwards';
        heroDescription.style.opacity = '1';
      }
      
      if (heroCta) {
        heroCta.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
        heroCta.style.opacity = '1';
      }
    }, typewriterElements.length * 600 + 500);
  }

  private startTypewriter(element: HTMLElement): void {
    const text = element.getAttribute('data-text') || '';
    const speed = 40; // CONFIG.typewriterSpeed
    
    if (!text || element.dataset.typed === 'true') return;

    element.dataset.typed = 'true';
    element.textContent = '';

    let i = 0;
    const type = () => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        
        const timeoutId = window.setTimeout(type, speed + Math.random() * 40 - 20);
        this.typewriterInstances.set(element, timeoutId);
      } else {
        element.classList.add('typewriter-complete');
      }
    };

    type();
  }

  public destroy(): void {
    this.typewriterInstances.forEach((timeoutId, element) => {
      clearTimeout(timeoutId);
      element.innerText = '';
    });
    this.typewriterInstances.clear();
  }
}