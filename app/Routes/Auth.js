const Route = use('Route')

const auth = () => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register').middleware([
    'validateUser'
  ])
}

module.exports = auth
