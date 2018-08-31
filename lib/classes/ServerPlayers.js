const Player = require('./Player')

/**  @class
 * @desc Represents the players in a server
 */
class ServerPlayers {
  constructor(data) {
    this.max = data.max
    this.online = data.online
    this.sample = []

    if(data.sample) {
      data.sample.forEach(pl => { this.sample.push(new Player(pl)) })
    }

  }

}

module.exports = ServerPlayers
