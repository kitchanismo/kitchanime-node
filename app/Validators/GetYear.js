'use strict'
const BadRequest = use('App/Exceptions/BadRequestException')

class GetYear {
  get rules() {
    return {
      year: 'number|min:4|max:4'
    }
  }

  get data() {
    return { ...this.ctx.params }
  }

  async fails(errorMessages) {
    throw new BadRequest(errorMessages)
  }
}

module.exports = GetYear
