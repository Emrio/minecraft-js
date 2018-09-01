const GameProfile = require('./GameProfile')

/**  @class
 * @desc Represents a Mojang game profile other than Minecraft
 */
class OtherProfile extends GameProfile {
  constructor(data, associated_account) {
    super(data, associated_account)
    // We do not really care about other profiles
    this.data = data
  }
}

module.exports = OtherProfile
