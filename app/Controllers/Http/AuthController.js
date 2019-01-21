'use strict'
const AuthException = use('App/Exceptions/AuthException')
const BadRequest = use('App/Exceptions/BadRequestException')
const User = use('App/Models/User')
const Event = use('Event')

class AuthController {
  // POST

  // POST
  async login({ request, response, auth, utils }) {
    const { username, password } = request.post()

    try {
      const token = await auth
        .withRefreshToken()
        .attempt(username, password, true)

      return response.status(200).json({
        jwt: token
      })
    } catch (error) {
      throw utils.has(error.name, [
        'UserNotFoundException',
        'PasswordMisMatchException'
      ])
        ? new AuthException(`Incorrect username or password`)
        : new Error(error.message)
    }
  }

  // POST
  async register({ request, response, auth }) {
    const { username, email, password } = request.post()

    const user = await User.create({
      username,
      email,
      password
    })

    const token = await auth.withRefreshToken().generate(user, true)

    // Event.emit('new::user', user)

    return response.status(201).json({
      jwt: token
    })
  }
}

module.exports = AuthController
