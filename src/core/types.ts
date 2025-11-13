export interface Skill {
  name: string;
  percentage: number;
  category: 'hard' | 'soft';
  description?: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'work' | 'education' | 'certification';
  icon: string;
  tags?: string[];
}

export interface ContactInfo {
  type: string;
  value: string;
  href: string;
  icon: string;
  description?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username: string;
}

export interface Config {
  preloaderDuration: number;
  scrollThreshold: number;
  animationDelay: number;
  resizeDebounce: number;
  typewriterSpeed: number;
  counterDuration: number;
  scrollOffset: number;
}

export interface AppState {
  mobileMenuOpen: boolean;
  currentTheme: 'light' | 'dark';
  currentSection: string;
  mapOpen: boolean;
  typewriterCompleted: boolean;
  isInitialized: boolean;
}

export interface ComponentConfig {
  name: string;
  elementId?: string;
}

// Custom Event Types
export interface SectionNavigateEvent extends CustomEvent {
  detail: {
    sectionId: string;
  };
}

export interface SmoothScrollEvent extends CustomEvent {
  detail: {
    element: HTMLElement;
  };
}

export interface SectionChangeEvent extends CustomEvent {
  detail: {
    section: string;
  };
}

export interface ThemeToggleEvent extends CustomEvent {}
export interface MobileMenuCloseEvent extends CustomEvent {}
export interface EscapePressedEvent extends CustomEvent {}
export interface OpenMapEvent extends CustomEvent {}
export interface CloseMapEvent extends CustomEvent {}
export interface ScrollToSectionEvent extends CustomEvent {
  detail: {
    sectionId: string;
  };
}

// Extender a interface Document para incluir nossos eventos customizados
declare global {
  interface Document {
    addEventListener(type: 'sectionNavigate', listener: (event: SectionNavigateEvent) => void): void;
    addEventListener(type: 'smoothScrollTo', listener: (event: SmoothScrollEvent) => void): void;
    addEventListener(type: 'sectionChange', listener: (event: SectionChangeEvent) => void): void;
    addEventListener(type: 'themeToggle', listener: (event: ThemeToggleEvent) => void): void;
    addEventListener(type: 'mobileMenuClose', listener: (event: MobileMenuCloseEvent) => void): void;
    addEventListener(type: 'escapePressed', listener: (event: EscapePressedEvent) => void): void;
    addEventListener(type: 'openMap', listener: (event: OpenMapEvent) => void): void;
    addEventListener(type: 'closeMap', listener: (event: CloseMapEvent) => void): void;
    addEventListener(type: 'scrollToSection', listener: (event: ScrollToSectionEvent) => void): void;
  }
}