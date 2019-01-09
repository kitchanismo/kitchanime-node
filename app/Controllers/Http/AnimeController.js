'use strict'

const Anime = use('App/Models/Anime')
const Database = use('Database')
const BadRequest = use('App/Exceptions/BadRequestException')
const NotFound = use('App/Exceptions/NotFoundException')

class AnimeController {
  async genres({ request, response }) {
    const { anime } = request.get()

    let genres = await anime
      .genres()
      .fetch()
      .then(data => data.toJSON())

    response.status(200).json({
      genres
    })
  }

  async studios({ request, response }) {
    const { anime } = request.get()

    let studios = await anime
      .studios()
      .fetch()
      .then(data => data.toJSON())

    response.status(200).json({
      studios
    })
  }

  async paginate({ params: { num }, response, request, utils }) {
    const { limit = 15 } = request.get()

    let animes = await Anime.query()
      .with('genres')
      .with('studios')
      .paginate(num, limit)
      .then(data => data.toJSON())

    if (+num > +animes.lastPage) {
      throw new NotFound(`Page ${num} not found`)
    }

    let pageData = {
      lastPage: animes.lastPage,
      url: request.url(),
      num
    }

    const nextUrl = utils.getNextUrl(pageData)
    const prevUrl = utils.getPrevUrl(pageData)

    const count = Object.keys(animes.data).length

    const data = {
      prevUrl,
      nextUrl,
      count,
      ...animes
    }

    response.status(200).json({
      data
    })
  }

  async index({ response, request }) {
    const { title = '' } = request.get()

    const animes = await Anime.query()
      .with('genres')
      .with('studios')
      .having('title', 'like', `%${title}%`)
      .fetch()
      .then(data => data.toJSON())

    const count = Object.keys(animes).length

    response.status(200).json({
      count,
      animes
    })
  }

  async show({ request, response }) {
    let { anime } = request.get()

    await anime.loadMany(['studios', 'genres'])

    response.status(200).json({
      anime
    })
  }

  async store({ request, response, utils }) {
    const {
      title,
      description,
      season,
      type,
      imageUrl,
      releaseDate,
      genreIds,
      studioIds
    } = request.post()

    const trx = await Database.beginTransaction()

    const anime = await Anime.create(
      {
        title,
        description,
        season,
        type,
        imageUrl,
        releaseDate
      },
      trx
    )

    try {
      await anime.genres().attach(genreIds, null, trx)
      await anime.studios().attach(studioIds, null, trx)
    } catch (error) {
      trx.rollback()

      if (!error.sqlMessage) throw new Error(error.message)

      const field = utils.filterField(error.message)
      const errors = [
        {
          message: `a foreign key constraint fails on ${field}`,
          field: `${field}Ids`,
          validation: 'constraint'
        }
      ]
      throw new BadRequest(errors)
    }

    trx.commit()

    await anime.loadMany(['studios', 'genres'])

    response.status(201).json({
      message: 'anime created',
      anime
    })
  }

  async update({ request, response }) {
    const { anime } = request.get()

    const {
      title,
      description,
      season,
      type,
      imageUrl,
      releaseDate,
      genreIds,
      studioIds
    } = request.post()

    const trx = await Database.beginTransaction()

    anime.merge({
      title,
      description,
      season,
      type,
      imageUrl,
      releaseDate
    })

    await anime.save(trx)

    try {
      await anime.genres().sync(genreIds, null, trx)
      await anime.studios().sync(studioIds, null, trx)
    } catch (error) {
      trx.rollback()
      if (!error.sqlMessage) throw new Error(error.message)

      throw new BadRequest('a foreign key constraint fails')
    }

    trx.commit()

    await anime.loadMany(['studios', 'genres'])

    response.status(201).json({
      message: 'anime updated',
      anime
    })
  }

  async destroy({ request, response }) {
    const { anime } = request.get()

    await anime.delete()

    response.json({
      message: 'anime deleted',
      id: anime.id
    })
  }
}

module.exports = AnimeController
