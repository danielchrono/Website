import './style.css';

// Types
interface Skill {
  name: string;
  percentage: number;
}

interface Project {
  title: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
}

interface TimelineItem {
  date: string;
  title: string;
  subtitle: string;
  description: string;
}

// Data
const skills: { hard: Skill[]; soft: Skill[] } = {
  hard: [
    { name: 'Gestão Operacional', percentage: 95 },
    { name: 'Automação (Excel/VBA)', percentage: 85 },
    { name: 'Sistemas TMS', percentage: 80 },
    { name: 'Segurança da Informação', percentage: 40 }
  ],
  soft: [
    { name: 'Liderança', percentage: 90 },
    { name: 'Resolução de Problemas', percentage: 88 },
    { name: 'Adaptabilidade', percentage: 85 },
    { name: 'Comunicação', percentage: 82 }
  ]
};

const projects: Project[] = [
  {
    title: 'Sistema de Automação',
    description: 'Automatização de relatórios com VBA, reduzindo tempo de análise.',
    githubUrl: '#'
  },
  {
    title: 'Implantação de Filial',
    description: 'Estruturação de base logística em BH, com definição de processos.',
    githubUrl: '#'
  },
  {
    title: 'Portfólio Pessoal',
    description: 'Este site, desenvolvido com tecnologias modernas.',
    githubUrl: '#'
  }
];

const timeline: TimelineItem[] = [
  {
    date: '2025 - Presente',
    title: 'Logic Log Pharma',
    subtitle: 'Encarregado Operacional Sênior',
    description: 'Responsável pela implantação da filial em BH/MG, estruturação física e operacional da base.'
  },
  {
    date: '2025 - 2030',
    title: 'Instituto Infnet',
    subtitle: 'Bacharelado em Engenharia da Computação',
    description: 'Cursando o primeiro período com foco em segurança da informação e desenvolvimento de software.'
  },
  {
    date: '2018 - 2025',
    title: 'DV3 Soluções Logísticas',
    subtitle: 'Coordenador / Supervisor Administrativo',
    description: 'Liderança na implantação da filial em BH/MG, reestruturação física do espaço logístico e criação de protocolos operacionais.'
  },
  {
    date: '2016 - 2018',
    title: 'Oliveira Silva Transportes',
    subtitle: 'Gerente Comercial',
    description: 'Gestão completa da operação em BH, administração de equipe de mais de 50 pessoas e expansão da carteira de clientes.'
  },
  {
    date: '2009 - 2011',
    title: 'ETFG (SEBRAE/MG)',
    subtitle: 'Ensino Médio Integrado ao Técnico em Administração',
    description: 'Formação com ênfase em gestão empresarial prática e desenvolvimento de visão sistêmica de negócios.'
  },
];

