'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class AnimeStudio extends Model {
  static get hidden() {
    return ['anime_id', 'studio_id']
  }
  static get table() {
    return 'anime_studio'
  }
}

module.exports = AnimeStudio
