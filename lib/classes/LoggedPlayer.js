const RegularPlayer = require('./RegularPlayer')
const LoggedPlayerTextures = require('./LoggedPlayerTextures')

/**  @class
 * @desc Represents a logged in player's object
 *
 * Difference from a Regular Player : ability to manipulate the skin
 */
class LoggedPlayer extends RegularPlayer {
  constructor(data, associated_account) {
    super(data)

    this.associated_account = associated_account

    for (var prop of data.properties) {
      if(prop.name === "textures") {
        this.textures = new LoggedPlayerTextures(prop.value, this, this.associated_account)
      }
    }

  }

}

module.exports = LoggedPlayer
