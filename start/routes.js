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

// post routes
Route.group(() => {
  Route.get('/', 'PostController.index')
  Route.get('/page/:num', 'PostController.paginate')
  Route.get(':id', 'PostController.show').middleware(['findPost'])
  Route.get(':id/genres', 'PostController.genres').middleware(['findPost'])
  Route.get(':id/studios', 'PostController.studios').middleware(['findPost'])

  Route.post('/', 'PostController.store').middleware(['auth', 'validatePost'])
  Route.put('/:id', 'PostController.update').middleware([
    'auth',
    'validatePost',
    'findPost'
  ])
  Route.delete('/:id', 'PostController.destroy').middleware([
    'auth',
    'findPost'
  ])
}).prefix('api/posts')

//genre routes
Route.group(() => {
  Route.get('/', 'GenreController.index')
  Route.get('/:id', 'GenreController.show').middleware(['findGenre'])
  Route.get('/:id/posts', 'GenreController.posts').middleware(['findGenre'])

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
  Route.get('/:id/posts', 'StudioController.posts').middleware(['findStudio'])

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
