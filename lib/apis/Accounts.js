const reqs = require('./../requests')
const MCAPIError = require('./../MCAPIError')
const MCAPI_PLAYERS = require('./Players')
const MojangAccount = require('./../classes/MojangAccount')

var LOAD_ALL_MC_ACCOUNTS = false

module.exports = class MCAPI_ACCOUNTS {

  static login(username_or_email, password) {
    return new Promise((resolve, reject) => {
      const payload = {
        agent: { name: "Minecraft", version: 1 },
        username: username_or_email,
        password: password,
        requestUser: true
      }

      if(!username_or_email || !password) {
        return reject(new MCAPIError(400, "(account login) The username and the password must be filled"))
      }

      reqs.POST("https://authserver.mojang.com/authenticate", payload, true, true)
        .then(async body => {
          const account = new MojangAccount(body)

          for (var profile of (MCAPI_ACCOUNTS.LOAD_ALL_MC_ACCOUNTS ? account.profiles.list : [account.profiles.selected])) {
            if(profile.game === "minecraft" && !profile.player) await profile.loadPlayer()
          }

          resolve(account)
        })
        .catch((err) => {
          if(err instanceof MCAPIError && err.code === 403) reject(new MCAPIError(404, "(account login) Username or password not recognized"))
          else if(err instanceof MCAPIError && err.code === 429) reject(new MCAPIError(429, "(account login) You have reached the API request limit"))
          else reject(err)
        })
    })
  }

  static get LOAD_ALL_MC_ACCOUNTS() {
    return LOAD_ALL_MC_ACCOUNTS
  }

  static set LOAD_ALL_MC_ACCOUNTS(value) {
    LOAD_ALL_MC_ACCOUNTS = value ? true : false
  }

}
