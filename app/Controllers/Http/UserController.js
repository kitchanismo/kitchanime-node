'use strict'

const User = use('App/Models/User')

class UserController {
  async index({ response, request }) {
    const { username = '', email = '' } = request.get()

    const users = await User.query()
      .having('username', 'like', `%${username}%`)
      .having('email', 'like', `%${email}%`)
      .fetch()
      .then(data => data.toJSON())

    return response.status(200).json({
      users
    })
  }

  async isTaken({ response, request }) {
    const { username = '', email = '' } = request.get()

    const animes = await User.query()
      .where('username', '=', username)
      .orWhere('email', '=', email)
      .fetch()
      .then(data => data.toJSON())

    return response.status(200).json({
      isTaken: Object.keys(animes).length > 0
    })
  }

  async me({ response, auth }) {
    return response.status(200).json({
      user: auth.user
    })
  }

  async show({ response, request }) {
    const { user } = request.get()

    return response.status(200).json({
      user
    })
  }

  async store({ request, response }) {
    const { username, email, password } = request.post()

    const user = await User.create({
      username,
      email,
      password
    })

    return response.status(201).json({
      message: 'user created',
      id: user.id
    })
  }

  async update({ request, response, auth: { user } }) {
    const { username, password, email } = request.post()

    user.merge({ username, password, email })

    await user.save()

    response.status(200).json({
      message: 'user updated',
      id: user.id
    })
  }

  async destroy({ response, params: { id }, request }) {
    const { user } = request.get()

    await user.delete()

    response.status(200).json({
      message: 'user deleted',
      id: user.id
    })
  }
}

module.exports = UserController
