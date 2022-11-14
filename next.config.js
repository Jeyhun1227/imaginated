const webpack = require('webpack');

module.exports = {
  reactStrictMode: true,
  // plugins: [
  //   new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
  // ],
  trailingSlash: true,
  images: { domains: ['www.imaginated.com', 'secure.gravatar.com'], formats: ['image/avif', 'image/webp'], },
  webpack: (config) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$/,
      })
    );
    // config.externals.push('util/types');

    return config;
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/graphql',
  //       destination: 'https://api.imaginated.com/graphql/:path*' // Proxy to Backend
  //     }
  //   ]
  // },
}
