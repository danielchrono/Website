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
  }
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
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    this.setupMapToggle();

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
          const target = document.querySelector(href);
          if (target) {
            const headerHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Map toggle
    const mapToggle = document.getElementById('map-toggle');
    const mapContainer = document.getElementById('map-container');
    const mapIcon = document.getElementById('map-icon');
    const mapText = document.getElementById('map-text');

    mapToggle?.addEventListener('click', () => {
      const isHidden = mapContainer?.classList.contains('hidden');
      mapContainer?.classList.toggle('hidden', !isHidden);
      
      if (mapIcon && mapText) {
        if (isHidden) {
          mapIcon.innerHTML = '<i class="fas fa-times"></i>';
          mapText.textContent = 'Ocultar Mapa';
        } else {
          mapIcon.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
          mapText.textContent = 'Ver Localização';
        }
      }
    });
  }

  private setupMapToggle(): void {
  const mapToggle = document.getElementById('map-toggle');
  const mapContainer = document.getElementById('map-container');
  const mapIcon = document.getElementById('map-icon');
  const mapText = document.getElementById('map-text');
  const contactSection = document.getElementById('contato');
  const header = document.querySelector('header');

  if (mapToggle && mapContainer && mapIcon && mapText && contactSection && header) {
    mapToggle.addEventListener('click', (e) => {
      e.preventDefault();

      const isHidden = mapContainer.classList.contains('hidden');
      
      // Toggle do mapa
      mapContainer.classList.toggle('hidden', !isHidden);
      
      // Atualizar ícone e texto
      if (isHidden) {
        mapIcon.innerHTML = '<i class="fas fa-times"></i>';
        mapText.textContent = 'Ocultar Mapa';
        
        // Scroll para mostrar o mapa
        setTimeout(() => {
          const headerHeight = (header as HTMLElement).offsetHeight;
          const buttonRect = mapToggle.getBoundingClientRect();
          const buttonTop = buttonRect.top + window.pageYOffset;
          const adjustedPosition = buttonTop - headerHeight - 20;
          
          window.scrollTo({
            top: adjustedPosition,
            behavior: 'smooth'
          });
        }, 200);
      } else {
        mapIcon.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
        mapText.textContent = 'Ver Localização';
        
        // Scroll para o topo da seção de contato
        const headerHeight = (header as HTMLElement).offsetHeight;
        const sectionTop = contactSection.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: sectionTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  }
}

  private setupAnimations(): void {
    // Intersection Observer for animations
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          
          // Animate counters
          if (entry.target.classList.contains('counter')) {
            this.animateCounter(entry.target as HTMLElement);
          }
          
          // Animate skill bars
          if (entry.target.classList.contains('skill-bar')) {
            this.animateSkillBar(entry.target as HTMLElement);
          }
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
    const target = parseInt(element.getAttribute('data-count') || '0');
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toString();
      }
    }, stepTime);
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
                <i class="fab fa-github"></i>
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
  const isLast = index === timeline.length - 1;
  
  return `
    <div class="relative flex w-full mb-1">
      <!-- Linha vertical - Desktop -->
      <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-brand transform -translate-x-1/2 z-0"></div>
      
      <!-- Content -->
      <div class="w-full md:w-5/12 ${isEven ? 'md:pr-16' : 'md:pl-16 md:ml-auto'}">
        <div class="bg-lightNavy rounded-xl p-6 border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand/30 mb-8">
          <div class="text-brand font-bold text-sm mb-2">${item.date}</div>
          <h3 class="text-lightestSlate font-bold text-lg mb-1">${item.title}</h3>
          <p class="text-brand text-sm font-semibold mb-3">${item.subtitle}</p>
          <p class="text-slate text-sm leading-relaxed">${item.description}</p>
        </div>
      </div>
      
      <!-- Ponto centralizado - Desktop -->
      <div class="hidden md:flex absolute left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 bg-brand rounded-full border-4 border-lightNavy z-10 shadow-lg"></div>
      
      <!-- Linha e ponto - Mobile -->
      <div class="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-brand z-0"></div>
      <div class="md:hidden absolute left-5 top-6 w-3 h-3 bg-brand rounded-full border-2 border-lightNavy z-10"></div>
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
        <div id="mobile-menu" class="md:hidden hidden fixed inset-0 bg-navy/98 backdrop-blur-lg z-40 pt-24">
          <div class="container mx-auto px-6">
            <nav class="flex flex-col space-y-2">
              ${[
                { name: 'sobre', icon: 'user' },
                { name: 'habilidades', icon: 'tools' },
                { name: 'projetos', icon: 'laptop-code' },
                { name: 'historico', icon: 'history' },
                { name: 'contato', icon: 'envelope' }
              ].map((item, index) => `
                <a href="#${item.name}" class="mobile-link text-lightestSlate hover:text-brand text-2xl font-semibold flex items-center space-x-4 py-4 px-6 rounded-lg hover:bg-lightNavy/50 transition-all duration-300 group">
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
              <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-lightestSlate mb-6 animate-fade-in" style="animation-delay: 0.1s">
                Daniel Lopes.
              </h1>
              <h2 class="text-2xl md:text-3xl lg:text-4xl text-slate mb-8 animate-fade-in" style="animation-delay: 0.2s">
                Construindo pontes entre logística e tecnologia.
              </h2>
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
                    <img src="/assets/profile-img.jpg" alt="Daniel Lopes - Engenheiro de Software" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
            
            <div class="grid md:grid-cols-2 gap-16 mb-16">
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
              <div class="space-y-4">
                ${timeline.map((item, index) => this.renderTimelineItem(item, index)).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contato" class="section min-h-screen-dvh flex items-center justify-center py-20 bg-navy">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-lightestSlate mb-4 text-center">
              <span class="text-brand text-xl md:text-2xl mr-4 font-mono">05.</span> Contato
            </h2>
            <p class="text-slate text-xl text-center mb-16 max-w-2xl mx-auto">
              Aberto a oportunidades e colaborações. Vamos conversar sobre como posso agregar valor ao seu projeto.
            </p>
            
            <div class="max-w-4xl mx-auto">
              <div class="grid md:grid-cols-2 gap-6 mb-8">
                ${[
                  { icon: 'envelope', type: 'Email', value: 'danielchrono@gmail.com', href: 'mailto:danielchrono@gmail.com' },
                  { icon: 'whatsapp', type: 'WhatsApp', value: '(31) 99292-8444', href: 'https://wa.me/5531992928444' }
                ].map(contact => `
                  <a href="${contact.href}" class="bg-lightNavy rounded-xl p-8 hover:transform hover:-translate-y-3 transition-all duration-500 border border-gray-800 hover:border-brand/50 group shadow-lg hover:shadow-2xl">
                    <div class="flex items-center space-x-6">
                      <div class="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                        <i class="${contact.icon.startsWith('fab') ? 'fab' : 'fas'} fa-${contact.icon.replace('fab-', '')} text-brand text-2xl group-hover:scale-110 transition-transform duration-300"></i>
                      </div>
                      <div>
                        <h4 class="text-lightestSlate font-bold text-lg mb-1">${contact.type}</h4>
                        <span class="text-slate group-hover:text-lightestSlate transition-colors duration-300">${contact.value}</span>
                      </div>
                    </div>
                  </a>
                `).join('')}
              </div>
              
              <div class="grid md:grid-cols-2 gap-6 mb-12">
                ${[
                  { icon: 'linkedin-in', type: 'LinkedIn', value: 'Meu Perfil Profissional', href: 'https://linkedin.com/in/danieldepaulaglopes' },
                  { icon: 'github', type: 'GitHub', value: 'Meus Repositórios', href: 'https://github.com/danielchrono' }
                ].map(social => `
                  <a href="${social.href}" target="_blank" class="bg-lightNavy rounded-xl p-8 hover:transform hover:-translate-y-3 transition-all duration-500 border border-gray-800 hover:border-brand/50 group shadow-lg hover:shadow-2xl">
                    <div class="flex items-center space-x-6">
                      <div class="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center group-hover:bg-brand/20 transition-colors duration-300">
                        <i class="fab fa-${social.icon} text-brand text-2xl group-hover:scale-110 transition-transform duration-300"></i>
                      </div>
                      <div>
                        <h4 class="text-lightestSlate font-bold text-lg mb-1">${social.type}</h4>
                        <span class="text-slate group-hover:text-lightestSlate transition-colors duration-300">${social.value}</span>
                      </div>
                    </div>
                  </a>
                `).join('')}
              </div>
              
              <div class="text-center">
                <button id="map-toggle" class="border-2 border-brand text-brand px-10 py-4 rounded-lg font-bold hover:bg-brand hover:text-navy transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto">
                  <span id="map-icon"><i class="fas fa-map-marker-alt"></i></span>
                  <span id="map-text">Ver Localização</span>
                </button>
              </div>
              
              <div id="map-container" class="mt-12 rounded-2xl overflow-hidden hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1875.8859037057657!2d-43.97271126167558!3d-19.891855295371986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690cfec386847%3A0x70914e1de91c238c!2sRua%20%C3%81lvaro%20Alvim%2C%202265%20-%20Vila%20Amaral%2C%20Belo%20Horizonte%20-%20MG%2C%2030775-190!5e0!3m2!1spt-BR!2sbr!4v1762386692291!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="400"
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
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Handle errors
window.addEventListener('error', (event) => {
  console.error('Application error:', event.error);
});