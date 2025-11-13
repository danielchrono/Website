import { Component } from '../base/component';
import { scrollManager } from '../../utils/scroll-manager';

export class Timeline extends Component {
  private activeTimelineItem: number | null = null;

  constructor() {
    super({ name: 'Timeline', elementId: 'timeline' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    this.setupTimelineInteractions();
    this.setupEnhancedTimelineInteractions();
  }

  private setupTimelineInteractions(): void {
    const desktopTimelineItems = this.querySelectorAll('.timeline-content');
    const mobileTimelineItems = this.querySelectorAll('.timeline-item-mobile');
    
    desktopTimelineItems.forEach((item, index) => {
      this.createEventListeners(item, {
        click: () => this.setActiveTimelineItem(index)
      });
    });

    mobileTimelineItems.forEach((item, index) => {
      this.createEventListeners(item, {
        click: () => {
          this.setActiveTimelineItem(index);
          if (window.innerWidth < 768) {
            scrollManager.smoothScrollToElement(item as HTMLElement);
          }
        }
      });
    });
  }

  private setupEnhancedTimelineInteractions(): void {
    const timelineItems = this.querySelectorAll('.timeline-content, .timeline-item-mobile');
    
    timelineItems.forEach((item, index) => {
      this.createEventListeners(item, {
        mouseenter: () => {
          if (!item.classList.contains('active')) {
            item.classList.add('hover');
          }
        },
        mouseleave: () => {
          item.classList.remove('hover');
        }
      });
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && 
          document.querySelector('.timeline-content.active')) {
        e.preventDefault();
        const currentIndex = this.activeTimelineItem ?? 0;
        const newIndex = e.key === 'ArrowDown' 
          ? Math.min(currentIndex + 1, this.getTimelineLength() - 1)
          : Math.max(currentIndex - 1, 0);
        
        this.setActiveTimelineItem(newIndex);
      }
    });
  }

  public setActiveTimelineItem(index: number): void {
    this.querySelectorAll('.timeline-content, .timeline-item-mobile').forEach(item => {
      item.classList.remove('active');
    });

    const desktopItems = this.querySelectorAll('.timeline-content');
    const mobileItems = this.querySelectorAll('.timeline-item-mobile');
    
    if (desktopItems[index]) {
      desktopItems[index].classList.add('active');
    }
    
    if (mobileItems[index]) {
      mobileItems[index].classList.add('active');
    }

    this.activeTimelineItem = index;
  }

  private getTimelineLength(): number {
    // Isso deve vir do DOMManager ou data
    return 5; // Valor padrão
  }
}