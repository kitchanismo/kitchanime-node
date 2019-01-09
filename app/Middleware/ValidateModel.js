'use strict'

const { validateAll, sanitize } = use('Validator')
const BadRequest = use('App/Exceptions/BadRequestException')

class ValidateModel {
  get sanitizationRules() {
    return {
      name: 'strip_tags|escape|strip_links'
    }
  }

  get rules() {
    return {
      name: 'required|min:3'
    }
  }

  get messages() {
    return {
      required: '{{ field }} is required!',
      'name.min': 'name is minimum of 3 characters!'
    }
  }

  async handle({ request }, next) {
    const validation = await validateAll(
      request.all(),
      this.rules,
      this.messages
    )

    if (validation.fails()) {
      throw new BadRequest(validation.messages())
    }

    request.body = sanitize(request.all(), this.sanitizationRules)

    await next()
  }
}

module.exports = ValidateModel
