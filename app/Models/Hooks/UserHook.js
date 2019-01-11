'use strict'

const UserHook = (exports = module.exports = {})
const Hash = use('Hash')

UserHook.parseToBoolean = async user => {
  if (Array.isArray(user)) {
    user = user.filter(u => (u.isAdmin = u.isAdmin === 1 ? true : false))
  }
  user.isAdmin = user.isAdmin === 1 ? true : false
}

UserHook.hassPassword = async userInstance => {
  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}

UserHook.hidePassword = async userInstance => {
  delete userInstance.password
}
