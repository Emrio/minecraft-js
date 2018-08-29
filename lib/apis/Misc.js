const request = require('request')
const ServiceStatus = require('./../classes/ServiceStatus')

module.exports = class MCAPI_MISC {


  /**
   * @static @method fetch_status - Get the status of the Mojang's services
   */
  static fetch_status() {
    return new Promise((resolve, reject) => {
      request("https://status.mojang.com/check", (err, res, body) => {
        if(err) reject(err)
        else if(res.statusCode >= 400) reject("The API returned the following response : " + res.statusCode + " - " + res)
        else if(res.statusCode >= 200 && res.statusCode < 400) {
          var data = JSON.parse(body)
          let status = new ServiceStatus(data)
          resolve(status)
        }
      })
    })
  }


}
