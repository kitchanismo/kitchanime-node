'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AuthException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    const code = 400

    return response.status(code).json({
      status: {
        name: error.name,
        code,
        errors: error.message
      }
    })
  }
}

module.exports = AuthException
