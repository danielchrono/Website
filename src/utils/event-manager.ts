import { Helpers } from './helpers';

export class EventManager {
  private resizeTimeout: number | null = null;

  setupThemeToggle(): void {
    const themeToggle = document.getElementById('toggleTheme');
    const mobileMenuThemeToggle = document.getElementById('mobileMenuThemeToggle');
    
    const toggleHandler = () => {
      const event = new CustomEvent('toggleTheme');
      document.dispatchEvent(event);
    };
    
    themeToggle?.addEventListener('click', toggleHandler);
    mobileMenuThemeToggle?.addEventListener('click', toggleHandler);
  }

  setupKeyboardNavigation(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          this.handleEscapeKey(e);
          break;
        case 'Tab':
          this.handleTabNavigation(e);
          break;
        case 'Home':
          this.handleHomeKey(e);
          break;
        case 'End':
          this.handleEndKey(e);
          break;
      }
    });
  }

  setupFocusManagement(): void {
    document.addEventListener('focusin', (e) => {
      const target = e.target as HTMLElement;
      this.handleFocusIn(target);
    });

    document.addEventListener('focusout', (e) => {
      const target = e.target as HTMLElement;
      this.handleFocusOut(target);
    });
  }

  setupErrorHandling(): void {
    window.addEventListener('error', (event) => {
      this.handleGlobalError(event);
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.handleUnhandledRejection(event);
    });
  }

  setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            const event = new CustomEvent('smoothScrollTo', { 
              detail: { element: target } 
            });
            document.dispatchEvent(event);
            
            // Fechar menu mobile se estiver aberto
            const mobileMenuEvent = new CustomEvent('mobileMenuClose');
            document.dispatchEvent(mobileMenuEvent);
          }
        }
      });
    });
  }

  private handleEscapeKey(e: KeyboardEvent): void {
    const mobileMenuEvent = new CustomEvent('escapePressed');
    document.dispatchEvent(mobileMenuEvent);
    
    const mapContainer = document.getElementById('mapContainer');
    if (mapContainer?.classList.contains('active')) {
      e.preventDefault();
      const closeMapEvent = new CustomEvent('closeMap');
      document.dispatchEvent(closeMapEvent);
    }
  }

  private handleTabNavigation(e: KeyboardEvent): void {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu?.classList.contains('active')) {
      this.handleMobileMenuFocus(e);
    }
  }

  private handleMobileMenuFocus(e: KeyboardEvent): void {
    const mobileMenu = document.getElementById('mobileMenu');
    const focusableElements = mobileMenu?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    if (!focusableElements || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  private handleHomeKey(e: KeyboardEvent): void {
    e.preventDefault();
    const event = new CustomEvent('scrollToSection', { 
      detail: { sectionId: 'hero' } 
    });
    document.dispatchEvent(event);
  }

  private handleEndKey(e: KeyboardEvent): void {
    e.preventDefault();
    const footer = document.querySelector('footer');
    if (footer) {
      const event = new CustomEvent('smoothScrollTo', { 
        detail: { element: footer } 
      });
      document.dispatchEvent(event);
    }
  }

  private handleFocusIn(element: HTMLElement): void {
    element.classList.add('focused');
  }

  private handleFocusOut(element: HTMLElement): void {
    element.classList.remove('focused');
  }

  private handleGlobalError(event: ErrorEvent): void {
    console.error('Erro global capturado:', event.error);
    
    if (Helpers.isDevEnvironment() || Helpers.isProdEnvironment()) {
      Helpers.showErrorNotification('Ocorreu um erro inesperado. Consulte o console para detalhes.');
    }
  }

  private handleUnhandledRejection(event: PromiseRejectionEvent): void {
    console.error('Promise rejeitada não tratada:', event.reason);
    
    if (Helpers.isDevEnvironment() || Helpers.isProdEnvironment()) {
      Helpers.showErrorNotification('Erro em operação assíncrona. Consulte o console para detalhes.');
    }
  }

  destroy(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }
}

export const eventManager = new EventManager();  
