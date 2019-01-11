'use strict'

const { validateAll, sanitize } = use('Validator')
const BadRequest = use('App/Exceptions/BadRequestException')

class ValidateAnime {
  get sanitizationRules() {
    return {
      title: 'strip_tags|escape|strip_links',
      season: 'strip_tags|escape|strip_links',
      description: 'strip_tags|escape|strip_links',
      type: 'strip_tags|escape|strip_links',
      imageUrl: 'strip_tags|escape|strip_links'
    }
  }

  get storeRules() {
    return {
      title: 'required|min:3',
      season: 'required',
      studioIds: 'required',
      genreIds: 'required',
      type: 'required'
    }
  }

  get paramsRules() {
    return {
      year: 'number|min:4|max:4'
    }
  }

  get messages() {
    return {
      required: '{{ field }} is required!',
      'title.min': 'title is minimum of 3 characters!'
    }
  }

  async handle({ request, params }, next) {
    const rules =
      request.method() === 'GET' ? this.paramsRules : this.storeRules

    const data = request.method() === 'GET' ? params : request.all()

    const validation = await validateAll(data, rules, this.messages)

    if (validation.fails()) {
      throw new BadRequest(validation.messages())
    }

    request.body = sanitize(request.all(), this.sanitizationRules)

    await next()
  }
}

module.exports = ValidateAnime
