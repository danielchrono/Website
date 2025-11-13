import { CONFIG } from '../../data';
import { Component } from '../base/component';
import { scrollManager } from '../../utils/scroll-manager';
import { Helpers } from '../../utils/helpers';

export class Contact extends Component {
  private mapOpen: boolean = false;

  constructor() {
    super({ name: 'Contact', elementId: 'contact' });
  }

  render(): string {
    return ''; // Gerado pelo DOMManager
  }

  initialize(): void {
    this.setupMapToggle();
    this.setupAutoCardSizing();
  }

  private setupMapToggle(): void {
    const mapToggle = this.querySelector('#mapToggle');

    if (mapToggle) {
      this.createEventListeners(mapToggle, {
        click: async (e: Event) => {
          e.preventDefault();
          if (this.mapOpen) {
            await this.closeMap();
          } else {
            await this.openMap();
          }
        },
        keydown: (e: Event) => {
          const keyboardEvent = e as KeyboardEvent;
          if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
            keyboardEvent.preventDefault();
            (keyboardEvent.target as HTMLElement).click();
          }
        }
      });
    }
  }

  public async openMap(): Promise<void> {
    const mapContainer = this.querySelector('#mapContainer');
    const mapToggle = this.querySelector('#mapToggle');

    if (mapContainer && mapToggle) {
      this.mapOpen = true;
      mapContainer.classList.add('active');
      mapContainer.setAttribute('aria-hidden', 'false');
      mapToggle.setAttribute('aria-expanded', 'true');
      
      const span = mapToggle.querySelector('span');
      if (span) {
        span.textContent = 'Ocultar Localização';
      }

      // Esperar a transição CSS completar antes de fazer scroll
      await this.waitForMapTransition(mapContainer as HTMLElement);

      // Scroll para o mapa com offset menor para ficar mais no topo
      this.scrollToMap();
      
      // Carregar iframe dinamicamente se necessário
      this.loadMapIframe();
    }
  }

  public async closeMap(): Promise<void> {
    const mapContainer = this.querySelector('#mapContainer');
    const mapToggle = this.querySelector('#mapToggle');

    if (mapContainer && mapToggle) {
      this.mapOpen = false;
      
      // Primeiro: iniciar a animação de fechamento
      mapContainer.classList.remove('active');
      mapContainer.setAttribute('aria-hidden', 'true');
      mapToggle.setAttribute('aria-expanded', 'false');
      
      const span = mapToggle.querySelector('span');
      if (span) {
        span.textContent = 'Ver Localização';
      }

      // Esperar a transição CSS completar antes de fazer scroll
      await this.waitForMapTransition(mapContainer as HTMLElement);
      
      // Agora fazer scroll suave para o título
      this.scrollToContactTitle();
    }
  }

  private waitForMapTransition(element: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      const onTransitionEnd = () => {
        element.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      };

      // Se não houver transição, resolver imediatamente
      const computedStyle = window.getComputedStyle(element);
      const transitionDuration = computedStyle.getPropertyValue('transition-duration');
      const duration = parseFloat(transitionDuration) * 1000; // Converter para ms

      if (duration > 0) {
        element.addEventListener('transitionend', onTransitionEnd);
        
        // Timeout de fallback caso transitionend não dispare
        setTimeout(resolve, duration + 100);
      } else {
        resolve();
      }
    });
  }

  private scrollToMap(): void {
    const mapToggle = document.getElementById('mapToggle');
    if (mapToggle) {
      // Offset menor para o mapa ficar mais no topo
      scrollManager.smoothScrollToElement(mapToggle as HTMLElement, 90);
    }
  }

  private scrollToContactTitle(): void {
    const contactTitle = document.getElementById('contact');
    if (contactTitle) {
      // Scroll suave de volta para o título
      scrollManager.smoothScrollToElement(contactTitle as HTMLElement, 70);
    }
  }

  private loadMapIframe(): void {
    const mapIframe = this.querySelector('.map-iframe') as HTMLIFrameElement;
    
    if (mapIframe && !mapIframe.src) {
      const endereco = 'Rua Álvaro Alvim,2265 - Vila Amaral, Belo Horizonte - MG';
      const mapsEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(endereco)}`;
      
      mapIframe.src = mapsEmbedUrl;
      console.log('[Contact] Iframe do mapa carregado');
    }
  }

  private setupAutoCardSizing(): void {
    const resizeCards = Helpers.debounce(() => {
      const contactCards = this.querySelectorAll('.contact-card');
      const socialCards = this.querySelectorAll('.social-card');
      
      contactCards.forEach(card => (card as HTMLElement).style.height = 'auto');
      socialCards.forEach(card => (card as HTMLElement).style.height = 'auto');

      const minHeight = '85px';
      contactCards.forEach(card => {
        (card as HTMLElement).style.minHeight = minHeight;
      });
      
      socialCards.forEach(card => {
        (card as HTMLElement).style.minHeight = minHeight;
      });
    }, CONFIG.resizeDebounce);

    setTimeout(resizeCards, 100);
    window.addEventListener('resize', resizeCards);
  }

  public destroy(): void {
    super.destroy();
  }
}