const Route = use('Route')

const genre = () => {
  Route.get('/', 'GenreController.index')
  Route.get('/:id', 'GenreController.show').middleware(['findGenre'])
  Route.get('/:id/animes', 'GenreController.animes').middleware(['findGenre'])

  Route.post('/', 'GenreController.store').middleware(['auth', 'validateModel'])
  Route.put('/:id', 'GenreController.update').middleware([
    'auth',
    'validateModel',
    'findGenre'
  ])
  Route.delete('/:id', 'GenreController.destroy').middleware([
    'auth',
    'findGenre'
  ])
}

module.exports = genre
