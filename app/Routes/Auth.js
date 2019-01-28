const Route = use('Route')

const auth = () => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register').validator('StoreUser')
  Route.get('/is-taken', 'AuthController.isTaken')
}

module.exports = auth
