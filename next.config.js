const webpack = require('webpack');
const redirects = require('./public/redirects.json')

module.exports = {
  reactStrictMode: true,
  // plugins: [
  //   new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
  // ],
  async redirects(){
    return redirects
  },
  
  trailingSlash: true,
  images: { domains: ['wordpress.imaginated.com', 'secure.gravatar.com', 'm.media-amazon.com', 'valiantceo.com', 'image.shutterstock.com', 'static.showit.co'], formats: ['image/avif', 'image/webp'], },
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
