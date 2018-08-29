const reqs = require('./../requests')

module.exports = class MCAPI_SERVERS {

  /**
   * @static @method get - Get a server's info
   *
   * @param  {String} host The IP of server
   * @param  {Number} port The port of the server
   */
  static get(host, port) {

  }


  /**
   * @static @method blocked_servers - Get the list of SHA1 encoded blocked servers ips
   */
  static blocked_servers() {
    return new Promise((resolve, reject) => {
      reqs.GET("https://sessionserver.mojang.com/blockedservers")
        .then(data => {
          resolve(data.split("\n"))
        })
        .catch(reject)
    })
  }



}
