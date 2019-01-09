'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Anime extends Model {
  static get table() {
    return 'animes'
  }

  static get hidden() {
    return ['created_at', 'updated_at']
  }

  studios() {
    return this.belongsToMany('App/Models/Studio').pivotModel(
      'App/Models/AnimeStudio'
    )
  }

  genres() {
    return this.belongsToMany('App/Models/Genre').pivotModel(
      'App/Models/AnimeGenre'
    )
  }

  static get Serializer() {
    return 'App/Serializers/RemovePivotSerializer'
  }

  // static get Serializer() {
  //   return 'App/Serializers/PostSerializer'
  // }
}

module.exports = Anime
