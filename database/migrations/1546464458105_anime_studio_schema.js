'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnimeStudioSchema extends Schema {
  up() {
    this.create('anime_studio', table => {
      table.increments()
      table.integer('anime_id').unsigned()
      table
        .foreign('anime_id')
        .references('animes.id')
        .onDelete('cascade')
      table.integer('studio_id').unsigned()
      table
        .foreign('studio_id')
        .references('Studios.id')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('anime_studio')
  }
}

module.exports = AnimeStudioSchema
