'use strict'
const BadRequest = use('App/Exceptions/BadRequestException')

class StoreUser {
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

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    throw new BadRequest(errorMessages)
  }
}

module.exports = StoreUser
