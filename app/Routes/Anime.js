const Route = use('Route')

const anime = () => {
  Route.get('/', 'AnimeController.index')
  Route.get('/page/:num', 'AnimeController.paginate')
  Route.get('/release/:year/', 'AnimeController.year').validator('GetYear')
  Route.get('/release/:year/:season', 'AnimeController.release').validator(
    'GetYear'
  )
  Route.get(':id', 'AnimeController.show').middleware(['findAnime'])
  Route.get(':id/genres', 'AnimeController.genres').middleware(['findAnime'])
  Route.get(':id/studios', 'AnimeController.studios').middleware(['findAnime'])

  Route.post('/', 'AnimeController.store')
    .middleware(['auth'])
    .validator('StoreAnime')
  Route.put('/:id', 'AnimeController.update')
    .middleware(['auth', 'findAnime'])
    .validator('StoreAnime')
  Route.delete('/:id', 'AnimeController.destroy').middleware([
    'auth',
    'findAnime'
  ])
}
module.exports = anime
