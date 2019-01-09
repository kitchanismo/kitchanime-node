'use strict'

const Route = use('Route')
const NotFound = use('App/Exceptions/NotFoundException')

Route.get('/', () => {
  return { title: 'kitchanime api' }
})

// auth routes
Route.group(use('App/Routes/Auth'))
  .prefix('auth')
  .middleware(['guest'])

// user routes
Route.group(use('App/Routes/User'))
  .prefix('api/users')
  .middleware(['auth'])

// anime routes
Route.group(use('App/Routes/Anime')).prefix('api/animes')

// genre routes
Route.group(use('App/Routes/Genre')).prefix('api/genres')

// studio route
Route.group(use('App/Routes/Studio')).prefix('api/studios')

Route.any('/*', async () => {
  throw new NotFound('URL Not found')
})
