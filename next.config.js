const webpack = require('webpack');
const redirects = require('./public/redirects.json')

module.exports = {
  reactStrictMode: true,
  "plugins": [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
            './pages/**/*.{js,jsx,ts,tsx}',
            './components/**/*.{js,jsx,ts,tsx}'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"]
      }
    ],
  ],
  async redirects(){
    return redirects
  },
  
  trailingSlash: true,
  images: { domains: ['wordpress.imaginated.com', 'secure.gravatar.com', 'm.media-amazon.com', 'valiantceo.com', 'image.shutterstock.com', 'static.showit.co', 'lh3.googleusercontent.com'], formats: ['image/avif', 'image/webp'], },
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
