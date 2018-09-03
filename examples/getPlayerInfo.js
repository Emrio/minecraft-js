const MCAPI = require('..')

MCAPI.players.get("Notch")
  .then(player => {
    console.log("Username : " + player.username)
    console.log("UUID : " + player.uuid)
    console.log("Skin URL : " + player.textures.skin_url)
  })
  .catch(console.error)
