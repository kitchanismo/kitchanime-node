'use strict'

const Forbidden = use('App/Exceptions/ForbiddenException')

class Admin {
  async handle({ request, auth }, next) {
    if (!auth.user.isAdmin) {
      throw new Forbidden('not allow to access')
    }
    await next()
  }
}

module.exports = Admin
