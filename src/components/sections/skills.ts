import { animationManager } from '../../utils/animation-manager';
import { Component } from '../base/component';

export class Skills extends Component {
  constructor() {
    super({ name: 'Skills', elementId: 'skills' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    animationManager.setupSkillsAnimation();
  }
}