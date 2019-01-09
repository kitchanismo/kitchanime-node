'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    return response.status(404).json({
      status: {
        name: error.name,
        code: 404,
        error: error.message || 'resource not found'
      }
    })
  }
}

module.exports = NotFoundException
