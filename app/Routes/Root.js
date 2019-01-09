const Route = use('Route')

const root = () => {
  return {
    title: 'kitchanime api',
    description: 'an anime  api for otaku',
    routes: [
      {
        route: 'auth/login',
        type: 'guest',
        request: 'post'
      },
      {
        route: 'auth/register',
        type: 'guest',
        request: 'post'
      },
      {
        route: 'api/users',
        type: 'auth',
        request: 'get'
      },
      {
        route: 'api/users',
        type: 'auth',
        request: 'post'
      },
      {
        route: 'api/users/1',
        type: 'auth',
        request: 'get'
      },
      {
        route: 'api/users/1',
        type: 'auth',
        request: 'put'
      }
    ]
  }
}
module.exports = root
