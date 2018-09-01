const MojangAccountProperties = require('./MojangAccountProperties')
const MojangAccountProfiles = require('./MojangAccountProfiles')

/**  @class
 * @desc Represents a Mojang Account
 */
class MojangAccount {
  constructor(data) {

    // Used by the MCAPI
    this._tokens = {
      access: data.accessToken,
      client: data.clientToken
    }

    // Acount main info
    this.account_id = data.user.id
    this.email = data.user.email
    this.username = data.user.username

    // Info of registration
    this.registration = {
      ip: data.user.registerIp,
      date: new Date(data.user.registeredAt)
    }

    // Other data. I didn't know they had my birthday!
    this.last_password_change = new Date(data.user.passwordChangedAt)
    this.birthday = new Date(data.user.dateOfBirth)

    // Account props
    this.properties = new MojangAccountProperties(data)

    // Available profiles
    this.profiles = new MojangAccountProfiles(data, this)
  }
}

module.exports = MojangAccount
