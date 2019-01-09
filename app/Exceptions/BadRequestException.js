'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class BadRequestException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    const code = 400
    let errorName = Array.isArray(error.message) ? 'errors' : 'error'

    return response.status(code).json({
      status: {
        name: error.name,
        code,
        [errorName]: error.message
      }
    })
  }
}

module.exports = BadRequestException
