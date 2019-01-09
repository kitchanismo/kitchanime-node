'use strict'

const Anime = use('App/Models/Anime')
const NotFound = use('App/Exceptions/NotFoundException')

class FindAnime {
  async handle(
    {
      params: { id },
      request
    },
    next
  ) {
    const anime = await Anime.find(id)

    if (!anime) {
      throw new NotFound(`anime id:${id} not found.`)
    }

    request.get().anime = anime

    await next()
  }
}

module.exports = FindAnime
