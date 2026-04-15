/**
 * @file src/constants/company.ts
 * @description Single source of truth for all company information.
 *
 * WHY THIS FILE EXISTS:
 * Previously, the company name, email, phone, and URLs were hardcoded
 * in 30+ different places across the codebase. If any detail changes,
 * you now only need to update ONE place.
 *
 * HOW TO USE:
 *   import { COMPANY } from '../constants/company';
 *   <span>{COMPANY.email}</span>
 */

export const COMPANY = {
  name: 'KGS Techway',
  legalName: 'KGSTechway Services',
  tagline: 'The Intelligent Pathway to Business Success',
  description:
    'Leading provider of innovative technology solutions — software development, AI, QA & Testing, and enterprise services that drive business growth.',

  contact: {
    email: 'sales@kgstechway.com',
    phone: '+91 8248718780',
    address: 'Krishnagiri, Tamil Nadu, India',
  },

  social: {
    linkedin: 'https://linkedin.com/company/kgstechway',
    twitter: 'https://twitter.com/kgstechway',
    facebook: 'https://facebook.com/kgstechway',
    instagram: 'https://instagram.com/kgstechway',
    github: 'https://github.com/kgstechway',
  },

  /** Production domain — used for SEO canonical URLs and structured data */
  baseUrl: 'https://kgstechway.com',

  /** Founding year — used in About section and legal copy */
  foundedYear: 2020,
} as const;

/** Route paths — keeps navigation consistent across the app */
export const ROUTES = {
  home: '/',
  services: '/services',
  about: '/about',
  technology: '/technology',
  contact: '/contact',
  softwareDev: '/services/software-development',
  aiSolutions: '/services/ai-solutions',
  crmErp: '/services/crm-erp',
  agenticAi: '/services/agentic-ai',
  cloudDevops: '/services/cloud-devops',
  mobileDev: '/services/mobile-development',
  qaTesting: '/services/qa-testing',
  staffAugmentation: '/services/staff-augmentation',
} as const;
