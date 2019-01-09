'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostStudioSchema extends Schema {
  up () {
    this.create('post_studio', (table) => {
      table.increments()
      table.integer('post_id').unsigned()
      table.foreign('post_id').references('Posts.id').onDelete('cascade')
      table.integer('studio_id').unsigned()
      table.foreign('studio_id').references('Studios.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('post_studio')
  }
}

module.exports = PostStudioSchema
