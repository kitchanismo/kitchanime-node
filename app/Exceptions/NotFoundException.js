'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    return response.status(404).json({
      exception: {
        name: error.name,
        status: 404,
        error: error.message
      }
    })
  }
}

module.exports = NotFoundException
