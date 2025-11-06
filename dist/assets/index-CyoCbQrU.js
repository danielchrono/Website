(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=e(a);fetch(a.href,i)}})();const n={hard:[{name:"Gestão Operacional",percentage:95},{name:"Automação (Excel/VBA)",percentage:85},{name:"Sistemas TMS",percentage:80},{name:"Segurança da Informação",percentage:40}],soft:[{name:"Liderança",percentage:90},{name:"Resolução de Problemas",percentage:88},{name:"Adaptabilidade",percentage:85},{name:"Comunicação",percentage:82}]},d=[{title:"Sistema de Automação",description:"Automatização de relatórios com VBA, reduzindo tempo de análise.",githubUrl:"#"},{title:"Implantação de Filial",description:"Estruturação de base logística em BH, com definição de processos.",githubUrl:"#"},{title:"Portfólio Pessoal",description:"Este site, desenvolvido com tecnologias modernas.",githubUrl:"#"}],c=[{date:"2025 - Presente",title:"Logic Log Pharma",subtitle:"Encarregado Operacional Sênior",description:"Responsável pela implantação da filial em BH/MG, estruturação física e operacional da base."},{date:"2025 - 2030",title:"Instituto Infnet",subtitle:"Bacharelado em Engenharia da Computação",description:"Cursando o primeiro período com foco em segurança da informação e desenvolvimento de software."},{date:"2018 - 2025",title:"DV3 Soluções Logísticas",subtitle:"Coordenador / Supervisor Administrativo",description:"Liderança na implantação da filial em BH/MG, reestruturação física do espaço logístico e criação de protocolos operacionais."}];class m{mobileMenuOpen=!1;constructor(){this.init()}init(){this.render(),this.setupEventListeners(),this.animateOnScroll()}setupEventListeners(){const t=document.getElementById("mobile-menu-btn");document.getElementById("mobile-menu");const e=document.querySelectorAll(".mobile-link");t?.addEventListener("click",()=>{this.toggleMobileMenu()}),e.forEach(i=>{i.addEventListener("click",()=>{this.closeMobileMenu()})}),document.querySelectorAll('a[href^="#"]').forEach(i=>{i.addEventListener("click",o=>{o.preventDefault();const r=document.querySelector(i.getAttribute("href"));r&&r.scrollIntoView({behavior:"smooth"})})});const s=document.getElementById("map-toggle"),a=document.getElementById("map-container");s?.addEventListener("click",()=>{a?.classList.toggle("hidden");const i=s.querySelector("i");i&&(i.className=a?.classList.contains("hidden")?"fas fa-map-marker-alt":"fas fa-times")})}toggleMobileMenu(){this.mobileMenuOpen=!this.mobileMenuOpen;const t=document.getElementById("mobile-menu"),e=document.body;this.mobileMenuOpen?(t?.classList.remove("hidden"),e.style.overflow="hidden"):(t?.classList.add("hidden"),e.style.overflow="")}closeMobileMenu(){this.mobileMenuOpen=!1;const t=document.getElementById("mobile-menu"),e=document.body;t?.classList.add("hidden"),e.style.overflow=""}animateOnScroll(){const t=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&s.target.classList.add("animate-fade-in")})},{threshold:.1});document.querySelectorAll(".section").forEach(e=>{t.observe(e)})}renderSkillBar(t){return`
      <div class="skill-item mb-4">
        <div class="flex justify-between text-sm mb-1">
          <span class="text-lightestSlate font-medium">${t.name}</span>
          <span class="text-brand">${t.percentage}%</span>
        </div>
        <div class="w-full bg-lightNavy rounded-full h-2">
          <div class="skill-progress bg-brand h-2 rounded-full transition-all duration-1000 ease-out" 
               data-percentage="${t.percentage}"></div>
        </div>
      </div>
    `}renderProjectCard(t){return`
      <div class="bg-lightNavy rounded-lg p-6 hover:transform hover:-translate-y-2 transition-all duration-300 border border-gray-800 hover:border-brand/30">
        <div class="flex justify-between items-start mb-4">
          <i class="far fa-folder text-brand text-2xl"></i>
          <div class="flex space-x-3">
            ${t.githubUrl?`
              <a href="${t.githubUrl}" class="text-slate hover:text-brand transition-colors">
                <i class="fab fa-github"></i>
              </a>
            `:""}
          </div>
        </div>
        <h3 class="text-lightestSlate text-lg font-semibold mb-2">${t.title}</h3>
        <p class="text-slate text-sm">${t.description}</p>
      </div>
    `}renderTimelineItem(t,e){const s=e%2===0;return`
      <div class="timeline-item relative ${s?"md:text-right md:pr-8 md:left-0":"md:text-left md:pl-8 md:left-1/2"} 
           w-full md:w-1/2 px-4 mb-8">
        <div class="${s?"md:mr-8":"md:ml-8"}">
          <div class="text-brand font-semibold text-sm mb-1">${t.date}</div>
          <h3 class="text-lightestSlate font-semibold text-lg">${t.title}</h3>
          <p class="text-brand text-sm mb-2">${t.subtitle}</p>
          <p class="text-slate text-sm">${t.description}</p>
        </div>
      </div>
    `}render(){const t=document.getElementById("app");t&&(t.innerHTML=`
      <!-- Header -->
      <header class="fixed top-0 w-full bg-navy/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div class="container mx-auto px-6 py-4">
          <div class="flex justify-between items-center">
            <a href="#inicio" class="text-2xl font-bold text-lightestSlate">
              <span class="text-brand">D</span>L
            </a>
            
            <!-- Desktop Navigation -->
            <nav class="hidden md:flex space-x-8">
              ${["Sobre","Habilidades","Projetos","Historico","Contato"].map(e=>`
                <a href="#${e.toLowerCase()}" class="text-lightestSlate hover:text-brand transition-colors text-sm font-medium flex items-center space-x-1">
                  <i class="fas fa-${this.getNavIcon(e)} text-xs"></i>
                  <span>${e}</span>
                </a>
              `).join("")}
            </nav>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="md:hidden flex flex-col space-y-1">
              <span class="w-6 h-0.5 bg-brand"></span>
              <span class="w-6 h-0.5 bg-brand"></span>
              <span class="w-6 h-0.5 bg-brand"></span>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="md:hidden hidden fixed inset-0 bg-navy/95 backdrop-blur-md z-40 pt-20">
          <div class="container mx-auto px-6">
            <nav class="flex flex-col space-y-6">
              ${["Sobre","Habilidades","Projetos","Historico","Contato"].map(e=>`
                <a href="#${e.toLowerCase()}" class="mobile-link text-lightestSlate hover:text-brand text-xl font-medium flex items-center space-x-3 py-3 border-b border-gray-800">
                  <i class="fas fa-${this.getNavIcon(e)} text-brand"></i>
                  <span>${e}</span>
                </a>
              `).join("")}
            </nav>
          </div>
        </div>
      </header>

      <main>
        <!-- Hero Section -->
        <section id="inicio" class="min-h-screen flex items-center justify-center pt-16">
          <div class="container mx-auto px-6">
            <div class="max-w-3xl">
              <p class="text-brand text-lg mb-4">Olá, meu nome é</p>
              <h1 class="text-5xl md:text-7xl font-bold text-lightestSlate mb-4">Daniel Lopes.</h1>
              <h2 class="text-2xl md:text-4xl text-slate mb-6">Construindo pontes entre logística e tecnologia.</h2>
              <p class="text-slate text-lg mb-8 max-w-2xl">
                Profissional em transição da logística para a tecnologia, com mais de 
                <strong class="text-lightestSlate">10 anos de experiência</strong> em gestão e implantação de processos. 
                Atualmente curso Engenharia da Computação com foco em segurança da informação.
              </p>
              <div class="flex flex-wrap gap-4">
                <a href="#contato" class="bg-brand text-navy px-6 py-3 rounded font-semibold hover:bg-transparent hover:text-brand border-2 border-brand transition-all duration-300">
                  Entre em Contato <i class="fas fa-arrow-right ml-2"></i>
                </a>
                <a href="#projetos" class="border-2 border-brand text-brand px-6 py-3 rounded font-semibold hover:bg-brand hover:text-navy transition-all duration-300">
                  Ver Projetos
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- About Section -->
        <section id="sobre" class="section py-20">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-lightestSlate mb-12 flex items-center">
              <span class="text-brand text-xl mr-3">01.</span> Sobre Mim
            </h2>
            
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p class="text-slate mb-4">
                  Atuei em coordenação operacional, implantação de filiais e automação de processos. 
                  Hoje aplico minha experiência em gestão para criar soluções tecnológicas confiáveis.
                </p>
                <p class="text-slate mb-8">
                  Cursando Engenharia da Computação, tenho interesse em redes, criptografia e segurança da informação.
                </p>
                
                <div class="grid grid-cols-3 gap-6">
                  ${[{number:10,label:"Anos de Experiência"},{number:3,label:"Filiais Implantadas"},{number:5,label:"Projetos Concluídos"}].map(e=>`
                    <div class="text-center">
                      <div class="text-3xl font-bold text-brand mb-1" data-count="${e.number}">0</div>
                      <div class="text-sm text-slate">${e.label}</div>
                    </div>
                  `).join("")}
                </div>
              </div>
              
              <div class="flex justify-center">
                <div class="relative group">
                  <div class="w-64 h-64 rounded-full border-4 border-brand overflow-hidden shadow-2xl group-hover:shadow-brand/20 transition-all duration-500">
                    <img src="/assets/profile-img.jpg" alt="Daniel Lopes - Engenheiro de Software" 
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onerror="this.src='/assets/placeholder-profile.jpg'; this.alt='Imagem de perfil não disponível'">
                  </div>
                  <div class="absolute inset-0 border-2 border-brand rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="absolute -inset-4 bg-brand/10 rounded-full blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section id="habilidades" class="section py-20 bg-lightNavy">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-lightestSlate mb-12 flex items-center">
              <span class="text-brand text-xl mr-3">02.</span> Habilidades
            </h2>
            
            <div class="grid md:grid-cols-2 gap-12 mb-12">
              <!-- Hard Skills -->
              <div>
                <h3 class="text-xl font-semibold text-lightestSlate mb-6 flex items-center">
                  <i class="fas fa-laptop-code text-brand mr-3"></i> Hard Skills
                </h3>
                ${n.hard.map(e=>this.renderSkillBar(e)).join("")}
              </div>
              
              <!-- Soft Skills -->
              <div>
                <h3 class="text-xl font-semibold text-lightestSlate mb-6 flex items-center">
                  <i class="fas fa-user-check text-brand mr-3"></i> Soft Skills
                </h3>
                ${n.soft.map(e=>this.renderSkillBar(e)).join("")}
              </div>
            </div>
            
            <!-- Additional Skills -->
            <div>
              <h3 class="text-xl font-semibold text-lightestSlate mb-6">Em Desenvolvimento</h3>
              <div class="flex flex-wrap gap-3">
                ${["HTML5 & CSS3","JavaScript","Python","Redes de Computadores","Linux","Fundamentos de Criptografia","Ethical Hacking","Cybersecurity"].map(e=>`
                  <span class="bg-navy text-lightestSlate px-4 py-2 rounded-full text-sm border border-gray-700">
                    ${e}
                  </span>
                `).join("")}
              </div>
            </div>
          </div>
        </section>

        <!-- Projects Section -->
        <section id="projetos" class="section py-20">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-lightestSlate mb-12 flex items-center">
              <span class="text-brand text-xl mr-3">03.</span> Projetos
            </h2>
            
            <div class="grid md:grid-cols-3 gap-6">
              ${d.map(e=>this.renderProjectCard(e)).join("")}
            </div>
          </div>
        </section>

        <!-- Timeline Section -->
        <section id="historico" class="section py-20 bg-lightNavy">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-lightestSlate mb-12 flex items-center">
              <span class="text-brand text-xl mr-3">04.</span> Histórico Profissional e Acadêmico
            </h2>
            
            <div class="relative">
              <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-brand hidden md:block"></div>
              
              <div class="space-y-12">
                ${c.map((e,s)=>this.renderTimelineItem(e,s)).join("")}
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contato" class="section py-20">
          <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-lightestSlate mb-4 text-center">
              <span class="text-brand text-xl mr-3">05.</span> Contato
            </h2>
            <p class="text-slate text-center mb-12">Aberto a oportunidades e colaborações.</p>
            
            <div class="max-w-4xl mx-auto">
              <div class="grid md:grid-cols-2 gap-6 mb-6">
                ${[{icon:"envelope",type:"Email",value:"danielchrono@gmail.com",href:"mailto:danielchrono@gmail.com"},{icon:"whatsapp",type:"Telefone",value:"(31) 99292-8444",href:"http://wa.me/+5531992928444"}].map(e=>`
                  <a href="${e.href}" class="bg-lightNavy rounded-lg p-6 hover:transform hover:-translate-y-2 transition-all duration-300 border border-gray-800 hover:border-brand/30 group">
                    <div class="flex items-center space-x-4">
                      <i class="fas fa-${e.icon} text-brand text-2xl group-hover:scale-110 transition-transform"></i>
                      <div>
                        <h4 class="text-lightestSlate font-semibold">${e.type}</h4>
                        <span class="text-slate">${e.value}</span>
                      </div>
                    </div>
                  </a>
                `).join("")}
              </div>
              
              <div class="grid md:grid-cols-2 gap-6 mb-8">
                ${[{icon:"linkedin-in",type:"LinkedIn",value:"Meu Perfil Profissional",href:"https://linkedin.com/in/danieldepaulaglopes"},{icon:"github",type:"GitHub",value:"Meus Repositórios",href:"https://github.com/danielchrono"}].map(e=>`
                  <a href="${e.href}" target="_blank" class="bg-lightNavy rounded-lg p-6 hover:transform hover:-translate-y-2 transition-all duration-300 border border-gray-800 hover:border-brand/30 group">
                    <div class="flex items-center space-x-4">
                      <i class="fab fa-${e.icon} text-brand text-2xl group-hover:scale-110 transition-transform"></i>
                      <div>
                        <h4 class="text-lightestSlate font-semibold">${e.type}</h4>
                        <span class="text-slate">${e.value}</span>
                      </div>
                    </div>
                  </a>
                `).join("")}
              </div>
              
              <div class="text-center">
                <button id="map-toggle" class="border-2 border-brand text-brand px-8 py-3 rounded font-semibold hover:bg-brand hover:text-navy transition-all duration-300">
                  <i class="fas fa-map-marker-alt mr-2"></i>
                  Ver Localização
                </button>
              </div>
              
              <div id="map-container" class="mt-8 rounded-lg overflow-hidden hidden">
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
      <footer class="bg-navy border-t border-gray-800 py-8">
        <div class="container mx-auto px-6 text-center">
          <p class="text-slate">&copy; 2025 Daniel Lopes. Todos os direitos reservados.</p>
        </div>
      </footer>
    `,this.initializeAnimations())}getNavIcon(t){return{Sobre:"user",Habilidades:"tools",Projetos:"laptop-code",Historico:"history",Contato:"envelope"}[t]||"circle"}initializeAnimations(){document.querySelectorAll("[data-count]").forEach(s=>{const a=parseInt(s.getAttribute("data-count")||"0");this.animateCounter(s,a)}),document.querySelectorAll(".skill-progress").forEach(s=>{const a=s.getAttribute("data-percentage");a&&setTimeout(()=>{s.style.width=`${a}%`},500)})}animateCounter(t,e){let s=0;const a=e/50,i=setInterval(()=>{s+=a,s>=e?(t.textContent=e.toString(),clearInterval(i)):t.textContent=Math.floor(s).toString()},40)}}new m;
//# sourceMappingURL=index-CyoCbQrU.js.map
