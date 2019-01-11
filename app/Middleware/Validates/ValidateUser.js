'use strict'
const { validateAll, sanitize } = use('Validator')
const BadRequest = use('App/Exceptions/BadRequestException')
const User = use('App/Models/User')

class ValidateUser {
  get sanitizationRules() {
    return {
      username: 'strip_tags|escape|strip_links',
      email: 'strip_tags|escape|strip_links'
    }
  }
  get storeRules() {
    return {
      username: 'required|unique:users,username|min:6',
      password: 'required|min:6',
      email: 'required|email|unique:users,email'
    }
  }

  get putRules() {
    return {
      username: 'required|min:6',
      password: 'required|min:6',
      email: 'required|email'
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

  async handle(
    {
      request,
      auth: { user }
    },
    next
  ) {
    if ((request.method() === 'POST') | (request.method() === 'PUT')) {
      const { username, email } = request.post()

      const rules =
        request.method() === 'POST' ? this.storeRules : this.putRules

      let hasGenericError = false
      let hasPutError = false

      let genericErrors = []
      let putErrors = []

      const validation = await validateAll(request.all(), rules, this.messages)

      if (validation.fails()) {
        hasGenericError = true
        genericErrors = validation.messages()
      }

      if (request.method() === 'PUT') {
        putErrors = await this.getUniqueErrors(user, { username, email })
        hasPutError = putErrors ? true : false
        putErrors = putErrors ? putErrors : []
      }

      if (hasGenericError || hasPutError) {
        throw new BadRequest([...genericErrors, ...putErrors])
      }

      request.body = sanitize(request.all(), this.sanitizationRules)

      await next()

      return
    }

    request.body = sanitize(request.all(), this.sanitizationRules)

    await next()
  }

  // check the auth user, if username and email are unique
  async getUniqueErrors(authUser, { username, email }) {
    let errors = []
    let isUsernameFails = false
    let isEmailFails = false

    if (authUser.username !== username && (await this.isTaken({ username }))) {
      isUsernameFails = true
      errors.push(this.getError('username', username))
    }

    if (authUser.email !== email && (await this.isTaken({ email }))) {
      isEmailFails = true
      errors.push(this.getError('email', email))
    }

    if (isUsernameFails | isEmailFails) {
      return errors
    }
    return false
  }

  getError(field, value) {
    return {
      message: `${value} is taken`,
      field,
      validation: 'unique'
    }
  }

  async isTaken(data) {
    const count = await User.query()
      .where(data)
      .getCount()
    return count > 0
  }
}

module.exports = ValidateUser
