'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Logger = use('Logger')
const utils = use('App/Services/UtilityService')
/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (this.hasCustomExceptions(error)) {
      return super.handle(...arguments)
    }

    let { code, message } = this.GlobalExceptions(error, request)

    const exception = `${
      error.message
    }, method: ${request.method()}, url: ${request.url()}`

    return response.status(code).json({
      status: {
        name: error.name,
        code,
        error: message || exception
      }
    })
  }

  GlobalExceptions(error, request) {
    let code = 500
    let message = null
    const env = Env.get('NODE_ENV')
    const isDebug = Env.get('APP_DEBUG')
    const exception = {
      name: error.name,
      method: request.method(),
      status: error.status,
      url: request.url()
    }
    if (env === 'production' && isDebug === 'false') {
      message = 'something failed in server'
      if (env === 'production') {
        Logger.transport('file').error(error.message, exception)
      }
    }
    if (error.name === 'InvalidJwtToken') {
      code = 400
      message = utils.filterJWTMessage(error.message)
    } else {
      Logger.error(
        `${error.message}, type: ${exception.name}, method: ${
          exception.method
        }, url: ${exception.url}, code:${exception.status}`
      )
    }
    return { code, message }
  }

  hasCustomExceptions({ name }) {
    return utils.has(name, [
      'AuthException',
      'BadRequestException',
      'NotFoundException',
      'ForbiddenException'
    ])
  }

  async report(error, { request }) {}
}

module.exports = ExceptionHandler
