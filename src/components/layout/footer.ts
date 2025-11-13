import { Component } from '../base/component';

export class Footer extends Component {
  constructor() {
    super({ name: 'Footer', elementId: 'footer' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    // Footer não precisa de inicialização complexa
  }
}