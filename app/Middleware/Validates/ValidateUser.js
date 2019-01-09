'use strict'
const { validateAll, sanitize } = use('Validator')
const AuthException = use('App/Exceptions/AuthException')

class ValidateUser {
  get sanitizationRules() {
    return {
      username: 'strip_tags|escape|strip_links',
      email: 'strip_tags|escape|strip_links'
    }
  }
  get rules() {
    return {
      username: 'required|unique:users,username|min:6',
      password: 'required|min:6',
      email: 'required|email|unique:users,email'
    }
  }

  get messages() {
    return {
      required: '{{ field }} is required!',
      min: '{{ field }} is minimum of 6 characters!',
      email: '{{ field }} is not a valid',
      unique: '{{field}} is taken'
      
    }
  }

  async handle({ request }, next) {
    if (request.method() === 'POST' || request.method() === 'PUT') {
      const validation = await validateAll(
        request.all(),
        this.rules,
        this.messages
      )

      if (validation.fails()) {
        throw new AuthException(validation.messages())
      }
    }
    request.body = sanitize(request.all(), this.sanitizationRules)

    await next()
  }
}

module.exports = ValidateUser
