const request = require('request')
const MCAPIError = require('./MCAPIError')

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
