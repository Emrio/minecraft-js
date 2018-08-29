const MCAPI_PLAYERS = require('./apis/Players')
const MCAPI_MISC = require('./apis/Misc')

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



}
