const MinecraftProfile = require('./MinecraftProfile')
const OtherProfile = require('./OtherProfile')

/**  @class
 * @desc Represents a Mojang Account's game profiles
 */
class MojangAccountProfiles {
  constructor(data, associated_account) {
    this.list = []

    if(!data.availableProfiles) data.availableProfiles = []
    for (var profile of data.availableProfiles) {
      const gameprofile = profile.agent === "minecraft" ? new MinecraftProfile(profile, associated_account) : new OtherProfile(profile, associated_account)

      this.list.push(gameprofile)
      if(profile.id === data.selectedProfile.id) this.selected = gameprofile
    }

  }
}

module.exports = MojangAccountProfiles
