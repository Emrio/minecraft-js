const MCAPI_PLAYERS = require('./apis/Players')

module.exports = class MCAPI {

  /**
   * @static @attribute players - Methods for players
   */
  static get players() {
    return MCAPI_PLAYERS
  }
}
