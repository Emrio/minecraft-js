const reqs = require('./../requests')
const ServiceStatus = require('./../classes/ServiceStatus')

module.exports = class MCAPI_MISC {

  /**
   * @static @method fetch_status - Get the status of the Mojang's services
   */
  static fetch_status() {
    return new Promise((resolve, reject) => {
      reqs.GET("https://status.mojang.com/check", {json: true})
        .then(body => {
          let status = new ServiceStatus(body)
          resolve(status)
        })
        .catch((err) => {
          if(err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(status fetcher) You have reached the API request limit"))
          else reject(err)
        })
    })
  }

  /**
   * @static @attribute stats - Minecraft sales statistics
   */
   static get stats() {
     return MCAPI_MISC_STATS
   }

}
