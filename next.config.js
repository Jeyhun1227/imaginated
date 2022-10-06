module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: 'http://imaginatedbackend-env.eba-w8ecy5pn.us-east-1.elasticbeanstalk.com/graphql/:path*' // Proxy to Backend
      }
    ]
  },
}
