/**
 * @file src/types/index.ts
 * @description Central type definitions for the entire application.
 *
 * WHY THIS FILE EXISTS:
 * Instead of using `any` everywhere (which defeats TypeScript's purpose),
 * we define all shared interfaces and types here in one place.
 * This gives us auto-complete, compile-time safety, and self-documenting code.
 */

import type { ReactNode } from 'react';

// ─────────────────────────────────────────────
// REDUX STORE TYPES
// ─────────────────────────────────────────────

/** Shape of the theme slice in Redux */
export interface ThemeState {
  isDarkMode: boolean;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

/** Shape of the navigation slice in Redux */
export interface NavigationState {
  activeSection: string;
  isMenuOpen: boolean;
  scrollY: number;
  isScrolled: boolean;
}

/** Root Redux state — use this instead of `any` in useSelector */
export interface RootState {
  theme: ThemeState;
  navigation: NavigationState;
}

// ─────────────────────────────────────────────
// NAVIGATION TYPES
// ─────────────────────────────────────────────

/** A single navigation menu item */
export interface NavItem {
  id: string;
  label: string;
  path: string;
}

// ─────────────────────────────────────────────
// SERVICE / FEATURE CARD TYPES
// ─────────────────────────────────────────────

/** A service card shown on the services section / home page */
export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  delay: number;
  route: string;
}

/** A feature card shown inside a service detail page */
export interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  technologies: string[];
}

/** A process step shown in implementation / how-we-work sections */
export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  duration: string;
}

/** A service offering card (e.g. QA packages) */
export interface ServiceOffering {
  title: string;
  description: string;
  features: string[];
}

// ─────────────────────────────────────────────
// BRAND / LOGO TYPES
// ─────────────────────────────────────────────

export type LogoSize = 'sm' | 'md' | 'lg';

export interface BrandLogoProps {
  size?: LogoSize;
  showTagline?: boolean;
  onDark?: boolean;
}

// ─────────────────────────────────────────────
// SEO TYPES
// ─────────────────────────────────────────────

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
  canonical?: string;
  noindex?: boolean;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// ─────────────────────────────────────────────
// CONTACT FORM TYPES
// ─────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

export interface ContactFormErrors {
  name: string;
  email: string;
  service: string;
  message: string;
}

export type AlertType = 'success' | 'danger';

// ─────────────────────────────────────────────
// TECH STACK TYPES
// ─────────────────────────────────────────────

export interface Tech {
  name: string;
  icon: ReactNode;
  color: string;
  featured?: boolean;
}

export interface TechCategory {
  id: string;
  name: string;
  categoryColor: string;
  categoryIcon: ReactNode;
  techs: Tech[];
}

// ─────────────────────────────────────────────
// TESTIMONIAL TYPES
// ─────────────────────────────────────────────

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  service: string;
}

// ─────────────────────────────────────────────
// WEB3FORMS API TYPES
// ─────────────────────────────────────────────

export interface Web3FormsPayload {
  access_key: string;
  subject: string;
  from_name: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  date: string;
}

export interface Web3FormsResponse {
  success: boolean;
  message?: string;
}

// ─────────────────────────────────────────────
// HOW WE WORK TYPES
// ─────────────────────────────────────────────

export interface WorkStep {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}

// ─────────────────────────────────────────────
// STAT / METRIC TYPES
// ─────────────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
  icon: ReactNode;
}
