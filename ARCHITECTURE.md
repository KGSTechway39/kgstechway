# KGS Techway — Project Architecture & Developer Guide

> **Production-Ready • Beginner-Friendly • PDF-Convertible**
> Version 2.0 | Last Updated: April 2026

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
12. [AI Chatbot (Groq)](#12-ai-chatbot-groq)
13. [SEO Architecture](#13-seo-architecture)
14. [Deployment Guide](#14-deployment-guide)
15. [Future Enhancements](#15-future-enhancements)
16. [Glossary for Freshers](#16-glossary-for-freshers)

---

## 1. PROJECT OVERVIEW

**KGS Techway** is the official marketing and services website for KGS Techway Services — a technology company offering software development, AI solutions, QA & testing, cloud DevOps, CRM/ERP, mobile development, and staff augmentation services.

### What this project does

- Presents the company's 8 core services to potential clients
- Provides a contact form so visitors can request consultations
- Sends enquiry emails to `sales@kgstechway.com` via Web3Forms (free email API)
- Powers an always-on AI chatbot assistant (Groq / Llama 3.3 70B)
- Shows the technology stack the company works with
- Optimised for SEO (structured data, Open Graph, FAQ schema, LocalBusiness schema)

### Who will use this project

| Person | How they use it |
|--------|----------------|
| Potential clients | Browse services, submit contact form, chat with AI assistant |
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

### AI Chatbot

| Tool | Why |
|------|-----|
| **Groq SDK** | Ultra-fast LLM inference API. Free tier: 14,400 requests/day. Powers the KGS AI Assistant. |
| **Llama 3.3 70B** | Open-source LLM by Meta, served via Groq. Excellent for conversational Q&A about services. |
| **Vercel Serverless** | `/api/chat.js` runs server-side so the Groq API key is never exposed to the browser. |

### Testing

| Tool | Why |
|------|-----|
| **Playwright** | Microsoft's browser automation framework. Considered the gold standard for E2E (end-to-end) web testing. Tests run in real Chromium and WebKit (Mobile Safari) browsers. |

### Hosting & Analytics

| Tool | Why |
|------|-----|
| **Vercel** | Free hosting with automatic SSL, CDN, and preview deployments on every git push. |
| **@vercel/analytics** | Tracks page views without cookies (GDPR-friendly). |

---

## 3. FOLDER STRUCTURE

```
kgstechway/
├── api/                              ← Vercel Serverless Functions (Node.js ESM)
│   ├── chat.js                       ← AI chatbot endpoint: POST /api/chat
│   └── send-email.js                 ← Legacy SMTP handler (kept, not used for contact form)
│
├── src/                              ← All React source code lives here
│   │
│   ├── types/
│   │   └── index.ts                  ← TypeScript interfaces for the whole app
│   │
│   ├── constants/
│   │   ├── company.ts                ← Company info, email, phone, URLs, routes
│   │   └── theme.ts                  ← Brand colors, gradients, animation presets
│   │
│   ├── hooks/
│   │   ├── useTheme.ts               ← Typed Redux selector for theme state
│   │   ├── useNavigation.ts          ← Typed selector + goTo / goToContact helpers
│   │   └── useFocusManagement.tsx    ← Keyboard navigation & accessibility
│   │
│   ├── store/
│   │   ├── index.ts                  ← Creates the Redux store
│   │   ├── themeSlice.ts             ← Dark mode + brand colors state
│   │   └── navigationSlice.ts        ← Active section, scroll, menu state
│   │
│   ├── components/                   ← Reusable UI components (used across pages)
│   │   ├── Header.tsx                ← Top navigation bar
│   │   ├── Footer.tsx                ← Bottom footer
│   │   ├── BrandLogo.tsx             ← SVG logo + "KGS Techway" wordmark
│   │   ├── HeroSection.tsx           ← Landing page hero (typewriter + CTA)
│   │   ├── ServicesSection.tsx       ← 8 service cards grid
│   │   ├── TechStackSection.tsx      ← Technology categories with pill UI
│   │   ├── HowWeWorkSection.tsx      ← 6-step process visualization
│   │   ├── ContactSection.tsx        ← Contact form with Web3Forms integration
│   │   ├── ChatBot.tsx               ← AI chatbot bubble + chat window (always open)
│   │   ├── ChatBot.css               ← Chatbot styles (gradient design, animations)
│   │   ├── SEO.tsx                   ← Meta tags and structured data (JSON-LD)
│   │   ├── ErrorBoundary.tsx         ← Catches React render errors gracefully
│   │   └── LoadingSpinner.tsx        ← Shown while lazy-loaded pages load
│   │
│   ├── pages/                        ← One file per route / page
│   │   ├── HomePage.tsx              ← / (root route)
│   │   ├── ServicesPage.tsx          ← /services
│   │   ├── AboutPage.tsx             ← /about
│   │   ├── TechnologyPage.tsx        ← /technology
│   │   ├── ContactPage.tsx           ← /contact
│   │   ├── QAServicesPage.tsx        ← /services/qa-testing  ★ most complex
│   │   ├── AISolutionsPage.tsx       ← /services/ai-solutions
│   │   ├── AgenticAIPage.tsx         ← /services/agentic-ai
│   │   ├── CloudDevOpsPage.tsx       ← /services/cloud-devops
│   │   ├── CRMERPServicesPage.tsx    ← /services/crm-erp
│   │   ├── MobileDevelopmentPage.tsx ← /services/mobile-development
│   │   ├── SoftwareProductDevelopmentPage.tsx ← /services/software-development
│   │   └── StaffAugmentationPage.tsx ← /services/staff-augmentation
│   │
│   ├── utils/
│   │   └── seoUtils.ts               ← Generates JSON-LD structured data for SEO
│   │
│   ├── config/
│   │   └── emailConfig.ts            ← SMTP config reference (Zoho, currently unused)
│   │
│   ├── App.tsx                       ← Root component: Redux provider + Router + ChatBot
│   ├── main.tsx                      ← Entry point: ReactDOM.createRoot(...)
│   ├── index.css                     ← Global CSS (CSS reset, fonts, base styles)
│   └── App.css                       ← App-level layout CSS
│
├── public/                           ← Static files served as-is
│   ├── robots.txt                    ← Search engine crawl rules
│   ├── sitemap.xml                   ← Main sitemap
│   ├── sitemap-pages.xml             ← Page-level sitemap
│   ├── sitemap-services.xml          ← Services sitemap
│   ├── manifest.json                 ← PWA manifest
│   └── site.webmanifest              ← Web app manifest for mobile
│
├── tests/
│   └── e2e/                          ← Playwright end-to-end tests
│       ├── homepage.spec.ts          ← Homepage + branding + footer tests
│       ├── navigation.spec.ts        ← Header navigation + routing tests
│       ├── contact-form.spec.ts      ← Form validation + submission tests
│       └── services.spec.ts          ← Service pages + CTA button tests
│
├── index.html                        ← Entry HTML with full SEO meta tags + JSON-LD schemas
├── playwright.config.ts              ← Playwright: Chromium + Mobile Safari
├── vercel.json                       ← SPA routing rewrite rules
├── .env                              ← Secret environment variables (git-ignored)
├── vite.config.ts                    ← Build configuration
├── tsconfig.json                     ← TypeScript compiler settings
├── package.json                      ← Dependencies and npm scripts
└── ARCHITECTURE.md                   ← This file
```

### Purpose of Each Folder — For Freshers

| Folder | Analogy | What Goes In It |
|--------|---------|-----------------|
| `api/` | Backend server | Serverless functions — run on Vercel's servers, not the browser |
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
                 ├─ ChatBot (always visible — floating bubble + chat window)
                 └─ Supporting: ErrorBoundary, PerformanceMonitor, Analytics
```

### Data Flow — Contact Form

```
User fills form + clicks "Send Message"
  → handleSubmit() in ContactSection.tsx
  → validateField() checks required fields
  → If errors → inline messages shown, stop
  → If valid → fetch POST to https://api.web3forms.com/submit
  → Web3Forms API forwards email to sales@kgstechway.com
  → Success or error alert shown to user
```

### Data Flow — AI Chatbot

```
User types message in ChatBot.tsx
  → sendMessage() called
  → fetch POST to /api/chat (Vercel serverless function)
  → api/chat.js receives { message, history }
  → Groq SDK calls Llama 3.3 70B with KGS system prompt
  → Bot reply returned as { reply: "..." }
  → formatBotText() renders markdown → bullet points, bold text
  → Message appended to chat history
```

### State Management (Redux)

```
Redux Store
  ├── theme
  │     ├── isDarkMode: true         ← Controls dark/light class on all components
  │     ├── primaryColor: '#00C896'  ← Brand teal used on buttons / accents
  │     ├── secondaryColor: '#007A5E'
  │     └── accentColor: '#4DFFD8'
  │
  └── navigation
        ├── activeSection: 'home'    ← Which nav item is highlighted
        ├── isMenuOpen: false         ← Mobile hamburger state
        ├── scrollY: 0                ← Current scroll position
        └── isScrolled: false         ← Is header in compact scroll mode?
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
git clone https://github.com/KGSTechway39/kgstechway.git
cd kgstechway
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

Then edit `.env` and add your real keys:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here
GROQ_API_KEY=your_groq_api_key_here
```

**How to get a Web3Forms key (free):**
1. Go to https://web3forms.com/
2. Enter `sales@kgstechway.com`
3. Click "Create Access Key"
4. Check email for the key

**How to get a Groq API key (free):**
1. Go to https://console.groq.com/
2. Sign up and create an API key
3. Free tier: 14,400 requests/day

### Step 4 — Install Playwright browsers

```bash
npx playwright install chromium
```

---

## 6. HOW TO RUN THE PROJECT

### Development (local coding)

```bash
npm run dev
```

Opens at **http://localhost:3000** with hot reload.

### Production Build

```bash
npm run build
```

Creates optimised files in `dist/`. This is what gets deployed.

### Preview Production Build Locally

```bash
npm run preview
```

Opens the production build at http://localhost:4173.

### Lint (code quality check)

```bash
npm run lint
```

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

### Browsers Tested

| Browser | Device | Status |
|---------|--------|--------|
| Chromium | Desktop | ✅ Active |
| WebKit | Mobile Safari (iPhone 12) | ✅ Active |
| Firefox | — | Removed (not required) |

### API Mocking in Tests

Contact form tests use `page.route()` to intercept API calls:

```typescript
// Intercepts the REAL API call and returns fake data
await page.route('https://api.web3forms.com/submit', async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify({ success: true }),
  });
});
```

**Why mock?** Tests run without internet. No real emails sent. Tests are fast and deterministic.

---

## 8. CODE FLOW EXPLANATION

### Request: User visits /services/qa-testing

```
1. Browser requests http://localhost:3000/services/qa-testing
2. Vite serves index.html (single page app)
3. React boots, Redux store initialises
4. React Router reads URL: /services/qa-testing
5. Routes finds: <Route path="/services/qa-testing" element={<QAServicesPage />} />
6. QAServicesPage is lazy-loaded (downloaded now, not before)
7. Suspense shows <LoadingSpinner> while downloading
8. QAServicesPage renders with dark mode + scroll animations
```

### Request: User chats with AI Assistant

```
1. ChatBot.tsx renders as open (isOpen = true by default)
2. User types a question and hits Enter
3. sendMessage() adds user message to state
4. fetch POST to /api/chat with { message, history }
5. Vercel routes request to api/chat.js serverless function
6. Groq SDK sends message to Llama 3.3 70B with KGS system prompt
7. Model returns formatted response (bullet points, bold text)
8. api/chat.js returns { reply: "..." }
9. ChatBot.tsx receives reply, passes to formatBotText()
10. formatBotText() parses markdown: **bold** → <strong>, - item → <li>
11. Rendered message appended to chat window
```

### How Dark Mode Works

```
1. Redux store initialises: isDarkMode = true (locked to dark)
2. ThemeWrapper reads isDarkMode
3. Sets: document.documentElement.setAttribute('data-theme', 'dark')
4. Every component reads isDarkMode from useTheme()
5. Applies CSS class: className={`card ${isDarkMode ? 'dark' : 'light'}`}
```

---

## 9. BEST PRACTICES USED

### 1. Serverless API for Secret Keys

The Groq API key is **never exposed to the browser**. It lives only in Vercel's environment variables and is accessed inside `/api/chat.js` which runs server-side:

```javascript
// api/chat.js — runs on Vercel servers, NOT in the browser
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
```

### 2. Single Source of Truth for Constants

```typescript
// src/constants/company.ts
export const COMPANY = {
  contact: { email: 'sales@kgstechway.com' }
};
```

### 3. Custom Hooks Instead of Repeated useSelector

```typescript
// Typed, single definition:
const { isDarkMode } = useTheme();  // src/hooks/useTheme.ts
```

### 4. Lazy Loading for Performance

```typescript
const QAServicesPage = lazy(() => import('./pages/QAServicesPage'));
```

### 5. Error Boundaries

```tsx
<ErrorBoundary fallback={<LoadingSpinner text="Failed to load page..." />}>
  <Suspense><Routes>...</Routes></Suspense>
</ErrorBoundary>
```

### 6. Separation of Concerns

| Concern | Where it lives |
|---------|----------------|
| AI chatbot backend | `api/chat.js` (serverless) |
| AI chatbot UI | `src/components/ChatBot.tsx` |
| Contact form | `src/components/ContactSection.tsx` |
| Global state | `store/` slices |
| Business logic | `hooks/` |
| Config / constants | `constants/` |
| Type definitions | `types/` |
| Tests | `tests/` |

---

## 10. ADDING A NEW SERVICE PAGE

Follow these steps to add a new service (e.g. "Blockchain Services"):

### Step 1 — Add the route constant

```typescript
// src/constants/company.ts
export const ROUTES = {
  blockchain: '/services/blockchain',
};
```

### Step 2 — Create the page file

Copy `MobileDevelopmentPage.tsx` as a template — it is the simplest service page.

### Step 3 — Add to router (App.tsx)

```tsx
const BlockchainPage = lazy(() => import('./pages/BlockchainPage'));
<Route path={ROUTES.blockchain} element={<BlockchainPage />} />
```

### Step 4 — Add to services listing (ServicesSection.tsx)

```typescript
{
  title: 'Blockchain Services',
  route: ROUTES.blockchain,
  gradient: GRADIENTS.blockchain,
}
```

### Step 5 — Add a test

```typescript
test('Blockchain page loads', async ({ page }) => {
  await page.goto('/services/blockchain');
  await expect(page.locator('h1')).toContainText('Blockchain');
});
```

---

## 11. ENVIRONMENT VARIABLES

### Local (.env file — git-ignored)

| Variable | Required | Where Used | Description |
|----------|----------|-----------|-------------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Yes | Browser (ContactSection.tsx) | Contact form email delivery |
| `GROQ_API_KEY` | Yes | Server (api/chat.js) | AI chatbot LLM access |

> `VITE_` prefix = embedded into the browser bundle at build time by Vite.
> Variables **without** `VITE_` prefix are only available in server-side `api/` functions.

### Vercel (production)

Set in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Web3Forms key for `sales@kgstechway.com` |
| `GROQ_API_KEY` | Groq API key (server-only, not exposed to browser) |

---

## 12. AI CHATBOT (GROQ)

### Overview

The KGS Assistant is a floating chat widget that uses Groq's inference API to answer questions about KGS Techway's services. It is always open when the page loads.

### Architecture

```
ChatBot.tsx (React component)
  ├─ State: messages[], input, isLoading, isOpen (default: true)
  ├─ formatBotText() → renders markdown to JSX (bullet lists, bold)
  └─ sendMessage() → POST /api/chat

api/chat.js (Vercel Serverless Function)
  ├─ Receives: { message: string, history: Message[] }
  ├─ Builds messages array: [system prompt, ...history, user message]
  ├─ Calls Groq SDK: groq.chat.completions.create(...)
  ├─ Model: llama-3.3-70b-versatile
  └─ Returns: { reply: string }
```

### System Prompt

The chatbot is given a comprehensive system prompt covering:
- All 8 KGS services with technologies
- Full technology stack
- Contact details (`sales@kgstechway.com`, `+91 8248718780`)
- Engagement models
- Response formatting rules (bullet points, bold text, 150-word limit)

The bot is instructed **not** to answer questions unrelated to KGS Techway or technology.

### Markdown Formatting

The `formatBotText()` function in `ChatBot.tsx` parses the bot's plain-text response and renders:

| Markdown | Rendered As |
|----------|-------------|
| `**bold**` | `<strong>` element |
| `- item` or `• item` | `<ul><li>` bullet list |
| `1. item` | `<ul><li>` list (styled) |
| `# Heading` | `<p class="bot-heading">` |
| Blank line | Paragraph break |

### Design

- **Color scheme:** Indigo-to-cyan gradient (`#6366f1` → `#0ea5e9`)
- **Bubble:** Pulsing ring animation when closed
- **Header:** Gradient with shimmer overlay, blinking green status dot
- **Messages:** Rounded bubbles — bot uses light/dark background, user uses gradient
- **Input:** Rounded pill input with focus ring

### Groq Free Tier Limits

| Metric | Limit |
|--------|-------|
| Requests per day | 14,400 |
| Requests per minute | 30 |
| Tokens per minute | 6,000 |
| Max tokens per response | 500 (configured) |

---

## 13. SEO ARCHITECTURE

### Meta Tags (`index.html`)

| Tag | Purpose |
|-----|---------|
| `<title>` | Primary search engine title — includes location and services |
| `meta description` | 160-char summary shown in Google results |
| `meta keywords` | Long-tail keywords including location (Krishnagiri, Tamil Nadu) |
| `meta robots` | `index, follow, max-snippet:-1, max-image-preview:large` |
| Open Graph tags | Facebook/LinkedIn share cards |
| Twitter Card tags | Twitter share cards |
| Canonical URL | Prevents duplicate content issues |

### Structured Data (JSON-LD Schemas)

| Schema | What it tells Google |
|--------|---------------------|
| `Organization` + `LocalBusiness` | Company name, address, phone, hours, services, social links |
| `ItemList` (8 items) | All 8 KGS services with descriptions |
| `WebSite` | Site name, URL, search action |
| `FAQPage` (7 questions) | Common questions about services, location, pricing |
| `BreadcrumbList` | Site navigation structure |
| `AggregateRating` + `Review` | Star rating and customer reviews for rich snippets |

### Geographic SEO

```html
<meta name="geo.region" content="IN-TN" />
<meta name="geo.placename" content="Krishnagiri" />
<meta name="geo.position" content="12.5186;78.2137" />
```

### Sitemaps

| File | Contents |
|------|----------|
| `public/sitemap.xml` | Master sitemap pointing to sub-sitemaps |
| `public/sitemap-pages.xml` | Main pages (home, about, services, contact) |
| `public/sitemap-services.xml` | All 8 service detail pages |

### Content Security Policy

```
default-src 'self'
connect-src 'self' https://api.web3forms.com https://api.groq.com
img-src 'self' https: data:
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
font-src 'self' https://fonts.gstatic.com
script-src 'self' 'unsafe-inline'
```

---

## 14. DEPLOYMENT GUIDE

### Vercel (Production)

The project is deployed to Vercel. The Vercel project is named `kgstechway` under the `kgstechwayservices-7131s-projects` team.

**Deploy via CLI:**
```bash
npx vercel --prod --token YOUR_VERCEL_TOKEN
```

**Auto-deploy:** Every push to `main` on GitHub triggers a new Vercel deployment automatically (if connected).

### vercel.json

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

This is critical for Single Page Apps (SPAs). Without it, refreshing `/services/qa-testing` would return a 404 from Vercel because that file doesn't exist — only `index.html` does. The rewrite sends all requests to `index.html` and React Router handles the URL internally.

### Serverless Functions

Files in the `/api` directory are automatically deployed as Vercel Serverless Functions:

| File | URL | Method |
|------|-----|--------|
| `api/chat.js` | `/api/chat` | POST |
| `api/send-email.js` | `/api/send-email` | POST |

These run as Node.js on Vercel's servers — the browser never sees the API keys.

### Custom Domain

To add `kgstechway.com` as the production domain:
1. Go to vercel.com → Project → Settings → Domains
2. Add `kgstechway.com`
3. Update DNS at your domain registrar to point to Vercel's nameservers

---

## 15. FUTURE ENHANCEMENTS

### Priority 1 — Quality
- [ ] Replace all remaining `any` types with proper interfaces from `src/types/`
- [ ] Use `useTheme()` hook in all 25 components (currently only App.tsx updated)
- [ ] Add Vitest unit tests for Redux slices and utility functions
- [ ] Add form validation library (React Hook Form) for cleaner validation logic

### Priority 2 — Features
- [ ] Dark mode persistence via localStorage (currently resets on refresh)
- [ ] Blog section with markdown-based articles
- [ ] Case studies / portfolio pages
- [ ] Careers page with job listings
- [ ] Chatbot conversation history persistence (localStorage)
- [ ] Chatbot escalation to human (link to contact form)

### Priority 3 — Performance & SEO
- [ ] Image optimisation with WebP format
- [ ] Service Worker for offline support (PWA)
- [ ] Automated Lighthouse CI check on every PR
- [ ] Web3Forms upgrade to 250/month plan for higher email volume

### Priority 4 — Testing
- [ ] Visual regression tests with Playwright screenshots
- [ ] Accessibility (a11y) tests using axe-playwright
- [ ] Performance budget tests (page load < 3s)
- [ ] Chatbot response quality tests (mock Groq API)

---

## 16. GLOSSARY FOR FRESHERS

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
| **Serverless Function** | A small backend script that runs on a server (Vercel) without you managing the server. Lives in `/api/`. |
| **LLM** | Large Language Model — an AI that generates human-like text. Groq runs Llama 3.3 70B for us. |
| **Groq** | An AI inference API — extremely fast at running LLMs. Free tier: 14,400 requests/day. |
| **Web3Forms** | A free service that receives form submissions and forwards them to your email. |
| **JSON-LD** | A way to embed structured data in HTML so Google can understand your business better. |
| **E2E test** | A test that opens a real browser, clicks buttons, and checks what the user sees. |
| **Mock** | A fake replacement for a real API/service used during tests so tests don't need internet. |
| **Vercel** | A hosting platform that deploys React apps with one command and auto-SSL. |
| **CSP** | Content Security Policy — a browser security rule that controls which external URLs are allowed. |

---

*Version 2.0 — Added AI Chatbot (Groq), advanced SEO schemas, serverless architecture, and updated environment variable docs.*
*Convert to PDF: `pandoc ARCHITECTURE.md -o ARCHITECTURE.pdf --pdf-engine=wkhtmltopdf`*
