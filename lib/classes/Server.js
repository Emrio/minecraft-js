const mcdata = require('minecraft-data')
const ServerPlayers = require('./ServerPlayers')

Array.prototype.last = function() {
  return this[this.length-1]
}

const protocol_to_version = (protocol) => {
  var versions = mcdata.postNettyVersionsByProtocolVersion.pc[protocol]

  if(!versions.length) return null
  else return versions.last().minecraftVersion
}

/**  @class
 * @desc Represents a pinged server with its general info
 */
module.exports = class Server {
  constructor(data, host, port) {
    this.host = host
    this.port = port
    this.motd = data.description
    this.players = new ServerPlayers(data.players)
    this.version = data.version.name
    this.protocol = data.version.protocol
    this.version_from_protocol = protocol_to_version(this.protocol)
    this.favicon = data.favicon
  }
}


/*
{ version: { name: 'Requires MC 1.8-1.13.1', protocol: 47 },
  players: { max: 62000, online: 19485, sample: [] },
  description:
   '            §eHypixel Network §c[1.8-1.13]\n   §a§lBED WARS RUSH V2 §7- §6§lMM ACHIEVEMENTS',
  favicon:


*/
