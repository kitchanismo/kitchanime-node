'use strict'

const Model = use('Model')

class Genre extends Model {
  static get visible() {
    return ['id', 'name']
  }

  animes() {
    return this.belongsToMany('App/Models/Anime').pivotModel(
      'App/Models/AnimeGenre'
    )
  }

  static get Serializer() {
    return 'App/Serializers/RemovePivotSerializer'
  }
}

module.exports = Genre
