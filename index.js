const MCAPI_PLAYERS = require('./lib/apis/Players')
const MCAPI_MISC = require('./lib/apis/Misc')
const MCAPI_SERVERS = require('./lib/apis/Servers')

module.exports = class MCAPI {

  /**
   * @static @attribute players - Methods for players
   */
  static get players() {
    return MCAPI_PLAYERS
  }

  /**
   * @static @attribute misc - Miscleanious methods
   */
  static get misc() {
    return MCAPI_MISC
  }

  /**
   * @static @attribute misc - Miscleanious methods
   */
  static get servers() {
    return MCAPI_SERVERS
  }

  /**
   * @static @attribute version - Minecraft-js package version
   */
  static get version() {
    return require("package.json").version
  }

}
