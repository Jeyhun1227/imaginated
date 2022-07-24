module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://localhost:5000/graphql/:path*' // Proxy to Backend
      }
    ]
  },
}
