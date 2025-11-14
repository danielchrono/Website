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
  status?: 'completed' | 'development' | 'planning';
}

export interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'work' | 'education' | 'certification';
  icon: string;
  tags?: string[];
  achievements?: string[];
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
  scrollDirection: 'up' | 'down';
}

export type AppEvent = 
  | 'themeToggle'
  | 'sectionNavigate' 
  | 'sectionChange'
  | 'mobileMenuToggle'
  | 'mapToggle'
  | 'preloaderHidden'
  | 'typewriterComplete';

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

export interface CustomEventMap {
  themeToggle: CustomEvent;
  sectionNavigate: CustomEvent<{ sectionId: string }>;
  sectionChange: CustomEvent<{ section: string }>;
  mobileMenuToggle: CustomEvent<{ open: boolean }>;
  mapToggle: CustomEvent<{ open: boolean }>;
  preloaderHidden: CustomEvent;
  typewriterComplete: CustomEvent;
}

// Extender a interface Document para incluir nossos eventos customizados
declare global {
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(event: CustomEventMap[K]): void;
  }
}