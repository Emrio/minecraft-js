const reqs = require('./../requests')
const RegularPlayer = require('./../classes/RegularPlayer')
const MCAPIError = require('./../MCAPIError')

const profile_info_from_uuid = (uuid) => {
  return new Promise((resolve, reject) => {
    reqs.GET("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid, {json: true})
      .then(body => {
        var main_user_data = body

        reqs.GET("https://api.mojang.com/user/profiles/" + uuid + "/names", {json: true})
          .then(body => {
            main_user_data.name_history = body

            let player = new RegularPlayer(main_user_data)
            resolve(player)
          })
          .catch((err) => {
            if(err instanceof MCAPIError && err.code === 204) reject(new MCAPIError(204, "(username history fetcher) UUID not recognized"))
            else if(err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(username history fetcher) You have reached the API request limit"))
            else reject(err)
          })
      })
      .catch((err) => {
        if(err instanceof MCAPIError && err.code === 204) reject(new MCAPIError(204, "(textures fetcher) UUID not recognized"))
        else if(err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(textures fetcher) You have reached the API request limit"))
        else reject(err)
      })
  })
}

module.exports = class MCAPI_PLAYERS {

  /**
   * @static @method get - Get profile info of an unlogged user
   *
   * @param  {String} username The user's name
   */
  static get(username) {
    return new Promise((resolve, reject) => {
      reqs.GET("https://api.mojang.com/users/profiles/minecraft/" + username, {json: true})
        .then(body => {
          var uuid = body.id
          profile_info_from_uuid(uuid)
            .then(resolve)
            .catch(reject)
        })
        .catch((err) => {
          if(err instanceof MCAPIError && err.code === 204) reject(new MCAPIError(204, "(uuid fetcher) Username not recognized"))
          else if(err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(uuid fetcher) You have reached the API request limit"))
          else reject(err)
        })
      })
  }

  /**
   * @static @method get_from_uuid - Get profile info of an unlogged user from its uuid
   *
   * @param  {String} uuid The user's uuid
   */
  static get_from_uuid(uuid) {
    return new Promise((resolve, reject) => {
      profile_info_from_uuid(uuid)
        .then(resolve)
        .catch(reject)
    })
  }

}
