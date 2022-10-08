const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
  ],
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'https://api.imaginated.com/graphql/:path*' // Proxy to Backend
      }
    ]
  },
}
