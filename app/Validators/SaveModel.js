'use strict'
const BadRequest = use('App/Exceptions/BadRequestException')
class SaveModel {
  get rules() {
    return {
      name: 'required|min:3'
    }
  }

  get sanitizationRules() {
    return {
      name: 'strip_tags|escape|strip_links'
    }
  }

  get messages() {
    return {
      required: '{{ field }} is required!',
      'name.min': 'name is minimum of 3 characters!'
    }
  }

  get validationAll() {
    return true
  }

  async fails(errorMessages) {
    throw new BadRequest(errorMessages)
  }
}

module.exports = SaveModel
