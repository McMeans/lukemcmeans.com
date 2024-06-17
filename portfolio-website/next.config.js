module.exports = {
    async redirects() {
      return [
        {
          source: '/charlottesville-top8s',
          destination: 'https://charlottesville-top8s-50b4ab9ef36b.herokuapp.com/',
          permanent: true,
        },
        {
          source: '/top8s',
          destination: 'https://charlottesville-top8s-50b4ab9ef36b.herokuapp.com/',
          permanent: true,
        },
        {
          source: '/cville-top8s',
          destination: 'https://charlottesville-top8s-50b4ab9ef36b.herokuapp.com/',
          permanent: true,
        },
      ]
    },
  }
  