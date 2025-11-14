import { SKILLS, DEVELOPING_SKILLS, PROJECTS, TIMELINE, CONTACT_INFO, SOCIAL_LINKS } from '../../data';
import type { Skill, Project, TimelineItem, /* ContactInfo, SocialLink */ } from '../../core/types';

export class DOMManager {
  private currentTheme: 'light' | 'dark' = 'dark';

  constructor() {
    this.loadTheme();
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
    this.currentTheme = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  generateHTML(): string {
    return `
      <!-- Preloader -->
      <div id="preloader" class="preloader" role="status" aria-label="Carregando portfólio profissional">
        <div class="preloader-content">
          <div class="preloader-spinner" aria-hidden="true"></div>
          <div class="preloader-text">CARREGANDO PORTFÓLIO</div>
        </div>
      </div>

      <!-- Header -->
      <header class="header" id="header" data-theme="${this.currentTheme}">
        ${this.generateHeader()}
      </header>

      <main>
        <!-- Hero Section -->
        <section id="hero" class="section full-height" aria-labelledby="hero-title" data-theme="${this.currentTheme}">
          ${this.generateHero()}
        </section>

        <!-- About Section -->
        <section id="about" class="section" aria-labelledby="about-title" data-theme="${this.currentTheme}">
          ${this.generateAbout()}
        </section>

        <!-- Skills Section -->
        <section id="skills" class="section" aria-labelledby="skills-title" data-theme="${this.currentTheme}">
          ${this.generateSkills()}
        </section>

        <!-- Projects Section -->
        <section id="projects" class="section" aria-labelledby="projects-title" data-theme="${this.currentTheme}">
          ${this.generateProjects()}
        </section>

        <!-- Timeline Section -->
        <section id="timeline" class="section" aria-labelledby="timeline-title" data-theme="${this.currentTheme}">
          ${this.generateTimeline()}
        </section>

        <!-- Contact Section -->
        <section id="contact" class="section" aria-labelledby="contact-title" data-theme="${this.currentTheme}">
          ${this.generateContact()}
        </section>
      </main>

      <!-- Footer -->
      <footer class="footer" role="contentinfo" data-theme="${this.currentTheme}">
        ${this.generateFooter()}
      </footer>

    <!-- Mobile Menu (FORA DO HEADER) -->
    ${this.generateMobileMenu()}
    `;
  }

  private generateHeader(): string {
    return `
      <div class="container header-container">
        <a href="#hero" class="logo" aria-label="Página inicial - Daniel Lopes">
          <span class="logo-accent"><span class="logo-accent text-[2rem]">D</span><span class="logo-accent text-[2rem]" style="color: white">L</span></span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="nav-desktop" aria-label="Navegação principal">
          <ul class="nav-list">
            ${this.generateNavigationLinks()}
          </ul>
          <button class="theme-toggle" id="themeToggle" aria-label="Alternar tema">
            <i class="fas fa-${this.currentTheme === 'dark' ? 'sun' : 'moon'}"></i>
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-button" id="mobileMenuButton" aria-label="Abrir menu de navegação" aria-expanded="false" aria-controls="mobileMenu">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    `;
  }

  // Adicione este método para gerar o menu mobile separadamente
  private generateMobileMenu(): string {
    return `
      <!-- Mobile Menu Overlay -->
      <div class="mobile-menu-overlay" id="mobileMenuOverlay" aria-hidden="true"></div>

      <!-- Mobile Menu -->
      <div class="mobile-menu hidden" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Menu de navegação mobile" aria-hidden="true">
        <div class="mobile-menu-header">
          <button class="mobile-menu-theme-toggle" id="mobileMenuThemeToggle" aria-label="Alternar tema">
            <i class="fas fa-${this.currentTheme === 'dark' ? 'sun' : 'moon'}"></i>
          </button>
          <span class="mobile-menu-title">Menu</span>
          <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Fechar menu">
            <i class="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <nav aria-label="Navegação mobile">
          <ul class="mobile-nav-list">
            ${this.generateMobileNavigationLinks()}
          </ul>
        </nav>
      </div>
    `;
  }

  private generateHero(): string {
    return `
      <div class="container">
        <div class="section-content">
          <div class="hero-content">
            <p class="hero-greeting" data-typewriter data-text="Olá, meu nome é"></p>
            <h1 class="hero-title" id="hero-title" data-typewriter data-text="Daniel Lopes."></h1>
            <h2 class="hero-subtitle" data-typewriter data-text="Construindo pontes entre logística e tecnologia."></h2>
            <p class="hero-description">
              Profissional em transição da <strong class="highlight">logística</strong> para a <strong class="highlight">tecnologia</strong>, com mais de 
              <strong>10 anos de experiência</strong> em gestão e implantação de processos. 
              Atualmente curso <strong>Engenharia da Computação</strong> com foco em <strong>segurança da informação</strong> 
              e <strong>desenvolvimento de software</strong>, unindo experiência prática com conhecimento técnico.
            </p>
            <div class="hero-cta">
              ${this.generateCTAButtons()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private generateAbout(): string {
    return `
      <div class="container">
        <div class="section-content">
          <h2 class="section-title" id="about-title" data-number="01.">Mini Bio</h2>
          
          <div class="about-grid">
            <div class="about-content">
              <div class="about-text">
                <p>
                  Com mais de uma década de experiência em gestão operacional e logística, 
                  atuei na coordenação de equipes, implantação de filiais e automação de processos. 
                  Hoje, aplico toda essa bagagem em gestão para criar soluções tecnológicas 
                  robustas e confiáveis.
                </p>
                <p>
                  Cursando Engenharia da Computação, tenho me dedicado ao estudo de redes, 
                  criptografia e segurança da informação, sempre buscando unir a experiência 
                  prática com o conhecimento técnico mais atual.
                </p>
              </div>
              
              <div class="about-stats">
                ${this.generateStats()}
              </div>
            </div>
            
            <div class="about-image">
              <div class="image-container">
                <img 
                  src="./assets/profile-img.jpg" 
                  alt="Daniel Lopes - Engenheiro de Software e Gestor" 
                  class="profile-image"
                  loading="lazy"
                  decoding="async"
                  onerror="this.handleImageError(event)"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private generateSkills(): string {
    return `
      <div class="container">
        <div class="section-content">
          <h2 class="section-title" id="skills-title" data-number="02.">Habilidades</h2>
          
          <div class="skills-grid">
            ${this.generateSkillsCategories()}
          </div>
          
          <!-- Developing Skills -->
          <div class="skills-tags">
            <h3 class="skills-tags-title">Tecnologias em Desenvolvimento</h3>
            <div class="tags-grid">
              ${this.generateSkillsTags()}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private generateProjects(): string {
    return `
      <div class="container">
        <div class="section-content">
          <h2 class="section-title" id="projects-title" data-number="03.">Projetos</h2>
          
          <div class="projects-grid">
            ${this.generateProjectsCards()}
          </div>
        </div>
      </div>
    `;
  }

  private generateTimeline(): string {
    return `
      <div class="container">
        <div class="section-content">
          <h2 class="section-title" id="timeline-title" data-number="04.">Trajetória</h2>
          
          <!-- Desktop Timeline -->
          <div class="timeline-desktop">
            <div class="timeline-line" aria-hidden="true"></div>
            <div class="timeline-items">
              ${this.generateDesktopTimeline()}
            </div>
          </div>
          
          <!-- Mobile Timeline -->
          <div class="timeline-mobile">
            ${this.generateMobileTimeline()}
          </div>
        </div>
      </div>
    `;
  }

private generateContact(): string {
  return `
    <div class="container">
      <div class="section-content">
        <div class="contact-content">
          <h2 class="section-title" id="contact-title" data-number="05.">Contato</h2>
          <p class="contact-description">
            Estou sempre aberto a novas oportunidades, colaborações e conversas. 
            Vamos criar algo incrível juntos!
          </p>
          
          <!-- Contact Section Centralizada -->
          <div class="contact-section">
            <div class="contact-subsection">
              <h3 class="contact-subtitle">Entre em Contato</h3>
              <div class="contact-grid">
                ${this.generateContactInfo()}
              </div>
            </div>
            
            <div class="contact-subsection">
              <h3 class="contact-subtitle">Conecte-se Comigo</h3>
              <div class="social-grid">
                ${this.generateSocialLinks()}
              </div>
            </div>
          </div>
          
          <!-- Map Section -->
          <div class="map-section">
            <button class="map-toggle" id="mapToggle" aria-expanded="false" aria-controls="mapContainer">
              <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
              <span>Ver Localização</span>
            </button>
            
            <div class="map-container" id="mapContainer" role="region" aria-label="Mapa de localização" aria-hidden="true">
              <iframe
                class="map-iframe"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Rua+Álvaro+Alvim,2265+-+Vila+Amaral,+Belo+Horizonte+-+MG"
                title="Localização de Daniel Lopes em Belo Horizonte, MG"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                style="border:0;">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

  private generateFooter(): string {
    return `
      <div class="container">
        <div class="footer-content">
          <p class="footer-text">&copy; 2025 Daniel Lopes. Todos os direitos reservados.</p>
        </div>
      </div>
    `;
  }

  private generateNavigationLinks(): string {
    const links = [
      { href: '#about', text: 'Mini Bio', number: '01' },
      { href: '#skills', text: 'Habilidades', number: '02' },
      { href: '#projects', text: 'Projetos', number: '03' },
      { href: '#timeline', text: 'Trajetória', number: '04' },
      { href: '#contact', text: 'Contato', number: '05' }
    ];

    return links.map(link => `
      <li>
        <a href="${link.href}" class="nav-link" data-section="${link.href.substring(1)}">
          <span class="nav-number">${link.number}.</span>
          ${link.text}
        </a>
      </li>
    `).join('');
  }

  private generateMobileNavigationLinks(): string {
    const links = [
      { href: '#about', text: 'Mini Bio', icon: 'user' },
      { href: '#skills', text: 'Habilidades', icon: 'cog' },
      { href: '#projects', text: 'Projetos', icon: 'folder' },
      { href: '#timeline', text: 'Trajetória', icon: 'history' },
      { href: '#contact', text: 'Contato', icon: 'envelope' }
    ];

    return links.map(link => `
      <li>
        <a href="${link.href}" class="mobile-nav-link" data-section="${link.href.substring(1)}">
          <i class="fas fa-${link.icon}" aria-hidden="true"></i>
          <span>${link.text}</span>
        </a>
      </li>
    `).join('');
  }

  private generateCTAButtons(): string {
    return `
      <a href="#contact" class="btn btn-primary">
        <span>Entre em Contato</span>
        <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </a>
      <a href="#projects" class="btn btn-secondary">
        <span>Explorar Projetos</span>
        <i class="fas fa-code" aria-hidden="true"></i>
      </a>
    `;
  }

  private generateStats(): string {
    const stats = [
      { number: 10, label: 'Anos de Experiência', icon: 'briefcase' },
      { number: 3, label: 'Filiais Implantadas', icon: 'building' },
      { number: 15, label: 'Projetos Concluídos', icon: 'project-diagram' },
      { number: 50, label: 'Pessoas Lideradas', icon: 'users' }
    ];

    return stats.map(stat => `
      <div class="stat-item">
        <div class="stat-icon">
          <i class="fas fa-${stat.icon}" aria-hidden="true"></i>
        </div>
        <div class="stat-number counter" data-count="${stat.number}" data-duration="1500">0</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');
  }

  private generateSkillsCategories(): string {
    const hardSkills = SKILLS.filter(skill => skill.category === 'hard');
    const softSkills = SKILLS.filter(skill => skill.category === 'soft');

    return `
      <div class="skills-category">
        <h3 class="skills-category-title">
          <i class="fas fa-laptop-code skills-category-icon" aria-hidden="true"></i>
          Competências Técnicas
        </h3>
        <div class="skills-list">
          ${hardSkills.map(skill => this.renderSkillBar(skill)).join('')}
        </div>
      </div>
      
      <div class="skills-category">
        <h3 class="skills-category-title">
          <i class="fas fa-user-check skills-category-icon" aria-hidden="true"></i>
          Competências Comportamentais
        </h3>
        <div class="skills-list">
          ${softSkills.map(skill => this.renderSkillBar(skill)).join('')}
        </div>
      </div>
    `;
  }

  private renderSkillBar(skill: Skill): string {
    return `
      <div class="skill-item">
        <div class="skill-header">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.percentage}%</span>
        </div>
        <div class="skill-bar-container">
          <div class="skill-bar" 
               data-percentage="${skill.percentage}" 
               aria-label="${skill.name}: ${skill.percentage}% de proficiência"
               style="width: 0%">
          </div>
        </div>
        ${skill.description ? `<div class="skill-description">${skill.description}</div>` : ''}
      </div>
    `;
  }

  private generateSkillsTags(): string {
    return DEVELOPING_SKILLS.map(skill => `
      <span class="tag" data-skill="${skill.toLowerCase()}">
        <i class="fas fa-code tag-icon" aria-hidden="true"></i>
        ${skill}
      </span>
    `).join('');
  }

  private generateProjectsCards(): string {
    const featuredProjects = PROJECTS.filter(project => project.featured);
    const otherProjects = PROJECTS.filter(project => !project.featured);

    return `
      ${featuredProjects.map(project => this.renderProjectCard(project, true)).join('')}
      ${otherProjects.map(project => this.renderProjectCard(project, false)).join('')}
    `;
  }

  private generateDesktopTimeline(): string {
    return TIMELINE.map((item, index) => this.renderTimelineItem(item, index)).join('');
  }

  private renderTimelineItem(item: TimelineItem, index: number): string {
    const isEven = index % 2 === 0;
    return `
      <article class="timeline-item ${isEven ? 'timeline-item-left' : 'timeline-item-right'}" data-index="${index}">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="card-3d card-3d-timeline">
          <div class="card-3d-content">
            <div class="timeline-content-header">
              ${isEven ? `
                <i class="fas fa-${item.icon} timeline-content-icon" aria-hidden="true"></i>
                <div class="timeline-content-text">
                  <time class="timeline-date" datetime="${this.formatDateTime(item.date)}">${item.date}</time>
                  <h3 class="timeline-title">${item.title}</h3>
                  <p class="timeline-subtitle">${item.subtitle}</p>
                </div>
              ` : `
                <div class="timeline-content-text">
                  <time class="timeline-date" datetime="${this.formatDateTime(item.date)}">${item.date}</time>
                  <h3 class="timeline-title">${item.title}</h3>
                  <p class="timeline-subtitle">${item.subtitle}</p>
                </div>
                <i class="fas fa-${item.icon} timeline-content-icon" aria-hidden="true"></i>
              `}
            </div>
            <div class="timeline-content-description">
              <p class="timeline-description">${item.description}</p>
              ${item.tags ? `
                <div class="timeline-content-tags">
                  ${item.tags.map(tag => `<span class="timeline-tag">${tag}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  private generateMobileTimeline(): string {
    return TIMELINE.map((item, index) => this.renderMobileTimelineItem(item, index)).join('');
  }

  private renderMobileTimelineItem(item: TimelineItem, index: number): string {
    return `
      <article class="timeline-item-mobile" data-index="${index}">
        <div class="timeline-item-header">
          <i class="fas fa-${item.icon} timeline-icon" aria-hidden="true"></i>
          <time class="timeline-date" datetime="${this.formatDateTime(item.date)}">${item.date}</time>
        </div>
        <h3 class="timeline-title">${item.title}</h3>
        <p class="timeline-subtitle">${item.subtitle}</p>
        <p class="timeline-description">${item.description}</p>
        ${item.tags ? `
          <div class="timeline-tags">
            ${item.tags.map(tag => `<span class="timeline-tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </article>
    `;
  }

private renderProjectCard(project: Project, isFeatured: boolean): string {
  return `
    <article class="card-3d card-3d-project ${isFeatured ? 'project-card-featured' : ''}">
      <div class="card-3d-content">
        <div class="project-header">
          <div class="project-icon">
            <i class="fas fa-${isFeatured ? 'star' : 'folder'}" aria-hidden="true"></i>
          </div>
          ${isFeatured ? '<div class="project-featured-badge">Destaque</div>' : '<div></div>'}
          <div class="project-links">
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" class="project-link" aria-label="Ver código no GitHub" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github" aria-hidden="true"></i>
              </a>
            ` : ''}
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" class="project-link" aria-label="Ver projeto ao vivo" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
              </a>
            ` : ''}
          </div>
        </div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-technologies">
          ${project.technologies.map(tech => `
            <span class="technology-tag">${tech}</span>
          `).join('')}
        </div>
      </div>
    </article>
  `;
}

private generateContactInfo(): string {
  return CONTACT_INFO.map(contact => `
    <a href="${contact.href}" class="card-3d card-3d-contact" target="_blank" rel="noopener noreferrer" aria-label="${contact.type}: ${contact.value}">
      <div class="card-3d-content">
        <div class="contact-icon">
          <i class="${contact.icon}" aria-hidden="true"></i>
        </div>
        <div class="contact-info">
          <div class="contact-type">${contact.type}</div>
          <div class="contact-value">${contact.value}</div>
          ${contact.description ? `<div class="contact-description-small">${contact.description}</div>` : ''}
        </div>
      </div>
    </a>
  `).join('');
}

private generateSocialLinks(): string {
  return SOCIAL_LINKS.map(social => `
    <a href="${social.url}" class="card-3d card-3d-contact" target="_blank" rel="noopener noreferrer" aria-label="${social.platform}: ${social.username}">
      <div class="card-3d-content">
        <div class="social-icon">
          <i class="fab fa-${social.icon}" aria-hidden="true"></i>
        </div>
        <div class="social-info">
          <div class="social-platform">${social.platform}</div>
          <div class="social-username">${social.username}</div>
        </div>
      </div>
    </a>
  `).join('');
}

  private formatDateTime(dateString: string): string {
    if (dateString.includes('Presente')) {
      const year = dateString.split(' - ')[0];
      return `${year}-01-01/Present`;
    }
    if (dateString.includes(' - ')) {
      const [start, end] = dateString.split(' - ');
      return `${start}-01-01/${end}-12-31`;
    }
    return dateString;
  }

  // Método para o PortfolioApp acessar o tamanho da timeline
  getTimelineLength(): number {
    return TIMELINE.length;
  }

  // Método para tratamento de erro de imagem
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.warn('Erro ao carregar imagem:', img.src);
    img.style.display = 'none';
    
    const container = img.parentElement;
    if (container) {
      container.innerHTML = `
        <div class="image-placeholder">
          <i class="fas fa-user" aria-hidden="true"></i>
          <span>Imagem não disponível</span>
        </div>
      `;
    }
  }
}