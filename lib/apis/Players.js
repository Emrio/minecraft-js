const request = require('request')
const RegularPlayer = require('./../classes/RegularPlayer')

module.exports = class MCAPI_PLAYERS {


  /**
   * @static @method get - Get profile info of an unlogged user
   *
   * @param  {String} username The user's name
   */
  static get(username) {
    return new Promise((resolve, reject) => {
      request("https://api.mojang.com/users/profiles/minecraft/" + username, (err, res, body) => {
        if(err) {
          reject(err)
        }
        else if(res.statusCode === 204) {
          reject("The username is not recognized.")
        }
        else if(res.statusCode >= 400) {
          reject("The API returned the following response : " + res.statusCode + " - " + res)
        }
        else if(res.statusCode >= 200 && res.statusCode < 400) {
          var uuid = JSON.parse(body).id
          request("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid, (err, res, body) => {
            if(err) {
              reject(err)
            }
            else if(res.statusCode === 204) {
              reject("The UUID is not recognized.")
            }
            else if(res.statusCode >= 400) {
              reject("The API returned the following response : " + res.statusCode + " - " + res)
            }
            else if(res.statusCode >= 200 && res.statusCode < 400) {
              var main_user_data = JSON.parse(body)

              request("https://api.mojang.com/user/profiles/" + uuid + "/names", (err, res, body) => {
                if(err) {
                  reject(err)
                }
                else if(res.statusCode === 204) {
                  reject("The UUID is not recognized.")
                }
                else if(res.statusCode >= 400) {
                  reject("The API returned the following response : " + res.statusCode + " - " + res)
                }
                else if(res.statusCode >= 200 && res.statusCode < 400) {
                  var name_history_data = JSON.parse(body)

                  main_user_data.name_history = name_history_data

                  let player = new RegularPlayer(main_user_data)
                  resolve(player)

                }
              })
            }
          })
        }
      })
    })
  }

}
