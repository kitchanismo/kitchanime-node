'use strict'
const utils = use('App/Services/UtilityService')

class Server {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    // call next to advance the request
    ctx.utils = utils
    await next()
  }
}

module.exports = Server
