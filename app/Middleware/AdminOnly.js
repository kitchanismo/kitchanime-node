'use strict'

const Forbidden = use('App/Exceptions/ForbiddenException')

class Admin {
  async handle({ request, auth }, next) {
    if (!auth.user.isAdmin) {
      throw new Forbidden()
    }
    await next()
  }
}

module.exports = Admin
