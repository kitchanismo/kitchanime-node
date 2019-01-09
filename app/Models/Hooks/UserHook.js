'use strict'

const UserHook = (exports = module.exports = {})

UserHook.parseToBoolean = async user => {
  if (Array.isArray(user)) {
    user.map(u => {
      u.isAdmin = u.isAdmin === 1 ? true : false
    })
  }
  user.isAdmin = user.isAdmin === 1 ? true : false
}
