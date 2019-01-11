'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Logger = use('Logger')
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response, utils }) {
    if (this.hasCustomExceptions(utils.has, error)) {
      return super.handle(...arguments)
    }

    let { code, message } = this.GlobalExceptions(error, request, utils)

    return response.status(code).json({
      status: {
        name: error.name,
        code,
        error: message || error.message
      }
    })
  }

  hasCustomExceptions(has, error) {
    return has(error.name, [
      'AuthException',
      'BadRequestException',
      'NotFoundException',
      'ForbiddenException'
    ])
  }

  GlobalExceptions(error, request, { filterJWTMessage }) {
    let code = 500
    let message = null
    const exception = {
      name: error.name,
      status: error.status,
      url: request.url()
    }
    if (
      Env.get('NODE_ENV') === 'production' ||
      Env.get('APP_DEBUG') === 'false'
    ) {
      message = 'something failed in server'
      if (Env.get('NODE_ENV') === 'production') {
        Logger.transport('file').error(error.message, exception)
      }
    }
    if (error.name === 'InvalidJwtToken') {
      code = 400
      message = filterJWTMessage(error.message)
    } else {
      Logger.error(
        `message: ${error.message}, type: ${exception.name}, url: ${
          exception.url
        }, code:${exception.status}`
      )
    }
    return { code, message }
  }

  async report(error, { request }) {}
}

module.exports = ExceptionHandler
