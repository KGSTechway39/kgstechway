import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: object;
  noIndex?: boolean;
}

interface SEOConfig {
  [key: string]: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    structuredData?: object;
    noIndex?: boolean;
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData,
  noIndex = false,
}) => {
  const location = useLocation();
  const baseUrl = 'https://kgstechway.com';

  // SEO configuration for different pages
  const seoConfig: SEOConfig = {
    '/': {
      title: 'KGSTechway Services - Software Development, AI Solutions, CRM/ERP Services',
      description: 'KGSTechway specializes in Software Product Development, AI Solutions, CRM/ERP Services, and Agentic AI Solutions. Transform your business with innovative technology solutions.',
      keywords: 'Software Development, AI Solutions, CRM Services, ERP Services, Agentic AI, Custom Software, Business Automation, Digital Transformation',
      ogTitle: 'KGSTechway Services - Leading Technology Solutions Provider',
      ogDescription: 'Expert in Software Product Development, AI Solutions, CRM/ERP Services, and Agentic AI Solutions. Partner with us to transform your business.',
      ogImage: `${baseUrl}/images/og-home.jpg`,
    },
    '/services': {
      title: 'Our Services - Software Development & AI Solutions | KGSTechway',
      description: 'Comprehensive technology services including Software Product Development, AI Solutions, CRM/ERP Services, Agentic AI, Cloud & DevOps, and Mobile App Development.',
      keywords: 'Software Services, AI Development, CRM Solutions, ERP Implementation, Mobile Development, Cloud Services, DevOps Solutions',
      ogTitle: 'Technology Services - KGSTechway Solutions',
      ogDescription: 'Complete range of technology services from software development to AI solutions. Discover how we can transform your business with cutting-edge technology.',
      ogImage: `${baseUrl}/images/og-services.jpg`,
    },
    '/about': {
      title: 'About KGSTechway - Leading Technology Solutions Company',
      description: 'Learn about KGSTechway, a leading technology company specializing in software development, AI solutions, and digital transformation. Our mission, values, and expertise.',
      keywords: 'About KGSTechway, Company Profile, Technology Expertise, Software Development Company, AI Solutions Provider',
      ogTitle: 'About KGSTechway - Technology Innovation Leaders',
      ogDescription: 'Discover KGSTechway\'s journey in technology innovation. Learn about our mission, values, technical expertise, and commitment to delivering exceptional solutions.',
      ogImage: `${baseUrl}/images/og-about.jpg`,
    },
    '/technology': {
      title: 'Technology Stack & Expertise | KGSTechway Services',
      description: 'Explore KGSTechway\'s comprehensive technology stack including React, Node.js, Python, AI/ML frameworks, cloud platforms, and modern development tools.',
      keywords: 'Technology Stack, React Development, Node.js, Python, AI Frameworks, Cloud Platforms, Modern Development Tools',
      ogTitle: 'Technology Stack & Technical Expertise - KGSTechway',
      ogDescription: 'Deep dive into our technology expertise covering frontend, backend, AI/ML, cloud, and emerging technologies that power innovative solutions.',
      ogImage: `${baseUrl}/images/og-technology.jpg`,
    },
    '/contact': {
      title: 'Contact KGSTechway - Get Your Project Started Today',
      description: 'Ready to start your next project? Contact KGSTechway for software development, AI solutions, and technology consulting. Get a free consultation and quote.',
      keywords: 'Contact KGSTechway, Software Development Consultation, AI Solutions Quote, Technology Consulting, Project Inquiry',
      ogTitle: 'Contact KGSTechway - Start Your Technology Project',
      ogDescription: 'Get in touch with KGSTechway for your next technology project. Free consultation, competitive quotes, and expert guidance for your business transformation.',
      ogImage: `${baseUrl}/images/og-contact.jpg`,
    },
    '/services/software-development': {
      title: 'Software Product Development Services | KGSTechway',
      description: 'End-to-end software product development services from concept to deployment. Custom web applications, enterprise software, and scalable solutions.',
      keywords: 'Software Product Development, Custom Software Development, Web Applications, Enterprise Software, Software Engineering',
      ogTitle: 'Software Product Development - KGSTechway Services',
      ogDescription: 'Professional software product development services. From MVP to enterprise-scale applications, we deliver high-quality, scalable software solutions.',
      ogImage: `${baseUrl}/images/og-software-development.jpg`,
    },
    '/services/ai-solutions': {
      title: 'AI Solutions & Machine Learning Services | KGSTechway',
      description: 'Advanced AI solutions and machine learning services. Predictive analytics, natural language processing, computer vision, and intelligent automation.',
      keywords: 'AI Solutions, Machine Learning Services, Predictive Analytics, NLP, Computer Vision, Intelligent Automation',
      ogTitle: 'AI Solutions & Machine Learning - KGSTechway',
      ogDescription: 'Transform your business with cutting-edge AI solutions. From machine learning models to intelligent automation systems.',
      ogImage: `${baseUrl}/images/og-ai-solutions.jpg`,
    },
    '/services/crm-erp': {
      title: 'CRM & ERP Solutions - Business Management Systems | KGSTechway',
      description: 'Custom CRM and ERP solutions to streamline business operations. Customer management, inventory control, financial management, and process automation.',
      keywords: 'CRM Solutions, ERP Systems, Business Management Software, Customer Management, Inventory Control, Process Automation',
      ogTitle: 'CRM & ERP Solutions - KGSTechway Business Systems',
      ogDescription: 'Comprehensive CRM and ERP solutions to optimize business operations, improve efficiency, and drive growth.',
      ogImage: `${baseUrl}/images/og-crm-erp.jpg`,
    },
    '/services/agentic-ai': {
      title: 'Agentic AI Solutions - Autonomous AI Agents | KGSTechway',
      description: 'Next-generation Agentic AI solutions with autonomous decision-making capabilities. Intelligent agents for business process automation and optimization.',
      keywords: 'Agentic AI, Autonomous AI Agents, Intelligent Automation, AI Decision Making, Business Process Automation',
      ogTitle: 'Agentic AI Solutions - Autonomous Intelligence | KGSTechway',
      ogDescription: 'Revolutionary Agentic AI solutions that act autonomously to solve complex business challenges and optimize operations.',
      ogImage: `${baseUrl}/images/og-agentic-ai.jpg`,
    },
    '/services/cloud-devops': {
      title: 'Cloud & DevOps Solutions - Infrastructure & Deployment | KGSTechway',
      description: 'Cloud migration, infrastructure management, CI/CD pipelines, containerization, and DevOps automation services for scalable applications.',
      keywords: 'Cloud Solutions, DevOps Services, Infrastructure Management, CI/CD, Containerization, Cloud Migration',
      ogTitle: 'Cloud & DevOps Solutions - KGSTechway Infrastructure',
      ogDescription: 'Expert cloud and DevOps services to modernize your infrastructure, automate deployments, and scale your applications efficiently.',
      ogImage: `${baseUrl}/images/og-cloud-devops.jpg`,
    },
    '/services/mobile-development': {
      title: 'Mobile App Development Services | KGSTechway',
      description: 'Native and cross-platform mobile app development. iOS, Android, React Native, and Flutter applications with modern UI/UX design.',
      keywords: 'Mobile App Development, iOS Development, Android Development, React Native, Flutter, Mobile Applications',
      ogTitle: 'Mobile App Development - KGSTechway Mobile Solutions',
      ogDescription: 'Professional mobile app development services for iOS and Android. From concept to app store deployment.',
      ogImage: `${baseUrl}/images/og-mobile-development.jpg`,
    },
  };

  // Get current page SEO or use provided props
  const currentPath = location.pathname;
  const pageSEO = seoConfig[currentPath] || seoConfig['/'];

  const finalTitle = title || pageSEO.title;
  const finalDescription = description || pageSEO.description;
  const finalKeywords = keywords || pageSEO.keywords;
  const finalCanonicalUrl = canonicalUrl || `${baseUrl}${currentPath}`;
  const finalOgTitle = ogTitle || pageSEO.ogTitle;
  const finalOgDescription = ogDescription || pageSEO.ogDescription;
  const finalOgImage = ogImage || pageSEO.ogImage;
  const finalOgUrl = ogUrl || `${baseUrl}${currentPath}`;
  const finalTwitterTitle = twitterTitle || finalOgTitle;
  const finalTwitterDescription = twitterDescription || finalOgDescription;
  const finalTwitterImage = twitterImage || finalOgImage;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty?: boolean) => {
      let selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update link tags
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      
      element.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph tags
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', finalOgTitle, true);
    updateMetaTag('og:description', finalOgDescription, true);
    updateMetaTag('og:image', finalOgImage, true);
    updateMetaTag('og:url', finalOgUrl, true);
    updateMetaTag('og:site_name', 'KGSTechway Services', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@kgstechway');
    updateMetaTag('twitter:creator', '@kgstechway');
    updateMetaTag('twitter:title', finalTwitterTitle);
    updateMetaTag('twitter:description', finalTwitterDescription);
    updateMetaTag('twitter:image', finalTwitterImage);
    updateMetaTag('twitter:url', finalOgUrl);

    // Canonical URL
    updateLinkTag('canonical', finalCanonicalUrl);

    // Structured Data
    if (structuredData || pageSEO.structuredData) {
      const data = structuredData || pageSEO.structuredData;
      let script = document.querySelector('#page-structured-data') as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement('script');
        script.id = 'page-structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(data);
    }

    // Update navigation breadcrumbs
    updateBreadcrumbStructuredData(currentPath);

  }, [
    finalTitle,
    finalDescription,
    finalKeywords,
    finalCanonicalUrl,
    finalOgTitle,
    finalOgDescription,
    finalOgImage,
    finalOgUrl,
    finalTwitterTitle,
    finalTwitterDescription,
    finalTwitterImage,
    structuredData,
    noIndex,
    currentPath
  ]);

  const updateBreadcrumbStructuredData = (path: string) => {
    const breadcrumbItems: any[] = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      }
    ];

    const pathSegments = path.split('/').filter(segment => segment);
    let currentUrl = baseUrl;

    pathSegments.forEach((segment, index) => {
      currentUrl += `/${segment}`;
      let name = segment;

      // Convert URL segments to readable names
      switch (segment) {
        case 'services':
          name = 'Services';
          break;
        case 'about':
          name = 'About';
          break;
        case 'technology':
          name = 'Technology';
          break;
        case 'contact':
          name = 'Contact';
          break;
        case 'software-development':
          name = 'Software Development';
          break;
        case 'ai-solutions':
          name = 'AI Solutions';
          break;
        case 'crm-erp':
          name = 'CRM/ERP Services';
          break;
        case 'agentic-ai':
          name = 'Agentic AI';
          break;
        case 'cloud-devops':
          name = 'Cloud & DevOps';
          break;
        case 'mobile-development':
          name = 'Mobile Development';
          break;
        default:
          name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
      }

      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": currentUrl
      });
    });

    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };

    let script = document.querySelector('#breadcrumb-structured-data') as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.id = 'breadcrumb-structured-data';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(breadcrumbData);
  };

  return null;
};

export default SEO;