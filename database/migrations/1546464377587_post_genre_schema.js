'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostGenreSchema extends Schema {
  up () {
    this.create('post_genre', (table) => {
      table.increments()
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('Posts.id').onDelete('cascade')
      table.integer('genre_id').unsigned()
      table.foreign('genre_id').references('Genres.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('post_genre')
  }
}

module.exports = PostGenreSchema
