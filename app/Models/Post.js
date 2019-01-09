'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  static get hidden() {
    return ['created_at', 'updated_at']
  }

  studios() {
    return this.belongsToMany('App/Models/Studio').pivotModel(
      'App/Models/PostStudio'
    )
  }

  genres() {
    return this.belongsToMany('App/Models/Genre').pivotModel(
      'App/Models/PostGenre'
    )
  }

  // static get Serializer() {
  //   return 'App/Serializers/PostSerializer'
  // }
}

module.exports = Post
