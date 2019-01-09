const Route = use('Route')
const NotFound = use('App/Exceptions/NotFoundException')

const notFound = () => {
  throw new NotFound()
}

module.exports = notFound
