'use strict'
const Genre = use('App/Models/Genre')
class GenreController {
  async index({ response }) {
    const genres = await Genre.all()

    response.status(200).json({
      genres
    })
  }

  async show({ response, request }) {
    const { genre } = request.get()

    response.status(200).json({
      genre
    })
  }

  async posts({ response, request }) {
    const { genre } = request.get()

    const posts = await genre
      .posts()
      .with('studios')
      .with('genres')
      .fetch()
      .then(data => data.toJSON())

    response.status(200).json({
      posts
    })
  }

  async store({ response, request }) {
    const { name } = request.post()

    const genre = await Genre.create({
      name
    })

    response.status(201).json({
      message: 'genre created',
      genre
    })
  }

  async update({ request, response }) {
    const { genre } = request.get()

    const { name } = request.post()

    genre.merge({
      name
    })

    await genre.save()

    response.status(201).json({
      message: 'genre updated',
      genre
    })
  }

  async destroy({ request, response }) {
    const { genre } = request.get()

    await genre.delete()

    response.status(200).json({
      message: 'genre deleted',
      id: genre.id
    })
  }
}

module.exports = GenreController
