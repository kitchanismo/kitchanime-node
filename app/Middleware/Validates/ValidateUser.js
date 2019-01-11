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
    if (request.method() === 'POST' || request.method() === 'PUT') {
      const { username, email } = request.post()

      const rules =
        request.method() === 'POST' ? this.storeRules : this.putRules

      const validation = await validateAll(request.all(), rules, this.messages)

      if (validation.fails()) {
        throw new BadRequest(validation.messages())
      }

      request.body = sanitize(request.all(), this.sanitizationRules)

      if (request.method() === 'PUT') {
        await this.checkUserUnique(user, { username, email })
      }

      await next()

      return
    }

    request.body = sanitize(request.all(), this.sanitizationRules)

    await next()
  }

  async checkUserUnique(authUser, { username, email }) {
    let errors = []

    const error = (field, value) => {
      throw new BadRequest([
        ...errors,
        {
          message: `${value} is taken`,
          field: field,
          validation: 'unique'
        }
      ])
    }

    if (authUser.username !== username) {
      if (await this.isTaken({ username })) {
        error('username', username)
      }
    }

    if (authUser.email !== email) {
      if (await this.isTaken({ email })) {
        error('email', email)
      }
    }
  }

  async isTaken(data) {
    const total = await User.query().getCount()
    const count = await User.query()
      .whereNot(data)
      .getCount()
    return total !== count
  }
}

module.exports = ValidateUser
