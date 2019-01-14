'use strict'
const BadRequest = use('App/Exceptions/BadRequestException')

class PutUser {
  get rules() {
    const { id } = this.ctx.auth.user

    return {
      username: `required|min:6|unique:users,username,id,${id}`,
      password: 'required|min:6',
      email: `required|email|unique:users,email,id,${id}`
    }
  }

  get sanitizationRules() {
    return {
      username: 'strip_tags|escape|strip_links',
      email: 'strip_tags|escape|strip_links'
    }
  }

  get validateAll() {
    return true
  }

  get messages() {
    return {
      required: '{{ field }} is required!',
      min: '{{ field }} is minimum of 6 characters!',
      email: '{{ field }} is not a valid',
      unique: '{{field}} is taken'
    }
  }
  async fails(errorMessages) {
    throw new BadRequest(errorMessages)
  }
}

module.exports = PutUser
