'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const NotFound = use('App/Exceptions/NotFoundException')

Route.get('/', () => {
  return { title: 'kitchanime api' }
})

// auth routes

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register').middleware([
    'validateUser'
  ])
})
  .prefix('auth')
  .middleware(['guest'])

//user routes
Route.group(() => {
  Route.get('/', 'UserController.index')
  Route.get('/:id', 'UserController.show')

  Route.post('/', 'UserController.store').middleware(['validateUser'])
  Route.put('/:id', 'UserController.update').middleware([
    'validateUser',
    'findUser'
  ])
  Route.delete('/:id', 'UserController.destroy').middleware(['findUser'])
})
  .prefix('api/users')
  .middleware(['auth'])

// anime routes
Route.group(() => {
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
}).prefix('api/animes')

//genre routes
Route.group(() => {
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
}).prefix('api/genres')

// studio routes
Route.group(() => {
  Route.get('/', 'StudioController.index')
  Route.get('/:id', 'StudioController.show').middleware(['findStudio'])
  Route.get('/:id/animes', 'StudioController.animes').middleware(['findStudio'])

  Route.post('/', 'StudioController.store').middleware([
    'auth',
    'validateModel'
  ])
  Route.put('/:id', 'StudioController.update').middleware([
    'auth',
    'validateModel',
    'findStudio'
  ])
  Route.delete('/:id', 'StudioController.destroy').middleware([
    'auth',
    'findStudio'
  ])
}).prefix('api/studios')

Route.any('/*', async () => {
  throw new NotFound('URL Not found')
})
