'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response, utils }) {
    let code = 500
    let message = null

    if (
      utils.has(error.name, [
        'AuthException',
        'BadRequestException',
        'NotFoundException',
        'ForbiddenException'
      ])
    ) {
      return super.handle(...arguments)
    }

    if (
      Env.get('NODE_ENV') === 'production' ||
      Env.get('APP_DEBUG') === 'false'
    ) {
      message = 'something failed in server'
      console.log(error)
    }

    if (error.name === 'InvalidJwtToken') {
      code = 400
      message = 'jwt must be provided in header'
    }

    return response.status(code).json({
      status: {
        name: error.name,
        code,
        error: message || error.message
      }
    })
  }

  async report(error, { request }) {}
}

module.exports = ExceptionHandler
