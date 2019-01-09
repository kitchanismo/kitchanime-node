'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AuthException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    const status = 400

    return response.status(status).json({
      exception: {
        name: error.name,
        status,
        errors: error.message
      }
    })
  }
}

module.exports = AuthException
