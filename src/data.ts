import { Skill, Project, TimelineItem, ContactInfo, SocialLink, Config } from './core/types';

export const CONFIG: Config = {
  preloaderDuration: 1800,
  scrollThreshold: 80,
  animationDelay: 150,
  resizeDebounce: 200,
  typewriterSpeed: 40,
  counterDuration: 1500,
  scrollOffset: 50
};

export const SKILLS: Skill[] = [
  {
    name: 'Gestão Operacional',
    percentage: 95,
    category: 'hard',
    description: 'Gestão completa de operações logísticas e equipes multidisciplinares'
  },
  {
    name: 'Automação (Excel/VBA)',
    percentage: 85,
    category: 'hard',
    description: 'Desenvolvimento de macros complexas e automação de processos críticos'
  },
  {
    name: 'Sistemas TMS',
    percentage: 80,
    category: 'hard',
    description: 'Implementação e gestão de sistemas de transporte e logística'
  },
  {
    name: 'Segurança da Informação',
    percentage: 40,
    category: 'hard',
    description: 'Conceitos fundamentais de cybersecurity e proteção de dados'
  },
  {
    name: 'Liderança',
    percentage: 90,
    category: 'soft',
    description: 'Liderança de equipes multidisciplinares e gestão de talentos'
  },
  {
    name: 'Resolução de Problemas',
    percentage: 88,
    category: 'soft',
    description: 'Análise crítica e solução de desafios complexos'
  },
  {
    name: 'Adaptabilidade',
    percentage: 85,
    category: 'soft',
    description: 'Adaptação rápida a novos cenários e tecnologias'
  },
  {
    name: 'Comunicação',
    percentage: 82,
    category: 'soft',
    description: 'Comunicação clara, eficaz e estratégica'
  }
];

export const DEVELOPING_SKILLS = [
  'HTML5 & CSS3', 'JavaScript ES6+', 'TypeScript', 'Python',
  'React', 'Node.js', 'Redes de Computadores', 'Linux Administration', 
  'Fundamentos de Criptografia', 'Ethical Hacking', 'Cybersecurity',
  'Docker', 'Git & GitHub', 'RESTful APIs', 'Database Design', 
  'System Architecture', 'Cloud Computing'
];

export const PROJECTS: Project[] = [
  {
    title: 'Sistema de Automação Logística',
    description: 'Desenvolvimento de sistema completo de automação para processos logísticos utilizando VBA e Excel, reduzindo tempo de análise em 70% e eliminando erros manuais através de algoritmos inteligentes.',
    technologies: ['VBA', 'Excel', 'Power Query', 'Power BI', 'Automação'],
    githubUrl: '#',
    liveUrl: '#',
    featured: true
  },
  {
    title: 'Implantação de Filial - BH/MG',
    description: 'Liderança completa na implantação de nova filial logística em Belo Horizonte. Desenvolvimento de processos operacionais e implementação de sistemas TMS com treinamento de equipe.',
    technologies: ['Gestão de Projetos', 'TMS', 'Logística', 'Treinamento', 'Liderança'],
    githubUrl: '#',
    liveUrl: '#',
    featured: true
  },
  {
    title: 'Portfólio Profissional',
    description: 'Desenvolvimento de website portfolio com foco em performance, acessibilidade e SEO. Implementação de tecnologias modernas e design responsivo com otimização avançada.',
    technologies: ['TypeScript', 'CSS3', 'HTML5', 'Vite', 'Responsive Design', 'SEO'],
    githubUrl: '#',
    liveUrl: '#',
    featured: true
  },
  {
    title: 'Sistema de Gestão de Frota',
    description: 'Prototipagem de sistema para gestão e monitoramento de frota veicular com relatórios automáticos, alertas de manutenção preditiva e análise de desempenho.',
    technologies: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'Data Analysis'],
    githubUrl: '#',
    featured: false
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    date: '2025 - Presente',
    title: 'Logic Log Pharma',
    subtitle: 'Encarregado Operacional Sênior',
    description: 'Liderança na implantação da filial em BH/MG com estruturação física e operacional completa. Gestão de equipe multidisciplinar e implementação de processos otimizados com foco em eficiência.',
    type: 'work',
    icon: 'briefcase',
    tags: ['Liderança', 'Gestão', 'Implantação', 'Logística', 'Inovação']
  },
  {
    date: '2025 - 2030',
    title: 'Instituto Infnet',
    subtitle: 'Bacharelado em Engenharia da Computação',
    description: 'Graduação com foco em segurança da informação, desenvolvimento de software e arquitetura de sistemas. Participação ativa em projetos de pesquisa e desenvolvimento tecnológico.',
    type: 'education',
    icon: 'graduation-cap',
    tags: ['Segurança da Informação', 'Desenvolvimento', 'Pesquisa', 'Inovação']
  },
  {
    date: '2018 - 2025',
    title: 'DV3 Soluções Logísticas',
    subtitle: 'Coordenador / Supervisor Administrativo',
    description: 'Gestão completa da operação logística com foco em eficiência e qualidade. Desenvolvimento e implementação de protocolos operacionais avançados e otimização de processos.',
    type: 'work',
    icon: 'briefcase',
    tags: ['Coordenação', 'Otimização', 'Gestão', 'Treinamento', 'Excelência']
  },
  {
    date: '2016 - 2018',
    title: 'Oliveira Silva Transportes',
    subtitle: 'Gerente Comercial',
    description: 'Gestão estratégica da operação comercial em BH com administração de equipe. Desenvolvimento de estratégias comerciais inovadoras e expansão de mercado com foco em resultados.',
    type: 'work',
    icon: 'briefcase',
    tags: ['Gestão Comercial', 'Estratégia', 'Expansão', 'Liderança']
  },
  {
    date: '2009 - 2011',
    title: 'ETFG (SEBRAE/MG)',
    subtitle: 'Ensino Médio Técnico em Administração',
    description: 'Formação técnica com ênfase em gestão empresarial prática. Desenvolvimento de visão sistêmica de negócios através de projetos empresariais reais e metodologias ágeis.',
    type: 'education',
    icon: 'graduation-cap',
    tags: ['Administração', 'Empreendedorismo', 'Gestão', 'Desenvolvimento']
  }
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    type: 'Email',
    value: 'danielchrono@gmail.com',
    href: 'mailto:danielchrono@gmail.com',
    icon: 'fas fa-envelope',
    description: 'Respondo em até 24 horas'
  },
  {
    type: 'WhatsApp',
    value: '(31) 99292-8444',
    href: 'https://wa.me/5531992928444',
    icon: 'fab fa-whatsapp',
    description: 'Disponível para conversas'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/danieldepaulaglopes',
    icon: 'linkedin',
    username: 'danieldepaulaglopes'
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/danielchrono',
    icon: 'github',
    username: 'danielchrono'
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/danielchrono',
    icon: 'instagram',
    username: '@danielchrono'
  }
];
