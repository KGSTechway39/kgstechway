import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BundleAnalyzer {
  constructor() {
    this.distDir = path.join(__dirname, '..', 'dist');
    this.assets = [];
  }

  analyzeBundleSize() {
    console.log('📦 Bundle Size Analysis\n');
    console.log('='.repeat(50));

    if (!fs.existsSync(this.distDir)) {
      console.error('❌ Build directory not found. Run "npm run build" first.');
      return;
    }

    this.scanDirectory(this.distDir);
    this.generateReport();
  }

  scanDirectory(dir, relativePath = '') {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const relativeItemPath = path.join(relativePath, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        this.scanDirectory(fullPath, relativeItemPath);
      } else {
        this.assets.push({
          name: relativeItemPath,
          size: stats.size,
          type: this.getFileType(item)
        });
      }
    });
  }

  getFileType(filename) {
    const ext = path.extname(filename).toLowerCase();
    const typeMap = {
      '.js': 'JavaScript',
      '.css': 'CSS',
      '.html': 'HTML',
      '.png': 'Image',
      '.jpg': 'Image',
      '.jpeg': 'Image',
      '.gif': 'Image',
      '.svg': 'SVG',
      '.webp': 'Image',
      '.woff': 'Font',
      '.woff2': 'Font',
      '.ttf': 'Font',
      '.eot': 'Font'
    };
    return typeMap[ext] || 'Other';
  }

  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateReport() {
    // Group by type
    const byType = this.assets.reduce((acc, asset) => {
      if (!acc[asset.type]) {
        acc[asset.type] = [];
      }
      acc[asset.type].push(asset);
      return acc;
    }, {});

    // Sort assets by size
    this.assets.sort((a, b) => b.size - a.size);

    // Calculate total size
    const totalSize = this.assets.reduce((sum, asset) => sum + asset.size, 0);

    console.log(`📊 Total Bundle Size: ${this.formatSize(totalSize)}\n`);

    // Report by type
    Object.entries(byType).forEach(([type, assets]) => {
      const typeSize = assets.reduce((sum, asset) => sum + asset.size, 0);
      const percentage = ((typeSize / totalSize) * 100).toFixed(1);
      
      console.log(`${type} Files: ${this.formatSize(typeSize)} (${percentage}%)`);
      
      // Show largest files of this type
      assets
        .sort((a, b) => b.size - a.size)
        .slice(0, 3)
        .forEach(asset => {
          console.log(`  └─ ${asset.name}: ${this.formatSize(asset.size)}`);
        });
      console.log();
    });

    // Performance recommendations
    console.log('💡 Performance Recommendations:\n');
    
    const jsSize = (byType.JavaScript || []).reduce((sum, asset) => sum + asset.size, 0);
    const cssSize = (byType.CSS || []).reduce((sum, asset) => sum + asset.size, 0);
    const imageSize = (byType.Image || []).reduce((sum, asset) => sum + asset.size, 0);

    if (jsSize > 1024 * 1024) { // 1MB
      console.log('⚠️  JavaScript bundle is large (>1MB). Consider:');
      console.log('   - Code splitting with dynamic imports');
      console.log('   - Tree shaking unused code');
      console.log('   - Using webpack-bundle-analyzer for detailed analysis');
    }

    if (cssSize > 500 * 1024) { // 500KB
      console.log('⚠️  CSS bundle is large (>500KB). Consider:');
      console.log('   - Removing unused CSS');
      console.log('   - Using critical CSS extraction');
      console.log('   - Minifying CSS');
    }

    if (imageSize > 2 * 1024 * 1024) { // 2MB
      console.log('⚠️  Image assets are large (>2MB). Consider:');
      console.log('   - Compressing images');
      console.log('   - Using WebP format');
      console.log('   - Implementing lazy loading');
    }

    if (totalSize < 500 * 1024) {
      console.log('✅ Excellent! Bundle size is under 500KB');
    } else if (totalSize < 1024 * 1024) {
      console.log('✅ Good! Bundle size is under 1MB');
    } else {
      console.log('⚠️  Bundle size is over 1MB - consider optimization');
    }

    console.log('\n' + '='.repeat(50));
  }
}

// Run analyzer
const analyzer = new BundleAnalyzer();
analyzer.analyzeBundleSize();