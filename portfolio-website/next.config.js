module.exports = {
    async redirects() {
      return [
        {
          source: '/charlottesville-top8s',
          destination: 'https://charlottesville-top8s.fly.dev/',
          permanent: true,
        },
        {
          source: '/top8s',
          destination: 'https://charlottesville-top8s.fly.dev/',
          permanent: true,
        },
        {
          source: '/cville-top8s',
          destination: 'https://charlottesville-top8s.fly.dev/',
          permanent: true,
        },
      ]
    },
  }
  