const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class PostSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)
    json.test = 'testing'
    return json
  }
}

module.exports = PostSerializer
