'use strict'

const Genre = use('App/Models/Genre')
const NotFound = use('App/Exceptions/NotFoundException')

class FindGenre {
  async handle(
    {
      params: { id },
      request
    },
    next
  ) {
    const genre = await Genre.find(id)

    if (!genre) {
      throw new NotFound(`genre id:${id} not found.`)
    }

    request.get().genre = genre

    await next()
  }
}

module.exports = FindGenre
