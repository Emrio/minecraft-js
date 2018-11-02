const mcdata = require('minecraft-data')
const ServerPlayers = require('./ServerPlayers')

Array.prototype.last = function() {
  return this[this.length-1]
}

const protocol_to_version = (protocol) => {
  var versions = mcdata.postNettyVersionsByProtocolVersion.pc[protocol]

  if(!versions || !versions.length) return null
  return versions.last().minecraftVersion
}

const remove_start_end_spaces = (string) => {
  return string.replace(/^ {1,}| {1,}$/g, "")
}

const format_motd = (motd) => {
  var lines = motd.split(/\n|\r/g)
  for (var i = 0; i < lines.length; i++) {
    lines[i] = remove_start_end_spaces(lines[i])
  }
  return lines.join("\n")
}

/**  @class
 * @desc Represents a pinged server with its general info
 */
module.exports = class Server {
  constructor(data, host, port) {
    this.host = host
    this.port = port
    this.motd = {
      raw: data.description.text,
      formatted: format_motd(data.description.text)
    }
    this.players = new ServerPlayers(data.players)
    this.version = data.version.name
    this.protocol = data.version.protocol
    this.version_from_protocol = protocol_to_version(this.protocol) || this.version
    this.favicon = data.favicon
  }
}
