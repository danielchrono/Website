export abstract class Component<TConfig = { name: string; elementId?: string }> {
  protected element: HTMLElement | null;
  protected name: string;
  protected isInitialized: boolean = false;

  constructor(config: TConfig) {
    const { name, elementId } = config as any;
    this.name = name;
    this.element = elementId ? document.getElementById(elementId) : null;
  }

  abstract render(): string;
  abstract initialize(): void;

  protected querySelector<T extends HTMLElement = HTMLElement>(selector: string): T | null {
    return this.element ? this.element.querySelector<T>(selector) : document.querySelector<T>(selector);
  }

  protected querySelectorAll<T extends HTMLElement = HTMLElement>(selector: string): NodeListOf<T> {
    return this.element ? this.element.querySelectorAll<T>(selector) : document.querySelectorAll<T>(selector);
  }

  protected createEventListeners(
    element: HTMLElement, 
    events: { [key: string]: EventListener }
  ): void {
    Object.entries(events).forEach(([eventType, handler]) => {
      element.addEventListener(eventType, handler);
    });
  }

  protected removeEventListeners(
    element: HTMLElement, 
    events: { [key: string]: EventListener }
  ): void {
    Object.entries(events).forEach(([eventType, handler]) => {
      element.removeEventListener(eventType, handler);
    });
  }

  protected dispatchEvent(eventName: string, detail?: any): void {
    const event = new CustomEvent(eventName, { detail });
    document.dispatchEvent(event);
  }

  protected subscribe(eventName: string, handler: EventListener): void {
    document.addEventListener(eventName, handler);
  }

  public getElement(): HTMLElement | null {
    return this.element;
  }

  public show(): void {
    if (this.element) {
      this.element.style.display = 'block';
    }
  }

  public hide(): void {
    if (this.element) {
      this.element.style.display = 'none';
    }
  }

  public destroy(): void {
    // Cleanup to be implemented by child classes
    this.isInitialized = false;
  }
}