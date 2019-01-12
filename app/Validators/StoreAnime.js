'use strict'
const BadRequest = use('App/Exceptions/BadRequestException')

class StoreAnime {
  //has issue on sync put
  get sanitizationRules() {
    if (this.ctx.request.method() === 'POST') {
      return {
        title: 'strip_tags|escape|strip_links',
        season: 'strip_tags|escape|strip_links',
        description: 'strip_tags|escape|strip_links',
        type: 'strip_tags|escape|strip_links',
        imageUrl: 'strip_tags|escape|strip_links'
      }
    }
    return {}
  }

  get rules() {
    return {
      title: 'required|min:3'
    }
  }

  get messages() {
    return {
      required: '{{ field }} is required!',
      min: '{{field}} is minimum of 3 characters!'
    }
  }

  get validationAll() {
    return true
  }

  async fails(errorMessages) {
    throw new BadRequest(errorMessages)
  }
}

module.exports = StoreAnime
