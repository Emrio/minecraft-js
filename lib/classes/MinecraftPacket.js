/**  @class
 * @desc Minecraft ping packet builder
 *
 * Inspired from Cryptkeeper and wizardfrag's mc-ping
 * @see {@link https://github.com/Cryptkeeper/mc-ping-updated|mc-ping-updated repository on Github}
 *
 * Also used the wiki.vg documentation about Handshaking
 * @see {@link https://wiki.vg/Protocol|Minecraft communication protocol}
 * @see {@link https://wiki.vg/Server_List_Ping|Server List Ping}
 */
class MinecraftPacket {

  constructor() {
    this.buffer = Buffer.from(new Array(1))
    this.cursor = 0
  }

  writeVarInt(val) {
    do {
      var tmp = val & 0b01111111
      val >>>= 7
      tmp |= val != 0 ? 0b10000000 : 0
      this.writeUByte(tmp)
    } while (val != 0)
  }

  writeUByte(val) {
    if(this.cursor + 1 > this.buffer.length) this.buffer = Buffer.concat([this.buffer, Buffer.from(new Array(1))])
    this.buffer.writeUInt8(val, this.cursor)
    this.cursor++
  }

  writeString(val) {
    this.writeVarInt(val.length)
    if(this.cursor + val.length > this.buffer.length) this.buffer = Buffer.concat([this.buffer, Buffer.from(new Array(val.length))])
    this.buffer.write(val, this.cursor, val.length, "UTF-8")
    this.cursor += val.length
  }

  writeUShort(val) {
    this.writeUByte(val >> 8)
    this.writeUByte(val & 0b11111111)
  }

  send(socket) {
    const length_packet = new MinecraftPacket()
    length_packet.writeVarInt(this.buffer.length)
    const final_packet = Buffer.concat([length_packet.buffer, this.buffer])
    socket.write(final_packet)
  }

}

module.exports = MinecraftPacket
