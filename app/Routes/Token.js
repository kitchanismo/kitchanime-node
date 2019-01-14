const Route = use('Route')

const token = () => {
  Route.post('/refresh', 'TokenController.refreshToken').validator(
    'RefreshToken'
  )
  Route.post('/revoke', 'TokenController.revokeToken').validator('RefreshToken')
  Route.get('/revoke-all', 'TokenController.revokeAllTokens')
}

module.exports = token
