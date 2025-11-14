# Daniel Lopes - Portfolio Profissional

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

Portfólio profissional moderno desenvolvido com TypeScript e Vite, apresentando expertise em gestão operacional, liderança de equipes e desenvolvimento de software.

## 🎯 Características

- ⚡ **Performance Otimizada**: Carregamento rápido com Vite e code splitting
- 🎨 **Design Moderno**: Interface com cards 3D e efeitos visuais sofisticados
- 📱 **Totalmente Responsivo**: Adaptável a qualquer dispositivo e orientação
- ♿ **Acessível**: Total suporte a navegação por teclado e leitores de tela
- 🌙 **Modo Escuro/Claro**: Toggle entre temas com persistência local
- 🛠 **TypeScript**: Código type-safe e altamente maintainable

## 🏗 Estrutura do Projeto
src/
├── core/ # Núcleo da aplicação
│ ├── app.ts # Aplicação principal
│ ├── config.ts # Configurações globais
│ ├── types.ts # Definições TypeScript
│ └── state-manager.ts # Gerenciamento de estado
├── components/ # Componentes modularizados
│ ├── base/ # Componentes base
│ ├── layout/ # Componentes de layout
│ └── sections/ # Seções da página
├── utils/ # Utilitários e helpers
├── styles/ # Sistema CSS modular
├── data.ts # Dados e conteúdo
└── main.ts # Ponto de entrada


## 🚀 Começando

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/danielchrono/portfolio.git

# Entre no diretório
cd portfolio

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build

# Deploy para GitHub Pages
npm run deploy

```

# 🎨 Personalização

**Cores e Temas**
Modifique as variáveis CSS em src/styles/base/_variables.css:

```bash
:root {
  --navy: #0a192f;
  --green: #64ffda;
  /* Adicione suas cores */
}
```

**Conteúdo**
Edite os dados em src/data.ts:

```bash
export const PROJECTS: Project[] = [
  {
    title: 'Seu Projeto',
    description: 'Descrição do projeto...',
    technologies: ['Tech1', 'Tech2'],
    // ...
  }
];
```

# 📊 Performance
Lighthouse Score: 95+
First Contentful Paint: <1.5s
Largest Contentful Paint: <2.5s
Cumulative Layout Shift: <0.1

# 🌐 Deploy
O projeto está configurado para deploy automático no GitHub Pages:
    Commit suas mudanças
    Execute npm run deploy
    Acesse: https://danielchrono.github.io/Website/

🛠 **Tecnologias Utilizadas**
    Frontend: TypeScript, Vite, Tailwind CSS
    Deploy: GitHub Pages, GitHub Actions
    Fontes: Inter, Font Awesome
    Mapas: Google Maps Embed API

📞 **Contato**
    Email: danielchrono@gmail.com
    LinkedIn: Daniel Lopes
    GitHub: danielchrono

📄 **Licença**
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

Desenvolvido com ❤️ por Daniel Lopes

## 🎉 PRÓXIMOS PASSOS

1. **Implemente os novos arquivos CSS** no `src/styles/main.css`:
```css
@import './components/_cards-3d.css';
@import './layout/_sections-unified.css';
```

