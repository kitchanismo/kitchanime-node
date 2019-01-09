const Env = use('Env')
const appUrl = Env.get('APP_URL')

class PaginateService {
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
}

module.exports = new PaginateService()
