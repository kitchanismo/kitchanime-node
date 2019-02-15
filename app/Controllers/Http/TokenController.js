'use strict'
const BadRequest = use('App/Exceptions/BadRequestException')

class TokenController {
  async refreshToken({ request, response, auth }) {
    const { refreshToken } = request.post()
    try {
      const token = await auth.generateForRefreshToken(refreshToken, true)

      return response.status(200).json({
        jwt: token
      })
    } catch (error) {
      throw new BadRequest(error.message)
    }
  }

  async revokeToken({ auth, request, response }) {
    const { refreshToken } = request.post()

    const hasRevoked = await auth
      .authenticator('jwt')
      .revokeTokens([refreshToken], true)

    if (!hasRevoked) {
      throw new BadRequest('refresh token is invalid')
    }

    response.status(200).json({
      message: `revoked refresh token from userId: ${auth.user.id}`
    })
  }

  async revokeAllTokens({ auth, response }) {
    const tokens = auth.listTokens()

    await auth.authenticator('jwt').revokeTokensForUser(auth.user, tokens, true)

    response.status(200).json({
      message: `revoked all refresh tokens from userId: ${auth.user.id}`
    })
  }
}

module.exports = TokenController
