import { Component } from '../base/component';

export class Header extends Component {
  constructor() {
    super({ name: 'Header', elementId: 'header' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    this.setupHeaderBehavior();
  }

  private setupHeaderBehavior(): void {
    const header = this.element;
    if (!header) return;

    let lastScrollY = window.pageYOffset;

    const updateHeader = () => {
      const scrollY = window.pageYOffset;
      
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  public handleScroll(): void {
    // Implementação específica se necessário
  }
}