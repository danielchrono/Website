export class AnimationManager {
  private observers: IntersectionObserver[] = [];
  private animationFrameId: number | null = null;

  setupIntersectionObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.handleElementInViewport(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    const elementsToObserve = document.querySelectorAll(
      '.skill-bar, .counter, .project-card, .timeline-item, .stat-item, .contact-card, .social-card'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));
    this.observers.push(observer);
  }

  setupActiveSectionObserver(): void {
    const sectionObserver = new IntersectionObserver((entries) => {
      let mostVisibleSection = 'hero';
      let maxRatio = 0;

      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          const id = entry.target.getAttribute('id');
          if (id) {
            mostVisibleSection = id;
          }
        }
      });

      const event = new CustomEvent('sectionChange', { 
        detail: { section: mostVisibleSection } 
      });
      document.dispatchEvent(event);
    }, {
      threshold: [0.1, 0.5, 0.8],
      rootMargin: '-25% 0px -25% 0px'
    });

    document.querySelectorAll('section[id]').forEach(section => {
      sectionObserver.observe(section);
    });

    this.observers.push(sectionObserver);
  }

  setupStableSkillAnimations(): void {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.getAttribute('data-animated')) {
          const bar = entry.target as HTMLElement;
          const percentage = bar.getAttribute('data-percentage');
          
          if (percentage) {
            bar.setAttribute('data-animated', 'true');
            
            // CORREÇÃO: Sem delay e sem overshoot
            requestAnimationFrame(() => {
              bar.style.transition = 'width 1s ease-out'; // Transição mais suave
              bar.style.width = `${percentage}%`;
            });
          }
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => observer.observe(bar));
  }

  private handleElementInViewport(element: Element): void {
    if (element.classList.contains('skill-bar')) {
      // Já tratado pelo observer específico
      return;
    } else if (element.classList.contains('counter')) {
      this.animateCounter(element as HTMLElement);
    } else {
      element.classList.add('animate-fade-in-up');
    }
  }

  animateCounter(element: HTMLElement): void {
    const target = parseInt(element.getAttribute('data-count') || '0', 10);
    const duration = 1500;
    
    if (isNaN(target) || element.dataset.animated) return;
    
    element.dataset.animated = 'true';
    this.startCounterAnimation(element, 0, target, duration);
  }

  private startCounterAnimation(element: HTMLElement, start: number, end: number, duration: number): void {
    const startTime = performance.now();
    
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutBack = 1 + 2.70158 * Math.pow(progress - 1, 3) + 1.70158 * Math.pow(progress - 1, 2);
      const current = Math.floor(start + (end - start) * easeOutBack);
      
      element.textContent = current.toString();
      
      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(step);
      }
    };
    
    this.animationFrameId = requestAnimationFrame(step);
  }

  smoothScrollTo(element: HTMLElement, offset: number = 70): void {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    });
  }

  destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}