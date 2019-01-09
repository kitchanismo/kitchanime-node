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

  posts() {
    return this.belongsToMany('App/Models/Post').pivotModel(
      'App/Models/PostGenre'
    )
  }

  static get Serializer() {
    return 'App/Serializers/RemovePivotSerializer'
  }
}

module.exports = Genre
