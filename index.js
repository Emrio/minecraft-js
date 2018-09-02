const MCAPI_PLAYERS = require('./lib/apis/Players')
const MCAPI_MISC = require('./lib/apis/Misc')
const MCAPI_SERVERS = require('./lib/apis/Servers')
const MCAPI_ACCOUNTS = require('./lib/apis/Accounts')

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
   * @static @attribute servers - Methods for servers
   */
  static get servers() {
    return MCAPI_SERVERS
  }

  /**
   * @static @attribute accounts - Methods for Mojang Accounts
   */
  static get accounts() {
    return MCAPI_ACCOUNTS
  }

  /**
   * @static @attribute version - Minecraft-js package version
   */
  static get version() {
    return require("package.json").version
  }

}
