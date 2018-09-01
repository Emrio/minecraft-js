const reqs = require('./../requests')
const MCAPIError = require('./../MCAPIError')

const RegularPlayerTextures = require('./RegularPlayerTextures')

/** @class
 * @desc Represents a logged in minecraft player's skin and cape
 *
 * Difference from RegularPlayerTextures : extended to be able to manipulate skin
 */
class LoggedPlayerTextures extends RegularPlayerTextures {
  constructor(data, player, associated_account) {
    super(data)
    this.associated_account = associated_account
    this.player = player

    this._auth_header = { "Authorization": "Bearer " + this.associated_account._tokens.access }
  }

  reset_skin() {
    return new Promise((resolve, reject) => {
      reqs.DELETE("https://api.mojang.com/user/profile/" + this.player.uuid + "/skin", { headers: this._auth_header })
        .then(() => {
          this.skin_url = null
          resolve()
        })
        .catch((err) => {
          if(err instanceof MCAPIError && err.code === 204) { // No content, as expected
            this.skin_url = null
            resolve()
          }
          else if(err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(skin reset) You have reached the API request limit"))
          else reject(err)
        })
    })
  }

  upload_skin(url) {
    return "WIP"
  }

  use_url_skin(url, slim) {
    return new Promise((resolve, reject) => {
      if(url === undefined) {
        return reject(new MCAPIError(400, "You must provide a url"))
      }

      if(slim !== undefined) {
        var SLIM = slim ? true : false
      } else {
        var SLIM = this.slim
      }

      reqs.POST("https://api.mojang.com/user/profile/" + this.player.uuid + "/skin", { payload: "model=\"" + (SLIM ? "slim" : "") + "\"&url=" + url, headers: this._auth_header, is_json: false })
        .then(() => {
          this.slim = SLIM
          this.skin_url = url
          resolve(url)
        })
        .catch((err) => {
          if(err instanceof MCAPIError && err.code === 204) { // No content, as expected
            this.slim = SLIM
            this.skin_url = url
            resolve(url)
          }
          else if(err instanceof MCAPIError && err.code === 400) reject(new MCAPIError(400, "(skin from url) The image couldn't be retrieved from the url"))
          else if(err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(skin from url) You have reached the API request limit"))
          else reject(err)
        })
    })
  }

}

module.exports = LoggedPlayerTextures
