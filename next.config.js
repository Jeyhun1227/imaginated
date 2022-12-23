const webpack = require('webpack');
const redirects = require('./public/redirects.json')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: true,
})

module.exports = {
  reactStrictMode: true,
  
  async redirects(){
    return redirects
  },
  
  trailingSlash: true,
  images: { domains: ['wordpress.imaginated.com', 'm.media-amazon.com', 'image.shutterstock.com', 'imaginated-individual-image-public.s3.amazonaws.com', 'imaginated-user-images-public.s3.amazonaws.com', 'imaginated-individual-premium-image-public.s3.amazonaws.com', 'lh3.googleusercontent.com'], formats: ['image/avif', 'image/webp'], },
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

