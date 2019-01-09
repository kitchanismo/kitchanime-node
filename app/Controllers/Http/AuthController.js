'use strict'
const AuthException = use('App/Exceptions/AuthException')
const User = use('App/Models/User')

class AuthController {
  async login({ request, response, auth, utils }) {
    const { username, password } = request.post()

    try {
      const token = await auth.attempt(username, password)

      return response.status(200).json({
        token
      })
    } catch (error) {
      throw utils.has(error.name, [
        'UserNotFoundException',
        'PasswordMisMatchException'
      ])
        ? new AuthException(`login failed`)
        : new Error(error.message)
    }
  }

  async register({ request, response, auth }) {
    const { username, email, password } = request.post()

    const user = await User.create({
      username,
      email,
      password
    })

    const token = await auth.generate(user)

    return response.status(201).json({
      token
    })
  }
}

module.exports = AuthController
