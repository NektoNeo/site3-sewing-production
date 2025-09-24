/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/404',
    '/500',
    '/admin/*',
    '/api/*',
    '/_next/*',
    '/static/*'
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api',
          '/_next',
          '/static',
          '/*.json$',
          '/*_buildManifest.js$',
          '/*_middlewareManifest.js$',
          '/*_ssgManifest.js$',
          '/*.js.map$'
        ]
      }
    ],
    additionalSitemaps: [
      // Add additional sitemaps here if needed
    ]
  },
  transform: async (config, path) => {
    // Custom transform function for priorities based on path depth
    const depth = path.split('/').filter(p => p).length;
    let priority = 0.7;

    if (path === '/') {
      priority = 1.0;
    } else if (depth === 1) {
      priority = 0.9;
    } else if (depth === 2) {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined
    };
  }
};