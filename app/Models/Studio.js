'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Studio extends Model {
  static get visible() {
    return ['id', 'name']
  }
  animes() {
    return this.belongsToMany('App/Models/Anime')
      .pivotTable('anime_studio')
      .withTimestamps()
  }
  static get Serializer() {
    return 'App/Serializers/RemovePivotSerializer'
  }
}

module.exports = Studio
