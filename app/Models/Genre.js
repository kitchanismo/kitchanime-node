'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Genre extends Model {
  //   static boot() {
  //     super.boot();
  //     this.addHook("beforeFetch", "PostHook.removePivot");
  //   }

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
