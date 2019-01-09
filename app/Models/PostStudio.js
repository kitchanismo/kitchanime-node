'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PostStudio extends Model {
  static get hidden() {
    return ['post_id', 'studio_id']
  }
  static get table() {
    return 'post_studio'
  }
}

module.exports = PostStudio
