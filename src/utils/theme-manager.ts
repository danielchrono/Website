// import { Helpers } from './helpers';

export class ThemeManager {
  private currentTheme: 'light' | 'dark' = 'dark';

  constructor() {
    this.loadTheme();
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
    this.currentTheme = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateBodyTheme();
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateAllSectionsTheme();
    
    localStorage.setItem('portfolio-theme', this.currentTheme);
    this.updateThemeIcons();
    
    console.log('🎨 Tema alterado para:', this.currentTheme);
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }

  private updateBodyTheme(): void {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.setAttribute('data-theme', this.currentTheme);
    });
    
    const footer = document.querySelector('footer');
    if (footer) {
      footer.setAttribute('data-theme', this.currentTheme);
    }
  }

  private updateAllSectionsTheme(): void {
    const sections = document.querySelectorAll('section, header, footer');
    sections.forEach(section => {
      section.setAttribute('data-theme', this.currentTheme);
    });
  }

  private updateThemeIcons(): void {
    const themeToggles = document.querySelectorAll('.theme-toggle, .mobile-menu-theme-toggle');
    themeToggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.className = `fas fa-${this.currentTheme === 'dark' ? 'sun' : 'moon'}`;
      }
    });
  }
}