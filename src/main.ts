import './styles/main.css';
import { PortfolioApp } from './core/app';

let portfolioApp: PortfolioApp | null = null;

const initializeApp = (): void => {
  try {
    if (portfolioApp) {
      console.warn('PortfolioApp já foi inicializado');
      return;
    }

    portfolioApp = new PortfolioApp();

    // Expor para desenvolvimento
    if (typeof import.meta.env !== 'undefined' && import.meta.env.DEV) {
      (window as any).portfolioApp = portfolioApp;
    }

  } catch (error) {
    console.error('💥 Falha crítica na inicialização:', error);
    showErrorFallback();
  }
};

const showErrorFallback = (): void => {
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = `
      <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0a0a0a; color: #00ffcc; text-align: center; padding: 2rem;">
        <div>
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">Daniel Lopes</h1>
          <p style="margin-bottom: 1rem;">Desculpe, houve um erro ao carregar o portfólio.</p>
          <p>Entre em contato: <a href="mailto:danielchrono@gmail.com" style="color: #00ffcc;">danielchrono@gmail.com</a></p>
        </div>
      </div>
    `;
  }
};

// Setup básico
document.addEventListener('DOMContentLoaded', initializeApp);

export { portfolioApp };