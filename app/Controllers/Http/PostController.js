'use strict'

const Post = use('App/Models/Post')
const Database = use('Database')
const BadRequest = use('App/Exceptions/BadRequestException')
const NotFound = use('App/Exceptions/NotFoundException')

class PostController {
  async genres({ request, response }) {
    const { post } = request.get()

    let genres = await post
      .genres()
      .fetch()
      .then(data => data.toJSON())

    response.status(200).json({
      genres
    })
  }

  async studios({ request, response }) {
    const { post } = request.get()

    let studios = await post
      .studios()
      .fetch()
      .then(data => data.toJSON())

    response.status(200).json({
      studios
    })
  }

  async paginate({ params: { num }, response, request, utils }) {
    const { limit = 15 } = request.get()

    let posts = await Post.query()
      .with('genres')
      .with('studios')
      .paginate(num, limit)
      .then(data => data.toJSON())

    if (+num > +posts.lastPage) {
      throw new NotFound(`Page ${num} not found`)
    }

    let pageData = {
      lastPage: posts.lastPage,
      url: request.url(),
      num
    }

    const nextUrl = utils.getNextUrl(pageData)
    const prevUrl = utils.getPrevUrl(pageData)

    const count = Object.keys(posts.data).length

    const data = {
      prevUrl,
      nextUrl,
      count,
      ...posts
    }

    response.status(200).json({
      data
    })
  }

  async index({ response, request }) {
    const { title = '' } = request.get()

    const posts = await Post.query()
      .with('genres')
      .with('studios')
      .having('title', 'like', `%${title}%`)
      .fetch()
      .then(data => data.toJSON())

    const count = Object.keys(posts).length

    response.status(200).json({
      count,
      posts
    })
  }

  async show({ request, response }) {
    let { post } = request.get()

    await post.loadMany(['studios', 'genres'])

    response.status(200).json({
      post
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

    const post = await Post.create(
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
      await post.genres().attach(genreIds, null, trx)
      await post.studios().attach(studioIds, null, trx)
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

    await post.loadMany(['studios', 'genres'])

    response.status(201).json({
      message: 'post created',
      post
    })
  }

  async update({ request, response }) {
    const { post } = request.get()

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

    post.merge({
      title,
      description,
      season,
      type,
      imageUrl,
      releaseDate
    })

    await post.save(trx)

    try {
      await post.genres().sync(genreIds, null, trx)
      await post.studios().sync(studioIds, null, trx)
    } catch (error) {
      trx.rollback()
      if (!error.sqlMessage) throw new Error(error.message)

      throw new BadRequest('a foreign key constraint fails')
    }

    trx.commit()

    await post.loadMany(['studios', 'genres'])

    response.status(201).json({
      message: 'Post updated',
      post
    })
  }

  async destroy({ request, response }) {
    const { post } = request.get()

    await post.delete()

    response.json({
      message: 'post deleted',
      id: post.id
    })
  }
}

module.exports = PostController
