const Route = use('Route')

const studio = () => {
  Route.get('/', 'StudioController.index')
  Route.get('/:id', 'StudioController.show').middleware(['findStudio'])
  Route.get('/:id/animes', 'StudioController.animes').middleware(['findStudio'])

  Route.post('/', 'StudioController.store')
    .middleware(['auth'])
    .validator('SaveModel')
  Route.put('/:id', 'StudioController.update')
    .middleware(['auth', 'findStudio'])
    .validator('SaveModel')
  Route.delete('/:id', 'StudioController.destroy').middleware([
    'auth',
    'findStudio'
  ])
}

module.exports = studio
