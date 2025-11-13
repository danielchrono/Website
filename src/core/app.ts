import { CONFIG, TIMELINE } from '../data';
import { DOMManager } from '../components/base/dom-manager';
import { Header } from '../components/layout/header';
import { Navigation } from '../components/layout/navigation';
import { Hero } from '../components/sections/hero';
import { About } from '../components/sections/about';
import { Skills } from '../components/sections/skills';
import { Projects } from '../components/sections/projects';
import { Timeline } from '../components/sections/timeline';
import { Contact } from '../components/sections/contact';
import { Footer } from '../components/layout/footer';
import { Preloader } from '../components/layout/preloader';
import { AnimationManager } from '../utils/animation-manager';
import { PerformanceMonitor } from '../utils/performance';
import { ScrollManager } from '../utils/scroll-manager';
import { ThemeManager } from '../utils/theme-manager';
import { EventManager } from '../utils/event-manager';

export class PortfolioApp {
  private isInitialized = false;
  private currentSection = 'hero';
  
  // Managers
  private domManager: DOMManager;
  private animationManager: AnimationManager;
  private performanceMonitor: PerformanceMonitor;
  private scrollManager: ScrollManager;
  private themeManager: ThemeManager;
  private eventManager: EventManager;

  // Componentes
  private components: Map<string, any> = new Map();

  constructor() {
    this.domManager = new DOMManager();
    this.animationManager = new AnimationManager();
    this.performanceMonitor = new PerformanceMonitor();
    this.scrollManager = new ScrollManager({ scrollThreshold: CONFIG.scrollThreshold });
    this.themeManager = new ThemeManager();
    this.eventManager = new EventManager();
    
    this.init();
  }

  private async init(): Promise<void> {
    if (this.isInitialized) {
      console.warn('PortfolioApp já foi inicializado');
      return;
    }

    try {
      await this.initializeApp();
      this.isInitialized = true;
      console.log('🚀 PortfolioApp inicializado com sucesso');

    } catch (error) {
      console.error('💥 Erro na inicialização do PortfolioApp:', error);
      this.handleInitializationError();
    }
  }

  private async initializeApp(): Promise<void> {
    this.render();
    this.initializeComponents();
    this.setupManagers();
    this.setupEventListeners();
    this.handlePreloader();
  }

  private setupManagers(): void {
    // Configurar managers
    this.animationManager.setupIntersectionObserver();
    this.animationManager.setupActiveSectionObserver();
    this.animationManager.setupStableSkillAnimations();
    
    this.scrollManager.setupScrollEvents();
    this.scrollManager.setupScrollDirection();
    
    this.performanceMonitor.startMonitoring();
  }

  private initializeComponents(): void {
    // Inicializar componentes
    this.components.set('header', new Header());
    this.components.set('navigation', new Navigation());
    this.components.set('hero', new Hero());
    this.components.set('about', new About());
    this.components.set('skills', new Skills());
    this.components.set('projects', new Projects());
    this.components.set('timeline', new Timeline());
    this.components.set('contact', new Contact());
    this.components.set('footer', new Footer());
    this.components.set('preloader', new Preloader());

    // Inicializar todos os componentes
    this.components.forEach(component => {
      if (component.initialize) {
        component.initialize();
      }
    });
  }

  private setupEventListeners(): void {
    // Eventos globais
    this.eventManager.setupThemeToggle();
    this.eventManager.setupKeyboardNavigation();
    this.eventManager.setupFocusManagement();
    this.eventManager.setupErrorHandling();
    this.eventManager.setupSmoothScrolling();

    // Listeners para eventos customizados
    this.setupCustomEventListeners();
  }

