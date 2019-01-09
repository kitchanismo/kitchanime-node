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
  async handle(error, { request, response }) {
    let status = 500
    let message = null

    if (error.name === 'BadRequestException') {
      return super.handle(...arguments)
    }

    if (error.name === 'AuthException') {
      return super.handle(...arguments)
    }

    if (error.name === 'NotFoundException') {
      return super.handle(...arguments)
    }

    if (error.name === 'InvalidJwtToken') {
      status = 403
    }

    if (
      error.name === 'Error' ||
      error.name === 'RuntimeException' ||
      error.name === 'TypeError'
    ) {
      if (Env.get('NODE_ENV') === 'production') {
        message = 'something failed in server'
        console.log(error)
      }
    }

    return response.status(status).json({
      exception: {
        name: error.name,
        status,
        message: message || error.message
      }
    })
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {}
}

module.exports = ExceptionHandler
