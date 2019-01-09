'use strict'


class Utility {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    // call next to advance the request
    ctx.util = util
    await next()
  }
}

module.exports = Utility
