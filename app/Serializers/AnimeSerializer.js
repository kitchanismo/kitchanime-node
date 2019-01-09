const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class AnimeSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)
    return json
  }
}

module.exports = AnimeSerializer
