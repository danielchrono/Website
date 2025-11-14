import { AppState } from './types';

export class StateManager {
  private state: AppState;
  private listeners: Map<keyof AppState, Function[]> = new Map();

  constructor(initialState: AppState) {
    this.state = { ...initialState };
  }

  setState<K extends keyof AppState>(key: K, value: AppState[K]): void {
    const oldValue = this.state[key];
    this.state[key] = value;
    
    if (oldValue !== value) {
      this.notifyListeners(key, value, oldValue);
    }
  }

  getState<K extends keyof AppState>(key: K): AppState[K] {
    return this.state[key];
  }

  subscribe<K extends keyof AppState>(key: K, callback: (newValue: AppState[K], oldValue: AppState[K]) => void): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    
    const listeners = this.listeners.get(key)!;
    listeners.push(callback);

    return () => {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners<K extends keyof AppState>(key: K, newValue: AppState[K], oldValue: AppState[K]): void {
    const listeners = this.listeners.get(key) || [];
    listeners.forEach(listener => listener(newValue, oldValue));
  }

  reset(): void {
    this.state = {
      mobileMenuOpen: false,
      currentTheme: 'dark',
      currentSection: 'hero',
      mapOpen: false,
      typewriterCompleted: false,
      isInitialized: false,
      scrollDirection: 'down'
    };
  }
}