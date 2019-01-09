'use strict'
const AuthException = use('App/Exceptions/AuthException')
const User = use('App/Models/User')

class AuthController {
  async login({ request, response, auth }) {
    const { username, password } = request.post()

    try {
      const token = await auth.attempt(username, password)

      return response.status(200).json({
        token
      })
    } catch (error) {
      throw new AuthException(`login failed`)
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
