'use strict'

const User = use('App/Models/User')
const BadRequest = use('App/Exceptions/BadRequestException')

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
      user
    })
  }

  async update({ request, response, auth: { user } }) {
    const { username, password, email } = request.post()

    let errors = []

    if (user.username !== username) {
      if (await this.isTaken({ username })) {
        throw new BadRequest([...errors, this.error('username', username)])
      }
    }

    if (user.email !== email) {
      const isEmailTaken = await this.isTaken({ email })

      if (isEmailTaken) {
        throw new BadRequest([...errors, this.error('email', email)])
      }
    }

    user.merge({ username, password, email })

    await user.save()

    response.status(200).json({
      message: 'user updated',
      user
    })
  }

  error(field, value) {
    return {
      message: `${value} is taken`,
      field: field,
      validation: 'unique'
    }
  }

  async isTaken(data) {
    const total = await User.query().getCount()
    const count = await User.query()
      .whereNot(data)
      .getCount()
    return total !== count
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
