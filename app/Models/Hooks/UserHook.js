'use strict'

const UserHook = (exports = module.exports = {})

UserHook.parseToBoolean = async user => {
  //   if (Array.isArray(user)) {
  //     user = user.map(u => (u.isAdmin === 1 ? true : false))
  //     console.log(user)
  //     return
  //   }

  user.isAdmin = user.isAdmin === 1 ? true : false
}
