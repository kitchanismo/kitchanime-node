const Route = use('Route')

const user = () => {
  Route.get('/', 'UserController.index')
  Route.get('/:id', 'UserController.show')

  Route.post('/', 'UserController.store').middleware(['validateUser'])
  Route.put('/:id', 'UserController.update').middleware([
    'validateUser',
    'findUser'
  ])
  Route.delete('/:id', 'UserController.destroy').middleware(['findUser'])
}
module.exports = user
