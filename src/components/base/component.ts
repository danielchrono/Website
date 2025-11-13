export abstract class Component {
  protected element: HTMLElement | null;
  protected name: string;

  constructor(config: { name: string; elementId?: string }) {
    this.name = config.name;
    this.element = config.elementId ? document.getElementById(config.elementId) : null;
  }

  abstract render(): string;
  abstract initialize(): void;

  protected querySelector(selector: string): HTMLElement | null {
    return this.element ? this.element.querySelector(selector) : document.querySelector(selector);
  }

  protected querySelectorAll(selector: string): NodeListOf<HTMLElement> {
    return this.element ? this.element.querySelectorAll(selector) : document.querySelectorAll(selector);
  }

protected createEventListeners(
  element: HTMLElement, 
  events: { [key: string]: EventListener }
): void {
  Object.keys(events).forEach(eventType => {
    element.addEventListener(eventType, events[eventType]);
  });
}

protected removeEventListeners(
  element: HTMLElement, 
  events: { [key: string]: EventListener }
): void {
  Object.keys(events).forEach(eventType => {
    element.removeEventListener(eventType, events[eventType]);
  });
}

  public destroy(): void {
    // Para ser implementado pelos componentes filhos
  }
}