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

  async seasons({ request, response }) {
    const fall = await this.getDatesBySeason('fall')
    const spring = await this.getDatesBySeason('spring')
    const summer = await this.getDatesBySeason('summer')
    const winter = await this.getDatesBySeason('winter')

    const seasons = {
      winter,
      spring,
      summer,
      fall
    }

    response.status(200).json({
      seasons
    })
  }

  async getDatesBySeason(season) {
    return await Anime.query()
      .distinct('releaseDate')
      .where({ season })
      .whereNot({ releaseDate: '0000-00-00' })
      .pluck('releaseDate')
      .orderBy('releaseDate')
      .then(dates =>
        dates.map(date => {
          return date.getFullYear()
        })
      )
  }

  async year({ response, params: { year } }) {
    const animes = await Anime.query()
      .with('genres')
      .with('studios')
      .having('releaseDate', 'like', `%${year}%`)
      .fetch()
      .then(data => data.toJSON())

    const count = Object.keys(animes).length

    response.status(200).json({
      year: parseInt(year),
      count,
      animes
    })
  }

  async release({ response, params }) {
    const { year, season } = params

    const animes = await Anime.query()
      .with('genres')
      .with('studios')
      .where({ season })
      .having('releaseDate', 'like', `%${year}%`)
      .fetch()
      .then(data => data.toJSON())

    const count = Object.keys(animes).length

    response.status(200).json({
      year: parseInt(year),
      season,
      count,
      animes
    })
  }

  async paginate({ params: { num }, response, request, utils }) {
    const { limit = 10 } = request.get()

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

    const nextUrl = `${utils.getNextUrl(pageData)}?limit=${limit}`
    const prevUrl = `${utils.getPrevUrl(pageData)}?limit=${limit}`

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
      genreIds = null,
      studioIds = null
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
      genreIds ? await anime.genres().attach(genreIds, null, trx) : null
      studioIds ? await anime.studios().attach(studioIds, null, trx) : null
    } catch (error) {
      trx.rollback()

      if (!error.sqlMessage) throw new Error(error.message)

      throw new BadRequest(utils.getErrors(error))
    }

    trx.commit()

    await anime.loadMany(['studios', 'genres'])

    response.status(201).json({
      message: 'anime created',
      anime
    })
  }

  async update({ request, response, utils }) {
    const { anime } = request.get()

    const {
      title,
      description,
      season,
      type,
      imageUrl,
      releaseDate,
      genreIds = null,
      studioIds = null
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
      genreIds ? await anime.genres().sync(genreIds, null, trx) : null
      studioIds ? await anime.studios().sync(studioIds, null, trx) : null
    } catch (error) {
      trx.rollback()
      if (!error.sqlMessage) throw new Error(error.message)

      throw new BadRequest(utils.getErrors(error))
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
