import { Component } from '../base/component';

export class Skills extends Component {
  constructor() {
    super({ name: 'Skills', elementId: 'skills' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    this.setupSkillsAnimation();
  }

  private setupSkillsAnimation(): void {
    const skillBars = this.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.getAttribute('data-animated')) {
          const bar = entry.target as HTMLElement;
          const percentage = bar.getAttribute('data-percentage');
          
          if (percentage) {
            bar.setAttribute('data-animated', 'true');
            
            setTimeout(() => {
              bar.style.transition = 'width 1.2s ease-in-out';
              bar.style.width = `${percentage}%`;
            }, 150);
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => observer.observe(bar));
  }
}