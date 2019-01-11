'use strict'

/*
|--------------------------------------------------------------------------
| AnimeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class AnimeSeeder {
  async run() {
    try {
      const animes = await Factory.model('App/Models/Anime').createMany(20)

      for (const anime of animes) {
        const genre = await Factory.model('App/Models/Genre').make()
        const studio = await Factory.model('App/Models/Studio').make()

        await anime.genres().save(genre)
        await anime.studios().save(studio)
      }
    } catch (ex) {
      console.log(ex)
    }
  }
}

module.exports = AnimeSeeder
