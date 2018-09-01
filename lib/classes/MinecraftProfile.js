const MCAPI_PLAYERS = require('./../apis/Players')
const GameProfile = require('./GameProfile')
const LoggedPlayer = require('./LoggedPlayer')

/**  @class
 * @desc Represents a user's Minecraft profile
 */
class MinecraftProfile extends GameProfile {
  constructor(data, associated_account) {
    super(data, associated_account)
    this.legacy = data.legacyProfile
    this.suspended = data.suspended
    this.premium = data.paid
    this.migrated = data.migrated

    this.player = undefined
  }

  loadPlayer() {
    return new Promise((resolve, reject) => {
      MCAPI_PLAYERS.get(this.username, "RAW_RESULTS")
        .then(data => {
          this.player = new LoggedPlayer(data, this.account)
          resolve()
        })
        .catch(reject)
    })
  }
}

module.exports = MinecraftProfile
