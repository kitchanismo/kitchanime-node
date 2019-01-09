const Route = use('Route')

const anime = () => {
  Route.get('/', 'AnimeController.index')
  Route.get('/page/:num', 'AnimeController.paginate')
  Route.get(':id', 'AnimeController.show').middleware(['findAnime'])
  Route.get(':id/genres', 'AnimeController.genres').middleware(['findAnime'])
  Route.get(':id/studios', 'AnimeController.studios').middleware(['findAnime'])

  Route.post('/', 'AnimeController.store').middleware(['auth', 'validateAnime'])
  Route.put('/:id', 'AnimeController.update').middleware([
    'auth',
    'validateAnime',
    'findAnime'
  ])
  Route.delete('/:id', 'AnimeController.destroy').middleware([
    'auth',
    'findAnime'
  ])
}
module.exports = anime
