const { includes } = require('lodash')
const Env = use('Env')
const appUrl = Env.get('APP_URL')

class UtilityService {
  constructor() {}
  removePivotArr(arr) {
    return arr.map(p => {
      p.studios.map(s => delete s.pivot)
      p.genres.map(g => delete g.pivot)
    })
  }

  removePivotObj(arr) {
    return arr.map(o => delete o.pivot)
  }

  filterValue(str) {
    return str.match(/'([^']+)'/)[1]
  }

  filterField(str) {
    const table = str.match(/`([^`]+)`/)[1]
    const index = table.indexOf('_') - 1
    return table.substring(index + 2)
  }

  has(value, arr) {
    return includes(arr, value)
  }

  filterMessage(str) {
    const index = str.indexOf('_') - 1
    return str.substring(0, index)
  }

  filterJWTMessage(str) {
    const index = str.indexOf(':') - 1
    return str.substring(index + 3)
  }

  removeLastIndexUrl(url) {
    url = appUrl + url
    let to = url.lastIndexOf('/')
    to = to == -1 ? url.length : to + 1
    return url.substring(0, to)
  }

  getNextUrl({ lastPage, url, num }) {
    return +lastPage <= +num ? null : this.removeLastIndexUrl(url) + (+num + 1)
  }

  getPrevUrl({ lastPage, url, num }) {
    return +num === 1 || +lastPage < +num
      ? null
      : this.removeLastIndexUrl(url) + (+num - 1)
  }

  getErrors({ message }) {
    const field = this.filterField(message)
    return [
      {
        message: `a foreign key constraint fails on ${field}`,
        field: `${field}Ids`,
        validation: 'constraint'
      }
    ]
  }
}
module.exports = new UtilityService()
