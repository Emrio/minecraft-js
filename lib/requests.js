const request = require('request')
const MCAPIError = require('./MCAPIError')

module.exports = class Requests {

  /**
   * @static GET - HTTP GET method
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

  // TODO:
  static POST(url, payload, is_json) {
    return new Promise((resolve, reject) => {
      request({
        method: "POST",
        body: JSON.stringify(payload),
        json: is_json || false,
        url: url
      },
      (err, res, body) => {
        if(err) return reject(err)
        else if(res.statusCode >= 400 || res.statusCode === 204) return reject(new MCAPIError(res.statusCode, "(" + url + ") Errror " + res.statusCode + "."))
        else if((res.statusCode >= 200 && res.statusCode < 400) || res.statusCode !== 204) return resolve(body)
      })
    })
  }

}
