import { animationManager } from '../../utils/animation-manager';
import { Component } from '../base/component';

export class About extends Component {
  constructor() {
    super({ name: 'About', elementId: 'about' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    animationManager.setupStatsAnimation();
  }
}