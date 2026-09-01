# WTG Flow AI

Build. Automate. Scale.

WTG Flow AI is a fictional AI automation operating system designed to demonstrate modern product design and front-end engineering. It presents a portfolio-grade SaaS interface for creating AI agents, designing workflows, managing automations, connecting integrations, reviewing operational analytics, tracing activity, and configuring workspace settings.

This is a demo product that uses realistic fictional mock data. It does not include authentication, a backend, a database, real AI execution, real API integrations, billing, or production secrets.

## Overview

WTG Flow AI is built as a polished dark SaaS dashboard for GitHub portfolio review, CodePen adaptation, and Dribbble UI/UX presentation. The product concept focuses on how business teams could build and operate AI-powered automations from one connected workspace.

## Features

- Premium dark application shell with responsive sidebar navigation and top command affordance
- Overview dashboard with KPIs, workflow visualization, recent runs, agent activity, and business impact
- AI Agents management with search, filtering, detail drawer, status controls, and mock creation
- Interactive Workflow Builder with node library, visual canvas, configuration panel, templates, validation, test run simulation, and mock publishing
- Automations management with filters, health visualization, cards, run history, run detail inspection, and mock creation
- Integrations catalog with category filters, setup dialog, connected configuration panel, test connection feedback, and activity monitoring
- Analytics with executive KPIs, performance charts, business impact, ranked agent and automation tables, category breakdowns, failure analytics, and export feedback
- Activity monitoring with event filters, timeline, detail drawer, execution traces, error detail, human review context, live-update simulation, and audit log
- Settings with editable workspace defaults, team roles, notifications, AI defaults, security controls, masked demo API keys, billing/plan usage, and local feedback
- Reopenable onboarding checklist and keyboard command menu with Ctrl+K / Cmd+K navigation

## Product Areas

- Overview Dashboard
- AI Agents
- Workflow Builder
- Automations
- Integrations
- Analytics
- Activity
- Settings

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- lucide-react

## Architecture

The app uses a clean client-side React structure:

```text
src/
  components/
  data/
  layouts/
  pages/
  styles/
  App.jsx
  main.jsx
```

Reusable components are organized by product area, while mock data lives in `src/data`. Navigation is intentionally lightweight and client-side so the UI remains easy to adapt for CodePen or static portfolio demos.

## Accessibility

- Semantic page regions, headings, buttons, forms, tables, and dialogs
- Keyboard-accessible navigation, filters, cards, drawers, dialogs, workflow nodes, and command menu
- Visible focus states across interactive controls
- Status text in addition to color indicators
- `aria-live` feedback for local status/toast updates
- Escape support for dialogs, drawers, onboarding, and command menu
- Reduced-motion support through `prefers-reduced-motion`

## Responsive Design

WTG Flow AI is desktop-first for a premium dashboard presentation, with tablet and mobile layouts that preserve core functionality. Cards collapse to single-column layouts, tables remain scrollable or compact, drawers become full-width where appropriate, and the app shell avoids horizontal overflow on small screens.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Screenshots

Screenshots will be captured separately after final visual QA.

Placeholder directory:

```text
docs/screenshots/
```

Recommended captures:

- Overview dashboard
- AI Agents grid and detail drawer
- Workflow Builder canvas
- Automations operations view
- Integrations catalog
- Analytics dashboard
- Activity trace detail
- Settings workspace controls

## CodePen

Interactive UI demo link: _Coming soon_

Recommended adaptation: convert the core app shell, mock data, and CSS into a single CodePen demo focused on Overview, Workflow Builder, command menu, and one detail drawer interaction.

## Dribbble

Dribbble case study link: _Coming soon_

Recommended presentation shots:

- Workflow Builder canvas as the hero shot
- Analytics executive reporting view
- AI Agents management grid with detail drawer
- Integrations catalog and connected configuration panel
- Settings and onboarding polish as supporting screens

## Roadmap

- Add screenshot assets and case-study narrative
- Prepare a CodePen-friendly single-file demo variant
- Add optional lightweight route persistence
- Add component tests for filtering and dialog interactions
- Connect to a real backend/API only in a future non-portfolio phase

## License / Portfolio Use

This project is intended as a personal portfolio/demo interface. Product names, data, metrics, users, API keys, workflows, and integrations shown in the UI are fictional.
