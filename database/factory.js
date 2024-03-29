'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', faker => {
  return {
    username: 'user123',
    password: 'user123',
    email: 'user123@gmail.com'
  }
})

Factory.blueprint('App/Models/Genre', faker => {
  return {
    name: faker.word()
  }
})

Factory.blueprint('App/Models/Studio', faker => {
  return {
    name: faker.word()
  }
})

Factory.blueprint('App/Models/Anime', faker => {
  return {
    title: faker.name(),
    description: faker.paragraph(),
    season: 'fall',
    type: faker.word(),
    imageUrl: faker.sentence(),
    releaseDate: faker.date()
  }
})
