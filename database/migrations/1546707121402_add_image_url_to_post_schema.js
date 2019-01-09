'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddImageUrlToPostSchema extends Schema {
  up () {
    this.table('posts', (table) => {
      table.text('imageUrl')
    })
  }

  down () {
    this.table('posts', (table) => {
      table.dropColumn('imageUrl')
    })
  }
}

module.exports = AddImageUrlToPostSchema
