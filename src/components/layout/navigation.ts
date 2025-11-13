import { Component } from '../base/component';

export class Navigation extends Component {
  private mobileMenuOpen: boolean = false;

  constructor() {
    super({ name: 'Navigation' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    this.setupDesktopNavigation();
    this.setupMobileNavigation();
    this.setupThemeToggle();
  }

  private setupDesktopNavigation(): void {
    const navLinks = this.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      this.createEventListeners(link, {
        click: (e) => this.handleNavLinkClick(e)
      });
    });
  }

private setupMobileNavigation(): void {
  const menuButton = this.querySelector('#mobileMenuButton');
  const menuClose = this.querySelector('#mobileMenuClose');
  const menuOverlay = this.querySelector('#mobileMenuOverlay');
  const mobileLinks = this.querySelectorAll('.mobile-nav-link');
  // const mobileMenu = this.querySelector('#mobileMenu');

  if (menuButton) {
    this.createEventListeners(menuButton, {
      click: (e: Event) => {
        e.stopPropagation();
        this.toggleMobileMenu(true);
      }
    });
  }

  if (menuClose) {
    this.createEventListeners(menuClose, {
      click: () => this.toggleMobileMenu(false)
    });
  }

  // Fechar ao clicar no overlay
  if (menuOverlay) {
    this.createEventListeners(menuOverlay, {
      click: () => this.toggleMobileMenu(false)
    });
  }

  // Fechar ao clicar nos links
  mobileLinks.forEach(link => {
    this.createEventListeners(link, {
      click: () => this.toggleMobileMenu(false)
    });
  });

  // Fechar ao clicar fora do menu
  document.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const isMenuOpen = this.mobileMenuOpen;
    const isMenuButton = target.closest('#mobileMenuButton');
    const isInsideMenu = target.closest('#mobileMenu');
    
    if (isMenuOpen && !isMenuButton && !isInsideMenu) {
      this.toggleMobileMenu(false);
    }
  });

  // Tecla Escape
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.mobileMenuOpen) {
      this.toggleMobileMenu(false);
    }
  });
}

  public isMobileMenuOpen(): boolean {
    return this.mobileMenuOpen;
  }

    public setActiveNavigationLink(sectionId: string): void {
    this.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      link.classList.remove('active');
      link.setAttribute('aria-current', 'false');
    });

  const correspondingLink = this.querySelector(`[data-section="${sectionId}"]`);
    if (correspondingLink) {
      correspondingLink.classList.add('active');
      correspondingLink.setAttribute('aria-current', 'page');
    }
  }

  private setupThemeToggle(): void {
    const themeToggle = this.querySelector('#themeToggle');
    const mobileThemeToggle = this.querySelector('#mobileMenuThemeToggle');

    const toggleTheme = () => {
      // Disparar evento global para o App
      const event = new CustomEvent('themeToggle');
      document.dispatchEvent(event);
    };

    if (themeToggle) {
      this.createEventListeners(themeToggle, {
        click: toggleTheme
      });
    }

    if (mobileThemeToggle) {
      this.createEventListeners(mobileThemeToggle, {
        click: toggleTheme
      });
    }
  }

  private handleNavLinkClick(e: Event): void {
    e.preventDefault();
    const target = e.target as HTMLAnchorElement;
    const href = target.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      // Disparar evento de navegação
      const event = new CustomEvent('sectionNavigate', { detail: { sectionId: href.substring(1) } });
      document.dispatchEvent(event);
    }
  }

  public toggleMobileMenu(open?: boolean): void {
    this.mobileMenuOpen = open !== undefined ? open : !this.mobileMenuOpen;
    
    const mobileMenu = this.querySelector('#mobileMenu');
    const overlay = this.querySelector('#mobileMenuOverlay');
    const body = document.body;

    if (this.mobileMenuOpen) {
      mobileMenu?.classList.remove('hidden');
      mobileMenu?.classList.add('active');
      overlay?.classList.add('active');
      body.style.overflow = 'hidden';
      
      // Foco no primeiro link
      setTimeout(() => {
        const firstLink = mobileMenu?.querySelector('.mobile-nav-link') as HTMLElement;
        firstLink?.focus();
      }, 150);
    } else {
      mobileMenu?.classList.add('hidden');
      mobileMenu?.classList.remove('active');
      overlay?.classList.remove('active');
      body.style.overflow = '';
      
      // Devolver foco ao botão do menu
      const menuButton = this.querySelector('#mobileMenuButton');
      menuButton?.focus();
    }
  }

  public onThemeChange(theme: 'light' | 'dark'): void {
    const themeToggles = this.querySelectorAll('.theme-toggle, .mobile-menu-theme-toggle');
    
    themeToggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.className = `fas fa-${theme === 'dark' ? 'sun' : 'moon'}`;
      }
    });
  }
}