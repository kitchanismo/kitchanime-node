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

  async show({ response, params: { id } }) {
    const user = await User.find(id)

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
      user
    })
  }

  async update({ request, response, params: { id } }) {
    const { user } = request.get()

    const { username, password, email } = request.post()

    user.merge({ username, password, email })

    await user.save()

    response.status(200).json({
      message: 'user updated',
      user
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
