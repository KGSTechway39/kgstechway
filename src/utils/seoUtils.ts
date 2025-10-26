// SEO utility functions for generating structured data and meta information

export interface PageSEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: any;
  noIndex?: boolean;
}

export const generateServiceStructuredData = (service: {
  name: string;
  description: string;
  features: string[];
  technologies: string[];
  benefits: string[];
  priceRange?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "KGSTechway Services",
      "url": "https://kgstechway.com",
      "telephone": "+91 8248718780",
      "email": "sales@kgstechway.com"
    },
    "serviceType": "Technology Services",
    "category": "Software Development",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://kgstechway.com/contact",
      "serviceSmsNumber": "+91 8248718780"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.name + " Features",
      "itemListElement": service.features.map((feature) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feature,
          "description": `${service.name} includes ${feature.toLowerCase()}`
        }
      }))
    },
    "knowsAbout": service.technologies,
    "makesOffer": {
      "@type": "Offer",
      "description": service.description,
      "priceRange": service.priceRange || "$$",
      "availability": "https://schema.org/InStock"
    }
  };
};

export const generateArticleStructuredData = (article: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  imageUrl?: string;
  url: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.imageUrl || "https://kgstechway.com/images/default-article.jpg",
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.author || "KGSTechway Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KGSTechway Services",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kgstechway.com/logo.png",
        "width": 200,
        "height": 60
      }
    },
    "url": article.url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
};

export const generateCompanyStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KGSTechway Services",
    "alternateName": ["KGSTechway", "KGS Techway"],
    "url": "https://kgstechway.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kgstechway.com/logo.png",
      "width": 200,
      "height": 60
    },
    "description": "Leading technology solutions provider specializing in Software Product Development, AI Solutions, CRM/ERP Services, and Agentic AI Solutions",
    "foundingDate": "2019",
    "numberOfEmployees": "10-50",
    "slogan": "Transforming Ideas into Digital Reality",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "Digital City",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91 8248718780",
        "contactType": "Customer Service",
        "email": "sales@kgstechway.com",
        "availableLanguage": ["English"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/kgstechway",
      "https://twitter.com/kgstechway",
      "https://github.com/kgstechway",
      "https://facebook.com/kgstechway"
    ],
    "knowsAbout": [
      "Software Development",
      "AI Solutions",
      "CRM/ERP Services",
      "Agentic AI Solutions",
      "Digital Transformation",
      "Business Automation",
      "Cloud Computing",
      "DevOps",
      "Mobile Development"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technology Services Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Software Product Development",
            "category": "Software Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Solutions",
            "category": "Artificial Intelligence"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CRM/ERP Services",
            "category": "Business Software"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Agentic AI Solutions",
            "category": "Advanced AI"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud & DevOps Solutions",
            "category": "Infrastructure"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "category": "Mobile Development"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
};

export const generateFAQStructuredData = (faqs: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateWebPageStructuredData = (page: {
  name: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; url: string }[];
}) => {
  const structuredData: any = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.name,
    "description": page.description,
    "url": page.url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "KGSTechway Services",
      "url": "https://kgstechway.com"
    },
    "about": {
      "@type": "Organization",
      "name": "KGSTechway Services"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KGSTechway Services"
    }
  };

  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    structuredData.breadcrumb = {
      "@type": "BreadcrumbList",
      "itemListElement": page.breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  }

  return structuredData;
};

export const generateTechnologyStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Technology Stack & Expertise - KGSTechway Services",
    "description": "Comprehensive overview of KGSTechway's technology stack including frontend, backend, AI/ML, and cloud technologies.",
    "author": {
      "@type": "Organization",
      "name": "KGSTechway Services"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KGSTechway Services",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kgstechway.com/logo.png"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "about": [
      {
        "@type": "SoftwareApplication",
        "name": "React",
        "applicationCategory": "Frontend Framework"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Node.js",
        "applicationCategory": "Backend Runtime"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Python",
        "applicationCategory": "Programming Language"
      },
      {
        "@type": "SoftwareApplication",
        "name": "Artificial Intelligence",
        "applicationCategory": "AI/ML Framework"
      }
    ]
  };
};

export const generateContactStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact KGSTechway Services",
    "description": "Get in touch with KGSTechway for your technology needs. Free consultation and project quotes available.",
    "url": "https://kgstechway.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "KGSTechway Services",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91 8248718780",
        "contactType": "Customer Service",
        "email": "sales@kgstechway.com",
        "availableLanguage": "English",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    }
  };
};

export const getSitemap = () => {
  const baseUrl = 'https://kgstechway.com';
  const pages = [
    { url: '', priority: 1.0, changefreq: 'weekly' },
    { url: '/services', priority: 0.9, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/technology', priority: 0.8, changefreq: 'monthly' },
    { url: '/contact', priority: 0.9, changefreq: 'weekly' },
    { url: '/services/software-development', priority: 0.8, changefreq: 'weekly' },
    { url: '/services/ai-solutions', priority: 0.8, changefreq: 'weekly' },
    { url: '/services/crm-erp', priority: 0.8, changefreq: 'weekly' },
    { url: '/services/agentic-ai', priority: 0.8, changefreq: 'weekly' },
    { url: '/services/cloud-devops', priority: 0.8, changefreq: 'weekly' },
    { url: '/services/mobile-development', priority: 0.8, changefreq: 'weekly' },
  ];

  return pages.map(page => ({
    ...page,
    url: baseUrl + page.url,
    lastmod: new Date().toISOString().split('T')[0]
  }));
};

export const generateRobotstxt = () => {
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://kgstechway.com/sitemap.xml
Sitemap: https://kgstechway.com/sitemap-pages.xml
Sitemap: https://kgstechway.com/sitemap-services.xml

# Crawl delay
Crawl-delay: 1

# Block specific paths if needed
# Disallow: /admin/
# Disallow: /private/

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /`;
};