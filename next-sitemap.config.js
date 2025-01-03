/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.clothes2wear.com',
  generateRobotsTxt: true,
  exclude: [
    '/admin_/*',
    '/auth/*',
    '/checkout/*',
    '/Component/*',
    '/context/*',
    '/fonts/*',
    '/globals.css',
    '/HomePageComponents/*',
    '/landing/*',
    '/layout.js',
    '/order-placed/*',
    '/youtube/*',
    '/private',
    '/user/*',
    '/api/*',
    '/_next/static/media/*',
    '/cdn.thefashionsalad.com/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [
          '/admin_',
          '/auth',
          '/checkout',
          '/Component',
          '/context',
          '/fonts',
          '/globals.css',
          '/HomePageComponents',
          '/landing',
          '/layout.js',
          '/order-placed',
          '/youtube',
          '/private',
          '/user',
          '/api',
          '/_next/static/media/*',
          '/cdn.thefashionsalad.com/*',
        ],
      },
      {
        userAgent: '*',
        allow: [
          '/about',
          '/contact',
          '/category/*',
          '/community',
          '/discount-policy',
          '/p/*',
          '/product/*',
          '/refund-policy',
          '/return-policy',
          '/search',
          '/what-we-do',
          '/privacy-policy',
          '/terms-and-condition',
          '/favicon.ico',
          '/blogs/*',
          '/category/*',
        ],
      },
    ],
  },
}
