'use strict'

const Studio = use('App/Models/Studio')
const NotFound = use('App/Exceptions/NotFoundException')

class FindStudio {
  async handle(
    {
      params: { id },
      request
    },
    next
  ) {
    const studio = await Studio.find(id)

    if (!studio) {
      throw new NotFound(`studio id:${id} not found.`)
    }

    request.get().studio = studio

    await next()
  }
}

module.exports = FindStudio
