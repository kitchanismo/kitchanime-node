class UtilityService {
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

  filterMessage(str) {
    const index = str.indexOf('_') - 1
    return str.substring(0, index)
  }
}
module.exports = new UtilityService()
