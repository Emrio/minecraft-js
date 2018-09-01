/**  @class
 * @desc Represents the basic Mojang game profile information
 */
class GameProfile {
  constructor(data, associated_account) {
    this.game = data.agent
    this.uuid = data.id
    this.username = data.name
    this.account = associated_account
    this.created = new Date(data.createdAt)
    this.token = data.tokenId
  }
}

module.exports = GameProfile
