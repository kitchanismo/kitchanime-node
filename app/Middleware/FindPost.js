'use strict'

const Post = use('App/Models/Post')
const NotFound = use('App/Exceptions/NotFoundException')

class FindPost {
  async handle(
    {
      params: { id },
      request
    },
    next
  ) {
    const post = await Post.find(id)

    if (!post) {
      throw new NotFound(`post id:${id} not found.`)
    }

    request.get().post = post

    await next()
  }
}

module.exports = FindPost
