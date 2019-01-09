'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddIsAdminToUserSchema extends Schema {
  up() {
    this.table('users', table => {
      table.boolean('isAdmin').defaultTo(false)
    })
  }

  down() {
    this.table('users', table => {
      table.dropColumn('isAdmin')
    })
  }
}

module.exports = AddIsAdminToUserSchema
