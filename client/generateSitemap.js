const fs = require('fs');
const path = require('path');

// Replace with your actual domain
const BASE_URL = 'https://primestage.in';

// Define all your routes based on your App.js
const routes = [
  // Main pages
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/search', priority: '0.9', changefreq: 'weekly' },
  
  // Company information pages
  { path: '/company-policies', priority: '0.6', changefreq: 'monthly' },
  { path: '/search/company-policies', priority: '0.5', changefreq: 'monthly' },
  { path: '/term-conditions', priority: '0.6', changefreq: 'monthly' },
  { path: '/search/term-conditions', priority: '0.5', changefreq: 'monthly' },
  { path: '/refund-policy', priority: '0.6', changefreq: 'monthly' },
  { path: '/search/refund-policy', priority: '0.5', changefreq: 'monthly' },
  { path: '/search/Shipping-delivery', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.7', changefreq: 'monthly' },
  { path: '/FAQ', priority: '0.7', changefreq: 'monthly' },
  
  // Booking and services
  { path: '/sound-system', priority: '0.8', changefreq: 'weekly' },
  { path: '/sound-booking', priority: '0.8', changefreq: 'weekly' },
  
  // Chandigarh artists (main city - higher priority)
  { path: '/live/singer', priority: '0.9', changefreq: 'weekly' },
  { path: '/live/instrumentalist', priority: '0.9', changefreq: 'weekly' },
  { path: '/live/DJ', priority: '0.9', changefreq: 'weekly' },
  { path: '/live/band', priority: '0.9', changefreq: 'weekly' },
  
  // Mohali artists
  { path: '/live/singer/mohali', priority: '0.8', changefreq: 'weekly' },
  { path: '/live/instrumentalist/mohali', priority: '0.8', changefreq: 'weekly' },
  { path: '/live/DJ/mohali', priority: '0.8', changefreq: 'weekly' },
  { path: '/live/band/mohali', priority: '0.8', changefreq: 'weekly' },
  
  // Panchkula artists
  { path: '/live/singer/panchkula', priority: '0.8', changefreq: 'weekly' },
  { path: '/live/instrumentalist/panchkula', priority: '0.8', changefreq: 'weekly' },
  { path: '/live/DJ/panchkula', priority: '0.8', changefreq: 'weekly' },
  { path: '/live/band/panchkula', priority: '0.8', changefreq: 'weekly' },
];

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`)
  .join('\n')}
</urlset>`;

  // Ensure public directory exists
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write sitemap to public folder
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
  console.log(`📄 Generated ${routes.length} URLs`);
}

// Run the generator
if (require.main === module) {
  generateSitemap();
}

module.exports = generateSitemap;