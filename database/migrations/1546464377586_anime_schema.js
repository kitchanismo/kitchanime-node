'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnimeSchema extends Schema {
  up() {
    this.create('animes', table => {
      table.increments()
      table.string('title')
      table.text('description')
      table.string('season')
      table.string('type')
      table.date('releaseDate')
      table.text('imageUrl')
      table.timestamps()
    })
  }

  down() {
    this.drop('animes')
  }
}

module.exports = AnimeSchema
