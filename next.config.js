module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'https://api.imaginated.com/graphql/:path*' // Proxy to Backend
      }
    ]
  },
}
