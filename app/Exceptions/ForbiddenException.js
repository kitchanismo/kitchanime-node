'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ForbiddenException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    const code = 403

    return response.status(code).json({
      status: {
        name: error.name,
        code,
        error: error.message || 'not authorized'
      }
    })
  }
}

module.exports = ForbiddenException
