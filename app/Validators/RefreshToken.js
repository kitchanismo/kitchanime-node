'use strict'
const BadRequest = use('App/Exceptions/BadRequestException')

class RefreshToken {
  get rules() {
    return {
      refreshToken: 'required'
    }
  }
  get messages() {
    return { required: '{{field}} is required' }
  }

  async fails(errorMessages) {
    throw new BadRequest(errorMessages)
  }
}

module.exports = RefreshToken
