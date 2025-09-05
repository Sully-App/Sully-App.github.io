module.exports = {
  globDirectory: '_expo/web',
  globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,ico,json}'],
  swDest: '_expo/web/sw.js',
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [{
    urlPattern: /.*/,
    handler: 'NetworkFirst',
    options: {
      networkTimeoutSeconds: 10,
      backgroundSync: {
        name: 'navigation-queue',
        options: { maxRetentionTime: 24 * 60 } // 24 hours
      }
    }
  }]
};
