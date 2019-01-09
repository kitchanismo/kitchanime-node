'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AnimeGenreSchema extends Schema {
  up() {
    this.create('anime_genre', table => {
      table.increments()
      table.integer('anime_id').unsigned()
      table
        .foreign('anime_id')
        .references('Animes.id')
        .onDelete('cascade')
      table.integer('genre_id').unsigned()
      table
        .foreign('genre_id')
        .references('Genres.id')
        .onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('anime_genre')
  }
}

module.exports = AnimeGenreSchema
