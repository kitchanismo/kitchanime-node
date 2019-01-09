'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddIsAdminToUserSchema extends Schema {
  up () {
    this.table('add_is_admin_to_users', (table) => {
      // alter table
    })
  }

  down () {
    this.table('add_is_admin_to_users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AddIsAdminToUserSchema
