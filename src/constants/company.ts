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
  legalName: 'KGS Techway Services Private Limited',
  cin: 'U62013TZ2024PTC032111',
  tagline: 'The Intelligent Pathway to Business Success',
  description:
    'Leading provider of innovative technology solutions — software development, AI, QA & Testing, and enterprise services that drive business growth.',

  contact: {
    email: 'sales@kgstechway.com',
    phone: '+91 8248718780',
    address: 'No 47/256, Govinda Chetty St, Kaveripattinam (Krishnagiri), Krishnagiri, Tamil Nadu 635112, India',
  },

  /** Registered office — broken into parts for structured data / PostalAddress */
  registeredAddress: {
    street: 'No 47/256, Govinda Chetty St, Kaveripattinam (Krishnagiri)',
    locality: 'Krishnagiri',
    region: 'Tamil Nadu',
    postalCode: '635112',
    country: 'India',
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

  /** Founding year — matches MCA incorporation year encoded in the CIN */
  foundedYear: 2024,
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
  privacyPolicy: '/privacy-policy',
  termsOfService: '/terms-of-service',
} as const;
