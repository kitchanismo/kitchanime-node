const Route = use('Route')

const user = () => {
  Route.get('/', 'UserController.index')
  Route.post('/', 'UserController.store')
    .middleware(['admin']) //, 'validateUser'
    .validator('StoreUser')
  Route.get('/me', 'UserController.me')
  Route.put('/me', 'UserController.update').validator('PutUser')
  Route.get('/:id', 'UserController.show').middleware(['findUser'])
  Route.put('/:id', 'UserController.update').middleware([
    'admin',
    'validateUser',
    'findUser'
  ])
  Route.delete('/:id', 'UserController.destroy').middleware([
    'admin',
    'findUser'
  ])
}
module.exports = user
