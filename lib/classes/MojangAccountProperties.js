/**  @class
 * @desc Represents a Mojang account's general properties
 */
class MojangAccountProperties {
  constructor(data) {
    this.suspended = data.user.suspended
    this.blocked = data.user.blocked
    this.secured = data.user.secured
    this.migrated = data.user.migrated
    this.email_verified = data.user.emailVerified
    this.legacy = data.user.legacyUser
    this.parent_verified = data.user.verifiedByParent
    this.hashed = data.user.hashed
    this.from_migrated_user = data.user.fromMigratedUser
  }
}

module.exports = MojangAccountProperties
