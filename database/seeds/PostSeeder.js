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

class PostSeeder {
  async run () {

    try {
      const posts = await Factory.model('App/Models/Post').createMany(10)

      posts.forEach(async post => {
        const genre = await Factory.model('App/Models/Genre').make()
        const studio = await Factory.model('App/Models/Studio').make()
        await post.genres().save(genre)
        await post.studios().save(studio)
      });
      
    } catch (ex) {
      console.log(ex)
    }

   
  }
}

module.exports = PostSeeder
