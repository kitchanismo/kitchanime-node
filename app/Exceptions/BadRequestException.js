'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class BadRequestException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    const status = 400
    let errorName = Array.isArray(error.message) ? 'errors' : 'error'

    return response.status(status).json({
      exception: {
        name: error.name,
        status,
        [errorName]: error.message
      }
    })
  }
}

module.exports = BadRequestException
