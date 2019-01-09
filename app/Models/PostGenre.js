'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PostGenre extends Model {
  static get hidden() {
    return ['post_id', 'genre_id']
  }
  static get table() {
    return 'post_genre'
  }

  static get Serializer() {
    return 'App/Serializers/RemovePivotSerializer'
  }
}

module.exports = PostGenre
