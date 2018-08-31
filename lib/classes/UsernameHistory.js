/**  @class
 * @desc Represents the history of usernames of a Minecraft account
 */
class UsernameHistory {

  constructor(history) {
    this._history = {}
    for (var elmt of history) {
      this._history[elmt.name] = elmt.changedToAt || -Infinity
    }
  }

  get all() {
    return this._history
  }

  get first() {
    for (var username in this._history) {
      if(this._history[username] === -Infinity) return username
    }
    return null
  }

  get last() {
    var last = this.first
    for (var username in this._history) {
      if(this._history[username] >= this._history[last] ) last = username
    }
    return last
  }

  had(username) {
    return this._history.hasOwnProperty(username)
  }

  at(timestamp) {
    var goodOne = this.first
    for (var username in this._history) {
      if(this._history[username] <= timestamp && this._history[username] >= this._history[goodOne]) {
        goodOne = username
      }
    }
    return goodOne
  }

}

module.exports = UsernameHistory