// Components
class PortfolioApp {
  private mobileMenuOpen = false;
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    this.render();
    this.setupEventListeners();
    this.setupAnimations();
  }

  private setupEventListeners(): void {
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMobileMenu();
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (this.mobileMenuOpen &&
          !target.closest('#mobile-menu') &&
          !target.closest('#mobile-menu-btn')) {
        this.closeMobileMenu();
      }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetEl = document.querySelector(href) as HTMLElement | null;
          if (targetEl) {
            const top = targetEl.getBoundingClientRect().top + window.scrollY - this.getHeaderHeight();
            window.scrollTo({
              top,
              behavior: 'smooth'
            });
            // close mobile menu when navigating
            this.closeMobileMenu();
          }
        }
      });
    });

    // Map toggle
    const mapToggle = document.getElementById('map-toggle');
    const mapContainer = document.getElementById('map-container');

    // Abre/fecha o mapa e faz o scroll adequado
    mapToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      if (!mapContainer) return;

      const isHidden = mapContainer.classList.contains('hidden');
      if (isHidden) {
        this.openMap();
      } else {
        this.closeMapAndScrollToContato();
      }
    });

    // "Ver localização" - qualquer elemento com essa classe ou um link para #map vai abrir o mapa e rolar até a área
    document.querySelectorAll('.view-location, a[href="#map"], [data-scroll-to="map"]').forEach(el => {
      el.addEventListener('click', (ev) => {
        ev.preventDefault();
        this.openMap();
      });
    });

    // Enhance responsiveness: contact card expansion + timeline collapse on mobile
    this.enhanceResponsiveUI();
  }

  private setupAnimations(): void {
    // Intersection Observer for animations
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target as HTMLElement;

        // Counters: animar apenas uma vez
        if (el.classList.contains('counter')) {
          if (entry.isIntersecting && !el.dataset.animated) {
            this.animateCounter(el);
          }
          return;
        }

        // Skill bars: animar apenas uma vez (mesma lógica)
        if (el.classList.contains('skill-bar')) {
          if (entry.isIntersecting && !el.dataset.animated) {
            this.animateSkillBar(el);
          }
          return;
        }

        // Sections: marca quando em view (pode ser usado para efeitos)
        if (el.classList.contains('section')) {
          if (entry.isIntersecting) el.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-50px 0px -50px 0px'
    });

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
      this.observer?.observe(section);
    });

    // Observe counters
    document.querySelectorAll('.counter').forEach(counter => {
      this.observer?.observe(counter);
    });

    // Observe skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
      this.observer?.observe(bar);
    });
  }

  private toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    if (this.mobileMenuOpen) {
      mobileMenu?.classList.remove('hidden');
      body.style.overflow = 'hidden';
    } else {
      mobileMenu?.classList.add('hidden');
      body.style.overflow = '';
    }
  }

  private closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    mobileMenu?.classList.add('hidden');
    body.style.overflow = '';
  }

  private animateCounter(element: HTMLElement): void {
    // evita múltiplas execuções
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';

    const target = parseInt(element.getAttribute('data-count') || '0', 10);
    if (isNaN(target) || target <= 0) {
      element.textContent = '0';
      return;
    }

    const duration = parseInt(element.getAttribute('data-duration') || '1800', 10); // ms
    const frames = Math.max(30, Math.round(duration / 16));
    let frame = 0;
    const start = 0;

    const step = () => {
      frame++;
      const progress = frame / frames;
      // ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(start + (target - start) * eased);
      element.textContent = String(value);
      if (frame < frames) {
        requestAnimationFrame(step);
      } else {
        element.textContent = String(target);
      }
    };

    requestAnimationFrame(step);
  }

  private animateSkillBar(element: HTMLElement): void {
    const percentage = element.getAttribute('data-percentage');
    if (percentage) {
      setTimeout(() => {
        element.style.width = `${percentage}%`;
      }, 300);
    }
  }

  private renderSkillBar(skill: Skill): string {
    return `
      <div class="skill-item mb-6">
        <div class="flex justify-between text-sm mb-2">
          <span class="text-lightestSlate font-medium">${skill.name}</span>
          <span class="text-brand font-semibold">${skill.percentage}%</span>
        </div>
        <div class="w-full bg-navy rounded-full h-3 overflow-hidden">
          <div class="skill-bar bg-brand h-3 rounded-full transition-all duration-1000 ease-out" 
               data-percentage="${skill.percentage}"
               style="width: 0%"></div>
        </div>
      </div>
    `;
  }

  private renderProjectCard(project: Project): string {
    return `
      <div class="bg-lightNavy rounded-xl p-8 hover:transform hover:-translate-y-3 transition-all duration-500 border border-gray-800 hover:border-brand/50 shadow-lg hover:shadow-2xl hover:shadow-brand/10">
        <div class="flex justify-between items-start mb-6">
          <i class="far fa-folder text-brand text-3xl"></i>
          <div class="flex space-x-4">
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" class="text-slate hover:text-brand transition-colors duration-300 text-lg">
                <i class="fab fa-github" style="font-size: 2rem;"></i>
              </a>
            ` : ''}
          </div>
        </div>
        <h3 class="text-lightestSlate text-xl font-bold mb-4">${project.title}</h3>
        <p class="text-slate leading-relaxed">${project.description}</p>
      </div>
    `;
  }

private renderTimelineItem(item: TimelineItem, index: number): string {
    const isEven = index % 2 === 0;
    
    // Classes para alinhamento do conteúdo no desktop
    const desktopAlignmentClass = isEven ? 'md:justify-start' : 'md:justify-end';
    const desktopPaddingClass = isEven ? 'md:pr-16' : 'md:pl-16'; // Espaçamento para o centro
    const desktopTextAlignmentClass = isEven ? 'md:text-right' : 'md:text-left';

    return `
        <div class="relative w-full mb-12 flex items-center ${desktopAlignmentClass}">
            
            <div class="hidden md:flex w-full ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center">
                <div class="w-1/2 ${desktopPaddingClass}">
                    <div class="bg-lightNavy rounded-xl p-8 border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-brand/50 ${desktopTextAlignmentClass}">
                        <div class="text-brand font-bold text-lg mb-3">${item.date}</div>
                        <h3 class="text-lightestSlate font-bold text-2xl mb-2">${item.title}</h3>
                        <p class="text-brand text-lg font-semibold mb-4">${item.subtitle}</p>
                        <p class="text-slate text-base leading-relaxed">${item.description}</p>
                    </div>
                </div>
                
                <div class="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brand rounded-full border-4 border-lightNavy z-20 shadow-xl"></div>
            </div>
            
            <div class="md:hidden flex w-full relative">
                
                <div class="absolute left-[33px] top-4 w-4 h-4 bg-brand rounded-full border-4 border-lightNavy z-20 transform -translate-x-1/2 shadow-lg"></div>

                <div class="flex-grow ml-16">
                    <div class="bg-lightNavy rounded-xl p-6 border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 mb-4">
                        <div class="text-brand font-bold text-base mb-2">${item.date}</div>
                        <h3 class="text-lightestSlate font-bold text-xl mb-2">${item.title}</h3>
                        <p class="text-brand text-base font-semibold mb-3">${item.subtitle}</p>
                        <p class="text-slate text-sm leading-relaxed">${item.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

  private render(): void {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <!-- Header -->
      <header class="fixed top-0 w-full bg-navy/95 backdrop-blur-md z-50 border-b border-gray-800/50">
        <div class="container mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <a href="#inicio" class="text-2xl font-bold text-lightestSlate hover:text-brand transition-colors duration-300">
              <span class="text-brand">D</span>L
            </a>
            
            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-8">
              ${[
                { name: 'sobre', icon: 'user' },
                { name: 'habilidades', icon: 'tools' },
                { name: 'projetos', icon: 'laptop-code' },
                { name: 'historico', icon: 'history' },
                { name: 'contato', icon: 'envelope' }
              ].map((item, index) => `
                <a href="#${item.name}" class="text-lightestSlate hover:text-brand transition-colors duration-300 text-sm font-medium flex items-center space-x-2 group">
                  <span class="text-brand text-xs font-mono">0${index + 1}.</span>
                  <i class="fas fa-${item.icon} text-xs text-brand"></i>
                  <span class="group-hover:translate-y-[-2px] transition-transform duration-300">${this.capitalizeFirstLetter(item.name)}</span>
                </a>
              `).join('')}
            </nav>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="md:hidden flex flex-col space-y-1.5 p-2">
              <span class="w-6 h-0.5 bg-brand transition-all duration-300 ${this.mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}"></span>
              <span class="w-6 h-0.5 bg-brand transition-all duration-300 ${this.mobileMenuOpen ? 'opacity-0' : ''}"></span>
              <span class="w-6 h-0.5 bg-brand transition-all duration-300 ${this.mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="md:hidden hidden fixed inset-0 z-40 pt-24">          
        <div class="container mx-auto px-6 bg-gradient-to-b from-navy to-lightNavy rounded-lg shadow-2xl border border-gray-800/50">
            <nav class="flex flex-col space-y-2">
              ${[
                { name: 'sobre', icon: 'user' },
                { name: 'habilidades', icon: 'tools' },
                { name: 'projetos', icon: 'laptop-code' },
                { name: 'historico', icon: 'history' },
                { name: 'contato', icon: 'envelope' }
              ].map((item, index) => `
                <a href="#${item.name}" class="mobile-link text-lightestSlate hover:text-brand text-2xl font-semibold flex items-center space-x-4 py-4 px-6 rounded-lg hover:bg-lightNavy transition-all duration-300 group">
                  <span class="text-brand text-sm font-mono">0${index + 1}.</span>
                  <i class="fas fa-${item.icon} text-brand text-lg"></i>
                  <span class="group-hover:translate-x-2 transition-transform duration-300">${this.capitalizeFirstLetter(item.name)}</span>
                </a>
              `).join('')}
            </nav>
          </div>
        </div>
      </header>

      <main class="relative">
        <!-- Hero Section -->
        <section id="inicio" class="min-h-screen-dvh flex items-center justify-center pt-20 bg-navy">
          <div class="container mx-auto px-6">
            <div class="max-w-4xl">
              <p class="text-brand text-lg md:text-xl mb-4 animate-fade-in">Olá, meu nome é</p>

              <!-- Mantém o texto dentro do elemento como fallback; typewriter usará data-text -->
              <h1
                class="text-4xl md:text-6xl lg:text-7xl font-bold text-lightestSlate mb-6 animate-fade-in"
                style="animation-delay: 0.1s"
                data-typewriter
                data-text="Daniel Lopes."
                data-type-speed="40"
                aria-live="polite"
              >Daniel Lopes.</h1>

              <h2
                class="text-2xl md:text-3xl lg:text-4xl text-slate mb-8 animate-fade-in"
                style="animation-delay: 0.2s"
                data-typewriter
                data-text="Construindo pontes entre logística e tecnologia."
                data-type-speed="28"
              >Construindo pontes entre logística e tecnologia.</h2>
              
              <p class="text-slate text-lg md:text-xl mb-12 max-w-3xl leading-relaxed animate-fade-in" style="animation-delay: 0.3s">
                Profissional em transição da logística para a tecnologia, com mais de 
                <strong class="text-lightestSlate font-semibold">10 anos de experiência</strong> em gestão e implantação de processos. 
                Atualmente curso Engenharia da Computação com foco em segurança da informação.
              </p>
              <div class="flex flex-wrap gap-4 animate-fade-in" style="animation-delay: 0.4s">
                <a href="#contato" class="bg-brand text-navy px-8 py-4 rounded-lg font-bold hover:bg-transparent hover:text-brand border-2 border-brand transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-brand/25">
                  Entre em Contato <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                </a>
                <a href="#projetos" class="border-2 border-brand text-brand px-8 py-4 rounded-lg font-bold hover:bg-brand hover:text-navy transition-all duration-300 transform hover:-translate-y-1">
                  Ver Projetos
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- About Section -->
        <section id="sobre" class="section min-h-screen-dvh flex items-center justify-center py-20 bg-navy">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-lightestSlate mb-16 flex items-center">
              <span class="text-brand text-xl md:text-2xl mr-4 font-mono">01.</span> Sobre Mim
            </h2>
            
            <div class="grid md:grid-cols-2 gap-16 items-center">
              <div class="space-y-6">
                <p class="text-slate text-lg leading-relaxed">
                  Atuei em coordenação operacional, implantação de filiais e automação de processos. 
                  Hoje aplico minha experiência em gestão para criar soluções tecnológicas confiáveis.
                </p>
                <p class="text-slate text-lg leading-relaxed">
                  Cursando Engenharia da Computação, tenho interesse em redes, criptografia e segurança da informação.
                </p>
                
                <div class="grid grid-cols-3 gap-8 pt-8">
                  ${[
                    { number: 10, label: 'Anos de Experiência' },
                    { number: 3, label: 'Filiais Implantadas' },
                    { number: 5, label: 'Projetos Concluídos' }
                  ].map(stat => `
                    <div class="text-center">
                      <div class="counter text-3xl md:text-4xl font-bold text-brand mb-2" data-count="${stat.number}">0</div>
                      <div class="text-sm text-slate font-medium">${stat.label}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              
              <div class="flex justify-center">
                <div class="relative group">
                  <div class="w-72 h-72 rounded-full border-4 border-brand overflow-hidden shadow-2xl group-hover:shadow-brand/30 transition-all duration-500">
                    <img src="./assets/profile-img.jpg" alt="Daniel Lopes - Engenheiro de Software" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                         loading="lazy"
                         decoding="async"
                         onerror="this.style.display='none'">
                  </div>
                  <div class="absolute -inset-4 bg-brand/20 rounded-full blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="habilidades" class="section min-h-screen-dvh flex items-center justify-center py-20 bg-lightNavy">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-lightestSlate mb-16 flex items-center">
              <span class="text-brand text-xl md:text-2xl mr-4 font-mono">02.</span> Habilidades
            </h2>
            
            <div class="grid md:grid-cols-2 gap-16 mb-4">
              <!-- Hard Skills -->
              <div>
                <h3 class="text-2xl font-semibold text-lightestSlate mb-8 flex items-center">
                  <i class="fas fa-laptop-code text-brand mr-4 text-xl"></i> Hard Skills
                </h3>
                ${skills.hard.map(skill => this.renderSkillBar(skill)).join('')}
              </div>
              
              <!-- Soft Skills -->
              <div>
                <h3 class="text-2xl font-semibold text-lightestSlate mb-8 flex items-center">
                  <i class="fas fa-user-check text-brand mr-4 text-xl"></i> Soft Skills
                </h3>
                ${skills.soft.map(skill => this.renderSkillBar(skill)).join('')}
              </div>
            </div>
            
            <!-- Additional Skills -->
            <div>
              <h3 class="text-2xl font-semibold text-lightestSlate mb-8">Em Desenvolvimento</h3>
              <div class="flex flex-wrap gap-3">
                ${[
                  'HTML5 & CSS3', 'JavaScript', 'Python', 'Redes de Computadores',
                  'Linux', 'Fundamentos de Criptografia', 'Ethical Hacking', 'Cybersecurity'
                ].map(skill => `
                  <span class="bg-navy text-lightestSlate px-4 py-3 rounded-lg text-sm border border-gray-700 hover:border-brand/50 hover:transform hover:-translate-y-1 transition-all duration-300">
                    ${skill}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section id="projetos" class="section min-h-screen-dvh flex items-center justify-center py-20 bg-navy">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-lightestSlate mb-16 flex items-center">
              <span class="text-brand text-xl md:text-2xl mr-4 font-mono">03.</span> Projetos
            </h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${projects.map(project => this.renderProjectCard(project)).join('')}
            </div>
          </div>
        </section>

        <!-- Timeline Section -->
        <section id="historico" class="section min-h-screen-dvh flex items-center justify-center py-20 bg-lightNavy">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-lightestSlate mb-16 flex items-center">
              <span class="text-brand text-xl md:text-2xl mr-4 font-mono">04.</span> Histórico Profissional e Acadêmico
            </h2>
            
            <div class="relative">
              <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand transform -translate-x-1/2 z-0"></div>
              
              <div class="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-brand z-0"></div>
              
              <div class="space-y-4">
                ${timeline.map((item, index) => this.renderTimelineItem(item, index)).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contato" class="section min-h-screen flex items-center py-20 bg-navy">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-lightestSlate mb-4 text-center">
              <span class="text-brand text-xl md:text-2xl mr-4 font-mono">05.</span> Contato
            </h2>
            <p class="text-slate text-lg text-center mb-12 max-w-2xl mx-auto">
              Aberto a oportunidades e colaborações.
            </p>
            
            <div class="max-w-4xl mx-auto">
              <!-- Contact Grid -->
              <div class="grid md:grid-cols-2 gap-4 mb-6">
                ${[
                  { icon: 'fas fa-envelope', type: 'Email', value: 'danielchrono@gmail.com', href: 'mailto:danielchrono@gmail.com' },
                  { icon: 'fab fa-whatsapp', type: 'WhatsApp', value: '(31) 99292-8444', href: 'https://wa.me/5531992928444' }
                ].map(contact => `
                  <a href="${contact.href}" target="_blank" class="bg-lightNavy rounded-lg p-4 hover:transform hover:-translate-y-1 transition-all duration-300 border border-gray-800 hover:border-brand/40 group shadow-md hover:shadow-lg">
                    <div class="flex items-center space-x-4">
                      <div class="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                        <i class="${contact.icon} text-brand text-lg"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="text-lightestSlate font-semibold text-sm mb-1 truncate">${contact.type}</h4>
                        <span class="text-slate text-xs group-hover:text-lightestSlate transition-colors duration-300 truncate">${contact.value}</span>
                      </div>
                    </div>
                  </a>
                `).join('')}
              </div>
                            
              <!-- Social Grid -->
              <div class="grid md:grid-cols-2 gap-4 mb-8">
                ${[
                  { icon: 'fab fa-linkedin-in', type: 'LinkedIn', value: 'Meu Perfil', href: 'https://linkedin.com/in/danieldepaulaglopes' },
                  { icon: 'fab fa-github', type: 'GitHub', value: 'Meus Repositórios', href: 'https://github.com/danielchrono' }
                ].map(social => `
                  <a href="${social.href}" target="_blank" class="bg-lightNavy rounded-lg p-4 hover:transform hover:-translate-y-1 transition-all duration-300 border border-gray-800 hover:border-brand/40 group shadow-md hover:shadow-lg">
                    <div class="flex items-center space-x-4">
                      <div class="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                        <i class="${social.icon} text-brand text-lg"></i>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="text-lightestSlate font-semibold text-sm mb-1 truncate">${social.type}</h4>
                        <span class="text-slate text-xs group-hover:text-lightestSlate transition-colors duration-300 truncate">${social.value}</span>
                      </div>
                    </div>
                  </a>
                `).join('')}
              </div>
            
              <div class="text-center mt-12">
                <button id="map-toggle" class="border-2 border-brand text-brand px-8 py-3 rounded-lg font-semibold hover:bg-brand hover:text-navy transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto">
                  <span id="map-icon"><i class="fas fa-map-marker-alt"></i></span>
                  <span id="map-text">Ver Localização</span>
                </button>
              </div>
              
              <div id="map-container" class="mt-8 rounded-xl overflow-hidden hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1875.8859037057657!2d-43.97271126167558!3d-19.891855295371986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690cfec386847%3A0x70914e1de91c238c!2sRua%20%C3%81lvaro%20Alvim%2C%202265%20-%20Vila%20Amaral%2C%20Belo%20Horizonte%20-%20MG%2C%2030775-190!5e0!3m2!1spt-BR!2sbr!4v1762386692291!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="400px"
                  style="border:0;"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer class="bg-lightNavy border-t border-gray-800/50 py-8">
        <div class="container mx-auto px-6 text-center">
          <p class="text-slate">&copy; 2025 Daniel Lopes. Todos os direitos reservados.</p>
        </div>
      </footer>
    `;
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // calcula altura do header (fallback 60px)
  private getHeaderHeight(): number {
    const header = document.querySelector('header') as HTMLElement | null;
    return header ? header.offsetHeight : 60;
  }

  // rola suavemente até um elemento considerando header fixo
  private scrollToElement(element: HTMLElement, extraOffset = 12): void {
    const top = element.getBoundingClientRect().top + window.scrollY - this.getHeaderHeight() - extraOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  private openMap(): void {
    const mapContainer = document.getElementById('map-container');
    const mapToggle = document.getElementById('map-toggle');
    const mapText = document.getElementById('map-text');
    if (!mapContainer || !mapToggle) return;

    mapContainer.classList.remove('hidden');
    mapToggle.classList.remove('hidden');

    if (mapText) mapText.textContent = 'Ocultar mapa';

    const iframe = mapContainer.querySelector('iframe') as HTMLIFrameElement | null;

    const doScroll = () => {
      // pequeno delay para garantir layout atualizado antes da rolagem
      setTimeout(() => {
        this.scrollToElement(mapToggle as HTMLElement, 8);
      }, 60);
    };

    if (iframe) {
      // tenta rolar somente após o iframe disparar load; fallback após 2s
      let handled = false;
      const onLoad = () => {
        if (handled) return;
        handled = true;
        iframe.removeEventListener('load', onLoad);
        doScroll();
      };
      iframe.addEventListener('load', onLoad);

      // fallback para caso o evento não dispare (cache / cross-origin)
      setTimeout(() => {
        if (!handled) {
          handled = true;
          try { iframe.removeEventListener('load', onLoad); } catch {}
          doScroll();
        }
      }, 200);
    } else {
      doScroll();
    }
  }

  private closeMapAndScrollToContato(): void {
    const mapContainer = document.getElementById('map-container');
    const mapToggle = document.getElementById('map-toggle');
    const mapText = document.getElementById('map-text');
    if (mapContainer) mapContainer.classList.add('hidden');
    if (mapText) mapText.textContent = 'Ver Localização';

    const contato = document.getElementById('contato')
      || document.getElementById('contact')
      || document.querySelector('[data-section="contato"]')
      || document.querySelector('section.contact') as HTMLElement | null;

    if (contato) {
      this.scrollToElement(contato);
    } else if (mapToggle) {
      this.scrollToElement(mapToggle as HTMLElement);
    }
  }

  // Ajustes de UI responsivos: expande cards/timeline no mobile e adiciona classes úteis
  private enhanceResponsiveUI(): void {
    // Contact cards: adiciona comportamento de expansão no mobile

    // Timeline: torna cada item clicável para expandir em telas pequenas
    const timelineItems = Array.from(document.querySelectorAll('#historico .space-y-4 > *')) as HTMLElement[];
    timelineItems.forEach(item => {
      item.classList.add('timeline-item');
      const clickable = (item.querySelector('.timeline-header') as HTMLElement | null) ?? item;
      clickable.setAttribute('tabindex', '0');
      clickable.setAttribute('role', 'button');

      const toggle = () => {
        if (window.innerWidth >= 768) return;
        const expanded = item.classList.toggle('expanded');
        if (expanded) {
          timelineItems.forEach(it => { if (it !== item) it.classList.remove('expanded'); });
        }
        setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      };

      clickable.addEventListener('click', () => toggle());
      clickable.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(); }
      });
    });

    // Atualiza limites caso a viewport mude (ex: rotação)
    window.addEventListener('resize', () => {
      document.querySelectorAll('.section .container').forEach(c => {
        (c as HTMLElement).style.maxHeight = `none`;
      });
    });
  }

  // typewriter: digita textos em elementos marcados com data-typewriter
  public typeIntro(): void {
    document.querySelectorAll<HTMLElement>('[data-typewriter]').forEach(el => {
      // já digitado -> ignora
      if (el.dataset.typed === 'true') return;

      const source = el.getAttribute('data-text') ?? el.textContent ?? '';
      const full = source.trim();
      if (!full) return;

      // preserva acessibilidade (texto presente como fallback) mas limpa para animação visual
      el.textContent = '';

      el.dataset.typed = 'false';
      const speedAttr = el.getAttribute('data-type-speed');
      const baseSpeed = Math.max(12, parseInt(speedAttr || '40', 10));

      let i = 0;
      const tick = () => {
        if (i < full.length) {
          el.textContent += full.charAt(i);
          i++;
          // variação sutil para parecer humano
          const variance = Math.round((Math.random() - 0.5) * 30);
          setTimeout(tick, Math.max(8, baseSpeed + variance));
        } else {
          el.dataset.typed = 'true';
        }
      };

      // pequeno delay para sincronizar com o reveal
      setTimeout(tick, 120);
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // cria preloader DOM (simples e isolado)
  const createPreloader = (): HTMLElement => {
    const p = document.createElement('div');
    p.id = 'preloader';
    p.className = 'preloader';
    p.innerHTML = `<div class="spinner" aria-hidden="true"></div>`;
    document.body.appendChild(p);
    return p;
  };

  const preloader = createPreloader();

  // instancia o app imediatamente para montar listeners / observer (mas conteúdo fica oculto via CSS até o reveal)
  const app = new PortfolioApp();

  // Ensure reveal calls the typewriter (inside DOMContentLoaded handler)
  const reveal = () => {
    // libera transições e remove preloader
    document.documentElement.classList.add('ready');
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 800);

    // inicia typewriter (só uma vez)
    try { app.typeIntro(); } catch (e) { /* silencioso */ }
  };

  // espera o load completo (imagens/iframes) — fallback em 2s
  if (document.readyState === 'complete') {
    reveal();
  } else {
    window.addEventListener('load', () => reveal(), { once: true });
    setTimeout(() => {
      if (!document.documentElement.classList.contains('ready')) reveal();
    }, 2000);
  }
});

// Handle errors
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
});