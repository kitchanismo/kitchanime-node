'use strict'

const User = (exports = module.exports = {})

User.registered = async user => {
  console.log('registered')
}

User.something = async () => {
  console.log('something')
}
