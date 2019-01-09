'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnimeGenre extends Model {
  static get hidden() {
    return ['anime_id', 'genre_id']
  }
  static get table() {
    return 'anime_genre'
  }

  static get Serializer() {
    return 'App/Serializers/RemovePivotSerializer'
  }
}

module.exports = AnimeGenre
