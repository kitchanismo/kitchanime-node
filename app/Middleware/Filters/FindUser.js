'use strict'

const User = use('App/Models/User')
const NotFound = use('App/Exceptions/NotFoundException')

class FindUser {
  async handle(
    {
      params: { id },
      request
    },
    next
  ) {
    const user = await User.find(id)

    if (!user) {
      throw new NotFound(`user id:${id} not found`)
    }

    request.get().user = user

    await next()
  }
}

module.exports = FindUser
