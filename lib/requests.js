const request = require('request')
const net = require('net')
const MCAPIError = require('./MCAPIError')
const MinecraftPacket = require('./classes/MinecraftPacket')

module.exports = class Requests {

  /**
   * @static @method GET - HTTP GET method
   *
   * @param  {String} url The url to GET
   */
  static GET(url, opts) {
    return new Promise((resolve, reject) => {
      request(url, opts || {}, (err, res, body) => {
        if(err) return reject(err)
        else if(res.statusCode >= 400 || res.statusCode === 204) return reject(new MCAPIError(res.statusCode, "(" + url + ") Errror " + res.statusCode + "."))
        else if((res.statusCode >= 200 && res.statusCode < 400) || res.statusCode !== 204) return resolve(body)
      })
    })
  }


  /**
   * @static @method POST - HTTP POST method
   *
   * @param  {String}  url      The url to POST
   * @param  {Any}     payload  The payload of the request
   * @param  {Boolean} is_json  Should the object be treated as a JSON object
   */
  static POST(url, opts) {
    return new Promise((resolve, reject) => {
      request({
        method: "POST",
        body: opts.payload,
        json: opts.is_json || false,
        headers: opts.headers || {}
        url: url
      },
      (err, res, body) => {
        if(err) return reject(err)
        else if(res.statusCode >= 400 || res.statusCode === 204) return reject(new MCAPIError(res.statusCode, "(" + url + ") Errror " + res.statusCode + "."))
        else if((res.statusCode >= 200 && res.statusCode < 400) || res.statusCode !== 204) return resolve(body)
      })
    })
  }

  /**
   * @static @method ping_server - Pings a Minecraft server
   *
   * @param  {String} HOST     The IP adress of the server
   * @param  {Number} PORT     The port of the server
   * @param  {Number} PROTOCOL The protocol to use for the ping
   * @param  {Number} TIMEOUT  The number of milliseconds before the connection times out
   */
  static ping_server(HOST, PORT, PROTOCOL, TIMEOUT) {
    return new Promise((resolve, reject) => {

      const client = new net.Socket()
      var final_status = undefined

      // The data in sent by little packets so we need a global buffer to store the sub buffers
      var totalReadingDataBuffer = Buffer.from([])

      // Setting the max delay to wait for the server response
      client.setTimeout(TIMEOUT || 30000)

      // Connecting to the server
      client.connect(PORT, HOST)

      // Triggered once the connection is established -> sending handshake
      client.on("connect", () => {

        // Sending a handshake
        const handshake = new MinecraftPacket()
        handshake.writeVarInt(0)
        handshake.writeVarInt(PROTOCOL)
        handshake.writeString(HOST)
        handshake.writeUShort(PORT)
        handshake.writeVarInt(1)
        handshake.send(client)

        // Sending a legacy ping
        const legacyPing = new MinecraftPacket()
        legacyPing.writeVarInt(0)
        legacyPing.send(client)

      })

      // Triggered when new data is received
      client.on('data', (data) => {
        // Adding it to the existing buffer
        totalReadingDataBuffer = Buffer.concat([totalReadingDataBuffer, data])
      	client.end()
      })

      // Triggered when the connection shut down (either error or server finished sending data)
      client.on('close', () => {
        try {
          var response_data = JSON.parse(totalReadingDataBuffer.toString("utf8", 5))
          return resolve(response_data)
        } catch (e) {
          // An error occured while parsing data. It may be corrupted, the connection might have timed out or been broken
          return reject(e)
        }
      })

      // Triggered when the connection timed out (by default after 30secs)
      client.on('timeout', () => {
        client.destroy()
        return reject(new MCAPIError(408, "Timed out"))
      })

      // Triggered when the connection fails
      client.on('error', (err) => {
        client.destroy()
        return reject(err)
      })

    })

  }


}
