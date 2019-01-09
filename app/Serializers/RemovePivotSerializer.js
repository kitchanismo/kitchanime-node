const VanillaSerializer = require('@adonisjs/lucid/src/Lucid/Serializers/Vanilla')

class RemovePivotSerializer extends VanillaSerializer {
  _getRowJSON(modelInstance) {
    const json = modelInstance.toObject()
    this._attachRelations(modelInstance, json)
    this._attachMeta(modelInstance, json)
    delete json.pivot
    return json
  }
}

module.exports = RemovePivotSerializer
