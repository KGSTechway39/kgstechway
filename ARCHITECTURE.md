# KGS Techway — Project Architecture & Developer Guide

> **Production-Ready • Beginner-Friendly • PDF-Convertible**
> Version 1.0 | Last Updated: April 2026

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Folder Structure](#3-folder-structure)
4. [Architecture Explanation](#4-architecture-explanation)
5. [Setup Instructions](#5-setup-instructions)
6. [How to Run the Project](#6-how-to-run-the-project)
7. [Testing Guide](#7-testing-guide)
8. [Code Flow Explanation](#8-code-flow-explanation)
9. [Best Practices Used](#9-best-practices-used)
10. [Adding a New Service Page](#10-adding-a-new-service-page)
11. [Environment Variables](#11-environment-variables)
12. [Future Enhancements](#12-future-enhancements)
13. [Glossary for Freshers](#13-glossary-for-freshers)

---

## 1. PROJECT OVERVIEW

**KGS Techway** is the official marketing and services website for KGS Techway — a technology company offering software development, AI solutions, QA & testing, cloud DevOps, CRM/ERP, mobile development, and staff augmentation services.

### What this project does

- Presents the company's services to potential clients
- Provides a contact form so visitors can request consultations
- Sends enquiry emails to `sales@kgstechway.com` via Web3Forms (free email API)
- Shows the technology stack the company works with
- Optimised for SEO (search engine ranking)

### Who will use this project

| Person | How they use it |
|--------|----------------|
| Potential clients | Browse services, submit contact form |
| Search engines | Index pages via structured data and meta tags |
| Developers | Build and extend the site |
| Freshers | Use as a real-world React + TypeScript reference |

---

## 2. TECH STACK

> **Why each tool was chosen** — not just what it is.

### Core Framework

| Tool | Version | Why We Use It |
|------|---------|---------------|
| **React** | 19 | The industry-standard UI library. Component-based architecture allows us to build reusable UI pieces. |
| **TypeScript** | 5.9 | Adds type safety to JavaScript. Catches bugs at *compile time* rather than in production. |
| **Vite** | 7 | Super-fast build tool. Replaces the older Create React App. Hot module replacement means instant browser updates as you code. |

### Routing

| Tool | Why |
|------|-----|
| **React Router v7** | Maps URLs to page components. `/services/qa-testing` → `QAServicesPage`. Without this, there is only one URL and no navigation. |

### State Management

| Tool | Why |
|------|-----|
| **Redux Toolkit** | Manages *global* state — things that many components need, like dark mode (`isDarkMode`) and which nav item is active. Without it, you'd have to pass props down through 10 components. |

### UI

| Tool | Why |
|------|-----|
| **React Bootstrap** | Pre-built, responsive UI components (Grid, Button, Card, Form). Saves weeks of CSS work. |
| **Framer Motion** | Animation library. Handles scroll-reveal effects, hero animations, and hover effects with smooth performance. |
| **React Icons** | Thousands of SVG icons from FontAwesome, Simple Icons, etc. |

### Email

| Tool | Why |
|------|-----|
| **Web3Forms** | Free email API (100 submissions/month). Contact form sends a POST request and emails land in `sales@kgstechway.com`. No backend server needed. |

### Testing

| Tool | Why |
|------|-----|
| **Playwright** | Microsoft's browser automation framework. Considered the gold standard for E2E (end-to-end) web testing. Tests run in real Chromium, Firefox, and WebKit browsers. |

### Hosting & Analytics

| Tool | Why |
|------|-----|
| **Vercel** | Free hosting with automatic SSL, CDN, and preview deployments on every git push. |
| **@vercel/analytics** | Tracks page views without cookies (GDPR-friendly). |

---

## 3. FOLDER STRUCTURE

```
kgstechway/
├── src/                          ← All source code lives here
│   │
│   ├── types/
│   │   └── index.ts              ← TypeScript interfaces for the whole app
│   │                               (RootState, Service, Feature, FormData, etc.)
│   │
│   ├── constants/
│   │   ├── company.ts            ← Company info, email, phone, URLs, routes
│   │   └── theme.ts              ← Brand colors, gradients, animation presets
│   │
│   ├── hooks/
│   │   ├── useTheme.ts           ← Typed Redux selector for theme state
│   │   ├── useNavigation.ts      ← Typed selector + goTo / goToContact helpers
│   │   └── useFocusManagement.tsx← Keyboard navigation & accessibility
│   │
│   ├── store/
│   │   ├── index.ts              ← Creates the Redux store
│   │   ├── themeSlice.ts         ← Dark mode + brand colors state
│   │   └── navigationSlice.ts    ← Active section, scroll, menu state
│   │
│   ├── components/               ← Reusable UI components (used across pages)
│   │   ├── Header.tsx            ← Top navigation bar
│   │   ├── Footer.tsx            ← Bottom footer
│   │   ├── BrandLogo.tsx         ← SVG logo + "KGS Techway" wordmark
│   │   ├── HeroSection.tsx       ← Landing page hero (typewriter + CTA)
│   │   ├── ServicesSection.tsx   ← 8 service cards grid
│   │   ├── TechStackSection.tsx  ← Technology categories with pill UI
│   │   ├── HowWeWorkSection.tsx  ← 6-step process visualization
│   │   ├── ContactSection.tsx    ← Contact form with Web3Forms integration
│   │   ├── SEO.tsx               ← Meta tags and structured data (JSON-LD)
│   │   ├── ErrorBoundary.tsx     ← Catches React render errors gracefully
│   │   └── LoadingSpinner.tsx    ← Shown while lazy-loaded pages load
│   │
│   ├── pages/                    ← One file per route / page
│   │   ├── HomePage.tsx          ← / (root route)
│   │   ├── ServicesPage.tsx      ← /services
│   │   ├── AboutPage.tsx         ← /about
│   │   ├── TechnologyPage.tsx    ← /technology
│   │   ├── ContactPage.tsx       ← /contact
│   │   ├── QAServicesPage.tsx    ← /services/qa-testing  ★ most complex
│   │   ├── AISolutionsPage.tsx   ← /services/ai-solutions
│   │   ├── AgenticAIPage.tsx     ← /services/agentic-ai
│   │   ├── CloudDevOpsPage.tsx   ← /services/cloud-devops
│   │   ├── CRMERPServicesPage.tsx← /services/crm-erp
│   │   ├── MobileDevelopmentPage.tsx ← /services/mobile-development
│   │   ├── SoftwareProductDevelopmentPage.tsx ← /services/software-development
│   │   └── StaffAugmentationPage.tsx ← /services/staff-augmentation
│   │
│   ├── utils/
│   │   └── seoUtils.ts           ← Generates JSON-LD structured data for SEO
│   │
│   ├── config/
│   │   └── emailConfig.ts        ← Legacy EmailJS config (now replaced by Web3Forms)
│   │
│   ├── App.tsx                   ← Root component: Redux provider + Router + Routes
│   ├── main.tsx                  ← Entry point: ReactDOM.createRoot(...)
│   ├── index.css                 ← Global CSS (CSS reset, fonts, base styles)
│   └── App.css                   ← App-level layout CSS
│
├── tests/
│   └── e2e/                      ← Playwright end-to-end tests
│       ├── homepage.spec.ts      ← Homepage + branding + footer tests
│       ├── navigation.spec.ts    ← Header navigation + routing tests
│       ├── contact-form.spec.ts  ← Form validation + submission tests
│       └── services.spec.ts      ← Service pages + CTA button tests
│
├── playwright.config.ts          ← Playwright browser & server configuration
├── playwright-report/            ← Generated HTML test report (git-ignored)
├── .env                          ← Secret environment variables (git-ignored)
├── .env.example                  ← Template showing which variables are needed
├── vite.config.ts                ← Build configuration (code splitting, security headers)
├── tsconfig.json                 ← TypeScript compiler settings
├── package.json                  ← Dependencies and npm scripts
└── ARCHITECTURE.md               ← This file
```

### Purpose of Each Folder — For Freshers

| Folder | Analogy | What Goes In It |
|--------|---------|-----------------|
| `types/` | Blueprint | TypeScript interfaces — defines the *shape* of your data |
| `constants/` | Settings file | Values that don't change: company name, colors, routes |
| `hooks/` | Helpers | Reusable React logic extracted from components |
| `store/` | Shared memory | Global app state accessible from any component |
| `components/` | LEGO bricks | Reusable UI pieces used across multiple pages |
| `pages/` | Rooms | One component per URL route |
| `utils/` | Toolbox | Pure functions with no React code |
| `tests/e2e/` | QA checklist | Automated browser tests |

---

## 4. ARCHITECTURE EXPLANATION

### How the App Boots

```
index.html
  └─ main.tsx (ReactDOM.createRoot)
       └─ App.tsx
            ├─ Redux Provider (makes store accessible to all children)
            └─ ThemeWrapper
                 ├─ React Router (maps URLs → components)
                 │    ├─ Header (always visible)
                 │    ├─ <Routes> (one route renders at a time)
                 │    │    ├─ / → HomePage
                 │    │    ├─ /services → ServicesPage
                 │    │    └─ /services/qa-testing → QAServicesPage
                 │    └─ Footer (always visible)
                 └─ Supporting: ErrorBoundary, PerformanceMonitor, Analytics
```

### Data Flow

```
User action (click "Contact")
  → Header dispatches navigate('/contact')
  → React Router updates the URL
  → ContactPage component renders
  → ContactSection shows the form
  → User fills form + submits
  → Web3Forms API called (POST request)
  → Email delivered to sales@kgstechway.com
  → Success alert shown to user
```

### State Management (Redux)

```
Redux Store
  ├── theme
  │     ├── isDarkMode: true        ← Controls dark/light class on all components
  │     ├── primaryColor: '#00C896' ← Brand teal used on buttons / accents
  │     ├── secondaryColor: '#007A5E'
  │     └── accentColor: '#4DFFD8'
  │
  └── navigation
        ├── activeSection: 'home'   ← Which nav item is highlighted
        ├── isMenuOpen: false        ← Mobile hamburger state
        ├── scrollY: 0               ← Current scroll position
        └── isScrolled: false        ← Is header in compact scroll mode?
```

### Why Lazy Loading?

Pages are only downloaded when the user navigates to them:

```typescript
// Instead of: import HomePage from './pages/HomePage';  (always downloaded)
const HomePage = lazy(() => import('./pages/HomePage')); // downloaded on demand
```

This makes the initial page load ~70% faster because the user only downloads code they actually visit.

---

## 5. SETUP INSTRUCTIONS

### Prerequisites

Make sure you have these installed:

```bash
node --version    # Must be 18 or higher
npm --version     # Comes with Node
git --version     # For version control
```

### Step 1 — Clone the project

```bash
git clone https://github.com/kgstechway/website.git
cd website/kgstechway
```

### Step 2 — Install dependencies

```bash
npm install
```

This reads `package.json` and downloads all libraries into `node_modules/`.

### Step 3 — Set up environment variables

```bash
cp .env.example .env
```

Then edit `.env` and add your real Web3Forms key:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_actual_key_here
```

**How to get a Web3Forms key (free):**
1. Go to https://web3forms.com/
2. Enter `sales@kgstechway.com`
3. Click "Create Access Key"
4. Check email for the key
5. Paste into `.env`

### Step 4 — Install Playwright browsers

```bash
npx playwright install chromium
```

This downloads the Chromium browser engine used by tests.

---

## 6. HOW TO RUN THE PROJECT

### Development (local coding)

```bash
npm run dev
```

Opens at **http://localhost:3000** with hot reload — changes appear instantly without refreshing.

### Production Build

```bash
npm run build
```

Creates optimised files in `dist/`. This is what gets deployed.

### Preview Production Build Locally

```bash
npm run preview
```

Opens the production build at http://localhost:4173 — test exactly what Vercel will serve.

### Lint (code quality check)

```bash
npm run lint
```

Catches unused variables, bad patterns, and TypeScript errors.

---

## 7. TESTING GUIDE

### Quick Start

```bash
# Run all tests (headless — fast)
npm test

# Run with browser visible (great for learning!)
npm run test:headed

# Interactive UI mode — see each test step by step
npm run test:ui

# View the HTML report after a run
npm run test:report
```

### Run Individual Test Files

```bash
npm run test:home      # Homepage tests
npm run test:nav       # Navigation tests
npm run test:form      # Contact form tests
npm run test:services  # Service pages tests
```

### What Each Test File Covers

| File | Tests |
|------|-------|
| `homepage.spec.ts` | Logo branding, hero text, tech stack, footer, mobile layout |
| `navigation.spec.ts` | All nav links, logo click, CTA buttons, mobile hamburger |
| `contact-form.spec.ts` | Validation errors, success/failure states, API mocking |
| `services.spec.ts` | Service cards, detail pages, CTA buttons on all service pages |

### Understanding Test Output

```
✓ homepage loads and shows hero title        (1.2s)
✓ logo shows "KGS Techway"                  (0.8s)
✗ footer copyright shows "KGS Techway"      ← FAILED
    Expected: contains "KGS Techway"
    Received: "KGSTechway. All rights reserved."
```

A red `✗` means the test caught a real bug — fix the code, re-run.

### API Mocking in Tests

Contact form tests use `page.route()` to intercept API calls:

```typescript
// This intercepts the REAL API call and returns fake data
await page.route('https://api.web3forms.com/submit', async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify({ success: true }),
  });
});
```

**Why mock?** Tests run without internet. No real emails sent. Tests are fast and deterministic.

### Writing a New Test

```typescript
import { test, expect } from '@playwright/test';

test('my new feature works', async ({ page }) => {
  // 1. Navigate to the page
  await page.goto('/services');

  // 2. Interact with it
  await page.click('button:has-text("Learn More")');

  // 3. Assert the expected result
  await expect(page).toHaveURL('/services/ai-solutions');
});
```

---

## 8. CODE FLOW EXPLANATION

### Request: User visits /services/qa-testing

```
1. Browser requests http://localhost:3000/services/qa-testing
2. Vite serves index.html (single page, always the same HTML)
3. React boots in the browser, Redux store initialises
4. React Router reads the URL: /services/qa-testing
5. Routes component finds: <Route path="/services/qa-testing" element={<QAServicesPage />} />
6. QAServicesPage is lazy-loaded (downloaded now, not before)
7. Suspense shows <LoadingSpinner> while downloading
8. QAServicesPage renders:
   a. useTheme() → gets isDarkMode from Redux → applies CSS class
   b. Renders Hero section, Feature cards, Playwright Spotlight
   c. Framer Motion adds scroll-reveal animations
9. Header is always visible above, Footer always below
```

### Request: User submits contact form

```
1. User fills Name, Email, Service, Message
2. Clicks "Send Message"
3. handleSubmit() runs in ContactSection.tsx
4. validateField() checks each required field
5. If errors → show inline error messages, stop
6. If valid → setIsSubmitting(true) → button shows "Sending..."
7. fetch('https://api.web3forms.com/submit', { method: 'POST', body: {...} })
8. Web3Forms API processes the request
9. Email delivered to sales@kgstechway.com
10. result.success === true → success alert shown → form reset
11. result.success === false → error alert shown
```

### How Dark Mode Works

```
1. Redux store initialises: isDarkMode = true (always dark by default)
2. ThemeWrapper reads isDarkMode
3. Sets: document.documentElement.setAttribute('data-theme', 'dark')
4. Every component reads isDarkMode from useTheme()
5. Applies CSS class: className={`feature-card ${isDarkMode ? 'dark' : 'light'}`}
6. CSS rules: .feature-card.dark { background: rgba(55,68,88,...); color: #eef7f4 }
7. Dark mode ThemeToggle is hidden (commented out) — locked to dark
```

---

## 9. BEST PRACTICES USED

### 1. Single Source of Truth for Constants

```typescript
// src/constants/company.ts
export const COMPANY = {
  contact: { email: 'sales@kgstechway.com' }
};

// Usage everywhere:
<span>{COMPANY.contact.email}</span>
// NOT: <span>sales@kgstechway.com</span>  ← hardcoded = error-prone
```

### 2. Custom Hooks Instead of Repeated useSelector

```typescript
// Before (anti-pattern — repeated 25+ times):
const { isDarkMode } = useSelector((state: any) => state.theme);

// After (correct — typed, single definition):
const { isDarkMode } = useTheme();  // src/hooks/useTheme.ts
```

### 3. Typed Redux State — No `any`

```typescript
// WRONG — bypasses TypeScript
const { isDarkMode } = useSelector((state: any) => state.theme);

// CORRECT — type-safe
import type { RootState } from '../types';
const { isDarkMode } = useSelector((state: RootState) => state.theme);
```

### 4. Lazy Loading for Performance

```typescript
// Only downloads QAServicesPage.js when user visits /services/qa-testing
const QAServicesPage = lazy(() => import('./pages/QAServicesPage'));
```

### 5. Error Boundaries

```tsx
// Catches crashes in child components and shows a fallback UI
<ErrorBoundary fallback={<LoadingSpinner text="Failed to load page..." />}>
  <Suspense><Routes>...</Routes></Suspense>
</ErrorBoundary>
```

### 6. Separation of Concerns

| Concern | Where it lives |
|---------|----------------|
| Data / state | `store/` slices |
| Business logic | `hooks/` |
| UI rendering | `components/` and `pages/` |
| Config / constants | `constants/` |
| Type definitions | `types/` |
| Pure utilities | `utils/` |
| Tests | `tests/` |

### 7. API Mocking in Tests

Never call real APIs in tests. Use `page.route()` to intercept and return controlled responses. This makes tests:
- Fast (no network latency)
- Reliable (no flaky external dependencies)
- Safe (no real emails sent, no real data mutated)

---

## 10. ADDING A NEW SERVICE PAGE

Follow these steps to add a new service (e.g. "Blockchain Services"):

### Step 1 — Add the route constant

```typescript
// src/constants/company.ts
export const ROUTES = {
  // ...existing routes
  blockchain: '/services/blockchain',  // ADD THIS
};
```

### Step 2 — Add the gradient

```typescript
// src/constants/theme.ts
export const GRADIENTS = {
  // ...existing
  blockchain: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
};
```

### Step 3 — Create the page file

Copy `MobileDevelopmentPage.tsx` as a template — it is the simplest service page.

```bash
cp src/pages/MobileDevelopmentPage.tsx src/pages/BlockchainPage.tsx
```

Edit the new file: update title, description, features array, hero dashboard.

### Step 4 — Add to router (App.tsx)

```tsx
const BlockchainPage = lazy(() => import('./pages/BlockchainPage'));

// Inside <Routes>:
<Route path={ROUTES.blockchain} element={<BlockchainPage />} />
```

### Step 5 — Add to services listing

```typescript
// src/components/ServicesSection.tsx
{
  title: 'Blockchain Services',
  route: ROUTES.blockchain,
  gradient: GRADIENTS.blockchain,
  // ...
}
```

### Step 6 — Add a test

```typescript
// tests/e2e/services.spec.ts
test('Blockchain page loads', async ({ page }) => {
  await page.goto('/services/blockchain');
  await expect(page.locator('h1')).toContainText('Blockchain');
});
```

---

## 11. ENVIRONMENT VARIABLES

All environment variables must start with `VITE_` to be accessible in the browser.

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_WEB3FORMS_ACCESS_KEY` | **Yes** | From web3forms.com — enables contact form emails |

### How to set up locally

```bash
# 1. Copy the example file
cp .env.example .env

# 2. Edit .env and add real values
VITE_WEB3FORMS_ACCESS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# 3. Restart the dev server (required after .env changes)
npm run dev
```

### How to set up on Vercel (production)

1. Go to vercel.com → your project → Settings → Environment Variables
2. Add `VITE_WEB3FORMS_ACCESS_KEY` with the production value
3. Redeploy

---

## 12. FUTURE ENHANCEMENTS

### Priority 1 — Quality
- [ ] Replace all remaining `any` types with proper interfaces from `src/types/`
- [ ] Use `useTheme()` hook in all 25 components (currently only App.tsx updated)
- [ ] Add `useAppNavigation()` hook in all service pages (replaces `goToContact`)
- [ ] Add Vitest unit tests for Redux slices and utility functions
- [ ] Add form validation library (React Hook Form) for cleaner validation logic

### Priority 2 — Features
- [ ] Dark mode persistence via localStorage (currently resets on refresh)
- [ ] Blog section with markdown-based articles
- [ ] Case studies / portfolio pages
- [ ] Careers page with job listings
- [ ] Live chat widget integration

### Priority 3 — Performance & SEO
- [ ] Image optimisation with WebP format
- [ ] Service Worker for offline support (PWA)
- [ ] Automated lighthouse CI check on every PR
- [ ] Sitemap auto-generation on build

### Priority 4 — Testing
- [ ] Visual regression tests with Playwright screenshots
- [ ] Cross-browser tests on Firefox and Safari (currently Chromium only in dev)
- [ ] Accessibility (a11y) tests using axe-playwright
- [ ] Performance budget tests (page load < 3s)

---

## 13. GLOSSARY FOR FRESHERS

| Term | Plain English Explanation |
|------|--------------------------|
| **Component** | A reusable piece of UI — like a Button, Card, or Header. It's a function that returns HTML. |
| **Props** | Data you pass *into* a component, like arguments to a function. |
| **State** | Data that can change over time and triggers a re-render when it does. |
| **Hook** | A special React function (starts with `use`) that lets you use state/effects in a component. |
| **Redux** | A library for storing *global* state — data that multiple components need to share. |
| **Route** | A URL path mapped to a component. `/about` → `AboutPage`. |
| **Lazy loading** | Only downloading code when it's needed, not all at once. |
| **TypeScript** | JavaScript with types. `let name: string = 'John'` — the compiler ensures `name` is always a string. |
| **Interface** | A TypeScript blueprint. Defines what properties an object must have. |
| **E2E test** | A test that opens a real browser, clicks buttons, and checks what the user sees. |
| **Mock** | A fake replacement for a real API/service used during tests so tests don't need internet. |
| **Build** | Compiling and bundling code into files a browser can load efficiently. |
| **Hot reload** | When you save a file in dev mode, the browser updates instantly without manual refresh. |
| **SEO** | Search Engine Optimisation — techniques that help Google find and rank your site. |
| **Structured data** | JSON-LD code embedded in pages that tells Google exactly what your business is. |
| **Web3Forms** | A free service that receives form submissions and forwards them to your email. |

---

*This documentation was written to be readable by freshers and usable by senior engineers.
Convert to PDF using: `pandoc ARCHITECTURE.md -o ARCHITECTURE.pdf --pdf-engine=wkhtmltopdf`*
