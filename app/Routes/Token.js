const Route = use('Route')

const token = () => {
  Route.post('/refresh', 'TokenController.refreshToken').validator(
    'RefreshToken'
  )
  Route.post('/revoke', 'TokenController.revokeToken')
}

module.exports = token