  private setupCustomEventListeners(): void {
    // Tema
    document.addEventListener('themeToggle', () => {
      this.themeManager.toggleTheme();
    });

    // Scroll
    document.addEventListener('scrollToSection', (e: any) => {
      this.scrollToSection(e.detail.sectionId);
    });

    document.addEventListener('smoothScrollTo', (e: any) => {
      this.scrollManager.smoothScrollToElement(e.detail.element);
    });

    document.addEventListener('sectionChange', (e: any) => {
      this.currentSection = e.detail.section;
      this.setActiveNavigationLink(this.currentSection);
    });

    // Menu Mobile
    document.addEventListener('mobileMenuClose', () => {
      this.toggleMobileMenu(false);
    });

    document.addEventListener('escapePressed', () => {
      if (this.isMobileMenuOpen()) {
        this.toggleMobileMenu(false);
      }
    });

    // Navegação
    document.addEventListener('sectionNavigate', (e: any) => {
      this.scrollToSection(e.detail.sectionId);
    });

    // Mapa
  //   document.addEventListener('openMap', () => {
  //     this.openMap();
  //   });

  //   document.addEventListener('closeMap', () => {
  //     this.closeMap();
  //   });
  // }

  // private async openMap(): Promise<void> {
  //   const contactComponent = this.components.get('contact') as any;
  //   if (contactComponent && contactComponent.openMap) {
  //     await contactComponent.openMap();
  //   }
  // }

  // private async closeMap(): Promise<void> {
  //   const contactComponent = this.components.get('contact') as any;
  //   if (contactComponent && contactComponent.closeMap) {
  //     await contactComponent.closeMap();
  //   }
   }

  private render(): void {
    const app = document.getElementById('app');
    if (!app) {
      throw new Error('Elemento #app não encontrado no DOM');
    }

    app.innerHTML = this.domManager.generateHTML();
  }

  private handlePreloader(): void {
    const preloader = document.getElementById('preloader');
    
    const hidePreloader = () => {
      setTimeout(() => {
        preloader?.classList.add('hidden');
        
        setTimeout(() => {
          this.initializeTypewriter();
        }, 300);
        
        setTimeout(() => {
          preloader?.remove();
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

    setTimeout(() => {
      if (preloader && !preloader.classList.contains('hidden')) {
        hidePreloader();
      }
    }, CONFIG.preloaderDuration + 3000);
  }

  private initializeTypewriter(): void {
    const hero = this.components.get('hero') as Hero;
    if (hero) {
      hero.showHeroContent();
      hero.initializeTypewriter();
    }
  }

  // Métodos públicos
  public scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      this.scrollManager.smoothScrollToElement(element);
      
      if (sectionId === 'hero') {
        setTimeout(() => {
          this.resetHeroSection();
        }, 150);
      }
    }
  }

  public toggleMobileMenu(open?: boolean): void {
    const navigation = this.components.get('navigation') as Navigation;
    if (navigation) {
      navigation.toggleMobileMenu(open);
    }
  }

  private isMobileMenuOpen(): boolean {
    const navigation = this.components.get('navigation') as Navigation;
    return navigation ? navigation.isMobileMenuOpen() : false;
  }

  private resetHeroSection(): void {
    const hero = this.components.get('hero') as Hero;
    if (hero) {
      // Método para resetar hero se necessário
    }
  }

  private setActiveNavigationLink(sectionId: string): void {
    const navigation = this.components.get('navigation') as Navigation;
    if (navigation) {
      navigation.setActiveNavigationLink(sectionId);
    }
  }

  private handleInitializationError(): void {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; color: #00ffcc; text-align: center; padding: 2rem;">
          <div>
            <h1 style="font-size: 2rem; margin-bottom: 1rem;">Daniel Lopes</h1>
            <p style="margin-bottom: 1rem;">Portfólio Profissional</p>
            <p>Entre em contato: <a href="mailto:danielchrono@gmail.com" style="color: #00ffcc;">danielchrono@gmail.com</a></p>
          </div>
        </div>
      `;
    }
  }

  public destroy(): void {
    // Destruir managers
    this.animationManager.destroy();
    this.performanceMonitor.stopMonitoring();
    this.scrollManager.destroy();
    this.eventManager.destroy();
    
    // Destruir componentes
    this.components.forEach(component => {
      if (component.destroy) {
        component.destroy();
      }
    });
    
    this.isInitialized = false;
    console.log('PortfolioApp destruído');
  }

  public getCurrentSection(): string {
    return this.currentSection;
  }

  public getTimelineLength(): number {
    return TIMELINE.length;
  }
}