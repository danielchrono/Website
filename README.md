# Website
Site com informações profissionais em Tailwind CSS e TypeScript

Estrutura TypeScript
src/
├── core/
│   ├── app.ts
│   ├── config.ts
│   └── types.ts
├── components/
│   ├── base/
│   │   ├── component.ts
│   │   └── dom-manager.ts
│   ├── layout/
│   │   ├── header.ts
│   │   ├── navigation.ts
│   │   ├── footer.ts
│   │   └── preloader.ts
│   └── sections/
│       ├── hero.ts
│       ├── about.ts
│       ├── skills.ts
│       ├── projects.ts
│       ├── timeline.ts
│       └── contact.ts
├── utils/
│   ├── animation-manager.ts
│   ├── event-manager.ts
│   ├── helpers.ts
│   ├── performance.ts
│   ├── scroll-manager.ts
│   └── theme-manager.ts
├── styles/ (estrutura CSS modular)
├── main.ts
├── data.ts
└── vite-env.d.ts

Estrutura CSS
/* estrutura proposta */
src/
├── styles/
│   ├── base/
│   │   ├── _reset.css
│   │   ├── _variables.css
│   │   ├── _typography.css
│   │   └── _utilities.css
│   ├── components/
│   │   ├── _buttons.css
│   │   ├── _cards.css
│   │   ├── _map.css
│   │   ├── _navigation.css
│   │   ├── _preloader.css
│   │   └── _forms.css
│   ├── layouts/
│   │   ├── _header.css
│   │   ├── _sections.css
│   │   ├── _grid.css
│   │   └── _footer.css
│   └── pages/
│   │   ├── _about.css
│   │   ├── _hero.css
│   │   ├── _skills.css
│   │   ├── _projects.css
│   │   ├── _timeline.css
│   │   └── _contact.css
│   └── utils/
│       ├── _accessibility.css
│       ├── _animations.css
│       ├── _print.css
│       ├── _responsive.css
│       └── _scrollbar.css
└── main.css