import { Component } from '../base/component';

export class Projects extends Component {
  constructor() {
    super({ name: 'Projects', elementId: 'projects' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    this.setupProjectInteractions();
    this.setupAutoCardSizing();
  }

  private setupProjectInteractions(): void {
    const projectCards = this.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      this.createEventListeners(card, {
        mouseenter: () => this.handleProjectHover(card as HTMLElement, true),
        mouseleave: () => this.handleProjectHover(card as HTMLElement, false)
      });
    });
  }

  private handleProjectHover(card: HTMLElement, isHovering: boolean): void {
    if (isHovering) {
      card.style.transform = 'translateY(-5px)';
    } else {
      card.style.transform = 'translateY(0)';
    }
  }

  private setupAutoCardSizing(): void {
    const resizeCards = () => {
      const projectCards = this.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        (card as HTMLElement).style.height = 'auto';
      });

      const minHeight = '280px';
      projectCards.forEach(card => {
        (card as HTMLElement).style.minHeight = minHeight;
      });
    };

    setTimeout(resizeCards, 100);
    window.addEventListener('resize', resizeCards);
  }

  public handleResize(): void {
    this.setupAutoCardSizing();
  }
}