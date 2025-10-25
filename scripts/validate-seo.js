import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SEO Validation Script for KGSTechway
class SEOValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.publicDir = path.join(__dirname, '..', 'public');
    this.distDir = path.join(__dirname, '..', 'dist');
  }

  log(type, message) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    if (type === 'error') {
      this.errors.push(message);
    } else if (type === 'warning') {
      this.warnings.push(message);
    }
  }

  checkFile(filePath, description) {
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${description}: Found`);
      return true;
    } else {
      this.log('error', `${description}: Missing at ${filePath}`);
      return false;
    }
  }

  validateSitemap() {
    const sitemapPath = path.join(this.publicDir, 'sitemap.xml');
    if (this.checkFile(sitemapPath, 'Sitemap')) {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      
      // Check for required URLs
      const requiredUrls = [
        'https://kgstechway.com/',
        'https://kgstechway.com/#services',
        'https://kgstechway.com/#about',
        'https://kgstechway.com/#contact'
      ];

      requiredUrls.forEach(url => {
        if (content.includes(url)) {
          console.log(`✅ Sitemap includes: ${url}`);
        } else {
          this.log('warning', `Sitemap missing URL: ${url}`);
        }
      });

      // Check for structured data
      if (content.includes('xmlns:image')) {
        console.log('✅ Sitemap includes image schema');
      } else {
        this.log('warning', 'Sitemap missing image schema');
      }
    }
  }

  validateRobots() {
    const robotsPath = path.join(this.publicDir, 'robots.txt');
    if (this.checkFile(robotsPath, 'Robots.txt')) {
      const content = fs.readFileSync(robotsPath, 'utf8');
      
      if (content.includes('Sitemap:')) {
        console.log('✅ Robots.txt includes sitemap reference');
      } else {
        this.log('error', 'Robots.txt missing sitemap reference');
      }

      if (content.includes('User-agent: *')) {
        console.log('✅ Robots.txt includes user-agent directive');
      } else {
        this.log('error', 'Robots.txt missing user-agent directive');
      }
    }
  }

  validateManifest() {
    const manifestPath = path.join(this.publicDir, 'site.webmanifest');
    const manifestJsonPath = path.join(this.publicDir, 'manifest.json');
    
    if (this.checkFile(manifestPath, 'Web App Manifest (site.webmanifest)') ||
        this.checkFile(manifestJsonPath, 'Web App Manifest (manifest.json)')) {
      
      const filePath = fs.existsSync(manifestPath) ? manifestPath : manifestJsonPath;
      const content = fs.readFileSync(filePath, 'utf8');
      
      try {
        const manifest = JSON.parse(content);
        
        // Check required fields
        const requiredFields = ['name', 'short_name', 'start_url', 'display', 'theme_color', 'background_color'];
        requiredFields.forEach(field => {
          if (manifest[field]) {
            console.log(`✅ Manifest includes: ${field}`);
          } else {
            this.log('error', `Manifest missing required field: ${field}`);
          }
        });

        // Check icons
        if (manifest.icons && manifest.icons.length > 0) {
          console.log(`✅ Manifest includes ${manifest.icons.length} icons`);
          
          const recommendedSizes = ['192x192', '512x512'];
          recommendedSizes.forEach(size => {
            const hasSize = manifest.icons.some(icon => icon.sizes === size);
            if (hasSize) {
              console.log(`✅ Manifest includes ${size} icon`);
            } else {
              this.log('warning', `Manifest missing recommended ${size} icon`);
            }
          });
        } else {
          this.log('error', 'Manifest missing icons array');
        }
      } catch (e) {
        this.log('error', 'Manifest contains invalid JSON');
      }
    }
  }

  validateSecurity() {
    const securityPath = path.join(this.publicDir, '.well-known', 'security.txt');
    this.checkFile(securityPath, 'Security.txt');
  }

  validateHTMLMeta() {
    const indexPath = path.join(__dirname, '..', 'index.html');
    if (this.checkFile(indexPath, 'index.html')) {
      const content = fs.readFileSync(indexPath, 'utf8');
      
      // Check meta tags
      const metaTags = [
        { name: 'description', required: true },
        { name: 'keywords', required: false },
        { name: 'author', required: false },
        { name: 'viewport', required: true },
        { property: 'og:title', required: true },
        { property: 'og:description', required: true },
        { property: 'og:image', required: true },
        { property: 'og:url', required: true },
        { name: 'twitter:card', required: true },
        { name: 'twitter:title', required: true },
        { name: 'twitter:description', required: true }
      ];

      metaTags.forEach(tag => {
        const selector = tag.name ? `name="${tag.name}"` : `property="${tag.property}"`;
        if (content.includes(selector)) {
          console.log(`✅ Meta tag found: ${tag.name || tag.property}`);
        } else if (tag.required) {
          this.log('error', `Required meta tag missing: ${tag.name || tag.property}`);
        } else {
          this.log('warning', `Optional meta tag missing: ${tag.name || tag.property}`);
        }
      });

      // Check structured data
      if (content.includes('"@type": "Organization"')) {
        console.log('✅ Organization structured data found');
      } else {
        this.log('warning', 'Organization structured data missing');
      }

      if (content.includes('"@type": "WebSite"')) {
        console.log('✅ WebSite structured data found');
      } else {
        this.log('warning', 'WebSite structured data missing');
      }
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(50));
    console.log('SEO VALIDATION REPORT');
    console.log('='.repeat(50));
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('🎉 All SEO checks passed!');
    } else {
      if (this.errors.length > 0) {
        console.log(`\n❌ ${this.errors.length} Error(s):`);
        this.errors.forEach((error, index) => {
          console.log(`   ${index + 1}. ${error}`);
        });
      }

      if (this.warnings.length > 0) {
        console.log(`\n⚠️  ${this.warnings.length} Warning(s):`);
        this.warnings.forEach((warning, index) => {
          console.log(`   ${index + 1}. ${warning}`);
        });
      }
    }

    console.log('\n' + '='.repeat(50));
    
    // Return exit code
    return this.errors.length > 0 ? 1 : 0;
  }

  validate() {
    console.log('🔍 Starting SEO validation for KGSTechway...\n');
    
    this.validateHTMLMeta();
    this.validateSitemap();
    this.validateRobots();
    this.validateManifest();
    this.validateSecurity();
    
    return this.generateReport();
  }
}

// Run validation
const validator = new SEOValidator();
const exitCode = validator.validate();
process.exit(exitCode);