const PlayerTextures = require('./PlayerTextures')
const UsernameHistory = require('./UsernameHistory')

/**  @class
 * @desc Represents a regular player's general info such as uuid, name, skin, ...
 */
class RegularPlayer {
  constructor(data) {
    this.uuid = data.id
    this.username = data.name
    this.legacy = data.legacy || false
    this.demo = data.demo || false
    this.username_history = new UsernameHistory(data.name_history)

    for (var prop of data.properties) {
      if(prop.name === "textures") {
        this.textures = new PlayerTextures(prop.value)
      }
    }

  }

}

module.exports = RegularPlayer
