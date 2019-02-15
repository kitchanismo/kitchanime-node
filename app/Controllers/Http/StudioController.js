'use strict'
const Studio = use('App/Models/Studio')
const BadRequest = use('App/Exceptions/BadRequestException')

class StudioController {
  async index({ response }) {
    const studios = await Studio.all()

    response.status(200).json({
      studios
    })
  }

  async show({ request, response }) {
    const { studio } = request.get()

    response.status(200).json({
      studio
    })
  }

  async animes({ response, request }) {
    const { studio } = request.get()

    const animes = await studio
      .animes()
      .with('studios')
      .with('genres')
      .fetch()
      .then(data => data.toJSON())

    animes.map(p => {
      p.studios.map(s => delete s.pivot)
      p.genres.map(g => delete g.pivot)
    })

    response.status(200).json({
      animes
    })
  }

  async store({ response, request }) {
    const { name } = request.post()

    const count = await Studio.query()
      .where({ name })
      .count('* as total')

    if (count[0].total > 0) throw new BadRequest(name + ' is taken')

    const studio = await Studio.create({
      name
    })

    response.status(201).json({
      message: 'studio created',
      id: studio.id
    })
  }

  async update({ request, response }) {
    const { studio } = request.get()

    const { name } = request.post()

    studio.merge({
      name
    })

    await studio.save()

    response.status(201).json({
      message: 'studio updated',
      id: studio.id
    })
  }

  async destroy({ request, response }) {
    const { studio } = request.get()

    await studio.delete()

    response.status(200).json({
      message: 'studio deleted',
      id: studio.id
    })
  }
}

module.exports = StudioController
